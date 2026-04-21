// The Find   The Hidden Treasure and Pearl (Matthew 13:44-46)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'searching',
  scene:
    "You have been in the business of beautiful things for a long time. You know what a fine pearl looks like. You know what searching for it costs. You have sold things you loved to buy things that were better. That is the logic of the trade. Then one day you see one you have never seen before. Your whole catalog goes quiet.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Wait. There must be something better.' },
  rightChoice: { label: 'This is the one.' },
  leftDeltas:  { stat1: 8,  stat2: -5,  stat3: -8  },
  rightDeltas: { stat1: -5, stat2: 5,   stat3: 12  },
  journal: 'I have been searching a long time. Then I saw it.',
};

const COST_CARD = {
  id: 'cost',
  type: 'fixed',
  phase: 'counting',
  scene:
    "You go home and start counting. Not because you are uncertain about the pearl but because you need to know what it will take. The answer is: everything. To buy this one thing, you would have to sell everything else. The inventory, the storefront, the reputation you have spent years building. You run the numbers twice. They come out the same.",
  characterName: 'The Ledger',
  characterRole: 'Which does not lie',
  leftChoice: { label: 'Maybe there is a way to keep some of it.' },
  rightChoice: { label: 'Fine. All of it.' },
  leftDeltas:  { stat1: 8,  stat2: -8,  stat3: -10 },
  rightDeltas: { stat1: -5, stat2: 10,  stat3: 15  },
  journal: 'The numbers come out the same every time. Everything.',
};

const SELLING_CARD = {
  id: 'selling',
  type: 'fixed',
  phase: 'sold',
  scene:
    "You start selling. Other merchants raise their eyebrows. Word gets around. He is liquidating. He must be desperate. They offer less than things are worth because they think you need the money fast. They're right that you need the money fast. They are wrong about why. None of them would understand if you tried to explain it.",
  characterName: 'The Other Merchants',
  characterRole: 'Who think you have lost your mind',
  leftChoice: { label: 'Maybe they\'re right. Is this foolish?' },
  rightChoice: { label: 'They don\'t know what I know.' },
  leftDeltas:  { stat1: 10, stat2: -10, stat3: -12 },
  rightDeltas: { stat1: -8, stat2: 12,  stat3: 18  },
  journal: 'They think I am desperate. They are wrong about why.',
};

const PEARL_CARD = {
  id: 'pearl',
  type: 'fixed',
  phase: 'joy',
  scene:
    "You make the purchase. You are holding it now. You have nothing left in the world except the thing you sold everything to have. There is no part of your old life that survived this transaction intact. And you are -- you are surprised to realize this -- you are not sad. The thing you are holding is worth exactly what it cost.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'I hope I haven\'t made a mistake.' },
  rightChoice: { label: 'I would do it again.' },
  leftDeltas:  { stat1: 8,  stat2: -8,  stat3: -8  },
  rightDeltas: { stat1: -5, stat2: 8,   stat3: 28  },
  journal: 'I have nothing left except the thing I sold everything for. That is enough.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.costShown && actNum >= 3) {
    return { card: COST_CARD, flags: { ...flags, costShown: true } };
  }
  if (flags.costShown && !flags.sellingShown && actNum >= 6) {
    return { card: SELLING_CARD, flags: { ...flags, sellingShown: true } };
  }
  if (flags.sellingShown && !flags.pearlShown && actNum >= 9) {
    return { card: PEARL_CARD, flags: { ...flags, pearlShown: true } };
  }
  if (flags.pearlShown && actNum >= 11) {
    return { card: { id: 'ending', type: 'ending', phase: 'joy' }, flags, isEnding: true };
  }
  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 2)  return 'searching';
  if (actNum <= 5)  return 'counting';
  if (actNum <= 8)  return 'sold';
  return 'joy';
}

function getEnding(stats) {
  if (stats.stat3 >= 55) return {
    headline: 'Worth every bit of it.',
    body: "You have nothing left in your inventory. You have the pearl. The parable is not about sacrifice -- it is about joy. The man in the field ran. He sold everything, not in resignation, but because the thing in the ground made everything else feel like a fair trade. You understand that now.",
    sceneType: 'openRoad',
  };
  if (stats.stat3 >= 25) return {
    headline: 'I would do it again.',
    body: "It cost more than you thought it would. You would not take any of it back. The merchants think you are a fool. They do not know what you are holding. Some things are worth more than the sum of everything else, and when you find one of those things, the math is simple.",
    sceneType: 'doorway',
  };
  return {
    headline: 'Still counting.',
    body: "You made the purchase. You are holding the thing you sold everything for. You are still deciding if it was worth it. Maybe that is the honest place to start. The question the parable is asking is whether you found the thing that makes the answer obvious.",
    sceneType: 'poolSide',
  };
}

const PASSAGE = [
  { ref: '44', text: '"The kingdom of heaven is like treasure hidden in a field. When a man found it, he hid it again, and then in his joy went and sold all he had and bought that field."' },
  { ref: '45-46', text: '"Again, the kingdom of heaven is like a merchant looking for fine pearls. When he found one of great value, he went away and sold everything he had and bought it."' },
];

export const treasure = {
  id: 'treasure',
  title: 'The Find',
  subtitle: 'The hidden treasure and the pearl',
  scripture: 'Matthew 13:44-46',
  verse: '"In his joy he went and sold all he had and bought that field."',
  verseRef: 'Matthew 13:44',
  tagline: "You have been in the business of fine things your whole career. You have never seen anything like this.",
  description: "You are a merchant who has spent years searching for fine pearls. You know what to look for. You know what things cost. Then you find the one that changes the math on everything else. You track your certainty, what you are willing to give up, and the slow arrival of something that feels like joy.",
  gradient: 'linear-gradient(135deg, #100C08 0%, #281E10 50%, #382A18 100%)',
  accentColor: '#C4973A',
  statConfig: {
    stat1: { key: 'stat1', name: 'Certainty', color: 'linear-gradient(90deg, #1a1408, #3a2c14)', icon: '⚖️' },
    stat2: { key: 'stat2', name: 'Cost',      color: 'linear-gradient(90deg, #1a1208, #382810)', icon: '💰' },
    stat3: { key: 'stat3', name: 'Joy',       color: 'linear-gradient(90deg, #1a1008, #604020)', icon: '✦'  },
  },
  initialStats: { stat1: 55, stat2: 15, stat3: 5 },
  initialFlags: { costShown: false, sellingShown: false, pearlShown: false },
  phases: [
    { key: 'searching', label: 'The Search',    short: 'Searching', ref: 'Matt 13:45', verse: '"A merchant looking for fine pearls."',                            watermark: 'SEARCHING'  },
    { key: 'counting',  label: 'Counting Up',   short: 'Counting',  ref: 'Matt 13:44', verse: '"He went and sold all he had."',                                   watermark: 'COUNTING'   },
    { key: 'sold',      label: 'Selling Off',   short: 'Selling',   ref: 'Matt 13:46', verse: '"He went away and sold everything he had."',                       watermark: 'SELLING OFF' },
    { key: 'joy',       label: 'The Purchase',  short: 'Joy',       ref: 'Matt 13:44', verse: '"In his joy he went and sold all he had and bought that field."',  watermark: 'THE FIND'   },
  ],
  phaseVisuals: {
    searching: { bg: 'linear-gradient(160deg, #100C08 0%, #201810 100%)', emoji: '🔍', label: 'Searching'   },
    counting:  { bg: 'linear-gradient(160deg, #141008 0%, #281C10 100%)', emoji: '⚖️', label: 'Counting'    },
    sold:      { bg: 'linear-gradient(160deg, #100C06 0%, #241808 100%)', emoji: '💰', label: 'Selling Off'  },
    joy:       { bg: 'linear-gradient(160deg, #141008 0%, #382010 100%)', emoji: '✦',  label: 'The Find'    },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Matthew 13:44-46',
    invitation: "The parable does not say the man sold everything reluctantly. It says in his joy. He was not making a sacrifice -- he was making a trade, and he knew the math. The kingdom is worth finding because when you do, nothing else competes.",
  },
};
