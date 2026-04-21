// The Debt   Unmerciful Servant (Matthew 18:21–35)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'forgiven',
  scene:
    "Six months ago your company was under. Not struggling. Under. You owed $2.4 million to a lender who had every legal right to take everything. You don't know why he didn't. He called you into his office, looked at the numbers, and said: cleared. He walked you out shaking your hand. Since then business has recovered. You don't talk about what happened. You try not to think about it.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Move on. That chapter is closed.' },
  rightChoice: { label: 'You think about it. You\'re grateful.' },
  leftDeltas:  { stat1:  8, stat2: -5, stat3: -12 },
  rightDeltas: { stat1: -5, stat2: 8,  stat3:  15 },
  journal: 'Six months ago everything was forgiven. I don\'t talk about it.',
};

const ENCOUNTER_CARD = {
  id: 'encounter',
  type: 'fixed',
  phase: 'finding',
  scene:
    "You run into Marcus in the parking lot of a restaurant. He owes you $11,000 from a deal that went south two years ago. You've thought about suing him. The legal fees would cost more than the debt, which is part of why you haven't. He sees you. He starts to explain. You watch his face and you recognize the look. It's the same one you had in that office six months ago.",
  characterName: 'Marcus',
  characterRole: 'Who owes you eleven thousand',
  leftChoice: { label: 'Let him talk. Listen first.' },
  rightChoice: { label: 'Demand what he owes you.' },
  leftDeltas:  { stat1: -5, stat2: 10, stat3: 15 },
  rightDeltas: { stat1: 10, stat2: -10, stat3: -20 },
  journal: 'I ran into the man who owed me money and recognized the look on his face.',
};

const GRIP_CARD = {
  id: 'grip',
  type: 'fixed',
  phase: 'holding',
  scene:
    "He can't pay. He says he'll pay when he can, which you both know might be never. The $11,000 matters, but it's not the money. It's the principle. You worked for it. He took it. You could forgive it right now. Write it off, walk away, never think about it again. Or you could hold it. There is a version of yourself that forgives this easily. You haven't found him yet.",
  characterName: 'Marcus',
  characterRole: 'Asking for time',
  leftChoice: { label: 'Give him time. Hold the debt.' },
  rightChoice: { label: 'Forgive it. Let it go.' },
  leftDeltas:  { stat1: 8,  stat2: -10, stat3: -22 },
  rightDeltas: { stat1: -8, stat2: 15,  stat3:  28 },
  journal: 'I had the choice. Forgive or hold.',
};

const CONSEQUENCE_CARD = {
  id: 'consequence',
  type: 'fixed',
  phase: 'consequence',
  scene:
    "Word got back to your lender   the one who forgave the $2.4 million. You don't know how. You get a message: 'I heard about Marcus. I'd like to talk.' The meeting is brief and without hostility. He says he forgave your debt because he believed in who you could become. He asks whether you believe in that too. The silence in the room is enormous.",
  characterName: 'Your Lender',
  characterRole: 'Who forgave everything',
  leftChoice: { label: 'Defend your decision.' },
  rightChoice: { label: 'I understand. I need to change.' },
  leftDeltas:  { stat1: 5,  stat2: -15, stat3: -20 },
  rightDeltas: { stat1: -5, stat2: 15,  stat3:  30 },
  journal: 'My lender heard what I did. I sat across from him and had to answer for it.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.encounterShown && actNum >= 4) {
    return { card: ENCOUNTER_CARD, flags: { ...flags, encounterShown: true } };
  }

  if (flags.encounterShown && !flags.gripShown && actNum >= 6) {
    return { card: GRIP_CARD, flags: { ...flags, gripShown: true } };
  }

  if (flags.gripShown && !flags.consequenceShown && actNum >= 9) {
    return { card: CONSEQUENCE_CARD, flags: { ...flags, consequenceShown: true } };
  }

  if (flags.consequenceShown && actNum >= 12) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'forgiven';
  if (actNum <= 5)  return 'finding';
  if (actNum <= 8)  return 'holding';
  return 'consequence';
}

function getEnding(stats) {
  if (stats.stat3 >= 60) return {
    headline: 'You chose freedom.',
    body: "Not for Marcus. For yourself. Forgiveness isn't an erasure. It's a release. You had been given it. You finally gave it.",
    sceneType: 'longRoad',
  };
  if (stats.stat3 >= 35) return {
    headline: 'You understand now.',
    body: "The math of forgiveness is upside down. The amount you were forgiven and the amount you forgive are supposed to match. You're still working on it.",
    sceneType: 'apartment',
  };
  return {
    headline: 'You held it.',
    body: "And in holding it, you became smaller. Not stronger. The grip you keep on what you're owed is the same one that keeps you from everything you were given.",
    sceneType: 'coldStreet',
  };
}

const PASSAGE = [
  { ref: '23–25', text: '"Therefore, the kingdom of heaven is like a king who wanted to settle accounts with his servants. As he began the settlement, a man who owed him ten thousand bags of gold was brought to him. Since he was not able to pay, the master ordered that he and his wife and his children and all that he had be sold to repay the debt."' },
  { ref: '26–27', text: '"At this the servant fell on his knees before him. \'Be patient with me,\' he begged, \'and I will pay back everything.\' The servant\'s master took pity on him, canceled the debt and let him go."' },
  { ref: '28–30', text: '"But when that servant went out, he found one of his fellow servants who owed him a hundred silver coins. He grabbed him and began to choke him. \'Pay back what you owe me!\' he demanded. His fellow servant fell to his knees and begged him, \'Be patient with me, and I will pay it back.\' But he refused."' },
  { ref: '32–33', text: '"Then the master called the servant in. \'You wicked servant,\' he said, \'I canceled all that debt of yours because you begged me to. Shouldn\'t you have had mercy on your fellow servant just as I had on you?\'"' },
];

export const debt = {
  id: 'debt',
  title: 'The Debt',
  subtitle: 'A modern story of the unmerciful servant',
  scripture: 'Matthew 18:21–35',
  verse: '"Shouldn\'t you have had mercy, just as I had on you?"',
  verseRef: 'Matthew 18:33',
  tagline: 'You were forgiven everything. Now the man who owes you is standing right in front of you.',
  description: 'Six months ago your lender forgave a $2.4M debt that could have ended you. Now you\'ve found the man who owes you $11K   and you recognize the look on his face. You track your power, your bitterness, and your freedom.',
  gradient: 'linear-gradient(135deg, #1a0a0a 0%, #3a1a1a 50%, #6a2a2a 100%)',
  accentColor: '#c44a4a',
  statConfig: {
    stat1: { key: 'stat1', name: 'Power',     color: 'linear-gradient(90deg, #4a1a1a, #9a4a4a)', icon: '⚖️' },
    stat2: { key: 'stat2', name: 'Bitterness',color: 'linear-gradient(90deg, #2a0a0a, #7a2a2a)', icon: '🔒' },
    stat3: { key: 'stat3', name: 'Freedom',   color: 'linear-gradient(90deg, #2a2a4a, #6a6a9a)', icon: '✦' },
  },
  initialStats: { stat1: 65, stat2: 75, stat3: 20 },
  initialFlags: { encounterShown: false, gripShown: false, consequenceShown: false },
  phases: [
    { key: 'forgiven',    label: 'Cleared',           short: 'Forgiven',   ref: 'Matt 18:27', verse: '"He canceled the debt and let him go."',           watermark: 'FORGIVEN'    },
    { key: 'finding',     label: 'The Parking Lot',   short: 'The Find',   ref: 'Matt 18:28', verse: '"He found one of his fellow servants..."',          watermark: 'THE FIND'    },
    { key: 'holding',     label: 'The Grip',          short: 'The Grip',   ref: 'Matt 18:28', verse: '"He grabbed him and began to choke him."',         watermark: 'THE GRIP'    },
    { key: 'consequence', label: 'The Meeting',       short: 'Called In',  ref: 'Matt 18:32', verse: '"The master called the servant in."',              watermark: 'CALLED IN'   },
    { key: 'restored',    label: 'The Choice',        short: 'Freedom',    ref: 'Matt 18:33', verse: '"Shouldn\'t you have had mercy?"',                 watermark: 'FREEDOM'     },
  ],
  phaseVisuals: {
    forgiven:    { bg: 'linear-gradient(160deg, #0a1a2a 0%, #1a3a4a 100%)', emoji: '🕊️', label: 'Cleared'    },
    finding:     { bg: 'linear-gradient(160deg, #1a1a0a 0%, #3a3a1a 100%)', emoji: '⚠️', label: 'The Find'   },
    holding:     { bg: 'linear-gradient(160deg, #1a0a0a 0%, #3a1a1a 100%)', emoji: '✊', label: 'The Grip'   },
    consequence: { bg: 'linear-gradient(160deg, #0a0a1a 0%, #1a1a3a 100%)', emoji: '📋', label: 'Called In'  },
    restored:    { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'Freedom'    },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Matthew 18:23–33',
    invitation: 'The forgiveness you received was enormous. The forgiveness being asked of you is small. The parable is about the math, and about what it does to you when you get it wrong. There is a version of yourself who holds nothing against anyone. That person is free in a way you can\'t be otherwise.',
  },
};
