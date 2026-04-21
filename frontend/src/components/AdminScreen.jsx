import React, { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '../hooks/useAuth.js';

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso.replace(' ', 'T') + 'Z');
  if (isNaN(d)) return iso;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function percent(v) {
  if (v == null || isNaN(v)) return '—';
  return `${Math.round(v * 100)}%`;
}

export default function AdminScreen({ onClose }) {
  const [users,   setUsers]   = useState(null);
  const [stats,   setStats]   = useState(null);
  const [error,   setError]   = useState(null);
  const [busyId,  setBusyId]  = useState(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [uRes, sRes] = await Promise.all([
        apiFetch('/api/admin/users'),
        apiFetch('/api/admin/stats'),
      ]);
      if (!uRes.ok) throw new Error(`Users ${uRes.status}`);
      if (!sRes.ok) throw new Error(`Stats ${sRes.status}`);
      setUsers((await uRes.json()).users);
      setStats(await sRes.json());
    } catch (e) {
      setError(e.message);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleBlock = async (u) => {
    setBusyId(u.id);
    try {
      const path = u.isBlocked ? `/api/admin/users/${u.id}/unblock` : `/api/admin/users/${u.id}/block`;
      const res = await apiFetch(path, { method: 'POST' });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        alert(d.error || `Request failed (${res.status})`);
      } else {
        await load();
      }
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="admin-screen">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">Administrator</p>
          <h1 className="admin-title">The Return — Admin</h1>
        </div>
        <button className="admin-close-btn" onClick={onClose}>Back</button>
      </header>

      {error && <div className="admin-error">{error}</div>}

      <section className="admin-stats">
        <div className="admin-stat"><span className="admin-stat-label">Players</span><span className="admin-stat-value">{users?.length ?? '—'}</span></div>
        <div className="admin-stat"><span className="admin-stat-label">Games started</span><span className="admin-stat-value">{stats?.totalStarted ?? '—'}</span></div>
        <div className="admin-stat"><span className="admin-stat-label">Games completed</span><span className="admin-stat-value">{stats?.totalCompleted ?? '—'}</span></div>
        <div className="admin-stat"><span className="admin-stat-label">Completion rate</span><span className="admin-stat-value">{stats ? percent(stats.completionRate) : '—'}</span></div>
        <div className="admin-stat"><span className="admin-stat-label">Avg acts</span><span className="admin-stat-value">{stats?.avgActs ?? '—'}</span></div>
      </section>

      <section className="admin-users">
        <h2 className="admin-subtitle">Users</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Last seen</th>
                <th>Started</th>
                <th>Completed</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((u) => (
                <tr key={u.id} className={u.isBlocked ? 'admin-row-blocked' : ''}>
                  <td>{u.displayName}{u.isAdmin && <span className="admin-chip">admin</span>}</td>
                  <td className="admin-mono">{u.email || '—'}</td>
                  <td>{formatDate(u.createdAt)}</td>
                  <td>{formatDate(u.lastSeenAt)}</td>
                  <td>{u.gamesStarted}</td>
                  <td>{u.gamesCompleted}</td>
                  <td>{u.isBlocked ? <span className="admin-status admin-status-blocked">Blocked</span> : <span className="admin-status">Active</span>}</td>
                  <td>
                    {u.isAdmin ? (
                      <span className="admin-hint">—</span>
                    ) : (
                      <button
                        className="admin-action-btn"
                        disabled={busyId === u.id}
                        onClick={() => toggleBlock(u)}
                      >
                        {busyId === u.id ? '…' : u.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users && users.length === 0 && (
                <tr><td colSpan={8} className="admin-empty">No users yet.</td></tr>
              )}
              {!users && !error && (
                <tr><td colSpan={8} className="admin-empty">Loading…</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="admin-note">
          Authentication is handled by Google, so there are no passwords to reset here. To cut off a
          user's access, block them — they'll see a friendly notice the next time they try to play.
        </p>
      </section>
    </div>
  );
}
