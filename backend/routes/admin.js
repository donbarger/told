import { Router } from 'express';
import { requireAdmin, isAdminEmail } from '../lib/auth.js';
import { userQueries, gameQueries } from '../lib/db.js';

const router = Router();

router.use(requireAdmin);

router.get('/users', (_req, res) => {
  const rows = userQueries.listAll.all().map((u) => ({
    id: u.id,
    email: u.email,
    displayName: u.display_name,
    createdAt: u.created_at,
    lastSeenAt: u.last_seen_at,
    isBlocked: !!u.is_blocked,
    isAdmin: isAdminEmail(u.email),
    gamesStarted: u.games_started,
    gamesCompleted: u.games_completed,
  }));
  res.json({ users: rows });
});

router.get('/stats', (_req, res) => {
  const s = gameQueries.aggregateStats.get() || {};
  const started   = s.total_started   || 0;
  const completed = s.total_completed || 0;
  res.json({
    totalStarted: started,
    totalCompleted: completed,
    completionRate: started ? completed / started : 0,
    avgWealth:     s.avg_wealth     == null ? null : Math.round(s.avg_wealth),
    avgConnection: s.avg_connection == null ? null : Math.round(s.avg_connection),
    avgSoul:       s.avg_soul       == null ? null : Math.round(s.avg_soul),
    avgActs:       s.avg_acts       == null ? null : Math.round(s.avg_acts * 10) / 10,
  });
});

router.post('/users/:id/block', (req, res) => {
  const id = Number(req.params.id);
  const target = userQueries.findById.get(id);
  if (!target) return res.status(404).json({ error: 'User not found' });
  if (isAdminEmail(target.email)) return res.status(400).json({ error: 'Cannot block an admin' });
  userQueries.setBlocked.run(1, id);
  res.json({ ok: true });
});

router.post('/users/:id/unblock', (req, res) => {
  const id = Number(req.params.id);
  const target = userQueries.findById.get(id);
  if (!target) return res.status(404).json({ error: 'User not found' });
  userQueries.setBlocked.run(0, id);
  res.json({ ok: true });
});

export default router;
