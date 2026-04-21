import React from 'react';
import SceneIllustration from './SceneIllustration.jsx';

export default function EndScreen({ story, stats, journal, onRestart, onChooseAnother }) {
  if (!story) return null;

  const { getEnding, passage, passageRef, invitation } = story.endingConfig;
  const ending = getEnding(stats);
  const sc = story.statConfig;

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

        <div className="es-two-col">

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

          <section className="es-journal">
            <div className="es-section-head">
              <span className="es-section-label">Your Journal</span>
              <span className="es-section-ref">{journal.length} {journal.length === 1 ? 'moment' : 'moments'}</span>
            </div>
            {journal.length > 0 ? (
              <div className="es-journal-scroll">
                {(() => {
                  const phaseMap = Object.fromEntries((story.phases || []).map(p => [p.key, p]));
                  let lastPhase = null;
                  return journal.map((raw, i) => {
                    const entry = typeof raw === 'string'
                      ? { text: raw, phase: undefined, direction: undefined }
                      : raw;
                    const phaseLabel = entry.phase ? (phaseMap[entry.phase]?.label || phaseMap[entry.phase]?.short) : null;
                    const showHeader = phaseLabel && entry.phase !== lastPhase;
                    if (showHeader) lastPhase = entry.phase;
                    const arrow = entry.direction === 'left' ? '←' : entry.direction === 'right' ? '→' : '';
                    return (
                      <React.Fragment key={i}>
                        {showHeader && (
                          <h4 className="es-jphase">{phaseLabel}</h4>
                        )}
                        <div className="es-jentry">
                          <span className="es-jentry-num">{i + 1}</span>
                          <div className="es-jentry-body">
                            {entry.choiceLabel && (
                              <p className="es-jentry-choice">
                                {arrow && <span className="es-jentry-arrow">{arrow}</span>}
                                <span>{entry.choiceLabel}</span>
                              </p>
                            )}
                            <p className="es-jentry-text">{entry.text}</p>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  });
                })()}
              </div>
            ) : (
              <p className="es-journal-empty">No entries recorded.</p>
            )}
          </section>

        </div>

        <div className="es-invitation">
          <p className="es-invite-text">{invitation}</p>
        </div>

        <div className="es-actions">
          <button className="start-btn" onClick={onRestart}>Play Again</button>
          <button className="es-other-btn" onClick={onChooseAnother}>Choose Another Story</button>
        </div>

      </div>
    </div>
  );
}
