// The Bigger Barn   Rich Fool (Luke 12:13-21)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'expanding',
  scene:
    "This is the best year you have ever had. You are not bragging. It is just true. The numbers are real, the deal closed, the account cleared. You built something from nothing and now it is paying off in ways you stopped letting yourself imagine two years ago. You are not finished. You have plans for the rest. You have been drafting them on your phone at night, working out what comes next. The question of what it is all for has not come up yet. You are too busy to let it.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Build on this. Don\'t stop now.' },
  rightChoice: { label: 'Notice the question you haven\'t asked.' },
  leftDeltas:  { stat1: 8,  stat2: 8,  stat3: -10 },
  rightDeltas: { stat1: -5, stat2: -5, stat3:  12 },
  journal: 'Best year I have ever had. Plans are drafted. The question of what it is for has not come up.',
};

const PLANS_CARD = {
  id: 'plans',
  type: 'fixed',
  phase: 'planning',
  scene:
    "You pull up the spreadsheet. The projections are solid. You are going to need more space, more staff, more infrastructure. The plan is to scale and then stabilize. Retire the risk, lock in the income, and finally relax. You have been saying you would relax for six years. You mean it this time. The plan is real. The math works. You fall asleep with the numbers still running. At 3 a.m. something wakes you up and you do not know what it was.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'The plan is solid. Go back to sleep.' },
  rightChoice: { label: 'Stay with whatever woke you up.' },
  leftDeltas:  { stat1: 8,  stat2: 5,  stat3: -12 },
  rightDeltas: { stat1: -5, stat2: 0,  stat3:  18 },
  journal: 'The plan is solid. At 3 a.m. something woke me up.',
};

const VOICE_CARD = {
  id: 'voice',
  type: 'fixed',
  phase: 'interrupted',
  scene:
    "The story says: God said to him, you fool, this night your soul is required of you. It does not say he was warned. It does not say he got to argue. It says this night. The things you have prepared, whose will they be? You are not going to die tonight. But you will die someday, and the version of you that makes plans without asking that question is the version this story is about. You have been running projections on the wrong variable.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'There\'s time to think about this later.' },
  rightChoice: { label: 'This is the thing you have been avoiding.' },
  leftDeltas:  { stat1: 5,  stat2: 5,  stat3: -18 },
  rightDeltas: { stat1: -8, stat2: -5, stat3:  25 },
  journal: 'The plans will belong to someone else someday. I have not been running the right projections.',
};

const RICH_CARD = {
  id: 'rich',
  type: 'fixed',
  phase: 'reckoning',
  scene:
    "Jesus says this about the man: he stored up things for himself but was not rich toward God. The indictment is not the barn. Not the harvest. Not the planning. It is the toward. Everything was pointed in one direction. The accumulation was real. The security was real. And none of it touched the thing that actually needed to be fed. You have worked very hard this year. The question is not whether it mattered. The question is what it was for.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'What I\'ve built is real. That counts.' },
  rightChoice: { label: 'What I\'m building toward is the question.' },
  leftDeltas:  { stat1: 8,  stat2: 8,  stat3: -15 },
  rightDeltas: { stat1: -5, stat2: -5, stat3:  28 },
  journal: 'Rich toward God. I have been running the math but asking the wrong question.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.plansShown && actNum >= 4) {
    return { card: PLANS_CARD, flags: { ...flags, plansShown: true } };
  }

  if (flags.plansShown && !flags.voiceShown && actNum >= 7) {
    return { card: VOICE_CARD, flags: { ...flags, voiceShown: true } };
  }

  if (flags.voiceShown && !flags.richShown && actNum >= 10) {
    return { card: RICH_CARD, flags: { ...flags, richShown: true } };
  }

  if (flags.richShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'expanding';
  if (actNum <= 6)  return 'planning';
  if (actNum <= 9)  return 'interrupted';
  return 'reckoning';
}

function getEnding(stats) {
  if (stats.stat3 >= 60) return {
    headline: 'You asked the right question.',
    body: "Not what to build next. What it is for. That question changes the math entirely. You are still going to work. The barn is still going to get bigger. But something in you is now oriented toward a different kind of richness.",
    sceneType: 'longRoad',
  };
  if (stats.stat3 >= 35) return {
    headline: 'The 3 a.m. question is still open.',
    body: "Something woke you up and you stayed with it long enough to feel it. You have not resolved it. But you are carrying a question now that you were not carrying this morning. That is not nothing.",
    sceneType: 'apartment',
  };
  return {
    headline: 'The barn is bigger.',
    body: "The plan is working. The math checks out. And a story Jesus told about a man exactly like you ends with three words: you fool, tonight. Not as condemnation. As an invitation to ask what the barn is actually for.",
    sceneType: 'wealthDisplay',
  };
}

const PASSAGE = [
  { ref: '16-19', text: '"The ground of a certain rich man yielded an abundant harvest. He thought to himself, What shall I do? I have no place to store my crops. Then he said, This is what I will do. I will tear down my barns and build bigger ones, and there I will store my surplus grain. And I will say to myself, You have plenty of grain laid up for many years. Take life easy; eat, drink and be merry."' },
  { ref: '20', text: '"But God said to him, You fool! This very night your life will be demanded from you. Then who will get what you have prepared for yourself?"' },
  { ref: '21', text: '"This is how it will be with whoever stores up things for themselves but is not rich toward God."' },
];

export const richFool = {
  id: 'richFool',
  title: 'The Bigger Barn',
  subtitle: 'A modern story of the rich fool',
  scripture: 'Luke 12:13-21',
  verse: '"Rich toward God."',
  verseRef: 'Luke 12:21',
  tagline: "Best year of your career. The plans are solid. Tonight something interrupts the spreadsheet.",
  description: "You have built something real. The numbers are good and the plans are better. You are in expansion mode, drafting what comes next. Then a question arrives that the spreadsheet cannot answer. You track your wealth, your plans, and your awareness of what it is all for.",
  gradient: 'linear-gradient(135deg, #0e0a04 0%, #241a08 50%, #3a2c10 100%)',
  accentColor: '#c8a84a',
  statConfig: {
    stat1: { key: 'stat1', name: 'Wealth',    color: 'linear-gradient(90deg, #3a2c10, #8a6c30)', icon: '🏦' },
    stat2: { key: 'stat2', name: 'Plans',     color: 'linear-gradient(90deg, #2a3a1a, #5a7a3a)', icon: '📐' },
    stat3: { key: 'stat3', name: 'Awareness', color: 'linear-gradient(90deg, #1a2a3a, #4a6a8a)', icon: '✦' },
  },
  initialStats: { stat1: 90, stat2: 75, stat3: 10 },
  initialFlags: { plansShown: false, voiceShown: false, richShown: false },
  phases: [
    { key: 'expanding',   label: 'The Harvest',        short: 'Expanding',    ref: 'Luke 12:16', verse: '"The ground yielded an abundant harvest."',        watermark: 'THE HARVEST'  },
    { key: 'planning',    label: 'The Bigger Barn',     short: 'Planning',     ref: 'Luke 12:17', verse: '"I will tear down my barns and build bigger ones."', watermark: 'THE BARN'     },
    { key: 'interrupted', label: 'This Night',          short: 'Interrupted',  ref: 'Luke 12:20', verse: '"This very night your life will be demanded."',    watermark: 'THIS NIGHT'   },
    { key: 'reckoning',   label: 'Rich Toward God',     short: 'The Question', ref: 'Luke 12:21', verse: '"Not rich toward God."',                          watermark: 'TOWARD GOD'   },
    { key: 'restored',    label: 'The Real Accounting', short: 'Reckoning',    ref: 'Luke 12:21', verse: '"Rich toward God."',                              watermark: 'REAL WEALTH'  },
  ],
  phaseVisuals: {
    expanding:   { bg: 'linear-gradient(160deg, #0e0a04 0%, #241a08 100%)', emoji: '🌾', label: 'The Harvest'   },
    planning:    { bg: 'linear-gradient(160deg, #140c04 0%, #302010 100%)', emoji: '📐', label: 'The Barn'      },
    interrupted: { bg: 'linear-gradient(160deg, #080808 0%, #181410 100%)', emoji: '🌑', label: 'This Night'    },
    reckoning:   { bg: 'linear-gradient(160deg, #0a1018 0%, #1a2030 100%)', emoji: '⚖️', label: 'The Question'  },
    restored:    { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'Real Wealth'   },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Luke 12:16-21',
    invitation: 'Jesus was not against wealth. He was against building a life where wealth is the answer to every question except the one that matters. The man in the story was not evil. He was just oriented wrong. Rich toward God means something is growing in you that does not fit in a barn. The harvest you actually need cannot be stored.',
  },
};
