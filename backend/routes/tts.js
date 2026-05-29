// /api/tts — text → WAV. Two endpoints:
//   POST /api/tts          (legacy: body { text, voice }) → streamed audio/wav
//   GET  /api/tts?text=…   browser-friendly so <audio src="…"> can stream natively
// Cached on disk by SHA-256(voice::normalized_text). Cache MISS path streams
// the upstream Mac Studio TTS response straight to the client while tee'ing
// to disk, so playback starts as bytes arrive instead of waiting for the full
// WAV to be generated and downloaded.

import express from 'express';
import fs from 'node:fs';
import {
  CACHE_DIR,
  DEFAULT_VOICE,
  MAX_TEXT_CHARS,
  cachePath,
  generateAndCache,
  normalizeForSpeech,
} from '../lib/tts.js';

const router = express.Router();

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

// Core handler — used by both GET and POST entry points.
async function serveTts(rawText, voice, res) {
  if (!rawText) return res.status(400).json({ error: 'text required' });
  if (rawText.length > MAX_TEXT_CHARS) return res.status(413).json({ error: `text exceeds ${MAX_TEXT_CHARS} chars` });
  if (!process.env.TTS_SERVER_URL) return res.status(503).json({ error: 'TTS not configured' });

  const normalized = normalizeForSpeech(rawText);
  const file = cachePath(normalized, voice);

  // Cache HIT — stream the file with Range support so the browser can seek.
  if (fs.existsSync(file)) {
    res.set('Content-Type', 'audio/wav');
    res.set('Accept-Ranges', 'bytes');
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.set('X-TTS-Cache', 'hit');
    return res.sendFile(file, { dotfiles: 'deny' }, (err) => {
      if (err && !res.headersSent) res.status(500).end();
    });
  }

  // Cache MISS — stream upstream → client while tee'ing to disk via the lib.
  res.set('Content-Type', 'audio/wav');
  res.set('Cache-Control', 'public, max-age=31536000, immutable');
  res.set('X-TTS-Cache', 'miss');
  // Chunked transfer; no Content-Length until we have it. Browser handles this.
  let aborted = false;
  res.on('close', () => { aborted = true; });

  try {
    await generateAndCache(rawText, voice, (chunk) => {
      if (!aborted) res.write(chunk);
    });
    if (!aborted) res.end();
  } catch (err) {
    console.error('[tts]', err?.message);
    if (!res.headersSent) {
      const timedOut = err?.name === 'AbortError';
      res.status(timedOut ? 504 : 503).json({ error: timedOut ? 'TTS timed out' : 'TTS unavailable' });
    } else if (!aborted) {
      // Best we can do once headers are sent — close the connection.
      res.end();
    }
  }
}

router.get('/', async (req, res) => {
  const text  = String(req.query.text  || '').trim();
  const voice = String(req.query.voice || DEFAULT_VOICE);
  return serveTts(text, voice, res);
});

router.post('/', async (req, res) => {
  const text  = String(req.body?.text  || '').trim();
  const voice = String(req.body?.voice || DEFAULT_VOICE);
  return serveTts(text, voice, res);
});

export default router;
