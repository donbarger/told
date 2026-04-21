import React, { useEffect } from 'react';

export default function SettingsModal({ user, onClose, onLogout, onUpdatePrefs, onOpenAdmin }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const autoplay = !!user?.prefs?.autoplayNarration;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div
        className="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="settings-header">
          <h2>Settings</h2>
          <button className="settings-close" onClick={onClose} aria-label="Close settings">×</button>
        </header>

        <section className="settings-section">
          <p className="settings-label">Signed in as</p>
          <p className="settings-account-name">{user?.displayName}</p>
          <p className="settings-account-email">{user?.email}</p>
          {user?.isAdmin && <p className="settings-badge">Administrator</p>}
        </section>

        <section className="settings-section">
          <p className="settings-label">Narration</p>
          <label className="settings-row">
            <span>Play scene audio automatically</span>
            <input
              type="checkbox"
              checked={autoplay}
              onChange={(e) => onUpdatePrefs({ autoplayNarration: e.target.checked })}
            />
          </label>
          <p className="settings-hint">
            Narrated by a warm male voice (am_michael) tuned for this parable. When off,
            each scene shows a small play button you can tap yourself.
          </p>
        </section>

        <section className="settings-section">
          {user?.isAdmin && (
            <button className="settings-btn settings-btn--ghost" onClick={onOpenAdmin}>
              Open admin panel
            </button>
          )}
          <button className="settings-btn" onClick={onLogout}>Sign out</button>
        </section>
      </div>
    </div>
  );
}
