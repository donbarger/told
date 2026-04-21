import jwt from 'jsonwebtoken';
import { userQueries } from './db.js';

const JWT_SECRET  = process.env.JWT_SECRET || 'prodigal-dev-secret-change-in-prod';
const JWT_EXPIRES = '30d';

const ADMIN_EMAILS = new Set(
  (process.env.ADMIN_EMAILS || 'dbarger@imb.org,donbarger@gmail.com')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
);

export function isAdminEmail(email) {
  return !!email && ADMIN_EMAILS.has(email.toLowerCase());
}

export function signToken(userId) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

// Attaches req.userId when a valid Bearer token is present; otherwise skips silently.
export function optionalAuth(req, _res, next) {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    try {
      const payload = verifyToken(header.slice(7));
      req.userId = payload.sub;
    } catch { /* ignore invalid/expired token */ }
  }
  next();
}

export function requireAuth(req, res, next) {
  if (!req.userId) return res.status(401).json({ error: 'Not authenticated' });
  const user = userQueries.findById.get(req.userId);
  if (!user) return res.status(401).json({ error: 'Not authenticated' });
  if (user.is_blocked) return res.status(403).json({ error: 'Account blocked' });
  req.user = user;
  next();
}

export function requireAdmin(req, res, next) {
  if (!req.userId) return res.status(401).json({ error: 'Not authenticated' });
  const user = userQueries.findById.get(req.userId);
  if (!user || !isAdminEmail(user.email)) return res.status(403).json({ error: 'Admin only' });
  req.user = user;
  next();
}
