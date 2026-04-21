import React, { useRef, useEffect } from 'react';
import StatBars from './StatBars.jsx';
import SceneIllustration from './SceneIllustration.jsx';
import NarrationButton from './NarrationButton.jsx';
import { AudioToggle, SettingsGear } from './HeaderControls.jsx';

export default function DesktopScene({ story, card, onChoice, loading, error, stats, actNum, journal, user, audioEnabled = true, onToggleAudio, onOpenSettings }) {
  const phase    = card?.phase || 'city';
  const phases   = story?.phases || [];
  const phaseMap = Object.fromEntries(phases.map(p => [p.key, p]));
  const info     = phaseMap[phase] || phases[1] || { label: '', ref: '', verse: '', watermark: '' };
  const phaseIdx = phases.findIndex(p => p.key === phase);

  const leftLabel  = card?.leftChoice?.label  || '';
  const rightLabel = card?.rightChoice?.label || '';
  const canChoose  = card && !loading;

  const contentRef = useRef(null);
  useEffect(() => {
    if (card) contentRef.current?.scrollTo({ top: 0 });
  }, [card]);

  // Normalize — journal entries may be plain strings (legacy) or rich objects.
  const normalized = journal.map((j, i) =>
    typeof j === 'string' ? { text: j, phase: undefined, act: i, direction: undefined } : j
  );
  const allEntries    = [...normalized].reverse();
  const featuredEntry = allEntries[0] || null;
  const historyEntries = allEntries.slice(1);

  const phaseLabel = (p) => phaseMap[p]?.label || phaseMap[p]?.short || '';
  const directionArrow = (d) => d === 'left' ? '←' : d === 'right' ? '→' : '';

  const phaseVisuals = story?.phaseVisuals || {};
  const phaseVisual  = phaseVisuals[phase] || { bg: 'linear-gradient(160deg, #1a1a1a 0%, #3a3a3a 100%)' };

  return (
    <div className="ds-root" data-phase={phase}>

      <header className="ds-header">
        <div className="ds-header-left">
          <span className="ds-title">{story?.title || 'The Story'}</span>
          <span className="ds-act">Act {actNum}</span>
        </div>
        <div className="ds-header-right">
          <StatBars stats={stats} statConfig={story?.statConfig} />
          {user && <span className="ds-header-user">{user.displayName}</span>}
          <div className="ds-header-controls">
            <AudioToggle enabled={audioEnabled} onToggle={onToggleAudio} />
            <SettingsGear onClick={onOpenSettings} />
          </div>
        </div>
      </header>

      <div className="ds-arc">
        {phases.map((stop, i) => {
          const state = i < phaseIdx ? 'past' : i === phaseIdx ? 'current' : 'future';
          return (
            <React.Fragment key={stop.key}>
              {i > 0 && (
                <div className={`ds-arc-line ${i <= phaseIdx ? 'ds-arc-line-lit' : ''}`} />
              )}
              <div className={`ds-arc-stop ds-arc-stop-${state}`}>
                <div className="ds-arc-pip" />
                <span className="ds-arc-label">{stop.short}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className="ds-body">

        <aside className="ds-journal">
          <h4 className="ds-journal-title">Your Journal</h4>
          <p className="ds-journal-caption">What you chose, scene by scene.</p>
          {featuredEntry ? (
            <>
              <div className="ds-journal-featured" key={featuredEntry.text}>
                <div className="ds-journal-featured-meta">
                  <span className="ds-journal-pill">Latest</span>
                  {featuredEntry.phase && (
                    <span className="ds-journal-phase">{phaseLabel(featuredEntry.phase)}</span>
                  )}
                </div>
                {featuredEntry.choiceLabel && (
                  <p className="ds-journal-choice">
                    <span className="ds-journal-arrow">{directionArrow(featuredEntry.direction)}</span>
                    <span>{featuredEntry.choiceLabel}</span>
                  </p>
                )}
                <p className="ds-journal-featured-text">{featuredEntry.text}</p>
              </div>
              {historyEntries.length > 0 && (
                <div className="ds-journal-history">
                  <span className="ds-journal-history-divider">Earlier in the story</span>
                  {historyEntries.map((entry, i) => (
                    <div key={i} className="ds-journal-history-entry">
                      <div className="ds-journal-history-meta">
                        {entry.phase && <span className="ds-journal-history-phase">{phaseLabel(entry.phase)}</span>}
                        {entry.direction && (
                          <span className="ds-journal-history-arrow">{directionArrow(entry.direction)}</span>
                        )}
                      </div>
                      {entry.choiceLabel && (
                        <p className="ds-journal-history-choice">{entry.choiceLabel}</p>
                      )}
                      <p className="ds-journal-history-text">{entry.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="ds-journal-empty">Your story is just beginning. Your choices will appear here.</p>
          )}
        </aside>

        <div className="ds-scene">

          <div className="ds-visual">
            <SceneIllustration sceneType={card?.sceneType} phase={phase} />
            <span className="ds-watermark">{info.watermark}</span>
            <div className="ds-visual-text">
              <span className="ds-phase-name">{info.label}</span>
              <span className="ds-phase-ref">{info.ref}</span>
            </div>
          </div>

          <div className="ds-content" ref={contentRef}>
            {error && (
              <div className="error-banner">
                <p>Could not reach the server. Check your connection.</p>
                <small>{error}</small>
              </div>
            )}

            {loading && !card && (
              <div className="ds-loading-full">
                <div className="loading-dots large"><span /><span /><span /></div>
                <p className="ds-loading-label">Writing your story…</p>
              </div>
            )}

            {card && (
              <>
                {card.characterName && (
                  <div className="ds-character-block">
                    <span className="ds-character-name">{card.characterName}</span>
                    {card.characterRole && (
                      <span className="ds-character-role"> — {card.characterRole}</span>
                    )}
                  </div>
                )}
                <p className="ds-narrative">{card.scene}</p>
                {audioEnabled && <NarrationButton text={card.scene} autoplay={true} />}
              </>
            )}

            {loading && card && (
              <div className="ds-loading-inline">
                <div className="loading-dots"><span /><span /><span /></div>
                <span>Loading next scene…</span>
              </div>
            )}
          </div>

          <div className={`ds-choices ${!canChoose ? 'ds-choices-disabled' : ''}`}>
            <button
              className="ds-btn ds-btn-left"
              onClick={() => canChoose && onChoice('left')}
              disabled={!canChoose}
            >
              <span className="ds-btn-arrow" aria-hidden="true">←</span>
              <span className="ds-btn-label">{leftLabel || ' '}</span>
            </button>
            <button
              className="ds-btn ds-btn-right"
              onClick={() => canChoose && onChoice('right')}
              disabled={!canChoose}
            >
              <span className="ds-btn-label">{rightLabel || ' '}</span>
              <span className="ds-btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>

        </div>

        <aside className="ds-aside">
          <div className="ds-aside-inner">
            <span className="ds-aside-ref">{story?.scripture || ''}</span>
            <h4 className="ds-aside-phase">{info.label}</h4>
            <blockquote className="ds-aside-verse">{info.verse}</blockquote>
            <span className="ds-aside-chapter">{info.ref}</span>
          </div>
        </aside>

      </div>
    </div>
  );
}
