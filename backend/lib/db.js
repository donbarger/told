import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'users.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    email        TEXT UNIQUE,
    google_id    TEXT UNIQUE,
    display_name TEXT NOT NULL,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS games (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id        INTEGER NOT NULL,
    started_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at   DATETIME,
    final_wealth      INTEGER,
    final_connection  INTEGER,
    final_soul        INTEGER,
    act_count         INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Migrations for existing DBs.
function ensureColumn(table, column, ddl) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all();
  if (!cols.some((c) => c.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${ddl}`);
  }
}
ensureColumn('users', 'is_blocked',          'is_blocked INTEGER NOT NULL DEFAULT 0');
ensureColumn('users', 'last_seen_at',        'last_seen_at DATETIME');
ensureColumn('users', 'autoplay_narration',  'autoplay_narration INTEGER NOT NULL DEFAULT 1');
ensureColumn('games', 'story_id',            "story_id TEXT NOT NULL DEFAULT 'prodigal'");

export const userQueries = {
  findByGoogleId: db.prepare('SELECT * FROM users WHERE google_id = ?'),
  findByEmail:    db.prepare('SELECT * FROM users WHERE email = ?'),
  findById:       db.prepare('SELECT * FROM users WHERE id = ?'),
  create:         db.prepare('INSERT INTO users (email, google_id, display_name) VALUES (?, ?, ?)'),
  linkGoogle:     db.prepare('UPDATE users SET google_id = ? WHERE id = ?'),
  touchLastSeen:  db.prepare('UPDATE users SET last_seen_at = CURRENT_TIMESTAMP WHERE id = ?'),
  setBlocked:     db.prepare('UPDATE users SET is_blocked = ? WHERE id = ?'),
  setAutoplay:    db.prepare('UPDATE users SET autoplay_narration = ? WHERE id = ?'),
  listAll: db.prepare(`
    SELECT
      u.id, u.email, u.display_name, u.created_at, u.last_seen_at, u.is_blocked,
      (SELECT COUNT(*) FROM games g WHERE g.user_id = u.id) AS games_started,
      (SELECT COUNT(*) FROM games g WHERE g.user_id = u.id AND g.completed_at IS NOT NULL) AS games_completed
    FROM users u
    ORDER BY u.created_at DESC
  `),
};

export const gameQueries = {
  start: db.prepare('INSERT INTO games (user_id, story_id) VALUES (?, ?)'),
  complete: db.prepare(`
    UPDATE games
    SET completed_at = CURRENT_TIMESTAMP,
        final_wealth = ?, final_connection = ?, final_soul = ?, act_count = ?
    WHERE id = ? AND user_id = ?
  `),
  latestOpenByUser: db.prepare(`
    SELECT * FROM games
    WHERE user_id = ? AND completed_at IS NULL
    ORDER BY started_at DESC LIMIT 1
  `),
  aggregateStats: db.prepare(`
    SELECT
      COUNT(*)                                             AS total_started,
      SUM(CASE WHEN completed_at IS NOT NULL THEN 1 ELSE 0 END) AS total_completed,
      AVG(CASE WHEN completed_at IS NOT NULL THEN final_wealth     END) AS avg_wealth,
      AVG(CASE WHEN completed_at IS NOT NULL THEN final_connection END) AS avg_connection,
      AVG(CASE WHEN completed_at IS NOT NULL THEN final_soul       END) AS avg_soul,
      AVG(CASE WHEN completed_at IS NOT NULL THEN act_count        END) AS avg_acts
    FROM games
  `),
};

export default db;
