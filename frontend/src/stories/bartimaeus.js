// Louder   Blind Bartimaeus (Mark 10:46–52)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'invisible',
  scene:
    "The corner of Fifth and Maple. You've been here long enough to know which sounds mean a bus, which mean a cop, and which mean a drunk who will either give you five bucks or give you trouble. Today is Tuesday. Tuesday is slow. You hold the sign you can't read because someone made it for you six months ago and you figure the words are still there. The foot traffic today is different   more of it, more noise.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Keep the sign up. Wait it out.' },
  rightChoice: { label: 'Ask someone what\'s going on.' },
  leftDeltas:  { stat1: 0, stat2: -5, stat3: -8  },
  rightDeltas: { stat1: 5, stat2:  8, stat3:  5  },
  journal: 'Tuesday was different. I didn\'t know why at first.',
};

const HEARING_CARD = {
  id: 'hearing',
  type: 'fixed',
  phase: 'hearing',
  scene:
    "You catch a name in the crowd noise. Say it again in your head. The stories you've heard about this man, third-hand, told by people who tell stories badly, filter up from wherever you stored them. You don't know what you believe about any of it. But you know what you need. And you know this crowd is moving and will not come back. Your window is now.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Stay quiet. Don\'t embarrass yourself.' },
  rightChoice: { label: 'You open your mouth and call out.' },
  leftDeltas:  { stat1: 0, stat2: 5,  stat3: -15 },
  rightDeltas: { stat1: 5, stat2: -5, stat3:  20 },
  journal: 'I heard his name in the crowd and knew I had one chance.',
};

const LOUDER_CARD = {
  id: 'louder',
  type: 'fixed',
  phase: 'calling',
  scene:
    "People around you tell you to shut up. Not one person   several. Some are annoyed, some embarrassed on your behalf. A woman says, 'Don't.' A man says, 'He can't hear you.' You've been told your whole life to be quieter, to take up less space, to not make a scene. The procession is almost past you. You have maybe thirty seconds.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Go quiet. Maybe next time.' },
  rightChoice: { label: 'You cry out louder.' },
  leftDeltas:  { stat1: 0, stat2: 5,  stat3: -20 },
  rightDeltas: { stat1: 0, stat2: -5, stat3:  25 },
  journal: 'They told me to shut up. I cried out louder.',
};

const CALLED_CARD = {
  id: 'calledOver',
  type: 'fixed',
  phase: 'sight',
  scene:
    "He stops. He asks for you. The same people who told you to be quiet are now saying, 'Get up, he's calling you.' You throw off your coat   the only coat you own   and you find him in the crowd without knowing exactly how. He asks you, 'What do you want me to do for you?' Nobody asks you that. Nobody in two years on this corner has asked you that. The question hits you like a door opening.",
  characterName: 'The Teacher',
  characterRole: 'Who stopped and asked',
  leftChoice: { label: '"Just something to eat, please."' },
  rightChoice: { label: '"I want to see."' },
  leftDeltas:  { stat1: 10, stat2: 0,  stat3: -10 },
  rightDeltas: { stat1:  0, stat2: 15, stat3:  30 },
  journal: 'He asked what I wanted. I told him the real thing.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.hearingShown && actNum >= 4) {
    return { card: HEARING_CARD, flags: { ...flags, hearingShown: true } };
  }

  if (flags.hearingShown && !flags.louderShown && actNum >= 6) {
    return { card: LOUDER_CARD, flags: { ...flags, louderShown: true } };
  }

  if (flags.louderShown && !flags.calledShown) {
    if (direction === 'right') {
      return { card: CALLED_CARD, flags: { ...flags, calledShown: true } };
    }
    // If they went quiet, give more AI scenes of invisibility before the chance comes again
    if (actNum >= flags.louderAct + 3) {
      return { card: CALLED_CARD, flags: { ...flags, calledShown: true } };
    }
  }

  if (flags.calledShown && actNum >= 10) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'invisible';
  if (actNum <= 5)  return 'hearing';
  if (actNum <= 7)  return 'calling';
  return 'sight';
}

function getEnding(stats) {
  if (stats.stat3 >= 65) return {
    headline: 'You received your sight.',
    body: "Not just eyes. The kind of sight that comes from being known, called, and asked the right question. You followed him on the road.",
    sceneType: 'longRoad',
  };
  if (stats.stat3 >= 40) return {
    headline: 'You cried out louder.',
    body: "That's the whole story. Against the crowd, past the embarrassment, past the certainty that nobody was listening. You cried out. And he stopped.",
    sceneType: 'fatherRunning',
  };
  return {
    headline: 'He heard you.',
    body: "Every time. Even the times you thought he didn't. The crowd is not the final word on whether you get heard.",
    sceneType: 'coldStreet',
  };
}

const PASSAGE = [
  { ref: '46–47', text: 'Then they came to Jericho. As Jesus and his disciples, together with a large crowd, were leaving the city, a blind man, Bartimaeus, was sitting by the roadside begging. When he heard that it was Jesus of Nazareth, he began to shout, "Jesus, Son of David, have mercy on me!"' },
  { ref: '48', text: 'Many rebuked him and told him to be quiet, but he shouted all the more, "Son of David, have mercy on me!"' },
  { ref: '49–50', text: 'Jesus stopped and said, "Call him." So they called to the blind man, "Cheer up! On your feet! He\'s calling you." Throwing his cloak aside, he jumped to his feet and came to Jesus.' },
  { ref: '51–52', text: '"What do you want me to do for you?" Jesus asked him. The blind man said, "Rabbi, I want to see." "Go," said Jesus, "your faith has healed you." Immediately he received his sight and followed Jesus along the road.' },
];

export const bartimaeus = {
  id: 'bartimaeus',
  title: 'Louder',
  subtitle: 'A modern story of Blind Bartimaeus',
  scripture: 'Mark 10:46–52',
  verse: '"He shouted all the more."',
  verseRef: 'Mark 10:48',
  tagline: 'They told you to be quiet. Every time. You have one window left.',
  description: 'You\'re invisible to the system   homeless, sightless, sitting on the same corner. A crowd passes with someone remarkable in it. People around you say don\'t bother. You track your visibility, your desperation, and your hope.',
  gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #2a1a5a 100%)',
  accentColor: '#7a5ab4',
  statConfig: {
    stat1: { key: 'stat1', name: 'Visibility',   color: 'linear-gradient(90deg, #1a1a4a, #4a4a9a)', icon: '👁️' },
    stat2: { key: 'stat2', name: 'Desperation',  color: 'linear-gradient(90deg, #4a1a1a, #9a4a4a)', icon: '🔥' },
    stat3: { key: 'stat3', name: 'Hope',         color: 'linear-gradient(90deg, #3a2a1a, #9a7a4a)', icon: '✦' },
  },
  initialStats: { stat1: 10, stat2: 75, stat3: 20 },
  initialFlags: { hearingShown: false, louderShown: false, louderAct: 0, calledShown: false },
  phases: [
    { key: 'invisible', label: 'The Corner',      short: 'Invisible',  ref: 'Mark 10:46', verse: '"Sitting by the roadside begging."',            watermark: 'INVISIBLE'  },
    { key: 'hearing',   label: 'The Name',         short: 'The Name',   ref: 'Mark 10:47', verse: '"When he heard it was Jesus of Nazareth..."',   watermark: 'THE NAME'   },
    { key: 'calling',   label: 'Crying Out',       short: 'Cry Out',    ref: 'Mark 10:48', verse: '"He shouted all the more."',                    watermark: 'CRY OUT'    },
    { key: 'sight',     label: 'Called Over',      short: 'Called',     ref: 'Mark 10:49', verse: '"Cheer up! On your feet! He\'s calling you."',  watermark: 'CALLED'     },
    { key: 'restored',  label: 'Sight Received',   short: 'Sight',      ref: 'Mark 10:52', verse: '"Immediately he received his sight."',          watermark: 'SIGHT'      },
  ],
  phaseVisuals: {
    invisible: { bg: 'linear-gradient(160deg, #080810 0%, #1a1a2a 100%)', emoji: '🌑', label: 'Invisible' },
    hearing:   { bg: 'linear-gradient(160deg, #0a0a18 0%, #2a2a4a 100%)', emoji: '👂', label: 'Hearing'   },
    calling:   { bg: 'linear-gradient(160deg, #1a0a0a 0%, #3a1a1a 100%)', emoji: '📢', label: 'Calling'   },
    sight:     { bg: 'linear-gradient(160deg, #1a1a0a 0%, #3a3a1a 100%)', emoji: '⭐', label: 'Called'    },
    restored:  { bg: 'linear-gradient(160deg, #1a2a1a 0%, #4a6a3a 100%)', emoji: '👁️', label: 'Sight'     },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Mark 10:46–52',
    invitation: 'The crowd told him to be quiet. He cried out louder. That\'s persistence. That\'s faith. If you\'ve been told that no one is listening, that you\'re not worth stopping for   this story is a direct contradiction. He stops. He asks. He wants to know what you want.',
  },
};
