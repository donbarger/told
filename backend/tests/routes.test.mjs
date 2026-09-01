// Routes smoke: boot the real server and call every public surface.
//
// Told had no tests. This is the cheap insurance against the failure that actually happens in these
// apps -- a handler that throws on its first line. engage-lostness-v3 shipped exactly that and was
// 500 for every signed-in user for 55 minutes, while 42 tests passed over it, because not one had
// ever made an HTTP request.
//
// Free and deterministic: no OPENROUTER_API_KEY and no TTS_SERVER_URL, so nothing here can reach a
// paid model or the narration server. The only route that calls OpenRouter is POST /api/game/next,
// and it sits behind requireAuth -- an unauthenticated suite cannot reach it even by accident.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const BACKEND = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8895;
const base = `http://127.0.0.1:${PORT}`;
let child, TMP;

before(async () => {
  TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'told-routes-'));
  child = spawn(process.execPath, ['server.js'], {
    cwd: BACKEND,
    env: {
      ...process.env,
      PORT: String(PORT),
      // Set EMPTY, not deleted. server.js loads dotenv, and dotenv fills in any key that is absent
      // from process.env -- so deleting these lets a developer's backend/.env put them straight back
      // and the suite starts calling the real narration server and the real model. An empty string
      // is still "present", so dotenv leaves it alone, and every consumer treats it as unset.
      // CI has no .env, so this only shows up locally: precisely the way a suite passes in one place
      // and behaves differently in the other.
      OPENROUTER_API_KEY: '',
      TTS_SERVER_URL: '',
      TOLD_DB_PATH: path.join(TMP, 'test.db'),   // schema self-creates; never the dev database
      // Required, or passport-oauth2 throws at module scope before the server listens. Building the
      // strategy makes no network call, so a dummy is correct.
      GOOGLE_CLIENT_ID: 'ci-not-a-real-client',
      GOOGLE_CLIENT_SECRET: 'ci-not-a-real-secret',
      JWT_SECRET: 'ci-only-not-a-real-secret-0000000000',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const deadline = Date.now() + 20000;
  for (;;) {
    try { if ((await fetch(`${base}/health`)).ok) return; } catch { /* not up yet */ }
    if (Date.now() > deadline) throw new Error('server did not start');
    await new Promise((r) => setTimeout(r, 200));
  }
});
after(async () => {
  if (child && child.exitCode === null) {
    const gone = new Promise((r) => child.once('exit', r));
    child.kill('SIGKILL');
    await gone;
  }
  if (TMP) fs.rmSync(TMP, { recursive: true, force: true });
});

const get = (p) => fetch(base + p);

test('every public GET responds without throwing', async () => {
  // The narration routes are absent from this list on purpose: their CORRECT answer with
  // TTS_SERVER_URL unset is 503, which a blanket "< 500" check would read as a crash. They get their
  // own test below, which asserts the 503 is the deliberate one and not an upstream timeout.
  for (const p of ['/health', '/api/auth/me', '/api/tts/?text=']) {
    const r = await get(p);
    assert.ok(r.status < 500, `${p} returned ${r.status} — a 5xx means the handler threw`);
  }
});

test('/health answers', async () => {
  const r = await get('/health');
  assert.equal(r.status, 200);
  assert.equal((await r.json()).ok, true);
});

// ── The one that matters most ──────────────────────────────────────────────────────────────────
test('every guarded API router refuses anonymous callers', async () => {
  // The mount list is READ FROM server.js rather than hardcoded, so a router added later is covered
  // the day it is mounted, with nobody remembering to come back here.
  //
  // Asserting 401 specifically is what makes this work: the guards are router.use(), which runs
  // BEFORE route matching, so a guarded router answers 401 even for a path it does not define. An
  // unguarded one falls through and answers 404 (or worse, 200). A 404 here means no guard ran.
  const src = fs.readFileSync(path.join(BACKEND, 'server.js'), 'utf8');
  const mounts = [...src.matchAll(/app\.use\(\s*'(\/api\/[a-z-]+)'/g)].map((m) => m[1]);
  assert.ok(mounts.length >= 4, `expected to find the router mounts in server.js, found ${mounts.length}`);

  // Public by design:
  //   /api/auth — the sign-in entry point; /me and /me/prefs guard themselves individually
  //   /api/tts  — deliberately unauthenticated today. That is a decision worth revisiting rather
  //               than a bug in this test; see the issue filed against this repo. Listed here so the
  //               exemption is explicit and someone has to delete a line to change it.
  const PUBLIC = new Set(['/api/auth', '/api/tts']);

  const guarded = mounts.filter((p) => !PUBLIC.has(p));
  assert.ok(guarded.length >= 2, 'expected /api/game and /api/admin to be in the guarded set');
  for (const m of guarded) {
    const r = await get(m);
    assert.equal(r.status, 401,
      `${m} answered ${r.status} to an anonymous caller. 401 is the guard refusing; `
      + '404 or 200 means no guard ran and the router is mounted without requireAuth/requireAdmin.');
    assert.equal((await r.json()).error, 'Not authenticated');
  }
});

test('the admin surface is not merely logged-in, it is admin-only', async () => {
  // requireAdmin, not requireAuth. The distinction is the whole point of the router: these routes
  // block and unblock other people's accounts.
  const src = fs.readFileSync(path.join(BACKEND, 'routes/admin.js'), 'utf8');
  assert.match(src, /router\.use\(\s*requireAdmin\s*\)/,
    'routes/admin.js no longer guards the whole router with requireAdmin');
});

test('narration is refused, not attempted, when it is not configured', async () => {
  // With TTS_SERVER_URL unset these must fail closed and locally. If either ever tried the network
  // anyway, CI would hang rather than fail, which is the worse outcome.
  assert.equal((await get('/api/tts/health')).status, 503);
  const r = await get('/api/tts/?text=hello%20there');
  assert.equal(r.status, 503);
  assert.equal((await r.json()).error, 'TTS not configured');
});

test('narration rejects empty and oversized text before doing any work', async () => {
  assert.equal((await get('/api/tts/?text=')).status, 400);
  const long = 'a'.repeat(5000);
  const r = await fetch(`${base}/api/tts/`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: long }),
  });
  assert.equal(r.status, 413, 'oversized narration text must be refused, not forwarded upstream');
});
