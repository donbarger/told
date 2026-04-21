// The Gate   Lazarus and the Rich Man (Luke 16:19–31)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'comfort',
  scene:
    "Your house is on the corner of a good street in a good neighborhood. You have a cleaning service on Tuesdays and a car that starts every time. You give to your alma mater and to a cancer foundation. You are not a bad person. You drive past the same man most mornings on the way to work. He's always by the underpass near your off-ramp. You noticed him the first week. Now you don't notice him.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'This is just city life. Keep going.' },
  rightChoice: { label: 'I\'ve been ignoring him. Why?' },
  leftDeltas:  { stat1: 5,  stat2: -8, stat3: -12 },
  rightDeltas: { stat1: -5, stat2: 12, stat3:  15 },
  journal: 'There\'s a man by the underpass I stopped seeing months ago.',
};

const NOTICING_CARD = {
  id: 'noticing',
  type: 'fixed',
  phase: 'awareness',
  scene:
    "His name is Laz. You learned it from a woman at the coffee shop who says he's been there two years. Not unstable, not a threat, just nowhere to go. He has a dog named Patch. On rainy days someone from the church on Fifth Street drops off sandwiches. You have driven past this man four hundred times. You eat lunch today at a restaurant that charges forty-two dollars for a pasta dish. The contrast sits in your chest like something you swallowed wrong.",
  characterName: 'Laz',
  characterRole: 'Who\'s been there two years',
  leftChoice: { label: 'It\'s not that simple. You can\'t fix homelessness.' },
  rightChoice: { label: 'Stop for him on the way home.' },
  leftDeltas:  { stat1: 5,  stat2: -5, stat3: -10 },
  rightDeltas: { stat1: -5, stat2: 15, stat3:  18 },
  journal: 'I learned his name today. He\'s been there two years.',
};

const CHOICE_CARD = {
  id: 'choosing',
  type: 'fixed',
  phase: 'choosing',
  scene:
    "You stop. He looks up, a little surprised, the dog comes over. You don't know what to do next. Bring cash, buy him lunch, ask what he needs. Or just talk. Whatever you give will not solve anything. Whatever you don't give will not cost you anything. You have more than enough, in every direction. He has almost none. The gate between your lives is not locked. You are the only one who decides whether it opens.",
  characterName: 'Laz',
  characterRole: 'Who\'s been waiting at the gate',
  leftChoice: { label: 'Give what you have. Open the gate.' },
  rightChoice: { label: 'Make a promise you\'ll follow up properly.' },
  leftDeltas:  { stat1: -10, stat2: 15, stat3: 25 },
  rightDeltas: { stat1:  0,  stat2:  5, stat3:  8 },
  journal: 'I stopped. The gate was open. It always was.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.noticingShown && actNum >= 5) {
    return { card: NOTICING_CARD, flags: { ...flags, noticingShown: true } };
  }

  if (flags.noticingShown && !flags.choosingShown && actNum >= 8) {
    return { card: CHOICE_CARD, flags: { ...flags, choosingShown: true } };
  }

  if (flags.choosingShown && actNum >= 11) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 4)  return 'comfort';
  if (actNum <= 7)  return 'awareness';
  return 'choosing';
}

function getEnding(stats) {
  if (stats.stat3 >= 65) return {
    headline: 'You crossed to his side.',
    body: "Not to fix anything. To see him. To stop letting the gate between your lives stay closed. That's the whole story. That's the whole ask.",
    sceneType: 'roadsideHelp',
  };
  if (stats.stat3 >= 35) return {
    headline: 'You started to see him.',
    body: "After months of looking past him, you saw him as a person. That's a beginning. What happens next is still yours to write.",
    sceneType: 'longRoad',
  };
  return {
    headline: 'The gate stayed closed.',
    body: "This story is a warning. Not a condemnation. A warning. There is still a man by your underpass. The gate is still in your hands.",
    sceneType: 'coldStreet',
  };
}

const PASSAGE = [
  { ref: '19–21', text: '"There was a rich man who was dressed in purple and fine linen and lived in luxury every day. At his gate was laid a beggar named Lazarus, covered with sores and longing to eat what fell from the rich man\'s table. Even the dogs came and licked his sores."' },
  { ref: '22–23', text: '"The time came when the beggar died and the angels carried him to Abraham\'s side. The rich man also died and was buried. In Hades, where he was in torment, he looked up and saw Abraham far away, with Lazarus by his side."' },
  { ref: '24–25', text: '"He called to him, \'Father Abraham, have pity on me and send Lazarus to dip the tip of his finger in water and cool my tongue, because I am in agony in this fire.\' But Abraham replied, \'Son, remember that in your lifetime you received your good things, while Lazarus received bad things, but now he is comforted here and you are in agony.\'"' },
  { ref: '26', text: '"And besides all this, between us and you a great chasm has been set in place, so that those who want to go from here to you cannot, nor can anyone cross over from there to us."' },
];

export const gate = {
  id: 'gate',
  title: 'The Gate',
  subtitle: 'A modern story of Lazarus and the rich man',
  scripture: 'Luke 16:19–31',
  verse: '"At his gate was laid a beggar named Lazarus."',
  verseRef: 'Luke 16:20',
  tagline: 'You drove past him four hundred times. Today you finally noticed his name.',
  description: 'Your life is comfortable. A man named Laz has been sitting by your off-ramp for two years. You stopped seeing him months ago. This story asks a simple question: when did the gate between you become so easy to keep closed? You track your comfort, your awareness, and your compassion.',
  gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a1a 100%)',
  accentColor: '#8a7a3a',
  statConfig: {
    stat1: { key: 'stat1', name: 'Comfort',     color: 'linear-gradient(90deg, #3a3a1a, #8a7a3a)', icon: '🏠' },
    stat2: { key: 'stat2', name: 'Awareness',   color: 'linear-gradient(90deg, #1a3a3a, #3a8a8a)', icon: '👁️' },
    stat3: { key: 'stat3', name: 'Compassion',  color: 'linear-gradient(90deg, #2a1a3a, #6a4a8a)', icon: '✦' },
  },
  initialStats: { stat1: 90, stat2: 10, stat3: 20 },
  initialFlags: { noticingShown: false, choosingShown: false },
  phases: [
    { key: 'comfort',   label: 'The Good Street',  short: 'Comfortable', ref: 'Luke 16:19', verse: '"Dressed in purple, living in luxury every day."', watermark: 'COMFORT'    },
    { key: 'awareness', label: 'Learning His Name', short: 'Noticing',    ref: 'Luke 16:20', verse: '"At his gate was laid a beggar named Lazarus."',  watermark: 'NOTICING'   },
    { key: 'choosing',  label: 'The Gate',          short: 'The Gate',    ref: 'Luke 16:26', verse: '"A great chasm has been set in place."',          watermark: 'THE GATE'   },
    { key: 'restored',  label: 'The Crossing',      short: 'Crossing',    ref: 'Luke 16:21', verse: '"Longing to eat what fell from the rich man\'s table."', watermark: 'CROSSING' },
  ],
  phaseVisuals: {
    comfort:   { bg: 'linear-gradient(160deg, #1a1a0a 0%, #3a3a1a 100%)', emoji: '🏠', label: 'Comfortable' },
    awareness: { bg: 'linear-gradient(160deg, #0a1a1a 0%, #1a3a3a 100%)', emoji: '👁️', label: 'Noticing'    },
    choosing:  { bg: 'linear-gradient(160deg, #1a0a0a 0%, #3a1a1a 100%)', emoji: '🚪', label: 'The Gate'    },
    restored:  { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🤝', label: 'Crossing'    },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Luke 16:19–26',
    invitation: 'The parable doesn\'t condemn wealth. It condemns invisibility. There is someone at your gate. The chasm the parable describes is built one ignored morning at a time. It doesn\'t have to be. The gate is still in your hands.',
  },
};
