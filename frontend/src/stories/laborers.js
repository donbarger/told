// The Last Hour   Laborers in the Vineyard (Matthew 20:1-16)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'waiting',
  scene:
    "You have been in the square since dawn. Most of the others got hired in the first hour. You have been standing here all day watching the work go to other men. It is now five in the afternoon. One hour left. A vineyard owner comes and asks if you want to work. You don't ask how much. You already know a single hour isn't worth arguing about.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'A day\'s wage or nothing. I won\'t beg.' },
  rightChoice: { label: 'Yes. I\'ll take what\'s fair.' },
  leftDeltas:  { stat1: 8,  stat2: -8,  stat3: -5  },
  rightDeltas: { stat1: -5, stat2: 5,   stat3: 8   },
  journal: 'One hour left in the day. He came and asked if I wanted to work.',
};

const FIELD_CARD = {
  id: 'field',
  type: 'fixed',
  phase: 'field',
  scene:
    "You work the last hour. The men who have been here since morning are finishing up around you. You can see the fatigue in them. The heat of the full day is in their faces. You have been here one hour. You are aware that they are aware of how little of the day you carried. You work hard anyway. It is all you can do.",
  characterName: 'The All-Day Workers',
  characterRole: 'Who saw when you arrived',
  leftChoice: { label: 'I owe them nothing. I work my hour.' },
  rightChoice: { label: 'I\'ll earn whatever I get.' },
  leftDeltas:  { stat1: 8,  stat2: -8,  stat3: -5  },
  rightDeltas: { stat1: -5, stat2: 10,  stat3: 10  },
  journal: 'I worked the last hour. The heat of the full day was in their faces.',
};

const WAGE_CARD = {
  id: 'wage',
  type: 'fixed',
  phase: 'wage',
  scene:
    "He calls you first to be paid. You step forward expecting the quarter of what a day's wage would be. He puts a full day's wage in your hand. You blink at it. You hear the murmur start behind you as the all-day men see what you received. They are already calculating. They have been calculating since before you got in line.",
  characterName: 'The Landowner',
  characterRole: 'Who paid one hour a full day',
  leftChoice: { label: 'I don\'t deserve this. Give it to them instead.' },
  rightChoice: { label: 'He gave it. I\'ll take it.' },
  leftDeltas:  { stat1: 10, stat2: -10, stat3: -12 },
  rightDeltas: { stat1: -5, stat2: 8,   stat3: 18  },
  journal: 'A full day\'s wage. For one hour. The murmur started behind me.',
};

const RECKONING_CARD = {
  id: 'reckoning',
  type: 'fixed',
  phase: 'reckoning',
  scene:
    "The all-day men are angry. You understand why. They stood in that heat since sunrise. They expected more when they saw you get the full amount. The owner says: I gave you what we agreed. Can't I do what I like with my own money? Are you resentful because I am generous? The question lands differently than they intended it to.",
  characterName: 'The All-Day Workers',
  characterRole: 'Who kept a different count',
  leftChoice: { label: 'Their math makes sense to me.' },
  rightChoice: { label: 'His generosity isn\'t their loss.' },
  leftDeltas:  { stat1: 10, stat2: -12, stat3: -15 },
  rightDeltas: { stat1: -8, stat2: 12,  stat3: 22  },
  journal: 'Are you resentful because I am generous? The question stands there.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.fieldShown && actNum >= 3) {
    return { card: FIELD_CARD, flags: { ...flags, fieldShown: true } };
  }
  if (flags.fieldShown && !flags.wageShown && actNum >= 6) {
    return { card: WAGE_CARD, flags: { ...flags, wageShown: true } };
  }
  if (flags.wageShown && !flags.reckoningShown && actNum >= 9) {
    return { card: RECKONING_CARD, flags: { ...flags, reckoningShown: true } };
  }
  if (flags.reckoningShown && actNum >= 12) {
    return { card: { id: 'ending', type: 'ending', phase: 'reckoning' }, flags, isEnding: true };
  }
  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 2)  return 'waiting';
  if (actNum <= 5)  return 'field';
  if (actNum <= 8)  return 'wage';
  return 'reckoning';
}

function getEnding(stats) {
  if (stats.stat3 >= 55) return {
    headline: 'Are you resentful because I am generous?',
    body: "You spent the whole day in the square being passed over. You worked one hour. You received a full day's wage. The all-day men are furious. The owner's question is the point of the whole story: can you receive grace without it being diminished by who else received it? You held it without apology. That is something.",
    sceneType: 'openRoad',
  };
  if (stats.stat3 >= 25) return {
    headline: 'He gave it. I took it.',
    body: "You did not earn a full day's wage. He gave it anyway. The men who worked all day are angry and you half-understand why. But the generosity you received was not taken from them -- he gave them what they were promised. Grace does not run on a ledger. You are starting to see that.",
    sceneType: 'doorway',
  };
  return {
    headline: 'Still doing the math.',
    body: "You received more than you worked for and it feels complicated. The all-day men have a point and so does the owner. The last will be first, the first will be last -- the parable is a provocation, not a formula. You are still in it.",
    sceneType: 'poolSide',
  };
}

const PASSAGE = [
  { ref: '6-7', text: '"About five in the afternoon he went out and found still others standing around. He asked them, \'Why have you been standing here all day long doing nothing?\' \'Because no one has hired us,\' they answered. He said to them, \'You also go and work in my vineyard.\'"' },
  { ref: '13-15', text: '"But he answered one of them, \'I am not being unfair to you, friend. Didn\'t you agree to work for a denarius? Take your pay and go. I want to give the one who was hired last the same as I gave you. Don\'t I have the right to do what I want with my own money? Or are you envious because I am generous?\'"' },
];

export const laborers = {
  id: 'laborers',
  title: 'The Last Hour',
  subtitle: 'The laborers in the vineyard',
  scripture: 'Matthew 20:1-16',
  verse: '"Are you envious because I am generous?"',
  verseRef: 'Matthew 20:15',
  tagline: "You stood in the square all day. He came at five in the afternoon and asked if you wanted to work.",
  description: "You spent all day in the hiring square being passed over. One hour before quitting time, a landowner hires you. When wages are paid, you receive a full day's wage -- and so does everyone else, regardless of how long they worked. You track the resentment of those who kept score, the weight of being passed over, and the grace that doesn't follow anyone's math.",
  gradient: 'linear-gradient(135deg, #081408 0%, #102010 50%, #183018 100%)',
  accentColor: '#6A9A48',
  statConfig: {
    stat1: { key: 'stat1', name: 'Resentment', color: 'linear-gradient(90deg, #1a1008, #382808)', icon: '⏳' },
    stat2: { key: 'stat2', name: 'Worth',      color: 'linear-gradient(90deg, #081808, #184818)', icon: '🌾' },
    stat3: { key: 'stat3', name: 'Grace',      color: 'linear-gradient(90deg, #081408, #206020)', icon: '✦'  },
  },
  initialStats: { stat1: 75, stat2: 15, stat3: 5 },
  initialFlags: { fieldShown: false, wageShown: false, reckoningShown: false },
  phases: [
    { key: 'waiting',    label: 'The Square',   short: 'Waiting',   ref: 'Matt 20:6',  verse: '"Why have you been standing here all day doing nothing?"',           watermark: 'THE SQUARE'   },
    { key: 'field',      label: 'Last Hour',    short: 'Working',   ref: 'Matt 20:7',  verse: '"You also go and work in my vineyard."',                            watermark: 'LAST HOUR'    },
    { key: 'wage',       label: 'Full Pay',     short: 'Paid',      ref: 'Matt 20:9',  verse: '"Each one received a denarius."',                                   watermark: 'FULL PAY'     },
    { key: 'reckoning',  label: 'The Question', short: 'Question',  ref: 'Matt 20:15', verse: '"Are you envious because I am generous?"',                          watermark: 'THE QUESTION' },
  ],
  phaseVisuals: {
    waiting:   { bg: 'linear-gradient(160deg, #081408 0%, #102010 100%)', emoji: '⏳', label: 'The Square'   },
    field:     { bg: 'linear-gradient(160deg, #0A1808 0%, #142810 100%)', emoji: '🌾', label: 'Last Hour'    },
    wage:      { bg: 'linear-gradient(160deg, #0C1C08 0%, #183010 100%)', emoji: '💰', label: 'Full Pay'     },
    reckoning: { bg: 'linear-gradient(160deg, #0A1408 0%, #142008 100%)', emoji: '⚖️', label: 'The Question' },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Matthew 20:1-16',
    invitation: "The parable is not about fairness -- it is about generosity that doesn't fit the ledger. The men who complained were not cheated. They received exactly what they were promised. The offense was that someone else received more than they deserved. That resentment is the thing the story is examining.",
  },
};
