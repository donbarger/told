// The Better Prayer   Pharisee and Tax Collector (Luke 18:9-14)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'righteous',
  scene:
    "You are not a bad person. That's important to say first. You give more than most people give. You show up when you said you would. You haven't cheated anyone, you haven't lied about anything that mattered, and when you look at the people around you in the room, you can usually find someone worse. This is not pride exactly. It's just the accounting. You have done more good than harm and you know it. The question is what to do with that knowledge.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'The accounting is honest. You are who you are.' },
  rightChoice: { label: 'Something about the accounting feels off.' },
  leftDeltas:  { stat1: 8,  stat2: 8,  stat3: -12 },
  rightDeltas: { stat1: -5, stat2: -5, stat3:  10 },
  journal: 'I have done more good than harm. I know this. I track it.',
};

const ROOM_CARD = {
  id: 'room',
  type: 'fixed',
  phase: 'noticing',
  scene:
    "You're at the prayer breakfast and you notice the man two tables over. You know who he is, roughly. He works for the kind of company that charges people too much and counts on them not reading the fine print. He's here. You don't know why. He is sitting very still, not talking to anyone, looking at the table. You have given more to this community in the last year than he probably has in the last decade. You are not supposed to be thinking about this. You are thinking about it.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'It is what it is. Focus on your own prayer.' },
  rightChoice: { label: 'Notice that you\'re noticing.' },
  leftDeltas:  { stat1: 5,  stat2: 10, stat3: -10 },
  rightDeltas: { stat1: -5, stat2: -5, stat3:  15 },
  journal: "I noticed the man across the room and compared myself before I realized I was doing it.",
};

const PRAYER_CARD = {
  id: 'prayer',
  type: 'fixed',
  phase: 'praying',
  scene:
    "The room goes quiet for prayer. You hear your own voice in your head before you speak: grateful that you have built something real, that you have been consistent, that you have not been like some people. Then you hear the man across the room. He isn't listing anything. He's just saying: God, have mercy on me. That's the whole prayer. No evidence, no accounting, no case made. Just that. And something about the two prayers in one room makes you very uncomfortable.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Your prayer is honest. His is incomplete.' },
  rightChoice: { label: 'His prayer is something yours is not.' },
  leftDeltas:  { stat1: 8,  stat2: 12, stat3: -18 },
  rightDeltas: { stat1: -8, stat2: -8, stat3:  25 },
  journal: "He said 'God, have mercy on me.' I heard my own prayer and then I heard his.",
};

const MIRROR_CARD = {
  id: 'mirror',
  type: 'fixed',
  phase: 'mirror',
  scene:
    "On the drive home you think about the two prayers. Yours was accurate. Everything you listed was true. His was just an admission of need with no credentials attached. And Jesus, who told this story, said the second man went home justified, and the first one didn't. Not because the first man's record was wrong. Because he came to God with the record rather than himself. The accounting was the problem.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'I\'ve built something real. That still matters.' },
  rightChoice: { label: 'I need to learn what he already knows.' },
  leftDeltas:  { stat1: 8,  stat2: 8,  stat3: -15 },
  rightDeltas: { stat1: -5, stat2: -8, stat3:  28 },
  journal: 'The one who came with nothing went home justified. I had to think about that.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.roomShown && actNum >= 4) {
    return { card: ROOM_CARD, flags: { ...flags, roomShown: true } };
  }

  if (flags.roomShown && !flags.prayerShown && actNum >= 7) {
    return { card: PRAYER_CARD, flags: { ...flags, prayerShown: true } };
  }

  if (flags.prayerShown && !flags.mirrorShown && actNum >= 10) {
    return { card: MIRROR_CARD, flags: { ...flags, mirrorShown: true } };
  }

  if (flags.mirrorShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'righteous';
  if (actNum <= 6)  return 'noticing';
  if (actNum <= 9)  return 'praying';
  return 'mirror';
}

function getEnding(stats) {
  if (stats.stat3 >= 60) return {
    headline: 'You let go of the record.',
    body: "Not because the record was false. Because you finally came as yourself, without it. That's what the other man had that you didn't. You found it.",
    sceneType: 'longRoad',
  };
  if (stats.stat3 >= 35) return {
    headline: 'The comparison got quieter.',
    body: "You can't unhear the second prayer. It named something you've been doing for years without a word for it. The word is now in your head. That's a start.",
    sceneType: 'apartment',
  };
  return {
    headline: 'The accounting continues.',
    body: "You've built something real. The ledger is accurate. The problem Jesus was pointing at is that the ledger isn't the door. It's what you carry instead of going through.",
    sceneType: 'coldStreet',
  };
}

const PASSAGE = [
  { ref: '9-10', text: 'To some who were confident of their own righteousness and looked down on everyone else, Jesus told this parable: "Two men went up to the temple to pray, one a Pharisee and the other a tax collector."' },
  { ref: '11-12', text: '"The Pharisee stood by himself and prayed: God, I thank you that I am not like other people — robbers, evildoers, adulterers — or even like this tax collector. I fast twice a week and give a tenth of all I get."' },
  { ref: '13', text: '"But the tax collector stood at a distance. He would not even look up to heaven, but beat his breast and said, God, have mercy on me, a sinner."' },
  { ref: '14', text: '"I tell you that this man, rather than the other, went home justified before God. For all those who exalt themselves will be humbled, and those who humble themselves will be exalted."' },
];

export const pharisee = {
  id: 'pharisee',
  title: 'The Better Prayer',
  subtitle: 'A modern story of the Pharisee and the tax collector',
  scripture: 'Luke 18:9-14',
  verse: '"God, have mercy on me, a sinner."',
  verseRef: 'Luke 18:13',
  tagline: "You've built something real. Done more good than most. And there's a man across the room who hasn't.",
  description: "You are disciplined, generous, and present. Your record is accurate. At the prayer breakfast you notice someone who doesn't have what you have. Then you hear both prayers in the same room. You track your reputation, your comparison, and your honesty.",
  gradient: 'linear-gradient(135deg, #0a0e18 0%, #141e30 50%, #1e2e48 100%)',
  accentColor: '#6a8abc',
  statConfig: {
    stat1: { key: 'stat1', name: 'Reputation', color: 'linear-gradient(90deg, #1a2a4a, #4a6a9a)', icon: '🏛️' },
    stat2: { key: 'stat2', name: 'Comparison', color: 'linear-gradient(90deg, #3a1a1a, #8a4a4a)', icon: '⚖️' },
    stat3: { key: 'stat3', name: 'Honesty',    color: 'linear-gradient(90deg, #1a3a2a, #4a8a6a)', icon: '✦' },
  },
  initialStats: { stat1: 85, stat2: 60, stat3: 10 },
  initialFlags: { roomShown: false, prayerShown: false, mirrorShown: false },
  phases: [
    { key: 'righteous', label: 'The Record',        short: 'The Record',  ref: 'Luke 18:9',  verse: '"Confident of their own righteousness."',      watermark: 'THE RECORD'  },
    { key: 'noticing',  label: 'The Room',           short: 'Noticing',   ref: 'Luke 18:10', verse: '"Two men went up to pray."',                   watermark: 'NOTICING'    },
    { key: 'praying',   label: 'The Two Prayers',    short: 'The Prayer', ref: 'Luke 18:11', verse: '"God, I thank you that I am not..."',          watermark: 'THE PRAYER'  },
    { key: 'mirror',    label: 'The Drive Home',     short: 'The Mirror', ref: 'Luke 18:14', verse: '"This man went home justified."',              watermark: 'THE MIRROR'  },
    { key: 'restored',  label: 'Letting Go',         short: 'Released',   ref: 'Luke 18:14', verse: '"Those who humble themselves will be exalted."', watermark: 'RELEASED'  },
  ],
  phaseVisuals: {
    righteous: { bg: 'linear-gradient(160deg, #0a0e18 0%, #141e30 100%)', emoji: '🏛️', label: 'The Record'   },
    noticing:  { bg: 'linear-gradient(160deg, #0a1018 0%, #182030 100%)', emoji: '👁️', label: 'The Room'     },
    praying:   { bg: 'linear-gradient(160deg, #0a0a18 0%, #181830 100%)', emoji: '🙏', label: 'The Prayer'   },
    mirror:    { bg: 'linear-gradient(160deg, #0a1810 0%, #183020 100%)', emoji: '🪞', label: 'The Mirror'   },
    restored:  { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'Released'     },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Luke 18:9-14',
    invitation: 'The Pharisee had an accurate record. That was precisely the problem. The man with nothing to show came to God as himself. Jesus said that man went home right with God. The question is not whether your record is real. It is whether you are using it as the door.',
  },
};
