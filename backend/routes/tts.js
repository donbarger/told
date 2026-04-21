// POST /api/tts — proxy text → WAV from the Mac Studio TTS server.
// Cached on disk by SHA-256(voice::text) so each line is only rendered once.
// No auth required — the Prodigal game is accessible to anyone.

import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = path.join(__dirname, '..', 'cache', 'tts');
fs.mkdirSync(CACHE_DIR, { recursive: true });

const DEFAULT_VOICE      = process.env.HF_TTS_VOICE || 'am_michael';
const REQUEST_TIMEOUT_MS = 60_000;
const MAX_TEXT_CHARS     = 1800;

function hashKey(text, voice) {
  return crypto.createHash('sha256').update(`${voice}::${text}`).digest('hex');
}

// Pronunciation normalization — force certain numeric tokens to be spoken
// digit-by-digit so the TTS model doesn't read them as quantities.
// Example: "911" → "nine one one", "9/11" → "nine eleven".
function normalizeForSpeech(input) {
  let s = input;
  s = s.replace(/\b911\b/g, 'nine one one');
  s = s.replace(/\b9\/11\b/g, 'nine eleven');
  return s;
}

// Health check — frontend uses this to decide whether to show the speaker UI
router.get('/health', async (_req, res) => {
  const url = process.env.TTS_SERVER_URL;
  if (!url) return res.status(503).json({ ok: false, reason: 'TTS not configured' });
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 3500);
    const r = await fetch(`${url.replace(/\/$/, '')}/health`, { signal: ctrl.signal });
    clearTimeout(t);
    if (!r.ok) return res.status(503).json({ ok: false, reason: `upstream ${r.status}` });
    return res.json({ ok: true, ...(await r.json()) });
  } catch (err) {
    return res.status(503).json({ ok: false, reason: err.name === 'AbortError' ? 'timeout' : err.message });
  }
});

// Synthesize or serve cached audio
router.post('/', async (req, res) => {
  const upstream = process.env.TTS_SERVER_URL;
  if (!upstream) return res.status(503).json({ error: 'TTS not configured' });

  const rawText = String(req.body?.text  || '').trim();
  const voice   = String(req.body?.voice || DEFAULT_VOICE);
  if (!rawText) return res.status(400).json({ error: 'text required' });
  if (rawText.length > MAX_TEXT_CHARS) return res.status(413).json({ error: `text exceeds ${MAX_TEXT_CHARS} chars` });

  const text = normalizeForSpeech(rawText);
  const key  = hashKey(text, voice);
  const file = path.join(CACHE_DIR, `${key}.wav`);

  if (fs.existsSync(file)) {
    res.set('Content-Type', 'audio/wav');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.set('X-TTS-Cache', 'hit');
    return fs.createReadStream(file).pipe(res);
  }

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
    const r = await fetch(`${upstream.replace(/\/$/, '')}/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice }),
      signal: ctrl.signal,
    });
    clearTimeout(t);

    if (!r.ok) {
      console.error('[tts] upstream', r.status);
      return res.status(502).json({ error: `upstream ${r.status}` });
    }

    const buf = Buffer.from(await r.arrayBuffer());
    const tmp = `${file}.tmp-${process.pid}-${Date.now()}`;
    fs.writeFileSync(tmp, buf);
    fs.renameSync(tmp, file);

    res.set('Content-Type', 'audio/wav');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.set('X-TTS-Cache', 'miss');
    return res.send(buf);
  } catch (err) {
    const timedOut = err?.name === 'AbortError';
    console.error('[tts]', err?.message);
    return res.status(timedOut ? 504 : 503).json({ error: timedOut ? 'TTS timed out' : 'TTS unavailable' });
  }
});

export default router;
