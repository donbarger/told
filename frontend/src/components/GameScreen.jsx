import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import StatBars from './StatBars.jsx';
import DesktopScene from './DesktopScene.jsx';
import { AudioToggle, SettingsGear } from './HeaderControls.jsx';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia('(min-width: 680px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 680px)');
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

export default function GameScreen(props) {
  const isDesktop = useIsDesktop();

  const {
    activeStory, stats, actNum, currentCard, journal, loading, error, makeChoice, user,
    audioEnabled, onToggleAudio, onOpenSettings,
  } = props;

  if (isDesktop) {
    return (
      <DesktopScene
        story={activeStory}
        card={currentCard}
        onChoice={makeChoice}
        loading={loading}
        error={error}
        stats={stats}
        actNum={actNum}
        journal={journal}
        user={user}
        audioEnabled={audioEnabled}
        onToggleAudio={onToggleAudio}
        onOpenSettings={onOpenSettings}
      />
    );
  }

  const statConfig = activeStory?.statConfig;

  return (
    <div className="game-screen" data-phase={currentCard?.phase || 'city'}>
      <header className="game-header">
        <span className="game-title">{activeStory?.title || 'The Story'}</span>
        <div className="game-header-right">
          <span className="act-counter">Act {actNum}</span>
          <div className="game-header-controls">
            <AudioToggle enabled={audioEnabled} onToggle={onToggleAudio} />
            <SettingsGear onClick={onOpenSettings} />
          </div>
        </div>
      </header>
      <div className="stats-wrapper">
        <StatBars stats={stats} statConfig={statConfig} />
      </div>
      <main className="game-main">
        <div className="card-area">
          {error && (
            <div className="error-banner">
              <p>Could not reach the server.</p>
              <small>{error}</small>
            </div>
          )}
          {loading && !currentCard && (
            <div className="loading-screen">
              <div className="loading-dots large"><span /><span /><span /></div>
            </div>
          )}
          {currentCard && (
            <Card card={currentCard} story={activeStory} onChoice={makeChoice} loading={loading} />
          )}
        </div>
      </main>
      <footer className="game-footer">
        <p className="footer-hint">Drag the card left or right to choose</p>
      </footer>
    </div>
  );
}
