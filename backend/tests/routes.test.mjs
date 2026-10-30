// Routes smoke: boot the real server and call every public surface.
//
// Told had no tests. This is the cheap insurance against the failure that actually happens in these
// apps -- a handler that throws on its first line. engage-lostness-v3 shipped exactly that and was
// 500 for every signed-in user for 55 minutes, while 42 tests passed over it, because not one had
// ever made an HTTP request.
//
// Free and deterministic: ANTHROPIC_BASE_URL points at a fake Anthropic server inside this file and
// TTS_SERVER_URL is empty, so nothing here can reach a paid model or the narration server. The only
// route that calls Claude is POST /api/game/next. It sits behind requireAuth, and the tests that reach
// it sign their own token for a user they insert into the scratch database.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { spawn } from 'node:child_process';
import Database from 'better-sqlite3';
import jwt from 'jsonwebtoken';

const BACKEND = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8895;
const base = `http://127.0.0.1:${PORT}`;
const JWT_SECRET = 'ci-only-not-a-real-secret-0000000000';
let child, TMP;

// ── Fake Anthropic API ─────────────────────────────────────────────────────────────────────────
// Stands in for api.anthropic.com so the real SDK call in routes/game.js runs end to end. It records
// every request body, and answers with whatever `fake.reply` holds when the request lands.
const fake = { requests: [], reply: null, server: null, url: '' };
const CARD = {
  scene: 'You stand at the edge of the field.', sceneType: 'test', characterName: null, characterRole: null,
  leftChoice:  { label: 'Walk home', deltas: { stat1: 5, stat2: 0, stat3: -5 } },
  rightChoice: { label: 'Stay put',  deltas: { stat1: -5, stat2: 5, stat3: 0 } },
  journal: 'I almost turned back.',
};
// Thinking first, then text: the order Haiku 5.5 returns them in. The route must keep only the text.
const message = (stop_reason, text) => ({
  id: 'msg_fake', type: 'message', role: 'assistant', model: 'claude-haiku-5-5',
  content: [
    { type: 'thinking', thinking: 'THINKING-MUST-NOT-LEAK {"not":"the card"}', signature: 'sig' },
    ...(text === null ? [] : [{ type: 'text', text }]),
  ],
  stop_reason, stop_sequence: null, usage: { input_tokens: 10, output_tokens: 20 },
});

before(async () => {
  fake.server = http.createServer((req, res) => {
    let raw = '';
    req.on('data', (c) => { raw += c; });
    req.on('end', () => {
      fake.requests.push({ method: req.method, url: req.url, headers: req.headers, body: JSON.parse(raw || '{}') });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(fake.reply));
    });
  });
  await new Promise((r) => fake.server.listen(0, '127.0.0.1', r));
  fake.url = `http://127.0.0.1:${fake.server.address().port}`;

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
      //
      // The Anthropic key is a dummy and the base URL is the fake above, set explicitly so a
      // developer's .env cannot point the suite at the real API.
      ANTHROPIC_API_KEY: 'test-not-a-real-key',
      ANTHROPIC_BASE_URL: fake.url,
      TTS_SERVER_URL: '',
      TOLD_DB_PATH: path.join(TMP, 'test.db'),   // schema self-creates; never the dev database
      // Required, or passport-oauth2 throws at module scope before the server listens. Building the
      // strategy makes no network call, so a dummy is correct.
      GOOGLE_CLIENT_ID: 'ci-not-a-real-client',
      GOOGLE_CLIENT_SECRET: 'ci-not-a-real-secret',
      JWT_SECRET,
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
  if (fake.server) await new Promise((r) => fake.server.close(r));
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

// ── Scene generation: the one route that spends money ──────────────────────────────────────────
// A signed-in player, made directly in the scratch database. The server has already created the
// schema by the time the suite runs (/health answered).
let token;
function signedIn() {
  if (token) return token;
  const db = new Database(path.join(TMP, 'test.db'));
  const id = db.prepare("INSERT INTO users (email, display_name) VALUES ('player@example.test', 'Player')").run().lastInsertRowid;
  db.close();
  token = jwt.sign({ sub: Number(id) }, JWT_SECRET, { expiresIn: '5m' });
  return token;
}
const nextCard = () => fetch(`${base}/api/game/next`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${signedIn()}` },
  body: JSON.stringify({ storyId: 'prodigal', phase: 'departure', stats: { stat1: 50, stat2: 50, stat3: 50 }, actNum: 1 }),
});

test('a scene card comes from Anthropic directly, with the request Haiku 5.5 requires', async () => {
  fake.requests.length = 0;
  fake.reply = message('end_turn', JSON.stringify(CARD));
  const r = await nextCard();
  assert.equal(r.status, 200);
  // Only the text block became the card; the thinking block was dropped.
  assert.deepEqual(await r.json(), CARD);

  assert.equal(fake.requests.length, 1, 'exactly one model call, no retry');
  const { url, headers, body } = fake.requests[0];
  assert.equal(url, '/v1/messages');
  // SDK 1.x sends the key as a Bearer token; older SDKs used x-api-key. Either proves it was sent.
  assert.ok(headers.authorization === 'Bearer test-not-a-real-key' || headers['x-api-key'] === 'test-not-a-real-key',
    'the configured ANTHROPIC_API_KEY must reach the API');
  assert.equal(body.model, 'claude-haiku-5-5');
  assert.deepEqual(body.output_config, { effort: 'low' }, 'effort must be explicit; Haiku 5.5 defaults to medium');
  assert.equal(body.max_tokens, 16000, 'thinking counts against max_tokens, so the cap needs headroom');
  // Each of these is a 400 on the current models / API version.
  for (const k of ['temperature', 'top_p', 'top_k', 'fallbacks', 'thinking', 'tool_choice']) {
    assert.ok(!(k in body), `request must not carry ${k}`);
  }
  assert.ok(!String(headers['anthropic-beta'] || '').includes('fallback'), 'Haiku 5.5 has no server-side fallback');
  assert.equal(typeof body.system, 'string');
  assert.ok(body.system.length > 0, 'the story prompt goes in system');
  assert.deepEqual(body.messages.map((m) => m.role), ['user'], 'no assistant prefill');
});

test('a refusal is an error, never a card', async () => {
  fake.reply = message('refusal', null);
  const r = await nextCard();
  assert.equal(r.status, 500);
  assert.match((await r.json()).error, /refus/);
});

test('a reply cut off at max_tokens is an error, not half a card', async () => {
  fake.reply = message('max_tokens', '{"scene": "You stand at the');
  const r = await nextCard();
  assert.equal(r.status, 500);
  assert.match((await r.json()).error, /max_tokens/);
});
