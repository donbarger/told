import React, { useEffect, useRef } from 'react';
import NarrationButton from './NarrationButton.jsx';
import { AudioToggle, SettingsGear } from './HeaderControls.jsx';

/**
 * WITNESS template
 *
 * For parables where the player is a watcher, not an actor:
 *  The Widow's Two Coins, The Sower.
 *
 * Design philosophy:
 *  - You are in the crowd. You notice things. You don't "act" — you reflect.
 *  - No stat bars. No phase chrome. No swipe. Maximum reading calm.
 *  - Choices are reframed as "what will you take with you?" reflection prompts,
 *    not action decisions — same underlying data, softer language.
 *  - A "Notebook" drawer accumulates your reflections.
 */
export default function WitnessScreen(props) {
  const {
    activeStory, currentCard, actNum, journal, loading, error, makeChoice,
    audioEnabled, onToggleAudio, onOpenSettings,
  } = props;

  const contentRef = useRef(null);
  useEffect(() => {
    if (currentCard) contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentCard]);

  const leftLabel  = currentCard?.leftChoice?.label  || '';
  const rightLabel = currentCard?.rightChoice?.label || '';
  const canChoose  = currentCard && !loading;

  const latestNote = journal[journal.length - 1];
  const noteText = latestNote
    ? (typeof latestNote === 'string' ? latestNote : latestNote.text)
    : null;

  return (
    <div className="wit-root">
      <header className="wit-header">
        <div className="wit-header-left">
          <span className="wit-brand">{activeStory?.title || 'Witness'}</span>
          {activeStory?.scripture && (
            <span className="wit-scripture">{activeStory.scripture}</span>
          )}
        </div>
        <div className="wit-header-right">
          <AudioToggle enabled={audioEnabled} onToggle={onToggleAudio} />
          <SettingsGear onClick={onOpenSettings} />
        </div>
      </header>

      <main className="wit-main" ref={contentRef}>
        {error && (
          <div className="enc-error">
            <p>Could not reach the server.</p>
            <small>{error}</small>
          </div>
        )}

        {loading && !currentCard && (
          <div className="wit-loading">
            <div className="loading-dots large"><span /><span /><span /></div>
            <p className="wit-loading-label">Watching quietly…</p>
          </div>
        )}

        {currentCard && (
          <article className="wit-article">
            <p className="wit-kicker">You are watching</p>

            {currentCard.characterName && (
              <p className="wit-character">
                <span className="wit-character-name">{currentCard.characterName}</span>
                {currentCard.characterRole && (
                  <span className="wit-character-role"> — {currentCard.characterRole}</span>
                )}
              </p>
            )}

            <p className="wit-prose">{currentCard.scene}</p>

            {audioEnabled && <NarrationButton text={currentCard.scene} autoplay={true} />}

            {loading && (
              <div className="wit-loading-inline">
                <div className="loading-dots"><span /><span /><span /></div>
                <span>Watching quietly…</span>
              </div>
            )}
          </article>
        )}

        {noteText && (
          <aside className="wit-notebook">
            <span className="wit-notebook-label">What you took from the last scene</span>
            <p className="wit-notebook-text">{noteText}</p>
          </aside>
        )}
      </main>

      {currentCard && canChoose && (
        <div className="wit-reflect">
          <p className="wit-reflect-prompt">What will you take with you?</p>
          <div className="wit-reflect-choices">
            <button
              className="wit-reflect-btn"
              onClick={() => makeChoice('left')}
              disabled={!canChoose}
            >
              {leftLabel}
            </button>
            <button
              className="wit-reflect-btn wit-reflect-btn--primary"
              onClick={() => makeChoice('right')}
              disabled={!canChoose}
            >
              {rightLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
