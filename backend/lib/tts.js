// Shared TTS helpers — cache lookup, key derivation, and a background
// pre-generate hook the game routes can fire-and-forget after returning a card.
//
// The HTTP endpoints (routes/tts.js) wrap this for client-facing requests;
// the game route uses pregenerate() to warm the cache before the client asks.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const CACHE_DIR = path.join(__dirname, '..', 'cache', 'tts');
fs.mkdirSync(CACHE_DIR, { recursive: true });

export const DEFAULT_VOICE      = process.env.HF_TTS_VOICE || 'am_michael';
export const REQUEST_TIMEOUT_MS = 60_000;
export const MAX_TEXT_CHARS     = 1800;

// Pronunciation normalization — keep in sync with anything that derives the
// cache key. Must run before hashKey().
export function normalizeForSpeech(input) {
  let s = String(input || '');
  s = s.replace(/\b911\b/g, 'nine one one');
  s = s.replace(/\b9\/11\b/g, 'nine eleven');
  return s;
}

export function hashKey(text, voice) {
  return crypto.createHash('sha256').update(`${voice}::${text}`).digest('hex');
}

// ── Signed narration URLs (told#3) ──────────────────────────────────────────
// GET /api/tts is played by an <audio> element, which cannot send the Bearer
// header told authenticates with. So instead of being open, the URL carries an
// HMAC of exactly the text and voice it may speak, minted by an authenticated
// POST /api/tts/sign. A stranger cannot make it say anything new or grow the
// cache; a leaked URL can only replay one line someone signed in to request.
// Deterministic on purpose: the same line always gets the same URL, so the
// browser's year-long immutable cache keeps working.
const signingKey = () =>
  `told-tts-url:${process.env.JWT_SECRET || 'prodigal-dev-secret-change-in-prod'}`;

export function signText(text, voice) {
  return crypto.createHmac('sha256', signingKey())
    .update(`${voice}::${normalizeForSpeech(text)}`).digest('base64url');
}

export function verifyTextSig(text, voice, sig) {
  if (typeof sig !== 'string' || !sig) return false;
  const want = Buffer.from(signText(text, voice));
  const got  = Buffer.from(sig);
  return got.length === want.length && crypto.timingSafeEqual(got, want);
}

export function cachePath(text, voice) {
  return path.join(CACHE_DIR, `${hashKey(text, voice)}.wav`);
}

// Fetch from upstream Mac Studio TTS, streaming the response body through
// `onChunk(buf)` and resolving with the full Buffer on completion. Errors and
// timeouts reject. The caller decides what to do with chunks (e.g., write to
// disk, pipe to res).
async function fetchUpstreamStreaming(text, voice, onChunk) {
  const upstream = process.env.TTS_SERVER_URL;
  if (!upstream) throw new Error('TTS not configured');

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);

  let r;
  try {
    r = await fetch(`${upstream.replace(/\/$/, '')}/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice }),
      signal: ctrl.signal,
    });
  } catch (err) {
    clearTimeout(t);
    throw err;
  }
  if (!r.ok) {
    clearTimeout(t);
    throw new Error(`upstream ${r.status}`);
  }

  const chunks = [];
  try {
    // Node 18+ exposes a Web ReadableStream on r.body
    const reader = r.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const buf = Buffer.from(value);
      chunks.push(buf);
      try { onChunk?.(buf); } catch { /* swallow — caller can't break stream */ }
    }
  } finally {
    clearTimeout(t);
  }
  return Buffer.concat(chunks);
}

// Stream upstream → disk (tmp file → rename). Used by both the pregenerate
// path and the HTTP miss path. Returns { path, bytes }.
export async function generateAndCache(text, voice, onChunk) {
  const normalized = normalizeForSpeech(text);
  const file = cachePath(normalized, voice);
  if (fs.existsSync(file)) return { path: file, bytes: fs.statSync(file).size, cached: true };

  const tmp = `${file}.tmp-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const out = fs.createWriteStream(tmp);

  let total = 0;
  const tap = (buf) => {
    total += buf.length;
    out.write(buf);
    onChunk?.(buf);
  };

  try {
    await fetchUpstreamStreaming(normalized, voice, tap);
  } catch (err) {
    out.close(() => fs.unlink(tmp, () => {}));
    throw err;
  }

  await new Promise((resolve, reject) => {
    out.end((err) => err ? reject(err) : resolve());
  });
  // Last-write-wins is fine — both end up with valid WAVs.
  try { fs.renameSync(tmp, file); } catch { try { fs.unlinkSync(tmp); } catch {} }
  return { path: file, bytes: total, cached: false };
}

// Fire-and-forget cache warmer. Safe to call multiple times for the same text.
// Used by /api/game/next to render the audio in parallel with the client
// receiving the scene prose, so by the time NarrationButton requests it, the
// file is on disk (cache HIT, ~0.2s).
const _pregenInflight = new Set();

export function pregenerate(text, voice = DEFAULT_VOICE) {
  if (!text) return;
  const raw = String(text).trim();
  if (!raw || raw.length > MAX_TEXT_CHARS) return;
  if (!process.env.TTS_SERVER_URL) return;

  const normalized = normalizeForSpeech(raw);
  const key = hashKey(normalized, voice);
  const file = cachePath(normalized, voice);
  if (fs.existsSync(file)) return;
  if (_pregenInflight.has(key)) return;
  _pregenInflight.add(key);

  generateAndCache(raw, voice)
    .catch((err) => { console.warn('[tts.pregenerate]', err.message); })
    .finally(() => { _pregenInflight.delete(key); });
}
