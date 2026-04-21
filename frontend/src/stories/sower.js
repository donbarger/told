// The Field   Parable of the Sower (Mark 4:1–20)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'receiving',
  scene:
    "It came the way things like this usually come, sideways, through a side door you weren't watching. A conversation at a funeral. A sentence in a book you picked up at an airport. A voice note your brother sent at 2 AM. Something arrived and you knew it was important and you didn't know what to do with it. You set it aside. But here it is again. The same idea, the same pull. You're going to have to decide what kind of ground you are.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'It\'s interesting. Set it aside again.' },
  rightChoice: { label: 'Stay with it. Don\'t look away.' },
  leftDeltas:  { stat1: 5,  stat2:  5, stat3: -10 },
  rightDeltas: { stat1: -5, stat2: -5, stat3:  15 },
  journal: 'Something arrived again. I\'m trying to figure out what kind of ground I am.',
};

const TESTING_CARD = {
  id: 'testing',
  type: 'fixed',
  phase: 'testing',
  scene:
    "Three things happened in one week that made the whole idea feel naive. A conversation with a skeptical friend who has good arguments. A work situation that rewards exactly the kind of thing you were thinking of letting go. And a family dinner where the version of yourself that agrees with everyone showed up and ran the table. The seed is still there. But so is the concrete.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'The skeptic has a point. You\'re probably overthinking this.' },
  rightChoice: { label: 'The resistance is the signal, not the argument.' },
  leftDeltas:  { stat1: 8,  stat2: 8,  stat3: -18 },
  rightDeltas: { stat1: -5, stat2: -8, stat3:  20 },
  journal: 'Everything pushed back at once. I tried to figure out what that meant.',
};

const THORNS_CARD = {
  id: 'thorns',
  type: 'fixed',
  phase: 'growing',
  scene:
    "The idea is still alive, but it's thin. The work expanded when you weren't watching. Your phone is a constant obligation. The podcast you were going to listen to is still in your queue. The thing that arrived has been waiting for you for three months in the notes app on your phone, below seventeen other notes you also haven't read. Busyness is not an argument. But it's very effective.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'You\'ll get back to it when things settle.' },
  rightChoice: { label: 'Nothing settles. You have to carve time now.' },
  leftDeltas:  { stat1:  8, stat2: 5,  stat3: -15 },
  rightDeltas: { stat1: -8, stat2: -5, stat3:  20 },
  journal: 'The idea is still in my notes app. I haven\'t touched it in three months.',
};

const FRUIT_CARD = {
  id: 'fruit',
  type: 'fixed',
  phase: 'bearing',
  scene:
    "You came back to it. You don't know exactly when the soil changed, but something softened. The thing that arrived, you've been working with it, in the spaces between the other things, and it's growing. Slowly. It doesn't look like the yield you imagined. But it's real, which is something you can't say about a lot of the noise around it. What you do with it now determines the rest of the story.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'This is enough. Tend what\'s growing.' },
  rightChoice: { label: 'Give it away. Tell someone.' },
  leftDeltas:  { stat1: 5,  stat2:  5, stat3: 15 },
  rightDeltas: { stat1: -5, stat2: 20, stat3: 25 },
  journal: 'Something is growing. I don\'t know when the soil changed, but it did.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.testingShown && actNum >= 4) {
    return { card: TESTING_CARD, flags: { ...flags, testingShown: true } };
  }

  if (flags.testingShown && !flags.thornsShown && actNum >= 7) {
    return { card: THORNS_CARD, flags: { ...flags, thornsShown: true } };
  }

  if (flags.thornsShown && !flags.fruitShown && actNum >= 10) {
    return { card: FRUIT_CARD, flags: { ...flags, fruitShown: true } };
  }

  if (flags.fruitShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'receiving';
  if (actNum <= 6)  return 'testing';
  if (actNum <= 9)  return 'growing';
  return 'bearing';
}

function getEnding(stats) {
  if (stats.stat3 >= 65) return {
    headline: 'Good soil.',
    body: "Thirty, sixty, a hundred times what was planted. You let it take root and didn't pull it up when it got hard. That's what good soil does.",
    sceneType: 'abundance',
  };
  if (stats.stat3 >= 40) return {
    headline: 'Something grew.',
    body: "Not the harvest you pictured. But real growth, which is rarer than it sounds. You let the seed in instead of paving over it.",
    sceneType: 'longRoad',
  };
  return {
    headline: 'The seed is still there.',
    body: "It hasn't died. That's the surprising thing about seeds. They wait. The soil can still change. It can still take root.",
    sceneType: 'apartment',
  };
}

const PASSAGE = [
  { ref: '3–8', text: '"Listen! A farmer went out to sow his seed. As he was scattering the seed, some fell along the path, and the birds came and ate it up. Some fell on rocky places, where it did not have much soil. It sprang up quickly, because the soil was shallow. But when the sun came up, the plants were scorched, and they withered because they had no root. Other seed fell among thorns, which grew up and choked the plants, so that they did not bear grain. Still other seed fell on good soil. It came up, grew and produced a crop, some multiplying thirty, some sixty, some a hundred times."' },
  { ref: '14–15', text: '"The farmer sows the word. Some people are like seed along the path, where the word is sown. As soon as they hear it, Satan comes and takes away the word that was sown in them."' },
  { ref: '16–17', text: '"Others, like seed sown on rocky places, hear the word and at once receive it with joy. But since they have no root, they last only a short time. When trouble or persecution comes because of the word, they quickly fall away."' },
  { ref: '18–20', text: '"Still others, like seed sown among thorns, hear the word; but the worries of this life, the deceitfulness of wealth and the desires for other things come in and choke the word, making it unfruitful. Others, like seed sown on good soil, hear the word, accept it, and produce a crop, some thirty, some sixty, some a hundred times what was sown."' },
];

export const sower = {
  id: 'sower',
  title: 'The Field',
  subtitle: 'A modern story of the Parable of the Sower',
  scripture: 'Mark 4:1–20',
  verse: '"Still other seed fell on good soil."',
  verseRef: 'Mark 4:8',
  tagline: 'Something arrived and you haven\'t figured out what to do with it. It\'s still waiting.',
  description: 'A message, a call, an idea, an encounter: something important landed and you set it aside. Now it\'s back. The parable is about what kind of ground you are when truth arrives. You track your rootedness, your resistance, and your openness.',
  gradient: 'linear-gradient(135deg, #0a1a0a 0%, #1a3a0a 50%, #3a5a1a 100%)',
  accentColor: '#7a9a3a',
  statConfig: {
    stat1: { key: 'stat1', name: 'Rootedness',  color: 'linear-gradient(90deg, #2a3a0a, #6a7a1a)', icon: '🌱' },
    stat2: { key: 'stat2', name: 'Distraction', color: 'linear-gradient(90deg, #3a1a0a, #8a4a1a)', icon: '📱' },
    stat3: { key: 'stat3', name: 'Openness',    color: 'linear-gradient(90deg, #1a2a3a, #4a6a8a)', icon: '✦' },
  },
  initialStats: { stat1: 50, stat2: 65, stat3: 25 },
  initialFlags: { testingShown: false, thornsShown: false, fruitShown: false },
  phases: [
    { key: 'receiving', label: 'The Seed Arrives',  short: 'Seed',       ref: 'Mark 4:3',  verse: '"A farmer went out to sow his seed."',                    watermark: 'THE SEED'   },
    { key: 'testing',   label: 'The Rocky Ground',  short: 'Rocky',      ref: 'Mark 4:17', verse: '"They have no root. They last only a short time."',       watermark: 'ROCKY'      },
    { key: 'growing',   label: 'The Thorns',        short: 'Thorns',     ref: 'Mark 4:19', verse: '"The worries of this life... choke the word."',           watermark: 'THORNS'     },
    { key: 'bearing',   label: 'Good Soil',         short: 'Good Soil',  ref: 'Mark 4:20', verse: '"They hear the word, accept it, and produce a crop."',   watermark: 'GOOD SOIL'  },
    { key: 'restored',  label: 'The Harvest',       short: 'Harvest',    ref: 'Mark 4:8',  verse: '"Some thirty, some sixty, some a hundred times."',        watermark: 'HARVEST'    },
  ],
  phaseVisuals: {
    receiving: { bg: 'linear-gradient(160deg, #0a1a0a 0%, #1a3a1a 100%)', emoji: '🌱', label: 'The Seed'    },
    testing:   { bg: 'linear-gradient(160deg, #1a1a0a 0%, #3a3a1a 100%)', emoji: '🪨', label: 'Rocky'       },
    growing:   { bg: 'linear-gradient(160deg, #1a0a0a 0%, #3a1a0a 100%)', emoji: '🌿', label: 'The Thorns'  },
    bearing:   { bg: 'linear-gradient(160deg, #0a1a0a 0%, #2a4a1a 100%)', emoji: '🌾', label: 'Good Soil'   },
    restored:  { bg: 'linear-gradient(160deg, #1a2a0a 0%, #3a5a1a 100%)', emoji: '🌅', label: 'Harvest'     },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Mark 4:3–20',
    invitation: 'The seed is still being scattered. It lands on every kind of ground: hard paths, shallow rock, thorny schedules. But some of it finds good soil. You get to decide what kind of ground you are. The seed doesn\'t force it. It just waits.',
  },
};
