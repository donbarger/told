// Aggregate summary for the unified FaithBot admin (Don, 2026-11-22). See routes/internal.js.
//
// SELECTS NO EMAIL, NAME, USER ID OR GOOGLE ID. Only counts, which parable was played (story_id is a
// fixed catalogue key such as 'prodigal', not anything a player typed), completion, and the average
// ending stats. Told stores no scene text and records no AI cost, so there is no `spend`.
import db from './db.js';

// users.created_at and games.started_at are SQLite CURRENT_TIMESTAMP text: 'YYYY-MM-DD HH:MM:SS', UTC.
const iso = (ms) => new Date(ms).toISOString().replace('T', ' ').slice(0, 19);
const round1 = (v) => (v == null ? null : Math.round(v * 10) / 10);

export function summary({ since = null, until = null } = {}) {
  const range = (col) => {
    const w = [], p = [];
    if (since != null) { w.push(`${col} >= ?`); p.push(iso(since)); }
    if (until != null) { w.push(`${col} < ?`); p.push(iso(until)); }
    return { where: w.length ? 'WHERE ' + w.join(' AND ') : '', and: w.length ? 'AND ' + w.join(' AND ') : '', p };
  };
  const g = range('started_at');
  const u = range('created_at');
  const one = (sql, p) => db.prepare(sql).get(...p);

  const started = one(`SELECT COUNT(*) n FROM games ${g.where}`, g.p).n;
  const completed = one(`SELECT COUNT(*) n FROM games WHERE completed_at IS NOT NULL ${g.and}`, g.p).n;
  const avg = one(`SELECT AVG(final_wealth) wealth, AVG(final_connection) connection, AVG(final_soul) soul,
    AVG(act_count) acts FROM games WHERE completed_at IS NOT NULL ${g.and}`, g.p);

  return {
    usersTotal: db.prepare('SELECT COUNT(*) n FROM users').get().n,
    newUsers: one(`SELECT COUNT(*) n FROM users ${u.where}`, u.p).n,
    activePlayers: one(`SELECT COUNT(DISTINCT user_id) n FROM games ${g.where}`, g.p).n,
    gamesStarted: started,
    gamesCompleted: completed,
    completionRate: started ? Math.round((completed / started) * 1000) / 1000 : null,
    avgFinal: { wealth: round1(avg.wealth), connection: round1(avg.connection), soul: round1(avg.soul), acts: round1(avg.acts) },
    byStory: db.prepare(`SELECT story_id story, COUNT(*) started,
      SUM(CASE WHEN completed_at IS NOT NULL THEN 1 ELSE 0 END) completed
      FROM games ${g.where} GROUP BY story_id ORDER BY started DESC LIMIT 10`).all(...g.p),
    last7: db.prepare(`SELECT substr(started_at, 1, 10) d, COUNT(*) c FROM games WHERE started_at >= ?
      GROUP BY d ORDER BY d`).all(iso(Date.now() - 7 * 864e5)),
  };
}
