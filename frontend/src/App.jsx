import React, { useState } from 'react';
import { useGame } from './hooks/useGame.js';
import { useAuth } from './hooks/useAuth.js';
import LandingScreen     from './components/LandingScreen.jsx';
import StorySelectScreen from './components/StorySelectScreen.jsx';
import TitleScreen       from './components/TitleScreen.jsx';
import GameScreen        from './components/GameScreen.jsx';
import EncounterScreen   from './components/EncounterScreen.jsx';
import WitnessScreen     from './components/WitnessScreen.jsx';
import EndScreen         from './components/EndScreen.jsx';
import SettingsModal     from './components/SettingsModal.jsx';
import AdminScreen       from './components/AdminScreen.jsx';

export default function App() {
  const game = useGame();
  const auth = useAuth();

  const [showSettings, setShowSettings] = useState(false);
  const [showAdmin,    setShowAdmin]    = useState(false);

  const openSettings  = () => setShowSettings(true);
  const closeSettings = () => setShowSettings(false);
  const openAdmin     = () => { setShowSettings(false); setShowAdmin(true); };
  const closeAdmin    = () => setShowAdmin(false);

  if (auth.loading) return <div className="auth-loading" />;

  if (!auth.user) {
    return <LandingScreen onLogin={auth.loginWithGoogle} blocked={auth.blocked} />;
  }

  if (showAdmin && auth.user.isAdmin) {
    return <AdminScreen onClose={closeAdmin} />;
  }

  const audioEnabled = !!auth.user.prefs?.autoplayNarration;
  const toggleAudio  = () => auth.updatePrefs({ autoplayNarration: !audioEnabled });

  let screen;

  if (game.screen === 'storySelect') {
    screen = (
      <StorySelectScreen
        user={auth.user}
        onSelect={game.selectStory}
        onLogout={auth.logout}
      />
    );
  } else if (game.screen === 'title') {
    screen = (
      <TitleScreen
        story={game.activeStory}
        onStart={() => game.startGame(game.activeStory)}
        onBack={game.backToSelect}
        user={auth.user}
        onLogout={auth.logout}
        onOpenSettings={openSettings}
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
      />
    );
  } else if (game.screen === 'ending') {
    screen = (
      <EndScreen
        story={game.activeStory}
        stats={game.stats}
        journal={game.journal}
        onRestart={game.restartGame}
        onChooseAnother={game.backToSelect}
      />
    );
  } else {
    const template = game.activeStory?.template || 'journey';
    const gameProps = {
      ...game,
      user: auth.user,
      audioEnabled,
      onToggleAudio: toggleAudio,
      onOpenSettings: openSettings,
    };
    if (template === 'encounter') {
      screen = <EncounterScreen {...gameProps} />;
    } else if (template === 'witness') {
      screen = <WitnessScreen {...gameProps} />;
    } else {
      screen = <GameScreen {...gameProps} />;
    }
  }

  return (
    <>
      {screen}
      {showSettings && (
        <SettingsModal
          user={auth.user}
          onClose={closeSettings}
          onLogout={() => { closeSettings(); auth.logout(); }}
          onUpdatePrefs={auth.updatePrefs}
          onOpenAdmin={auth.user.isAdmin ? openAdmin : undefined}
        />
      )}
    </>
  );
}
