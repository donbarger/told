// The server-to-server summary the unified FaithBot admin reads (routes/internal.js, 2026-11-22).
//
// It must answer ONLY a direct loopback call carrying the shared token — never anything that came
// through Caddy, never a non-loopback TCP peer — and it must return aggregates only: no emails, names,
// user ids or Google ids. The seed below plants each of those so a leak has something to leak.
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'told-internal-'));
process.env.TOLD_DB_PATH = path.join(TMP, 'test.db');   // never the dev database

const { default: db } = await import('../lib/db.js');
const { default: internalRoutes, allowed } = await import('../routes/internal.js');
const express = (await import('express')).default;

const addUser = (email, name, gid) => db.prepare('INSERT INTO users (email, google_id, display_name) VALUES (?,?,?)')
  .run(email, gid, name).lastInsertRowid;
const alice = addUser('alice.private@example.test', 'Alice Privateperson', 'google-sub-SECRET-1');
const bob = addUser('bob.private@example.test', 'Bob Privateperson', 'google-sub-SECRET-2');
const game = (uid, story, done) => db.prepare(`INSERT INTO games (user_id, story_id, completed_at, final_wealth,
  final_connection, final_soul, act_count) VALUES (?,?,?,?,?,?,?)`)
  .run(uid, story, done ? new Date().toISOString().replace('T', ' ').slice(0, 19) : null,
    done ? 40 : null, done ? 60 : null, done ? 80 : null, done ? 5 : null);
game(alice, 'prodigal', true);
game(alice, 'samaritan', false);
game(bob, 'prodigal', true);

const TOKEN = 'told-internal-test-token-0123456789';
const app = express(); app.use('/api/internal', internalRoutes({ token: TOKEN }));
const off = express(); off.use('/api/internal', internalRoutes({ token: '' }));
const listen = (a) => new Promise((r) => { const s = a.listen(0, '127.0.0.1', () => r(s)); });
const [srv, srvOff] = [await listen(app), await listen(off)];
after(() => { srv.close(); srvOff.close(); db.close(); fs.rmSync(TMP, { recursive: true, force: true }); });

const get = (s, p, headers = {}) => new Promise((resolve, reject) => {
  const r = http.request({ host: '127.0.0.1', port: s.address().port, path: p, headers }, (res) => {
    let b = ''; res.on('data', (c) => { b += c; });
    res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: b, json: (() => { try { return JSON.parse(b); } catch { return null; } })() }));
  });
  r.on('error', reject); r.end();
});
const H = { 'X-Internal-Token': TOKEN };

test('answers a direct loopback call with the token', async () => {
  const r = await get(srv, '/api/internal/summary', H);
  assert.equal(r.status, 200);
  assert.equal(r.headers['cache-control'], 'no-store');
  assert.equal(r.json.app, 'told');
  assert.equal(r.json.usersTotal, 2);
  assert.equal(r.json.activePlayers, 2);
  assert.equal(r.json.gamesStarted, 3);
  assert.equal(r.json.gamesCompleted, 2);
  assert.deepEqual(r.json.avgFinal, { wealth: 40, connection: 60, soul: 80, acts: 5 });
  assert.deepEqual(r.json.byStory[0], { story: 'prodigal', started: 2, completed: 2 });
  assert.ok(Array.isArray(r.json.last7));
  assert.equal(r.json.last7.reduce((a, x) => a + x.c, 0), 3);
  assert.match(r.json.last7[0].d, /^\d{4}-\d{2}-\d{2}$/);
});

test('aggregates only: no emails, names, user ids or Google ids', async () => {
  const { body } = await get(srv, '/api/internal/summary', H);
  for (const leak of ['@', 'alice', 'Alice', 'bob', 'Privateperson', 'SECRET', 'google', 'email', 'display_name', 'user_id'])
    assert.ok(!body.includes(leak), `leaked: ${leak}`);
});

test('refuses without the token, with a wrong one, and anything that came through Caddy', async () => {
  assert.equal((await get(srv, '/api/internal/summary')).status, 404);
  assert.equal((await get(srv, '/api/internal/summary', { 'X-Internal-Token': 'nope' })).status, 404);
  assert.equal((await get(srv, '/api/internal/summary', { ...H, 'X-Forwarded-For': '203.0.113.9' })).status, 404,
    'a request proxied from the internet carries X-Forwarded-For and is refused even with the token');
  assert.equal((await get(srv, '/api/internal/summary', { ...H, Forwarded: 'for=203.0.113.9' })).status, 404);
});

test('refuses a non-loopback TCP peer even with the token and no proxy headers', () => {
  // A test server is only reachable from loopback, so the peer is faked here. remoteAddress is what
  // the kernel reports; req.ip would have been rewritten by `trust proxy`.
  const req = (addr) => ({ headers: { 'x-internal-token': TOKEN }, socket: { remoteAddress: addr } });
  for (const a of ['127.0.0.1', '::1', '::ffff:127.0.0.1']) assert.equal(allowed(req(a), TOKEN), true, a);
  for (const a of ['203.0.113.9', '10.0.0.5', '::ffff:203.0.113.9', undefined]) assert.equal(allowed(req(a), TOKEN), false, String(a));
});

test('with no token configured the route does not exist', async () => {
  assert.equal((await get(srvOff, '/api/internal/summary', H)).status, 404);
  assert.equal((await get(srvOff, '/api/internal/summary', { 'X-Internal-Token': '' })).status, 404);
});

test('a date range narrows the counts', async () => {
  const future = encodeURIComponent(new Date(Date.now() + 864e5).toISOString());
  const r = await get(srv, `/api/internal/summary?since=${future}`, H);
  assert.equal(r.json.gamesStarted, 0);
  assert.equal(r.json.newUsers, 0);
  assert.equal(r.json.completionRate, null);
  assert.equal(r.json.usersTotal, 2, 'usersTotal is all-time on purpose');
  const past = encodeURIComponent(new Date(Date.now() - 864e5).toISOString());
  assert.equal((await get(srv, `/api/internal/summary?until=${past}`, H)).json.gamesStarted, 0);
});
