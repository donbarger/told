// Server-to-server API for the unified admin (Don, 2026-11-22). Same design as
// engage-lostness-v3/api/internal.mjs, biblepics/api/internal.mjs and checkmystory/api/routes/internal.js.
//
// The FaithBot admin (donbarger/faithbot-v3) lists Told in its Product switch and shows a summary
// fetched from 127.0.0.1:3002 on the same droplet. Four locks, every refusal a bare 404 so a refused
// caller cannot tell the route exists:
//   1. TOLD_INTERNAL_TOKEN must be set. Unset = the route does not exist (the default). Read when the
//      router is built, which server.js does after `dotenv/config` has loaded backend/.env.
//   2. The caller sends the same value in X-Internal-Token, compared in constant time.
//   3. Nothing that came through Caddy: it adds X-Forwarded-For to every proxied request, and FaithBot's
//      direct loopback call never carries one. A leaked token is useless from outside the droplet.
//   4. The TCP peer must be loopback. req.socket.remoteAddress, NOT req.ip: server.js sets
//      `trust proxy`, which rewrites req.ip from X-Forwarded-For. Defense in depth — lock 3 trusts the
//      absence of a header, this one trusts the kernel.
//
// It is mounted in server.js BEFORE optionalAuth and the /api rate limiter, so no sign-in guard blocks it
// and the admin's polling never spends a player's rate-limit budget. What it returns is aggregate only
// (lib/summary.js): no emails, names, user ids or anything a player typed.
import { Router } from 'express';
import crypto from 'node:crypto';
import { summary } from '../lib/summary.js';

const LOOPBACK = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);
const same = (a, b) => {
  const x = Buffer.from(String(a || '')), y = Buffer.from(String(b || ''));
  return x.length === y.length && x.length > 0 && crypto.timingSafeEqual(x, y);
};
const ms = (v) => (v == null || v === '' || !Number.isFinite(Date.parse(v)) ? null : Date.parse(v));

// Exported so the test can put a non-loopback peer in front of it; a test server can only ever be
// reached from loopback.
export function allowed(req, token) {
  if (!token) return false;
  if (req.headers['x-forwarded-for'] || req.headers['forwarded']) return false;
  if (!LOOPBACK.has(req.socket?.remoteAddress)) return false;
  return same(req.headers['x-internal-token'], token);
}

export default function internalRoutes({ token = (process.env.TOLD_INTERNAL_TOKEN || '').trim() } = {}) {
  const router = Router();
  router.get('/summary', (req, res) => {
    if (!allowed(req, token)) return res.status(404).end();
    res.set('Cache-Control', 'no-store');
    res.json({ app: 'told', ...summary({ since: ms(req.query.since), until: ms(req.query.until) }) });
  });
  return router;
}
