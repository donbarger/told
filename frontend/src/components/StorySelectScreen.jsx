import React, { useMemo } from 'react';
import { STORIES, STORY_MAP } from '../stories/index.js';
import StoryArt from './StoryArt.jsx';

function StoryCard({ story, onSelect, played }) {
  return (
    <button className={`ss-card ${played ? 'ss-card--played' : ''}`} onClick={() => onSelect(story)} aria-label={`Play ${story.title}`}>
      <div className="ss-card-art">
        <StoryArt storyId={story.id} accentColor={story.accentColor} />
        <div className="ss-card-art-veil" />
        {played && (
          <span className="ss-card-played-badge" aria-label="You've played this">
            <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
              <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            Played
          </span>
        )}
      </div>
      <div className="ss-card-body">
        <p className="ss-card-scripture">{story.scripture}</p>
        <h2 className="ss-card-title">{story.title}</h2>
        <p className="ss-card-subtitle">{story.subtitle}</p>
        <p className="ss-card-tagline">{story.tagline}</p>
      </div>
      <div className="ss-card-footer">
        <span className="ss-card-cta">{played ? 'Play again' : 'Begin story'}</span>
        <svg className="ss-card-cta-arrow" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    </button>
  );
}

function HeroCard({ kind, story, onSelect }) {
  const labels = {
    start:   { kicker: 'Start here',                        cta: 'Begin the story' },
    resume:  { kicker: 'Pick up where you left off',        cta: 'Continue' },
    fresh:   { kicker: 'Just added',                         cta: 'Step inside' },
  };
  const { kicker, cta } = labels[kind] || labels.start;

  return (
    <section className="ss-hero">
      <div className="ss-hero-art-wrap">
        <StoryArt storyId={story.id} accentColor={story.accentColor} className="ss-hero-art" />
        <div className="ss-hero-veil" />
      </div>
      <div className="ss-hero-content">
        <span className="ss-hero-kicker">{kicker}</span>
        <p className="ss-hero-scripture">{story.scripture}</p>
        <h2 className="ss-hero-title">{story.title}</h2>
        <p className="ss-hero-subtitle">{story.subtitle}</p>
        <p className="ss-hero-tagline">{story.tagline}</p>
        <button className="ss-hero-cta" onClick={() => onSelect(story)}>
          {cta}
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default function StorySelectScreen({ user, onSelect, onLogout }) {
  // Pick the hero story + kind based on user history.
  const { hero, heroKind, remainingStories, playedSet } = useMemo(() => {
    const history = user?.history || { completed: [], inProgress: null };
    const completed = new Set(history.completed || []);

    // 1. In-progress story beats everything.
    if (history.inProgress && STORY_MAP[history.inProgress.storyId]) {
      const h = STORY_MAP[history.inProgress.storyId];
      return {
        hero: h,
        heroKind: 'resume',
        remainingStories: STORIES.filter((s) => s.id !== h.id),
        playedSet: completed,
      };
    }

    // 2. New user (no completions) → Prodigal (the natural starter).
    if (completed.size === 0) {
      const h = STORY_MAP.prodigal || STORIES[0];
      return {
        hero: h,
        heroKind: 'start',
        remainingStories: STORIES.filter((s) => s.id !== h.id),
        playedSet: completed,
      };
    }

    // 3. Otherwise surface an unplayed story (prefer the last one in the catalog = newest).
    const unplayed = [...STORIES].reverse().find((s) => !completed.has(s.id));
    if (unplayed) {
      return {
        hero: unplayed,
        heroKind: 'fresh',
        remainingStories: STORIES.filter((s) => s.id !== unplayed.id),
        playedSet: completed,
      };
    }

    // 4. All played — hero is the most recently completed (fall back to prodigal).
    const h = STORY_MAP[history.completed[history.completed.length - 1]] || STORIES[0];
    return {
      hero: h,
      heroKind: 'start',
      remainingStories: STORIES.filter((s) => s.id !== h.id),
      playedSet: completed,
    };
  }, [user]);

  return (
    <div className="ss-root">
      <header className="ss-header">
        <div className="ss-header-inner">
          <div className="ss-header-brand">
            <img
              src="/imb-innovation-logo-navy.png"
              alt="IMB Innovation"
              className="ss-brand-lockup"
            />
            <div className="ss-brand-text">
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

      {hero && <HeroCard kind={heroKind} story={hero} onSelect={onSelect} />}

      <div className="ss-section-head">
        <h3 className="ss-section-title">
          {heroKind === 'resume' ? 'Or try another story' : 'The rest of the collection'}
        </h3>
        <span className="ss-section-count">
          {playedSet.size} of {STORIES.length} played
        </span>
      </div>

      <div className="ss-grid">
        {remainingStories.map(story => (
          <StoryCard
            key={story.id}
            story={story}
            onSelect={onSelect}
            played={playedSet.has(story.id)}
          />
        ))}
      </div>

      <footer className="ss-footer">
        <p>Every decision changes the texture of your story.</p>
      </footer>
    </div>
  );
}
