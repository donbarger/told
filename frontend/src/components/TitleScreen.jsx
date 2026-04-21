import React from 'react';
import { AudioToggle, SettingsGear } from './HeaderControls.jsx';

export default function TitleScreen({ story, onStart, onBack, user, onOpenSettings, audioEnabled, onToggleAudio }) {
  if (!story) return null;

  return (
    <div className="title-screen" style={{ '--story-accent': story.accentColor }}>
      <div className="title-floating-controls">
        <AudioToggle enabled={audioEnabled} onToggle={onToggleAudio} />
        <SettingsGear onClick={onOpenSettings} />
      </div>

      <div className="title-left">
        <p className="title-scripture-label">{story.scripture}</p>
        {story.phases.slice(0, 3).map((phase, i) => (
          <p key={i} className="title-scripture-text" style={{ marginTop: i > 0 ? '1rem' : undefined }}>
            <em>{phase.verse}</em>
            <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.5, marginTop: '0.25rem' }}>{phase.ref}</span>
          </p>
        ))}
      </div>

      <div className="title-right">
        <div className="title-content">
          <div className="title-emblem" style={{ color: story.accentColor }}>✦</div>
          <h1 className="title-main">{story.title}</h1>
          <p className="title-sub">{story.subtitle}</p>

          <div className="title-verse">
            <em>{story.verse}</em>
            <span className="verse-ref">{story.verseRef}</span>
          </div>

          <div className="title-stat-preview">
            {Object.values(story.statConfig).map(sc => (
              <div key={sc.key} className="title-stat-item">
                <span className="title-stat-icon">{sc.icon}</span>
                <span className="title-stat-name">{sc.name}</span>
              </div>
            ))}
          </div>

          <button className="start-btn" onClick={onStart}>
            Begin the Story
          </button>

          <button className="title-back-btn" onClick={onBack}>
            ← Choose a different story
          </button>

          {user && (
            <div className="title-user">
              <span className="title-user-name">Welcome, {user.displayName}</span>
            </div>
          )}

          <p className="title-note">Swipe the cards left or right to make choices.<br />Every decision has a consequence.</p>
        </div>
      </div>

      <div className="title-road" aria-hidden="true" />
    </div>
  );
}
