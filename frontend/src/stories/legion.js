// Among the Tombs   The Gerasene Demoniac (Mark 5:1-20)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'tombs',
  scene:
    "You live among the tombs. You have been driven out of every place people live. The chains they put on you -- you broke them. Not because you wanted to be free. The thing inside you broke them. You don't know your own name anymore. You hurt yourself because the noise won't stop. Then a boat comes across the lake. You run toward it. You don't know why you run toward it.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Stay back. Stay in the tombs.' },
  rightChoice: { label: 'Run. Something is different about this one.' },
  leftDeltas:  { stat1: 8,  stat2: -5,  stat3: -8  },
  rightDeltas: { stat1: -5, stat2: 5,   stat3: 10  },
  journal: 'A boat came. I ran toward it. I don\'t know why.',
};

const SHORE_CARD = {
  id: 'shore',
  type: 'fixed',
  phase: 'shore',
  scene:
    "You fall at his feet. The thing inside you is screaming. You hear yourself say things you are not choosing to say. You hear your voice ask what he has to do with you. You hear your voice tell him not to torture you. But somewhere underneath all of that is something that has not spoken in years. It fell at his feet. That was not the legion.",
  characterName: 'Jesus',
  characterRole: 'Who asked your name',
  leftChoice: { label: 'I don\'t remember who I was before.' },
  rightChoice: { label: 'Something in me knows this man.' },
  leftDeltas:  { stat1: 8,  stat2: -8,  stat3: -8  },
  rightDeltas: { stat1: -5, stat2: 8,   stat3: 15  },
  journal: 'He asked my name. I heard the word Legion come out of my mouth.',
};

const LEGION_CARD = {
  id: 'legion',
  type: 'fixed',
  phase: 'legion',
  scene:
    "He commands them out. There are thousands of them and they go into the pigs and the pigs go into the lake. You are sitting on the ground. You are sitting on the ground and you are yourself. You don't know what that means yet -- yourself -- but you are it. You are clothed. You are in your right mind. You are using your name like you know who it belongs to.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'I don\'t know how to be this person.' },
  rightChoice: { label: 'He gave me back to myself.' },
  leftDeltas:  { stat1: 8,  stat2: -10, stat3: -10 },
  rightDeltas: { stat1: -5, stat2: 12,  stat3: 20  },
  journal: 'The pigs went into the lake. I was sitting on the ground. Myself.',
};

const SENT_CARD = {
  id: 'sent',
  type: 'fixed',
  phase: 'sent',
  scene:
    "The townspeople arrive and see you and are afraid of you the way they are afraid of something they cannot explain. He gets back in the boat. You beg to go with him. He says no. He says go home. Tell your family what the Lord has done for you. You have a home. You have a family. You have not been back in years. He is sending you to the one place you forgot was yours.",
  characterName: 'Jesus',
  characterRole: 'Who sent you back',
  leftChoice: { label: 'I\'m afraid of going back.' },
  rightChoice: { label: 'He said go. I\'m going.' },
  leftDeltas:  { stat1: 8,  stat2: -8,  stat3: -10 },
  rightDeltas: { stat1: -5, stat2: 10,  stat3: 25  },
  journal: 'He told me to go home. I had forgotten I had one.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.shoreShown && actNum >= 3) {
    return { card: SHORE_CARD, flags: { ...flags, shoreShown: true } };
  }
  if (flags.shoreShown && !flags.legionShown && actNum >= 6) {
    return { card: LEGION_CARD, flags: { ...flags, legionShown: true } };
  }
  if (flags.legionShown && !flags.sentShown && actNum >= 9) {
    return { card: SENT_CARD, flags: { ...flags, sentShown: true } };
  }
  if (flags.sentShown && actNum >= 12) {
    return { card: { id: 'ending', type: 'ending', phase: 'sent' }, flags, isEnding: true };
  }
  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 2)  return 'tombs';
  if (actNum <= 5)  return 'shore';
  if (actNum <= 8)  return 'legion';
  return 'sent';
}

function getEnding(stats) {
  if (stats.stat3 >= 55) return {
    headline: 'In his right mind.',
    body: "You lived among the tombs for so long you forgot what it meant to be yourself. He crossed the lake to get to you. He sent the thing that had you into the pigs. He told you to go home and tell your family what happened. You went. In the Decapolis -- ten cities -- they were all amazed. So were you.",
    sceneType: 'openRoad',
  };
  if (stats.stat3 >= 25) return {
    headline: 'He gave me back to myself.',
    body: "The townspeople were afraid and asked him to leave. You begged to go with him and he said no -- go home instead. That mission: go home, tell your family. The smallest possible scope. He did not send you to the world; he sent you to the people who remembered your name.",
    sceneType: 'doorway',
  };
  return {
    headline: 'Sitting on the ground.',
    body: "The noise is gone. You are sitting on the ground, clothed, in your right mind, and you are not sure what comes next. The pigs are in the lake. The townspeople are afraid. The boat is leaving. You are staying. You have to start somewhere.",
    sceneType: 'poolSide',
  };
}

const PASSAGE = [
  { ref: '6-8', text: '"When he saw Jesus from a distance, he ran and fell on his knees in front of him. He shouted at the top of his voice, \'What do you want with me, Jesus, Son of the Most High God? In God\'s name don\'t torture me!\' For Jesus had said to him, \'Come out of this man, you impure spirit!\'"' },
  { ref: '15', text: '"When they came to Jesus, they saw the man who had been possessed by the legion of demons, sitting there, dressed and in his right mind; and they were afraid."' },
  { ref: '19', text: '"Jesus did not let him, but said, \'Go home to your own people and tell them how much the Lord has done for you, and how he has had mercy on you.\'"' },
];

export const legion = {
  id: 'legion',
  title: 'Among the Tombs',
  subtitle: 'The Gerasene demoniac',
  scripture: 'Mark 5:1-20',
  verse: '"Go home to your own people and tell them how much the Lord has done for you."',
  verseRef: 'Mark 5:19',
  tagline: "You live in the tombs. You don't know your own name anymore. Then a boat comes across the lake.",
  description: "You have been driven out of every place people live. You don't know your name. The chains they put on you, you broke -- not because you wanted to be free. Then a boat comes and you run toward it, which is the first thing you have chosen in years. You track the chaos that has been your life, the isolation of the tombs, and the slow return of knowing who you are.",
  gradient: 'linear-gradient(135deg, #080808 0%, #101010 50%, #181820 100%)',
  accentColor: '#8A7AC0',
  statConfig: {
    stat1: { key: 'stat1', name: 'Chaos',     color: 'linear-gradient(90deg, #1a0808, #381010)', icon: '⛓️' },
    stat2: { key: 'stat2', name: 'Isolation', color: 'linear-gradient(90deg, #0a0a18, #181828)', icon: '🏚️' },
    stat3: { key: 'stat3', name: 'Name',      color: 'linear-gradient(90deg, #0a0818, #302848)', icon: '✦'  },
  },
  initialStats: { stat1: 95, stat2: 90, stat3: 0 },
  initialFlags: { shoreShown: false, legionShown: false, sentShown: false },
  phases: [
    { key: 'tombs', label: 'The Tombs',     short: 'Tombs', ref: 'Mark 5:3',  verse: '"This man lived in the tombs, and no one could bind him anymore."',    watermark: 'THE TOMBS'   },
    { key: 'shore', label: 'The Shore',     short: 'Shore', ref: 'Mark 5:6',  verse: '"He ran and fell on his knees in front of him."',                       watermark: 'THE SHORE'   },
    { key: 'legion', label: 'Legion',       short: 'Legion', ref: 'Mark 5:9', verse: '"My name is Legion, for we are many."',                                 watermark: 'LEGION'      },
    { key: 'sent',  label: 'Go Home',       short: 'Sent',  ref: 'Mark 5:19', verse: '"Go home to your own people and tell them."',                           watermark: 'GO HOME'     },
  ],
  phaseVisuals: {
    tombs:  { bg: 'linear-gradient(160deg, #080810 0%, #101018 100%)', emoji: '⛓️', label: 'The Tombs' },
    shore:  { bg: 'linear-gradient(160deg, #080C14 0%, #10141E 100%)', emoji: '🌊', label: 'The Shore' },
    legion: { bg: 'linear-gradient(160deg, #0A0810 0%, #141018 100%)', emoji: '🌀', label: 'Legion'    },
    sent:   { bg: 'linear-gradient(160deg, #080A14 0%, #101420 100%)', emoji: '🏠', label: 'Go Home'   },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Mark 5:1-20',
    invitation: "He crossed the lake specifically to get to this one person. He did not stop in a town or preach a sermon -- he got out of the boat, met a man in the tombs, and got back in. The mission was this man. The man went home and told ten cities. That is how it tends to spread.",
  },
};
