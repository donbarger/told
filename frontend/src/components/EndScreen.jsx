import React, { useState, useEffect, useCallback } from 'react';
import SceneIllustration from './SceneIllustration.jsx';

export default function EndScreen({ story, stats, journal, onRestart, onChooseAnother }) {
  const [actionsVisible, setActionsVisible] = useState(false);
  const [shareState,     setShareState]     = useState('idle');

  useEffect(() => {
    const t = setTimeout(() => setActionsVisible(true), 3500);
    return () => clearTimeout(t);
  }, []);

  const handleShare = useCallback(async () => {
    const url  = window.location.origin;
    const text = `I just walked through "${story.title}" on Told — interactive parables Jesus told. ${story.verse || ''}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `Told — ${story.title}`, text, url });
        setShareState('shared');
      } catch { /* user cancelled */ }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setShareState('copied');
      setTimeout(() => setShareState('idle'), 2400);
    }
  }, [story]);

  if (!story) return null;

  const { getEnding, passage, passageRef, invitation } = story.endingConfig;
  const ending = getEnding(stats);
  const sc = story.statConfig;
  const phaseMap = Object.fromEntries((story.phases || []).map(p => [p.key, p]));

  return (
    <div className="es-root">

      <div className="es-hero">
        <SceneIllustration sceneType={ending.sceneType} phase="restored" />
        <div className="es-hero-veil" />
        <div className="es-hero-text">
          <span className="es-emblem" style={{ color: story.accentColor }}>✦</span>
          <h1 className="es-headline">{ending.headline}</h1>
          <p className="es-hero-body">{ending.body}</p>
        </div>
      </div>

      <div className="es-content">

        {/* Journal first — the mirror moment */}
        {journal.length > 0 && (() => {
          let lastPhase = null;
          return (
            <section className="es-journal-prominent">
              <div className="es-section-head">
                <span className="es-section-label">Your Story</span>
                <span className="es-section-ref">{journal.length} {journal.length === 1 ? 'moment' : 'moments'}</span>
              </div>
              <div className="es-journal-thread">
                {journal.map((raw, i) => {
                  const entry = typeof raw === 'string'
                    ? { text: raw, phase: undefined }
                    : raw;
                  const phaseLabel = entry.phase
                    ? (phaseMap[entry.phase]?.label || phaseMap[entry.phase]?.short)
                    : null;
                  const showHeader = phaseLabel && entry.phase !== lastPhase;
                  if (showHeader) lastPhase = entry.phase;
                  return (
                    <React.Fragment key={i}>
                      {showHeader && (
                        <span className="es-thread-phase">{phaseLabel}</span>
                      )}
                      <p className="es-thread-entry">{entry.text}</p>
                    </React.Fragment>
                  );
                })}
              </div>
            </section>
          );
        })()}

        <div className="es-stats">
          <div className="es-stat">
            <span className="es-stat-icon">{sc.stat1.icon}</span>
            <span className="es-stat-label">{sc.stat1.name}</span>
            <span className="es-stat-value">{stats.stat1}</span>
          </div>
          <div className="es-stat">
            <span className="es-stat-icon">{sc.stat2.icon}</span>
            <span className="es-stat-label">{sc.stat2.name}</span>
            <span className="es-stat-value">{stats.stat2}</span>
          </div>
          <div className="es-stat">
            <span className="es-stat-icon">{sc.stat3.icon}</span>
            <span className="es-stat-label">{sc.stat3.name}</span>
            <span className="es-stat-value">{stats.stat3}</span>
          </div>
        </div>

        <section className="es-bible">
          <div className="es-section-head">
            <span className="es-section-label">The Story Behind Your Story</span>
            <span className="es-section-ref">{passageRef}</span>
          </div>
          <div className="es-bible-scroll">
            {passage.map((p, i) => (
              <p key={i} className="es-bible-para">
                <span className="es-verse-ref">{p.ref}</span>
                {p.text}
              </p>
            ))}
          </div>
        </section>

        {story.verse && (
          <blockquote className="es-pull-quote">
            <p className="es-pull-quote-text">{story.verse}</p>
            <span className="es-pull-quote-ref">{story.verseRef}</span>
          </blockquote>
        )}

        <div className="es-invitation">
          <p className="es-invite-text">{invitation}</p>
        </div>

        <div className={`es-actions ${actionsVisible ? 'es-actions--visible' : ''}`}>
          <button className="start-btn" onClick={onChooseAnother}>Choose another story</button>
          <button className="es-other-btn" onClick={onRestart}>Play this one again</button>
        </div>

        <div className={`es-get-involved ${actionsVisible ? 'es-get-involved--visible' : ''}`}>
          <p className="es-get-involved-kicker">Keep going</p>
          <h3 className="es-get-involved-heading">Get involved with IMB</h3>
          <p className="es-get-involved-body">
            Told is a project of IMB Innovation — the same team working alongside missionaries carrying the gospel to unreached peoples. Learn more, pray, give, or go.
          </p>
          <div className="es-get-involved-actions">
            <a
              href="https://www.imb.org"
              target="_blank"
              rel="noopener"
              className="es-imb-btn"
            >
              Learn more at imb.org
            </a>
            <button className="es-share-btn" onClick={handleShare}>
              {shareState === 'copied' ? 'Link copied' : shareState === 'shared' ? 'Shared' : 'Share this story'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
