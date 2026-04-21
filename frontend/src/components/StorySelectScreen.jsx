import React from 'react';
import { STORIES } from '../stories/index.js';

function StoryCard({ story, onSelect }) {
  return (
    <button className="ss-card" onClick={() => onSelect(story)} aria-label={`Play ${story.title}`}>
      <div className="ss-card-header" style={{ background: story.gradient }}>
        <div className="ss-card-accent" style={{ color: story.accentColor }}>✦</div>
      </div>
      <div className="ss-card-body">
        <p className="ss-card-scripture">{story.scripture}</p>
        <h2 className="ss-card-title">{story.title}</h2>
        <p className="ss-card-subtitle">{story.subtitle}</p>
        <p className="ss-card-tagline">{story.tagline}</p>
        <div className="ss-card-stats">
          {Object.values(story.statConfig).map(sc => (
            <span key={sc.key} className="ss-card-stat-pill" style={{ '--stat-color': sc.icon === '✦' ? story.accentColor : undefined }}>
              <span className="ss-card-stat-icon">{sc.icon}</span>
              <span className="ss-card-stat-name">{sc.name}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="ss-card-footer">
        <span className="ss-card-cta">Begin Story</span>
        <span className="ss-card-verse">{story.verse}</span>
      </div>
    </button>
  );
}

export default function StorySelectScreen({ user, onSelect, onLogout }) {
  return (
    <div className="ss-root">
      <header className="ss-header">
        <div className="ss-header-inner">
          <div className="ss-header-brand">
            <span className="ss-emblem">✦</span>
            <div>
              <h1 className="ss-brand-title">Told</h1>
              <p className="ss-brand-sub">The parables, firsthand</p>
            </div>
          </div>
          {user && (
            <div className="ss-header-user">
              <span className="ss-username">{user.displayName}</span>
              <button className="ss-logout-btn" onClick={onLogout}>Sign out</button>
            </div>
          )}
        </div>
      </header>

      <div className="ss-intro">
        <p className="ss-intro-text">
          These are ancient stories. Jesus told them in dusty towns to ordinary people — fishermen, tax collectors, widows, rich men, the sick, the searching. The details were different. The situations were not. Choose a story. Step inside it.
        </p>
      </div>

      <div className="ss-grid">
        {STORIES.map(story => (
          <StoryCard key={story.id} story={story} onSelect={onSelect} />
        ))}
      </div>

      <footer className="ss-footer">
        <p>Swipe left or right to make choices. Every decision has a consequence.</p>
      </footer>
    </div>
  );
}
