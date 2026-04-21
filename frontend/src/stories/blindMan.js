// I Was Blind   The Man Born Blind (John 9:1-41)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'mud',
  scene:
    "You don't know what happened. You have been blind since birth. That is the entire story of your life. Then a man you cannot see puts something wet and gritty on your eyes and tells you to go wash in the pool called Sent. You don't know who he is. You don't know why you obey. You only know what happens when you do.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'This is some kind of trick.' },
  rightChoice: { label: 'Go wash. Find out.' },
  leftDeltas:  { stat1: 5,  stat2: -5, stat3: -5  },
  rightDeltas: { stat1: -5, stat2: 8,  stat3: 12  },
  journal: 'I washed in the pool and came home seeing.',
};

const NEIGHBORS_CARD = {
  id: 'neighbors',
  type: 'fixed',
  phase: 'neighbors',
  scene:
    "Everyone who knows you as the blind man wants to understand what happened. You tell them. A man named Jesus made mud and put it on your eyes. You washed. Now you see. They are not satisfied with that answer and keep asking for a different one. There isn't one.",
  characterName: 'The Neighbors',
  characterRole: 'Who wanted another explanation',
  leftChoice: { label: 'Maybe I misremember what happened.' },
  rightChoice: { label: 'That is exactly what happened.' },
  leftDeltas:  { stat1: 8,  stat2: -10, stat3: -8  },
  rightDeltas: { stat1: -5, stat2: 12,  stat3: 8   },
  journal: 'They wanted a different answer. I only had the one.',
};

const PHARISEES_CARD = {
  id: 'pharisees',
  type: 'fixed',
  phase: 'pharisees',
  scene:
    "They bring you before the authorities. You tell the story again. They argue among themselves. Some say a sinner could not do this. Others say only a sinner would do it on the Sabbath. Then they turn and ask what you think. You are a beggar. No one has ever asked what you think before. Your answer will not be welcome.",
  characterName: 'The Authorities',
  characterRole: 'Who have already decided',
  leftChoice: { label: 'I don\'t know what to think.' },
  rightChoice: { label: 'He is a prophet.' },
  leftDeltas:  { stat1: 8,  stat2: -8,  stat3: -5  },
  rightDeltas: { stat1: -8, stat2: 15,  stat3: 12  },
  journal: 'They asked what I thought and I told them.',
};

const PARENTS_CARD = {
  id: 'parents',
  type: 'fixed',
  phase: 'exile',
  scene:
    "They call your parents. Your parents confirm you were born blind. They confirm you can now see. Then they stop. Ask him. He is of age. He can speak for himself. You understand what's happening. They are afraid of being put out of the synagogue. Your parents have always been afraid of what the authorities can take. Today they have decided that includes you.",
  characterName: 'Your Parents',
  characterRole: 'Who kept their distance',
  leftChoice: { label: 'I understand. I won\'t make it worse.' },
  rightChoice: { label: 'Someone has to stand here.' },
  leftDeltas:  { stat1: 8,  stat2: -12, stat3: -10 },
  rightDeltas: { stat1: -8, stat2: 14,  stat3: 12  },
  journal: 'My parents were afraid. They left me standing alone.',
};

const WORSHIP_CARD = {
  id: 'worship',
  type: 'fixed',
  phase: 'worship',
  scene:
    "After they throw you out, he finds you. He asks if you believe in the Son of Man. You ask who that is. He says you have seen him already. He is the one talking with you now. This morning you knew nothing about this man. You know enough now. You go to your knees.",
  characterName: 'The Man Who Healed You',
  characterRole: 'Who came looking after',
  leftChoice: { label: 'I need more time. More proof.' },
  rightChoice: { label: 'Lord, I believe.' },
  leftDeltas:  { stat1: 5,  stat2: -5,  stat3: -10 },
  rightDeltas: { stat1: -5, stat2: 8,   stat3: 32  },
  journal: 'He found me after they threw me out. I went to my knees.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.neighborsShown && actNum >= 3) {
    return { card: NEIGHBORS_CARD, flags: { ...flags, neighborsShown: true } };
  }
  if (flags.neighborsShown && !flags.phariseesShown && actNum >= 6) {
    return { card: PHARISEES_CARD, flags: { ...flags, phariseesShown: true } };
  }
  if (flags.phariseesShown && !flags.parentsShown && actNum >= 9) {
    return { card: PARENTS_CARD, flags: { ...flags, parentsShown: true } };
  }
  if (flags.parentsShown && !flags.worshipShown && actNum >= 12) {
    return { card: WORSHIP_CARD, flags: { ...flags, worshipShown: true } };
  }
  if (flags.worshipShown && actNum >= 14) {
    return { card: { id: 'ending', type: 'ending', phase: 'worship' }, flags, isEnding: true };
  }
  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 2)  return 'mud';
  if (actNum <= 5)  return 'neighbors';
  if (actNum <= 8)  return 'pharisees';
  if (actNum <= 11) return 'exile';
  return 'worship';
}

function getEnding(stats) {
  if (stats.stat3 >= 60) return {
    headline: 'One thing I know.',
    body: "You started the morning unable to see. You ended it on your knees in front of the man who healed you. The authorities have theories. Your parents kept their distance. You only know what happened to you. That turns out to be enough.",
    sceneType: 'openRoad',
  };
  if (stats.stat3 >= 30) return {
    headline: 'I was blind and now I see.',
    body: "You told the truth every time they asked. You got thrown out for it. But he found you after. The simplest thing in the world: one thing I know. You don't need more than that to start.",
    sceneType: 'poolSide',
  };
  return {
    headline: 'It still happened.',
    body: "Whatever you believe or don't believe, the thing that happened happened. You washed and came back seeing. No one can take that away from you. The question of who did it is still open.",
    sceneType: 'doorway',
  };
}

const PASSAGE = [
  { ref: '6-7', text: '"After saying this, he spit on the ground, made some mud with the saliva, and put it on the man\'s eyes. \'Go,\' he told him, \'wash in the Pool of Siloam.\' So the man went and washed, and came home seeing."' },
  { ref: '25', text: '"He replied, \'Whether he is a sinner or not, I don\'t know. One thing I do know. I was blind but now I see!\'"' },
  { ref: '35-38', text: '"Jesus heard that they had thrown him out, and when he found him, he said, \'Do you believe in the Son of Man?\' \'Who is he, sir?\' the man asked. \'Tell me so that I can believe in him.\' Jesus said, \'You have now seen him; in fact, he is the one speaking with you.\' Then the man said, \'Lord, I believe,\' and he worshiped him."' },
];

export const blindMan = {
  id: 'blindMan',
  title: 'I Was Blind',
  subtitle: 'The man born blind',
  scripture: 'John 9:1-41',
  verse: '"One thing I do know. I was blind but now I see."',
  verseRef: 'John 9:25',
  tagline: "You don't know who he is or what just happened. You only know it happened. That turns out to be enough.",
  description: "You have been blind since birth. A stranger puts mud on your eyes and tells you to wash. You come back seeing. Then everyone wants an explanation that doesn't sound like what it was. You track your belonging, your willingness to testify, and the slow recognition of who healed you.",
  gradient: 'linear-gradient(135deg, #060A10 0%, #0E1C30 50%, #182840 100%)',
  accentColor: '#4A8AB0',
  statConfig: {
    stat1: { key: 'stat1', name: 'Belonging',  color: 'linear-gradient(90deg, #1a2a3a, #3a5878)', icon: '🏘️' },
    stat2: { key: 'stat2', name: 'Testimony',  color: 'linear-gradient(90deg, #1a3020, #3a6848)', icon: '💬' },
    stat3: { key: 'stat3', name: 'Sight',      color: 'linear-gradient(90deg, #2a2a10, #8a8a28)', icon: '✦'  },
  },
  initialStats: { stat1: 75, stat2: 15, stat3: 5 },
  initialFlags: { neighborsShown: false, phariseesShown: false, parentsShown: false, worshipShown: false },
  phases: [
    { key: 'mud',       label: 'The Mud',         short: 'The Mud',     ref: 'John 9:6',  verse: '"He made mud and put it on the man\'s eyes."',          watermark: 'THE MUD'      },
    { key: 'neighbors', label: 'The Neighbors',   short: 'Neighbors',   ref: 'John 9:8',  verse: '"Isn\'t this the same man who used to sit and beg?"',  watermark: 'NEIGHBORS'    },
    { key: 'pharisees', label: 'The Authorities', short: 'Authorities', ref: 'John 9:13', verse: '"They brought to the Pharisees the man who was blind."', watermark: 'AUTHORITIES'  },
    { key: 'exile',     label: 'Thrown Out',      short: 'Exile',       ref: 'John 9:34', verse: '"And they threw him out."',                            watermark: 'THROWN OUT'   },
    { key: 'worship',   label: 'Found Again',     short: 'Found',       ref: 'John 9:38', verse: '"Lord, I believe. And he worshiped him."',             watermark: 'FOUND AGAIN'  },
  ],
  phaseVisuals: {
    mud:       { bg: 'linear-gradient(160deg, #060A10 0%, #101C28 100%)', emoji: '👁️', label: 'The Mud'      },
    neighbors: { bg: 'linear-gradient(160deg, #0A1018 0%, #182838 100%)', emoji: '🏘️', label: 'Neighbors'    },
    pharisees: { bg: 'linear-gradient(160deg, #0E1018 0%, #201828 100%)', emoji: '⚖️', label: 'Authorities'  },
    exile:     { bg: 'linear-gradient(160deg, #080A10 0%, #14101C 100%)', emoji: '🚪', label: 'Exile'        },
    worship:   { bg: 'linear-gradient(160deg, #0A1420 0%, #203C50 100%)', emoji: '🌅', label: 'Found Again'  },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'John 9:1-41',
    invitation: "By the end of the chapter the authorities were the blind ones. The simplest testimony in the gospel: one thing I know. You don't need a theology degree to say it. You only need to know what happened to you.",
  },
};
