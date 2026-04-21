// Do You Want to Get Well?   Pool of Bethesda (John 5:1-15)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'waiting',
  scene:
    "Thirty-eight years. You were not counting at first. Now you are. You know which spot is yours, you know who will help and who will not, you know how long the walk to the water takes and how long it takes to not make it. This is your life and you know how to live it. Other people's healing does not bother you the way it used to. You have made your peace with the pace of things. A stranger crouches down next to you and asks a question that stops everything. Do you want to get well?",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Of course you do. The answer is obvious.' },
  rightChoice: { label: 'Wait. Is the answer actually obvious?' },
  leftDeltas:  { stat1: 5,  stat2: 8,  stat3: -12 },
  rightDeltas: { stat1: -5, stat2: -8, stat3:  14 },
  journal: 'He asked if I want to get well. I have been here thirty-eight years.',
};

const EXCUSES_CARD = {
  id: 'excuses',
  type: 'fixed',
  phase: 'explaining',
  scene:
    "You hear yourself answer the question. Not with yes. With an explanation. Sir, I have no one to help me into the pool when the water is stirred. While I am trying to get in, someone else goes down ahead of me. It is a true answer. Every word of it is accurate. And you notice, somewhere in the middle of saying it, that it is not an answer to what he asked. He did not ask about the pool. He did not ask about the competition. He asked whether you want to get well. You answered a different question.",
  characterName: 'The Stranger',
  characterRole: 'Who asked the real question',
  leftChoice: { label: 'The explanation is honest. The obstacles are real.' },
  rightChoice: { label: 'You answered a question he didn\'t ask.' },
  leftDeltas:  { stat1: 5,  stat2: 10, stat3: -15 },
  rightDeltas: { stat1: -5, stat2: -8, stat3:  20 },
  journal: 'He asked if I want to get well. I explained why the pool hasn\'t worked.',
};

const RISE_CARD = {
  id: 'rise',
  type: 'fixed',
  phase: 'rising',
  scene:
    "Get up. Pick up your mat and walk. No ceremony. No pool. No waiting for the water. The healing is immediate and complete. You are walking. You are carrying the mat. And somewhere between the mat going up and your feet finding the ground you realize: the thing you explained around for thirty-eight years was never the real obstacle. He did not ask you to solve the logistics. He asked what you wanted. You wanted it. He gave it. You are walking.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'The healing happened. That\'s all.' },
  rightChoice: { label: 'I was explaining. He was offering.' },
  leftDeltas:  { stat1: 5,  stat2: 5,  stat3: -10 },
  rightDeltas: { stat1: -5, stat2: -8, stat3:  25 },
  journal: 'He said get up. I got up. I was explaining. He was offering.',
};

const FOUND_CARD = {
  id: 'found',
  type: 'fixed',
  phase: 'found',
  scene:
    "He finds you later in the temple. He says: see, you are well again. Stop sinning or something worse may happen to you. It is not a transaction. It is a word from someone who knows what came before and what could come after. The question he asked at the pool is still the most important question anyone has ever asked you. Do you want to get well? Not: can you explain the circumstances. Not: what has held you back. Whether you actually want the thing you have been waiting for. That question does not expire.",
  characterName: 'The Stranger',
  characterRole: 'Who found you after',
  leftChoice: { label: 'The healing happened. Move forward.' },
  rightChoice: { label: 'The question is still asking something of me.' },
  leftDeltas:  { stat1: 5,  stat2: 5,  stat3: -15 },
  rightDeltas: { stat1: -5, stat2: -8, stat3:  28 },
  journal: 'He found me afterward. The question from the pool is still the question.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.excusesShown && actNum >= 4) {
    return { card: EXCUSES_CARD, flags: { ...flags, excusesShown: true } };
  }

  if (flags.excusesShown && !flags.riseShown && actNum >= 7) {
    return { card: RISE_CARD, flags: { ...flags, riseShown: true } };
  }

  if (flags.riseShown && !flags.foundShown && actNum >= 10) {
    return { card: FOUND_CARD, flags: { ...flags, foundShown: true } };
  }

  if (flags.foundShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'waiting';
  if (actNum <= 6)  return 'explaining';
  if (actNum <= 9)  return 'rising';
  return 'found';
}

function getEnding(stats) {
  if (stats.stat3 >= 60) return {
    headline: 'You wanted it.',
    body: "Not the explanation of why it had not happened. Not the list of obstacles. The thing itself. He asked you a question that cut through everything. You said yes. That was the whole answer he needed.",
    sceneType: 'longRoad',
  };
  if (stats.stat3 >= 35) return {
    headline: 'The question is still asking.',
    body: "Do you want to get well? You have been carrying that mat for a long time. You know how to carry it. The question is whether you want to put it down. He is still asking.",
    sceneType: 'apartment',
  };
  return {
    headline: 'The pool is still there.',
    body: "The explanation is still true. The circumstances are still real. And a man came and asked you a question that had nothing to do with the pool, and the question is still open, and he is still asking it.",
    sceneType: 'coldStreet',
  };
}

const PASSAGE = [
  { ref: '5-7', text: 'One who was there had been an invalid for thirty-eight years. When Jesus saw him lying there and learned that he had been in this condition for a long time, he asked him, "Do you want to get well?" "Sir," the invalid replied, "I have no one to help me into the pool when the water is stirred. While I am trying to get in, someone else goes down ahead of me."' },
  { ref: '8-9', text: 'Then Jesus said to him, "Get up! Pick up your mat and walk." At once the man was cured; he picked up his mat and walked.' },
  { ref: '14', text: 'Later Jesus found him at the temple and said to him, "See, you are well again. Stop sinning or something worse may happen to you."' },
];

export const pool = {
  id: 'pool',
  title: 'Do You Want to Get Well?',
  subtitle: 'A modern story of the pool of Bethesda',
  scripture: 'John 5:1-15',
  verse: '"Do you want to get well?"',
  verseRef: 'John 5:6',
  tagline: "Thirty-eight years waiting. He didn't ask about the pool. He asked if you want to get well.",
  description: "You know your spot. You know the routine. You have explained the obstacles so many times they feel like the story itself. Then someone asks a question that has nothing to do with the obstacles. You track your waiting, your excuses, and your desire.",
  gradient: 'linear-gradient(135deg, #060e14 0%, #0c1e28 50%, #102838 100%)',
  accentColor: '#4a9aac',
  statConfig: {
    stat1: { key: 'stat1', name: 'Waiting',  color: 'linear-gradient(90deg, #1a2a3a, #4a6a7a)', icon: '🏊' },
    stat2: { key: 'stat2', name: 'Excuses',  color: 'linear-gradient(90deg, #3a2a1a, #7a5a3a)', icon: '🧱' },
    stat3: { key: 'stat3', name: 'Desire',   color: 'linear-gradient(90deg, #1a3a2a, #4a8a6a)', icon: '✦' },
  },
  initialStats: { stat1: 85, stat2: 65, stat3: 20 },
  initialFlags: { excusesShown: false, riseShown: false, foundShown: false },
  phases: [
    { key: 'waiting',    label: 'The Long Wait',    short: 'Waiting',    ref: 'John 5:5',  verse: '"Thirty-eight years."',                            watermark: 'WAITING'     },
    { key: 'explaining', label: 'The Explanation',  short: 'Explaining', ref: 'John 5:7',  verse: '"I have no one to help me."',                     watermark: 'EXPLAINING'  },
    { key: 'rising',     label: 'Get Up',           short: 'Rising',     ref: 'John 5:8',  verse: '"Get up! Pick up your mat and walk."',            watermark: 'GET UP'      },
    { key: 'found',      label: 'Found After',      short: 'Found',      ref: 'John 5:14', verse: '"See, you are well again."',                      watermark: 'FOUND'       },
    { key: 'restored',   label: 'The Answer',       short: 'Restored',   ref: 'John 5:6',  verse: '"Do you want to get well?"',                      watermark: 'RESTORED'    },
  ],
  phaseVisuals: {
    waiting:    { bg: 'linear-gradient(160deg, #060e14 0%, #0c1e28 100%)', emoji: '🏊', label: 'The Wait'     },
    explaining: { bg: 'linear-gradient(160deg, #080e14 0%, #102030 100%)', emoji: '🧱', label: 'Explaining'   },
    rising:     { bg: 'linear-gradient(160deg, #0a1420 0%, #182838 100%)', emoji: '🌊', label: 'Get Up'       },
    found:      { bg: 'linear-gradient(160deg, #0a1820 0%, #1a3040 100%)', emoji: '🕊️', label: 'Found'        },
    restored:   { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'Restored'     },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'John 5:1-15',
    invitation: 'He walked past a crowd of people at the pool and stopped at one man. Not the one with the most faith, or the most connections, or the clearest shot at the water. The one who had been waiting the longest. He asked a question that still cuts: do you want to get well? Not: can you explain the circumstances. Not: do you have the right method. Whether you want the thing. That question is being asked right now. The mat does not have to stay on the ground.',
  },
};
