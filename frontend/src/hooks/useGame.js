import { useState, useCallback } from 'react';
import { apiFetch } from './useAuth.js';

function pickCallbackChoice(choiceHistory, currentAct) {
  const window = choiceHistory.filter(
    (c) => currentAct - c.act >= 3 && currentAct - c.act <= 8
  );
  if (!window.length) return null;
  return window[Math.floor(Math.random() * window.length)];
}

export function useGame() {
  const [activeStory,   setActiveStory]   = useState(null);
  const [screen,        setScreen]        = useState('storySelect');
  const [stats,         setStats]         = useState({ stat1: 50, stat2: 50, stat3: 50 });
  const [actNum,        setActNum]        = useState(0);
  const [gameId,        setGameId]        = useState(null);
  const [currentCard,   setCurrentCard]   = useState(null);
  const [journal,       setJournal]       = useState([]);
  const [choiceHistory, setChoiceHistory] = useState([]);
  const [characters,    setCharacters]    = useState([]);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState(null);
  const [flags,         setFlags]         = useState({});

  const clamp = (v) => Math.max(0, Math.min(100, Math.round(v)));

  const applyDeltas = useCallback((cur, deltas) => ({
    stat1: clamp(cur.stat1 + (deltas.stat1 || 0)),
    stat2: clamp(cur.stat2 + (deltas.stat2 || 0)),
    stat3: clamp(cur.stat3 + (deltas.stat3 || 0)),
  }), []);

  const fetchNextCard = useCallback(async ({
    story, phase, curStats, curJournal, nextAct, curChoiceHistory, curCharacters, forceCallback,
  }) => {
    setLoading(true);
    setError(null);
    try {
      const callbackChoice = forceCallback
        ? pickCallbackChoice(curChoiceHistory, nextAct)
        : null;

      const statNames = story
        ? [story.statConfig.stat1.name, story.statConfig.stat2.name, story.statConfig.stat3.name]
        : undefined;

      const res = await apiFetch('/api/game/next', {
        method: 'POST',
        body: JSON.stringify({
          storyId:       story?.id || 'prodigal',
          phase,
          stats:         curStats,
          journal:       curJournal,
          actNum:        nextAct,
          choiceHistory: curChoiceHistory.slice(-10),
          characters:    curCharacters.slice(-8),
          callbackChoice,
          statNames,
        }),
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const card = await res.json();
      return { ...card, id: `act-${nextAct}`, type: 'ai' };
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const selectStory = useCallback((story) => {
    setActiveStory(story);
    setScreen('title');
  }, []);

  const startGame = useCallback(async (story) => {
    const s = story || activeStory;
    if (!s) return;

    setActiveStory(s);
    setStats(s.initialStats);
    setActNum(0);
    setJournal([]);
    setChoiceHistory([]);
    setCharacters([]);
    setFlags(s.initialFlags || {});
    setError(null);
    setCurrentCard(s.openingCard);
    setScreen('game');

    try {
      const res = await apiFetch('/api/game/start', {
        method: 'POST',
        body: JSON.stringify({ storyId: s.id }),
      });
      if (res.ok) { const d = await res.json(); setGameId(d.gameId); }
    } catch { /* non-fatal */ }
  }, [activeStory]);

  const makeChoice = useCallback(async (direction) => {
    if (!currentCard || loading || !activeStory) return;

    let deltas, choiceLabel, journalEntry;

    if (currentCard.type === 'fixed') {
      deltas       = direction === 'left' ? currentCard.leftDeltas  : currentCard.rightDeltas;
      choiceLabel  = direction === 'left' ? currentCard.leftChoice?.label : currentCard.rightChoice?.label;
      journalEntry = currentCard.journal;
    } else {
      const choice = direction === 'left' ? currentCard.leftChoice : currentCard.rightChoice;
      deltas       = choice?.deltas || {};
      choiceLabel  = choice?.label  || '';
      journalEntry = currentCard.journal;
    }

    const newStats    = applyDeltas(stats, deltas);
    const newActNum   = actNum + 1;
    const newJournal  = journalEntry
      ? [...journal, {
          text:        journalEntry,
          phase:       currentCard.phase,
          act:         actNum,
          direction,
          choiceLabel: choiceLabel || '',
        }]
      : journal;
    let   newFlags    = { ...flags };

    const newChoiceHistory = [
      ...choiceHistory,
      { act: actNum, label: choiceLabel, direction, journal: journalEntry || '' },
    ];

    let newCharacters = characters;
    if (currentCard.characterName) {
      const alreadySeen = characters.some(c => c.name === currentCard.characterName);
      if (!alreadySeen) {
        newCharacters = [
          ...characters,
          { name: currentCard.characterName, role: currentCard.characterRole || '', firstAct: actNum },
        ];
      }
    }

    setStats(newStats);
    setJournal(newJournal);
    setActNum(newActNum);
    setChoiceHistory(newChoiceHistory);
    setCharacters(newCharacters);

    const result = activeStory.getNextCard({
      previousCardId: currentCard.id,
      direction,
      stats: newStats,
      actNum: newActNum,
      flags: newFlags,
      choiceHistory: newChoiceHistory,
    });

    if (result) {
      if (result.flags) { newFlags = result.flags; setFlags(result.flags); }

      if (result.isEnding) {
        setCurrentCard(result.card);
        setScreen('ending');
        try {
          await apiFetch('/api/game/complete', {
            method: 'POST',
            body: JSON.stringify({
              gameId,
              stat1:    newStats.stat1,
              stat2:    newStats.stat2,
              stat3:    newStats.stat3,
              actCount: newActNum,
            }),
          });
        } catch { /* non-fatal */ }
        return;
      }

      setCurrentCard(result.card);
      return;
    }

    setFlags(newFlags);
    const phase         = activeStory.getAIPhase(newActNum, newStats);
    const forceCallback = newActNum % 3 === 0;

    const next = await fetchNextCard({
      story:            activeStory,
      phase,
      curStats:         newStats,
      curJournal:       newJournal,
      nextAct:          newActNum,
      curChoiceHistory: newChoiceHistory,
      curCharacters:    newCharacters,
      forceCallback,
    });
    if (next) setCurrentCard(next);
  }, [currentCard, stats, journal, choiceHistory, characters, actNum, flags, loading, activeStory, applyDeltas, fetchNextCard, gameId]);

  const restartGame = useCallback(() => {
    setScreen('storySelect');
    setActiveStory(null);
    setCurrentCard(null);
    setStats({ stat1: 50, stat2: 50, stat3: 50 });
    setActNum(0);
    setJournal([]);
    setChoiceHistory([]);
    setCharacters([]);
    setError(null);
    setFlags({});
  }, []);

  const backToSelect = useCallback(() => {
    setScreen('storySelect');
    setActiveStory(null);
    setCurrentCard(null);
    setStats({ stat1: 50, stat2: 50, stat3: 50 });
    setActNum(0);
    setJournal([]);
    setChoiceHistory([]);
    setCharacters([]);
    setError(null);
    setFlags({});
  }, []);

  return {
    screen, stats, actNum, currentCard, journal, activeStory,
    loading, error, selectStory, startGame, makeChoice, restartGame, backToSelect,
  };
}
