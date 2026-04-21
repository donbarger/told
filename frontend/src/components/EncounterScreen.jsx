import React, { useEffect, useRef } from 'react';
import NarrationButton from './NarrationButton.jsx';
import { AudioToggle, SettingsGear } from './HeaderControls.jsx';

/**
 * ENCOUNTER template
 *
 * For parables that happen in a single unfolding encounter:
 *  Samaritan, Zacchaeus, Rich Young Ruler, Woman at the Well.
 *
 * Design differs from Journey:
 *  - No phase strip, no journal sidebar, no stat bars visible during play.
 *  - Full-bleed scene reader: narration fills the column like a short story.
 *  - Choices appear as two clearly-labeled tap buttons beneath the text.
 *  - Red/teal accents on the choices (IMB palette) — no swipe gesture.
 *  - A quiet "scene N" counter in the corner replaces the mobile card deck.
 */
export default function EncounterScreen(props) {
  const {
    activeStory, currentCard, actNum, loading, error, makeChoice,
    audioEnabled, onToggleAudio, onOpenSettings,
  } = props;

  const contentRef = useRef(null);
  useEffect(() => {
    if (currentCard) contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentCard]);

  const leftLabel  = currentCard?.leftChoice?.label  || '';
  const rightLabel = currentCard?.rightChoice?.label || '';
  const canChoose  = currentCard && !loading;

  return (
    <div className="enc-root" data-phase={currentCard?.phase || ''}>
      {/* Minimal chrome */}
      <header className="enc-header">
        <div className="enc-header-left">
          <span className="enc-brand">{activeStory?.title || 'Encounter'}</span>
          <span className="enc-scene">Scene {actNum + 1}</span>
        </div>
        <div className="enc-header-right">
          <AudioToggle enabled={audioEnabled} onToggle={onToggleAudio} />
          <SettingsGear onClick={onOpenSettings} />
        </div>
      </header>

      {/* Reader column */}
      <main className="enc-reader" ref={contentRef}>
        {error && (
          <div className="enc-error">
            <p>Could not reach the server.</p>
            <small>{error}</small>
          </div>
        )}

        {loading && !currentCard && (
          <div className="enc-loading">
            <div className="loading-dots large"><span /><span /><span /></div>
            <p className="enc-loading-label">Writing the next beat…</p>
          </div>
        )}

        {currentCard && (
          <article className="enc-scene-article">
            {currentCard.characterName && (
              <p className="enc-character">
                <span className="enc-character-name">{currentCard.characterName}</span>
                {currentCard.characterRole && (
                  <span className="enc-character-role"> — {currentCard.characterRole}</span>
                )}
              </p>
            )}

            <p className="enc-prose">{currentCard.scene}</p>

            {audioEnabled && <NarrationButton text={currentCard.scene} autoplay={true} />}

            {loading && (
              <div className="enc-loading-inline">
                <div className="loading-dots"><span /><span /><span /></div>
                <span>Writing the next beat…</span>
              </div>
            )}
          </article>
        )}
      </main>

      {/* Choices — bottom-anchored */}
      {currentCard && (
        <div className={`enc-choices ${canChoose ? '' : 'enc-choices--disabled'}`}>
          <button
            className="enc-btn enc-btn-left"
            onClick={() => canChoose && makeChoice('left')}
            disabled={!canChoose}
          >
            <span className="enc-btn-arrow" aria-hidden="true">←</span>
            <span className="enc-btn-text">{leftLabel}</span>
          </button>
          <button
            className="enc-btn enc-btn-right"
            onClick={() => canChoose && makeChoice('right')}
            disabled={!canChoose}
          >
            <span className="enc-btn-text">{rightLabel}</span>
            <span className="enc-btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
