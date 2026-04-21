// The Return   Prodigal Son (Luke 15:11–32)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'prologue',
  scene:
    "Your father sets down his coffee and listens without interrupting. He already knows what you're about to say   you've been avoiding his eyes for weeks. When you finally ask for your share of the inheritance now, today, he is quiet for a long moment. Then he stands, goes to the cabinet, and comes back with a folder. He writes the checks without speaking. When he slides them across the table, his hands are trembling slightly. You are twenty-four years old and free.",
  characterName: 'Your Father',
  characterRole: 'The man who raised you',
  leftChoice: { label: 'Leave without looking back.' },
  rightChoice: { label: 'Hug him before you go.' },
  leftDeltas:  { stat1: 0, stat2: -20, stat3: -8 },
  rightDeltas: { stat1: 0, stat2: -8,  stat3:  6 },
  journal: 'I asked for my inheritance and walked out the door.',
};

const PIGSTY_CARD = {
  id: 'pigsty',
  type: 'fixed',
  phase: 'famine',
  scene:
    "The warehouse is cold and smells like cardboard and mold. Your phone has been dead for four days. You're sorting returns for Dale. $9 an hour, cash. He never looks you in the eye. It's been eight months since you called home. At the break table you eat the leftover noodles someone left in the fridge. They taste like someone else's life. And then, for no reason you can name, the thought arrives with strange clarity: Even my dad's farmhands eat better than this. Even the people he pays minimum wage go home to something.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Push the thought away. Keep working.' },
  rightChoice: { label: 'I will get up and go home.' },
  leftDeltas:  { stat1:  5, stat2: 0, stat3: -12 },
  rightDeltas: { stat1:  0, stat2: 5, stat3:  28 },
  journal: 'Sitting in a cold warehouse, I finally came to myself.',
};

const TURNING_CARD = {
  id: 'turning',
  type: 'fixed',
  phase: 'turning',
  scene:
    "You practice the speech on the bus. Over and over until it's smooth: 'Father, I have sinned against heaven and against you. I'm not worthy to be called your son. Just make me one of your hired hands.' The words feel both true and terrifying. You watch the highway through the window   cities giving way to the flat land you grew up in. The exits grow familiar. Your mouth is dry.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Rehearse the speech again.' },
  rightChoice: { label: 'Stop rehearsing. Just go.' },
  leftDeltas:  { stat1: 0, stat2: 0, stat3:  8 },
  rightDeltas: { stat1: 0, stat2: 5, stat3: 15 },
  journal: 'I rehearsed my confession the whole way home.',
};

const FATHER_RUNS_CARD = {
  id: 'fatherRuns',
  type: 'fixed',
  phase: 'returning',
  scene:
    "The road is exactly as you remembered. The oak tree. The broken fence post. Your feet are heavy and you are still rehearsing the words when you see him. He's far away, a small figure in front of the house, and then he is moving. Running. Your father is running down the road toward you. Not walking, not standing in the yard with arms crossed. Running, like a man who has been watching this road every day. He reaches you before you can say anything. His arms are around you and he is weeping openly, holding the back of your head like you are still a child, and all your prepared words dissolve.",
  characterName: 'Your Father',
  characterRole: 'Who was watching the road',
  leftChoice: { label: '"Father, I\'m not worthy "' },
  rightChoice: { label: 'Just hold him. Say nothing.' },
  leftDeltas:  { stat1: 0, stat2: 22, stat3: 22 },
  rightDeltas: { stat1: 0, stat2: 22, stat3: 22 },
  journal: 'My father ran to meet me while I was still far off.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null; // → AI

  if (previousCardId === 'pigsty') {
    const newFlags = { ...flags, pigstyShown: true, pigstyAct: actNum };
    if (direction === 'right') return { card: TURNING_CARD, flags: newFlags };
    return null; // → AI (turning phase)
  }

  if (previousCardId === 'turning') {
    return { card: FATHER_RUNS_CARD, flags: { ...flags, turningShown: true } };
  }

  if (previousCardId === 'fatherRuns') {
    return { card: { id: 'feast', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  // Check if pigsty should trigger from AI card
  if (!flags.pigstyShown && (stats.stat1 <= 12 || actNum >= 16)) {
    return { card: PIGSTY_CARD, flags };
  }

  // Check if turning should trigger after pigsty
  if (flags.pigstyShown && !flags.turningShown && !flags.fatherRunsShown) {
    if (stats.stat3 >= 55 || actNum >= flags.pigstyAct + 3) {
      return { card: TURNING_CARD, flags };
    }
  }

  return null; // → AI
}

function getAIPhase(actNum) {
  if (actNum <= 7)  return 'city';
  if (actNum <= 13) return 'farCountry';
  return 'famine';
}

function getEnding(stats) {
  if (stats.stat3 >= 70) return {
    headline: 'You came home.',
    body: "Not because you had it together or earned it back. Because you got up and went. And he was already running.",
    sceneType: 'feast',
  };
  if (stats.stat3 >= 45) return {
    headline: 'Something changed in you.',
    body: "The road back was not easy. The words felt wrong in your mouth. But you took the step. That step was enough.",
    sceneType: 'embrace',
  };
  return {
    headline: 'You found your way back.',
    body: "Even after everything. The money, the choices, the long silence. The door was open. It was always open.",
    sceneType: 'fatherRunning',
  };
}

const PASSAGE = [
  { ref: '11–12', text: 'Jesus said: "There was a man who had two sons. The younger one said to his father, \'Father, give me my share of the estate.\' So he divided his property between them.' },
  { ref: '13–16', text: 'Not long after that, the younger son got together all he had, set off for a distant country and there squandered his wealth in wild living. After he had spent everything, there was a severe famine in that whole country, and he began to be in need. So he went and hired himself out to a citizen of that country, who sent him to his fields to feed pigs. He longed to fill his stomach with the pods that the pigs were eating, but no one gave him anything.' },
  { ref: '17–19', text: 'When he came to his senses, he said, \'How many of my father\'s hired servants have food to spare, and here I am starving to death! I will set out and go back to my father and say to him: Father, I have sinned against heaven and against you. I am no longer worthy to be called your son; make me like one of your hired servants.\'' },
  { ref: '20', text: 'So he got up and went to his father. But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son, threw his arms around him and kissed him.' },
  { ref: '21–24', text: 'The son said to him, \'Father, I have sinned against heaven and against you. I am no longer worthy to be called your son.\' But the father said to his servants, \'Quick! Bring the best robe and put it on him. Put a ring on his finger and sandals on his feet. Bring the fattened calf and kill it. Let\'s have a feast and celebrate. For this son of mine was dead and is alive again; he was lost and is found.\' So they began to celebrate.' },
];

export const prodigal = {
  id: 'prodigal',
  title: 'The Return',
  subtitle: 'A modern story of the prodigal son',
  scripture: 'Luke 15:11–32',
  verse: '"But while he was still a long way off, his father saw him."',
  verseRef: 'Luke 15:20',
  tagline: 'You took the money and left. Now you have neither.',
  description: 'You are the younger son. You have a full bank account, a father who loves you, and a plan that feels like freedom. Every choice you make will shift what you own, who you\'re connected to, and the state of your soul.',
  gradient: 'linear-gradient(135deg, #1a0800 0%, #4a2200 50%, #8B3A00 100%)',
  accentColor: '#D4A017',
  statConfig: {
    stat1: { key: 'stat1', name: 'Wealth',     color: 'linear-gradient(90deg, #8B6914, #D4A017)', icon: '💰' },
    stat2: { key: 'stat2', name: 'Connection', color: 'linear-gradient(90deg, #8B2020, #C24B3A)', icon: '❤️' },
    stat3: { key: 'stat3', name: 'Soul',       color: 'linear-gradient(90deg, #3A2A6A, #7B5EA8)', icon: '✦'  },
  },
  initialStats: { stat1: 85, stat2: 70, stat3: 15 },
  initialFlags: { pigstyShown: false, pigstyAct: 0, turningShown: false, fatherRunsShown: false },
  phases: [
    { key: 'prologue',   label: 'The Departure',    short: 'Departure',   ref: 'Luke 15:12', verse: '"Give me my share of the estate."',               watermark: 'DEPARTURE'   },
    { key: 'city',       label: 'Wild Living',       short: 'Wild Living', ref: 'Luke 15:13', verse: '"He squandered his wealth in wild living."',      watermark: 'WILD LIVING' },
    { key: 'farCountry', label: 'The Far Country',   short: 'Far Country', ref: 'Luke 15:14', verse: '"He spent everything."',                          watermark: 'FAR COUNTRY' },
    { key: 'famine',     label: 'The Famine',        short: 'The Famine',  ref: 'Luke 15:16', verse: '"No one gave him anything."',                     watermark: 'THE FAMINE'  },
    { key: 'turning',    label: 'Coming to Himself', short: 'Awakening',   ref: 'Luke 15:17', verse: '"He came to himself."',                           watermark: 'AWAKENING'   },
    { key: 'returning',  label: 'The Return',        short: 'Returning',   ref: 'Luke 15:20', verse: '"While he was still a long way off..."',          watermark: 'THE RETURN'  },
    { key: 'restored',   label: 'Restored',          short: 'Restored',    ref: 'Luke 15:24', verse: '"This son of mine was dead and is alive again."', watermark: 'RESTORED'    },
  ],
  phaseVisuals: {
    prologue:   { bg: 'linear-gradient(160deg, #2C3E50 0%, #4A4A6A 100%)', emoji: '🏠', label: 'Home' },
    city:       { bg: 'linear-gradient(160deg, #B7410E 0%, #E8A020 100%)', emoji: '🌆', label: 'The City' },
    farCountry: { bg: 'linear-gradient(160deg, #2D4A22 0%, #6B8F3A 100%)', emoji: '🍹', label: 'The Far Country' },
    famine:     { bg: 'linear-gradient(160deg, #2A2A2A 0%, #555555 100%)', emoji: '🌾', label: 'The Famine' },
    turning:    { bg: 'linear-gradient(160deg, #1A1A3A 0%, #3A3A6A 100%)', emoji: '💭', label: 'Coming to Himself' },
    returning:  { bg: 'linear-gradient(160deg, #7B3F00 0%, #D4A017 100%)', emoji: '🏃', label: 'The Return' },
    restored:   { bg: 'linear-gradient(160deg, #8B0000 0%, #D4A017 100%)', emoji: '🎊', label: 'Restored' },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Luke 15:11–24',
    invitation: 'This story is not just a parable. The father who runs is real. If you have ever felt the distance between who you are and who you were made to be, the invitation stands. Get up. Go back. He is watching the road.',
  },
};
