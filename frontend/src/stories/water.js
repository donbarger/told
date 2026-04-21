// The Step   Peter Walking on Water (Matthew 14:22-33)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'storm',
  scene:
    "The boat is in the middle of the water and the weather has turned. You have been out here longer than expected. Everyone in the boat is working the oars and getting nowhere and the waves are not small. And then you see something moving toward you across the water. Your first instinct is ghost. Your second instinct is to keep rowing. The figure calls out: do not be afraid. And you hear yourself asking for something you are not sure you believe is possible. Come, he says. One word. You are still in the boat.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Stay in the boat. It\'s safer.' },
  rightChoice: { label: 'You asked. He answered. Get out.' },
  leftDeltas:  { stat1: 8,  stat2: -5, stat3: -12 },
  rightDeltas: { stat1: -8, stat2: 5,  stat3:  12 },
  journal: 'The storm was real. He said come. I was still in the boat.',
};

const STEP_CARD = {
  id: 'step',
  type: 'fixed',
  phase: 'walking',
  scene:
    "You got out. That is the part most people skip past. You actually got out of the boat, in the middle of a storm, in the dark, and you walked on the water. It worked. For a moment it completely worked. And then you noticed the wind. Not a new wind. The same wind that was there when you stepped out. But now you were looking at it instead of at him. The water is still under your feet. But you can feel it starting to give way.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Hold on. Keep moving. Don\'t look down.' },
  rightChoice: { label: 'You are already looking at the wrong thing.' },
  leftDeltas:  { stat1: 5,  stat2: 0,  stat3: -10 },
  rightDeltas: { stat1: -5, stat2: 5,  stat3:  18 },
  journal: 'It worked. Then I noticed the wind. Not a new wind. I just looked at it.',
};

const SINKING_CARD = {
  id: 'sinking',
  type: 'fixed',
  phase: 'sinking',
  scene:
    "You are going under. You shout: Lord, save me. Immediately. Immediately he reaches out his hand and catches you. Before you finish sinking. Before you hit the water. Before you have time to think through whether you deserve to be caught. He catches you and says: you of little faith, why did you doubt? It is not a rebuke exactly. It is more like a question that has the answer already inside it. You got out of the boat. That is still true.",
  characterName: 'The Teacher',
  characterRole: 'Who caught you immediately',
  leftChoice: { label: 'I failed. I looked away.' },
  rightChoice: { label: 'He still caught me. Even sinking.' },
  leftDeltas:  { stat1: -5, stat2: -8, stat3: -15 },
  rightDeltas: { stat1: -5, stat2: 5,  stat3:  25 },
  journal: 'I was going under. I shouted. He caught me before I finished sinking.',
};

const BOAT_CARD = {
  id: 'boat',
  type: 'fixed',
  phase: 'returning',
  scene:
    "Back in the boat. The wind stopped. The people in the boat worshipped. You are dripping wet and your heart is still running fast. You walked on water and you sank. Both of those are true. He asked why you doubted, which means the doubt was the problem and not the step. You took the step. Most people in the story never left the boat. You did. The question going forward is not whether you will face wind again. The question is what you look at when you do.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'I failed. I will not do that again.' },
  rightChoice: { label: 'I got out. I can get out again.' },
  leftDeltas:  { stat1: 5,  stat2: -8, stat3: -18 },
  rightDeltas: { stat1: -5, stat2: 8,  stat3:  28 },
  journal: 'I walked on water. I sank. He caught me. Both are true. I got out of the boat.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.stepShown && actNum >= 4) {
    return { card: STEP_CARD, flags: { ...flags, stepShown: true } };
  }

  if (flags.stepShown && !flags.sinkingShown && actNum >= 7) {
    return { card: SINKING_CARD, flags: { ...flags, sinkingShown: true } };
  }

  if (flags.sinkingShown && !flags.boatShown && actNum >= 10) {
    return { card: BOAT_CARD, flags: { ...flags, boatShown: true } };
  }

  if (flags.boatShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'storm';
  if (actNum <= 6)  return 'walking';
  if (actNum <= 9)  return 'sinking';
  return 'returning';
}

function getEnding(stats) {
  if (stats.stat3 >= 60) return {
    headline: 'You got out of the boat.',
    body: "You walked. You sank. You were caught. And you understand now that the catching was never in question. The wind will blow again. The question is what you look at.",
    sceneType: 'waterMeeting',
  };
  if (stats.stat3 >= 35) return {
    headline: 'You heard him say come.',
    body: "Something in you moved toward the edge of the boat. Whether you stepped or stayed, the invitation was real and you felt it. That is not a small thing. The step is still available.",
    sceneType: 'longRoad',
  };
  return {
    headline: 'The boat is safer.',
    body: "Maybe. The eleven who stayed in the boat never sank. They also never walked. He said come, and that invitation is still open, and the water will hold as long as you are looking at him.",
    sceneType: 'coldStreet',
  };
}

const PASSAGE = [
  { ref: '25-27', text: '"Shortly before dawn Jesus went out to them, walking on the lake. When the disciples saw him walking on the lake, they were terrified. It is a ghost, they said, and cried out in fear. But Jesus immediately said to them: Take courage! It is I. Don\'t be afraid."' },
  { ref: '28-30', text: '"Lord, if it\'s you, Peter replied, tell me to come to you on the water. Come, he said. Then Peter got down out of the boat, walked on the water and came toward Jesus. But when he saw the wind, he was afraid and, beginning to sink, cried out, Lord, save me!"' },
  { ref: '31-33', text: '"Immediately Jesus reached out his hand and caught him. You of little faith, he said, why did you doubt? And when they climbed into the boat, the wind died down. Then those who were in the boat worshiped him, saying, Truly you are the Son of God."' },
];

export const water = {
  id: 'water',
  title: 'The Step',
  subtitle: 'A modern story of Peter on the water',
  scripture: 'Matthew 14:22-33',
  verse: '"Lord, save me."',
  verseRef: 'Matthew 14:30',
  tagline: "He said come. The storm was real. You got out of the boat.",
  description: "The storm is real and the boat is not enough and then something impossible appears on the water. He says come. You get out. For a moment it works completely. Then you notice the wind, which was always there. You track your fear, your faith, and your surrender.",
  gradient: 'linear-gradient(135deg, #060c18 0%, #0c1830 50%, #102040 100%)',
  accentColor: '#4a8abc',
  statConfig: {
    stat1: { key: 'stat1', name: 'Fear',      color: 'linear-gradient(90deg, #2a1a3a, #6a4a8a)', icon: '🌊' },
    stat2: { key: 'stat2', name: 'Faith',     color: 'linear-gradient(90deg, #1a2a4a, #4a6a9a)', icon: '⚓' },
    stat3: { key: 'stat3', name: 'Surrender', color: 'linear-gradient(90deg, #1a3a3a, #4a8a8a)', icon: '✦' },
  },
  initialStats: { stat1: 40, stat2: 55, stat3: 20 },
  initialFlags: { stepShown: false, sinkingShown: false, boatShown: false },
  phases: [
    { key: 'storm',     label: 'The Storm',        short: 'The Storm',   ref: 'Matt 14:24', verse: '"The boat was buffeted by the waves."',           watermark: 'THE STORM'   },
    { key: 'walking',   label: 'The Walk',          short: 'Walking',     ref: 'Matt 14:29', verse: '"Peter got down out of the boat."',              watermark: 'THE WALK'    },
    { key: 'sinking',   label: 'The Wind',          short: 'Sinking',     ref: 'Matt 14:30', verse: '"When he saw the wind, he was afraid."',         watermark: 'THE WIND'    },
    { key: 'returning', label: 'Back in the Boat',  short: 'Returning',   ref: 'Matt 14:31', verse: '"You of little faith, why did you doubt?"',      watermark: 'THE CATCH'   },
    { key: 'restored',  label: 'Truly',             short: 'Restored',    ref: 'Matt 14:33', verse: '"Truly you are the Son of God."',                watermark: 'TRULY'       },
  ],
  phaseVisuals: {
    storm:     { bg: 'linear-gradient(160deg, #060c18 0%, #0c1830 100%)', emoji: '🌊', label: 'The Storm'   },
    walking:   { bg: 'linear-gradient(160deg, #080c18 0%, #101828 100%)', emoji: '👣', label: 'The Walk'    },
    sinking:   { bg: 'linear-gradient(160deg, #04080e 0%, #080c18 100%)', emoji: '🌀', label: 'The Wind'    },
    returning: { bg: 'linear-gradient(160deg, #0a1018 0%, #182028 100%)', emoji: '⚓', label: 'The Catch'   },
    restored:  { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'Truly'       },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Matthew 14:22-33',
    invitation: 'Peter is the only person in history who walked on water and sank. That sequence is the whole thing. He had enough faith to get out of the boat, not enough to finish without looking away, and enough humility to cry out when he went under. Jesus caught him before he finished sinking. The little faith was still faith. He is still saying come. The water will still hold.',
  },
};
