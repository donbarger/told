// The Portfolio   Parable of the Talents (Matthew 25:14–30)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'receiving',
  scene:
    "Your uncle died eight months ago and left you $340,000. Not life-changing money, but enough to matter if you're smart about it. You're thirty-two, renting, working a job that pays the bills and nothing more. There was a note with the inheritance: 'You're more capable than you know. Do something with it.' You haven't touched the account. You've been telling yourself you're waiting until you figure out the right move.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Keep waiting. Don\'t risk it.' },
  rightChoice: { label: 'It\'s time to figure out what to do.' },
  leftDeltas:  { stat1: 5,  stat2: -5, stat3: -10 },
  rightDeltas: { stat1: -5, stat2: 10, stat3:  12 },
  journal: 'I\'ve had the inheritance for eight months and done nothing with it.',
};

const CHOICE_CARD = {
  id: 'choice',
  type: 'fixed',
  phase: 'deciding',
  scene:
    "You have three options in front of you. A friend wants you to invest in her restaurant   she's good, but restaurants fail. A nonprofit that trains people for skilled trades is looking for a major donor   they have a proven track record. And you could start the design studio you've been sketching plans for since grad school. Your accountant says the safest thing is a diversified index fund. She is not wrong. But your uncle didn't leave you money to be safe.",
  characterName: 'Your Accountant',
  characterRole: 'Who counsels caution',
  leftChoice: { label: 'Play it safe. Index fund.' },
  rightChoice: { label: 'Risk something. Do something real.' },
  leftDeltas:  { stat1: 10, stat2: -10, stat3: -15 },
  rightDeltas: { stat1: -15, stat2: 15, stat3:  20 },
  journal: 'I chose between safety and risk. The money was not the question.',
};

const RECKONING_CARD = {
  id: 'reckoning',
  type: 'fixed',
  phase: 'reckoning',
  scene:
    "Two years have passed. You're going to have to account for what you did. Not to a judge   to yourself, mostly. And to the memory of a man who believed in you before you believed in yourself. You open the spreadsheet. Whatever happened, happened. The number on the screen tells part of the story. The other part is what you learned, who you became, whether you buried the thing or risked it.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'The number is the answer.' },
  rightChoice: { label: 'The number is not the whole answer.' },
  leftDeltas:  { stat1: 5, stat2: -5, stat3: -10 },
  rightDeltas: { stat1: 0, stat2: 10, stat3:  18 },
  journal: 'Two years later, I had to look at what I did and didn\'t do.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.choiceShown && actNum >= 5) {
    return { card: CHOICE_CARD, flags: { ...flags, choiceShown: true } };
  }

  if (flags.choiceShown && !flags.reckoningShown && actNum >= 10) {
    return { card: RECKONING_CARD, flags: { ...flags, reckoningShown: true } };
  }

  if (flags.reckoningShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 4)  return 'receiving';
  if (actNum <= 9)  return 'deciding';
  return 'reckoning';
}

function getEnding(stats) {
  if (stats.stat3 >= 65) return {
    headline: 'Well done.',
    body: "You took the thing you were given and put it to work. Some of it failed. Some of it grew. You weren't the same person at the end. That's the whole point.",
    sceneType: 'feast',
  };
  if (stats.stat3 >= 40) return {
    headline: 'You invested it.',
    body: "Not perfectly. But you risked it, which is what faithfulness looks like from the inside. The master comes back for someone who tried.",
    sceneType: 'abundance',
  };
  return {
    headline: 'You buried it.',
    body: "Fear is a powerful accountant. It tells you the only way to not lose is to not risk. That is almost true, and exactly wrong.",
    sceneType: 'coldStreet',
  };
}

const PASSAGE = [
  { ref: '14–15', text: '"Again, it will be like a man going on a journey, who called his servants and entrusted his wealth to them. To one he gave five bags of gold, to another two bags, and to another one bag, each according to his ability. Then he went on his journey."' },
  { ref: '16–18', text: 'The man who had received five bags of gold went at once and put his money to work and gained five bags more. So also, the one with two bags of gold gained two more. But the man who had received one bag went off, dug a hole in the ground and hid his master\'s money.' },
  { ref: '21', text: '"His master replied, \'Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things. Come and share your master\'s happiness!\'"' },
  { ref: '25–26', text: '"I was afraid and went out and hid your gold in the ground. See, here is what belongs to you." His master replied, "You wicked, lazy servant! ... you should have put my money on deposit with the bankers, so that when I returned I would have received it back with interest."' },
];

export const talents = {
  id: 'talents',
  title: 'The Portfolio',
  subtitle: 'A modern story of the Parable of the Talents',
  scripture: 'Matthew 25:14–30',
  verse: '"Each according to his ability."',
  verseRef: 'Matthew 25:15',
  tagline: 'You were given something real and told to do something with it. The clock is running.',
  description: 'You\'ve inherited resources   money, talent, opportunity   and done nothing with them for eight months. The question isn\'t what to do with what you have. The question is whether fear will be your final answer. You track your security, your growth, and your faithfulness.',
  gradient: 'linear-gradient(135deg, #1a1a0a 0%, #3a3a1a 50%, #6a5a1a 100%)',
  accentColor: '#c4a03a',
  statConfig: {
    stat1: { key: 'stat1', name: 'Security',     color: 'linear-gradient(90deg, #3a2a0a, #8a6a1a)', icon: '🏦' },
    stat2: { key: 'stat2', name: 'Growth',       color: 'linear-gradient(90deg, #1a3a1a, #4a8a4a)', icon: '📈' },
    stat3: { key: 'stat3', name: 'Faithfulness', color: 'linear-gradient(90deg, #2a1a4a, #6a4a9a)', icon: '✦' },
  },
  initialStats: { stat1: 75, stat2: 40, stat3: 30 },
  initialFlags: { choiceShown: false, reckoningShown: false },
  phases: [
    { key: 'receiving',  label: 'The Inheritance',  short: 'Received',  ref: 'Matt 25:15', verse: '"Each according to his ability."',                 watermark: 'RECEIVED'    },
    { key: 'deciding',   label: 'The Decision',     short: 'Deciding',  ref: 'Matt 25:16', verse: '"Went at once and put his money to work."',        watermark: 'DECIDING'    },
    { key: 'reckoning',  label: 'The Return',       short: 'Reckoning', ref: 'Matt 25:19', verse: '"The master returned and settled accounts."',      watermark: 'RECKONING'   },
    { key: 'restored',   label: 'The Answer',       short: 'The Word',  ref: 'Matt 25:21', verse: '"Well done, good and faithful servant."',          watermark: 'WELL DONE'   },
  ],
  phaseVisuals: {
    receiving:  { bg: 'linear-gradient(160deg, #1a1a0a 0%, #3a3a1a 100%)', emoji: '📦', label: 'Received'   },
    deciding:   { bg: 'linear-gradient(160deg, #1a2a0a 0%, #3a5a1a 100%)', emoji: '⚖️', label: 'Deciding'   },
    reckoning:  { bg: 'linear-gradient(160deg, #2a1a0a 0%, #5a3a0a 100%)', emoji: '📋', label: 'Reckoning'  },
    restored:   { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'The Word'   },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Matthew 25:14–26',
    invitation: 'What were you given? Not just money. Gifts. Platform. Relationships. Time. The question the master asks is not "did you protect it?" It\'s "did you multiply it?" Fear is not faithfulness. What are you still waiting to risk?',
  },
};
