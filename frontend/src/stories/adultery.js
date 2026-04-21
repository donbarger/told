// On the Ground   The Woman Caught in Adultery (John 8:1-11)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'dragged',
  scene:
    "They drag you into the middle of the crowd and make you stand there. The men who brought you recite your sin loud enough for everyone to hear. You do not look up. You are waiting for the first stone. Instead you hear something you don't expect: silence. Then the sound of a man writing in the dirt.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'They are right about me.' },
  rightChoice: { label: 'This is not justice.' },
  leftDeltas:  { stat1: 8,  stat2: -10, stat3: -8  },
  rightDeltas: { stat1: -5, stat2: 5,   stat3: 8   },
  journal: 'They made me stand in the middle. He wrote in the dirt.',
};

const ACCUSERS_CARD = {
  id: 'accusers',
  type: 'fixed',
  phase: 'ground',
  scene:
    "He says something to the crowd. You hear feet shuffling. You look up just enough to see the oldest men leaving first, then the rest, until there is no one left but the two of you. He hasn't thrown a stone. He is still crouching, writing. He asks where your accusers are. You look around. Gone. All of them.",
  characterName: 'The Accusers',
  characterRole: 'Who left without a stone',
  leftChoice: { label: 'I don\'t understand what just happened.' },
  rightChoice: { label: 'They\'re gone. They\'re all gone.' },
  leftDeltas:  { stat1: 5,  stat2: -5,  stat3: -5  },
  rightDeltas: { stat1: -5, stat2: 8,   stat3: 12  },
  journal: 'The oldest ones left first. Then all the rest. Just us.',
};

const QUESTION_CARD = {
  id: 'question',
  type: 'fixed',
  phase: 'cleared',
  scene:
    "He stands and looks at you directly. No one does that. Not to someone like you, not in a moment like this. He asks: does no one condemn you? You say no. No one, sir. He says: neither do I. Go and leave your life of sin. That's it. That's the whole sentence. No lecture, no conditions, no list of what you owe him.",
  characterName: 'The Man Writing in the Dirt',
  characterRole: 'Who did not throw a stone',
  leftChoice: { label: 'There must be a catch.' },
  rightChoice: { label: 'He means it.' },
  leftDeltas:  { stat1: 8,  stat2: -8,  stat3: -10 },
  rightDeltas: { stat1: -5, stat2: 10,  stat3: 18  },
  journal: 'Neither do I condemn you. Go and leave your life of sin.',
};

const FREED_CARD = {
  id: 'freed',
  type: 'fixed',
  phase: 'freed',
  scene:
    "You are standing where minutes ago you were certain you would die. The crowd is gone. The stones are still on the ground, right where they would have been thrown from. He didn't forgive what you did by pretending it wasn't real. He said go and leave your life of sin. He knew exactly what happened. He just didn't use it to end you.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'I don\'t know if I can change.' },
  rightChoice: { label: 'I\'m going to try.' },
  leftDeltas:  { stat1: 5,  stat2: -5,  stat3: -8  },
  rightDeltas: { stat1: -5, stat2: 8,   stat3: 22  },
  journal: 'The stones are still on the ground. I am not.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.accusersShown && actNum >= 3) {
    return { card: ACCUSERS_CARD, flags: { ...flags, accusersShown: true } };
  }
  if (flags.accusersShown && !flags.questionShown && actNum >= 6) {
    return { card: QUESTION_CARD, flags: { ...flags, questionShown: true } };
  }
  if (flags.questionShown && !flags.freedShown && actNum >= 9) {
    return { card: FREED_CARD, flags: { ...flags, freedShown: true } };
  }
  if (flags.freedShown && actNum >= 11) {
    return { card: { id: 'ending', type: 'ending', phase: 'freed' }, flags, isEnding: true };
  }
  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 2)  return 'dragged';
  if (actNum <= 5)  return 'ground';
  if (actNum <= 8)  return 'cleared';
  return 'freed';
}

function getEnding(stats) {
  if (stats.stat3 >= 55) return {
    headline: 'Neither do I condemn you.',
    body: "He knew everything. He said it plainly. He did not pretend the thing you did was nothing -- he told you to go and leave it. But he also did not use it to end you. That is a different kind of justice than the kind that came with stones. You are standing in it.",
    sceneType: 'openRoad',
  };
  if (stats.stat3 >= 25) return {
    headline: 'No one, sir.',
    body: "Has no one condemned you? No one, sir. You said the truest thing you have said in a long time. He didn't need more than that. He let you go. You're still figuring out what to do with that.",
    sceneType: 'doorway',
  };
  return {
    headline: 'The stones are still on the ground.',
    body: "You are alive. Whatever you make of the man who wrote in the dirt, you are alive and they are gone. Something happened in that square. You haven't decided yet what to call it.",
    sceneType: 'poolSide',
  };
}

const PASSAGE = [
  { ref: '7', text: '"When they kept on questioning him, he straightened up and said to them, \'Let any one of you who is without sin be the first to throw a stone at her.\'"' },
  { ref: '10-11', text: '"Jesus straightened up and asked her, \'Woman, where are they? Has no one condemned you?\' \'No one, sir,\' she said. \'Then neither do I condemn you,\' Jesus declared. \'Go now and leave your life of sin.\'"' },
];

export const adultery = {
  id: 'adultery',
  title: 'On the Ground',
  subtitle: 'The woman caught in adultery',
  scripture: 'John 8:1-11',
  verse: '"Neither do I condemn you. Go now and leave your life of sin."',
  verseRef: 'John 8:11',
  tagline: "You were dragged into the middle and made to stand there. Then the crowd left. Then he spoke.",
  description: "You are dragged in front of a crowd and your sin is read aloud. You are waiting for the stones. Instead a man crouches and writes in the dirt, and the accusers leave one by one. When there is no one left, he speaks to you directly. You track the weight of exposure, the reality of what just happened, and the slow arrival of grace.",
  gradient: 'linear-gradient(135deg, #100810 0%, #1C1028 50%, #281838 100%)',
  accentColor: '#8A6AB0',
  statConfig: {
    stat1: { key: 'stat1', name: 'Shame',  color: 'linear-gradient(90deg, #1a1228, #3a2850)', icon: '🪨' },
    stat2: { key: 'stat2', name: 'Voice',  color: 'linear-gradient(90deg, #1a1a2a, #3a3a60)', icon: '💬' },
    stat3: { key: 'stat3', name: 'Seen',   color: 'linear-gradient(90deg, #1a0a0a, #602828)', icon: '✦'  },
  },
  initialStats: { stat1: 100, stat2: 5, stat3: 0 },
  initialFlags: { accusersShown: false, questionShown: false, freedShown: false },
  phases: [
    { key: 'dragged',  label: 'Dragged In',   short: 'Dragged',  ref: 'John 8:3',  verse: '"The teachers of the law brought in a woman caught in adultery."',    watermark: 'DRAGGED IN'  },
    { key: 'ground',   label: 'On the Ground', short: 'Ground',   ref: 'John 8:6',  verse: '"He bent down and started to write on the ground with his finger."',   watermark: 'THE GROUND'  },
    { key: 'cleared',  label: 'All Gone',      short: 'Cleared',  ref: 'John 8:9',  verse: '"Those who heard began to go away one at a time."',                    watermark: 'ALL GONE'    },
    { key: 'freed',    label: 'Neither Do I',  short: 'Freed',    ref: 'John 8:11', verse: '"Neither do I condemn you. Go now and leave your life of sin."',       watermark: 'NEITHER DO I' },
  ],
  phaseVisuals: {
    dragged:  { bg: 'linear-gradient(160deg, #100810 0%, #1C1028 100%)', emoji: '🪨', label: 'Dragged In'    },
    ground:   { bg: 'linear-gradient(160deg, #100C18 0%, #201828 100%)', emoji: '✍️', label: 'On the Ground' },
    cleared:  { bg: 'linear-gradient(160deg, #0E1018 0%, #181E30 100%)', emoji: '🚶', label: 'All Gone'       },
    freed:    { bg: 'linear-gradient(160deg, #100818 0%, #281838 100%)', emoji: '✦',  label: 'Neither Do I'  },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'John 8:1-11',
    invitation: "Grace that doesn't call the thing nothing is stronger than grace that pretends it away. He said go and leave your life of sin -- he named it -- and then he let you go. That is what mercy with teeth looks like.",
  },
};
