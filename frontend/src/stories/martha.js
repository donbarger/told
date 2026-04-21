// The Other Room   Mary and Martha (Luke 10:38-42)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'preparing',
  scene:
    "You arrived first. You always arrive first. The chairs are arranged, the food is handled, the details that nobody else thinks about are done because you thought about them. This is what you do. You are the one who makes things work. Your sister came in, said hello to the guest, and sat down. That was forty minutes ago. The dishes are not going to wash themselves. You can hear them talking in the next room and you are in here alone.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'This is your role. You handle it.' },
  rightChoice: { label: 'You want to be in that room.' },
  leftDeltas:  { stat1: 8,  stat2: 5,  stat3: -10 },
  rightDeltas: { stat1: -5, stat2: 5,  stat3:  12 },
  journal: 'I arrived first and handled everything. My sister sat down with the guest.',
};

const ALONE_CARD = {
  id: 'alone',
  type: 'fixed',
  phase: 'alone',
  scene:
    "Twenty minutes later you are still alone in the kitchen. The sound from the other room is laughter now. You can hear it through the wall. You have not eaten. You have not sat down since this morning. You are doing the thing that allows everyone else to do the thing they are doing. This is service. This is what you were taught. And there is a version of you that is furious and a version that is proud, and you cannot always tell them apart.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Stay in the kitchen. Finish what you started.' },
  rightChoice: { label: 'Go to the doorway. Just look.' },
  leftDeltas:  { stat1: 8,  stat2: 10, stat3: -12 },
  rightDeltas: { stat1: -5, stat2: 5,  stat3:  15 },
  journal: 'I heard laughter through the wall while I was still working.',
};

const COMPLAINT_CARD = {
  id: 'complaint',
  type: 'fixed',
  phase: 'complaining',
  scene:
    "You go in and say it. You ask the guest directly: doesn't it seem right that my sister should help me? You have framed it as a question but it is not a question. The room gets quiet. Your sister does not move. The guest looks at you. Not the way you expected. Not with agreement or a gentle redirection to your sister. He says your name twice, the way someone says a name when they are about to say something that will cost you. He says you are worried and upset about many things. Only one thing is needed.",
  characterName: 'The Guest',
  characterRole: 'Who said your name twice',
  leftChoice: { label: 'Someone has to do the work. That\'s just true.' },
  rightChoice: { label: 'Let what he said land.' },
  leftDeltas:  { stat1: 8,  stat2: 12, stat3: -18 },
  rightDeltas: { stat1: -8, stat2: -8, stat3:  25 },
  journal: 'He said my name twice. He said I was worried about many things.',
};

const STILL_CARD = {
  id: 'still',
  type: 'fixed',
  phase: 'still',
  scene:
    "You go back to the kitchen. The dishes are still there. None of that changed. But something about the way he said your name has stayed with you, and you are trying to decide if the service you have been giving is love or control. Because it has looked like love for a long time. It has felt like love. But you are in here and everyone else is in there, and when you try to remember the last time you sat down and were just present, you cannot find it.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'You will always be the one who does the work.' },
  rightChoice: { label: 'You set down the dish and go sit with them.' },
  leftDeltas:  { stat1: 8,  stat2: 5,  stat3: -15 },
  rightDeltas: { stat1: -8, stat2: -10, stat3: 28 },
  journal: 'I asked myself whether what I do is love or control. I couldn\'t answer quickly.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.aloneShown && actNum >= 4) {
    return { card: ALONE_CARD, flags: { ...flags, aloneShown: true } };
  }

  if (flags.aloneShown && !flags.complaintShown && actNum >= 7) {
    return { card: COMPLAINT_CARD, flags: { ...flags, complaintShown: true } };
  }

  if (flags.complaintShown && !flags.stillShown && actNum >= 10) {
    return { card: STILL_CARD, flags: { ...flags, stillShown: true } };
  }

  if (flags.stillShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'preparing';
  if (actNum <= 6)  return 'alone';
  if (actNum <= 9)  return 'complaining';
  return 'still';
}

function getEnding(stats) {
  if (stats.stat3 >= 60) return {
    headline: 'You sat down.',
    body: "Not because the work wasn't real. Because someone called your name and you heard what was behind it. You let yourself be in the room. That was the better thing.",
    sceneType: 'feast',
  };
  if (stats.stat3 >= 35) return {
    headline: 'You heard him.',
    body: "You\'re still going to get things done. That won\'t change. But the question of whether service is love or control is now on the table. You can\'t un-ask it.",
    sceneType: 'longRoad',
  };
  return {
    headline: 'The work isn\'t done.',
    body: "And you will finish it, because you always finish it. The question he raised is still waiting in the kitchen with you. Only one thing is needed. You haven\'t stopped moving long enough to find out what it is.",
    sceneType: 'apartment',
  };
}

const PASSAGE = [
  { ref: '38-39', text: 'As Jesus and his disciples were on their way, he came to a village where a woman named Martha opened her home to him. She had a sister called Mary, who sat at the Lord\'s feet listening to what he said.' },
  { ref: '40', text: 'But Martha was distracted by all the preparations that had to be made. She came to him and asked, "Lord, don\'t you care that my sister has left me to do the work by myself? Tell her to help me!"' },
  { ref: '41-42', text: '"Martha, Martha," the Lord answered, "you are worried and upset about many things, but few things are needed — or indeed only one. Mary has chosen what is better, and it will not be taken away from her."' },
];

export const martha = {
  id: 'martha',
  title: 'The Other Room',
  subtitle: 'A modern story of Mary and Martha',
  scripture: 'Luke 10:38-42',
  verse: '"You are worried and upset about many things."',
  verseRef: 'Luke 10:41',
  tagline: "You showed up early and handled everything. She just sat down. You're still in the kitchen.",
  description: "You are the one who makes things work. You arrived first, handled the details, kept everything moving. Your sister sat down with the guest forty minutes ago and has not moved. Something is building in you that looks like frustration but runs deeper than that. You track your control, your resentment, and your presence.",
  gradient: 'linear-gradient(135deg, #1a0e08 0%, #3a2010 50%, #5a3820 100%)',
  accentColor: '#bc7a3a',
  statConfig: {
    stat1: { key: 'stat1', name: 'Control',    color: 'linear-gradient(90deg, #3a2010, #8a5830)', icon: '🧹' },
    stat2: { key: 'stat2', name: 'Resentment', color: 'linear-gradient(90deg, #3a1a0a, #8a4a2a)', icon: '🔥' },
    stat3: { key: 'stat3', name: 'Presence',   color: 'linear-gradient(90deg, #1a2a3a, #4a6a8a)', icon: '✦' },
  },
  initialStats: { stat1: 75, stat2: 40, stat3: 15 },
  initialFlags: { aloneShown: false, complaintShown: false, stillShown: false },
  phases: [
    { key: 'preparing',   label: 'The Setup',         short: 'Preparing',   ref: 'Luke 10:38', verse: '"Martha opened her home to him."',                watermark: 'PREPARING'    },
    { key: 'alone',       label: 'In the Kitchen',     short: 'Alone',       ref: 'Luke 10:40', verse: '"Distracted by all the preparations."',          watermark: 'IN THE KITCHEN'},
    { key: 'complaining', label: 'She Said It',        short: 'The Ask',     ref: 'Luke 10:40', verse: '"Tell her to help me!"',                        watermark: 'THE ASK'      },
    { key: 'still',       label: 'The Question',       short: 'The Question',ref: 'Luke 10:42', verse: '"Only one thing is needed."',                   watermark: 'ONE THING'    },
    { key: 'restored',    label: 'The Better Thing',   short: 'Better',      ref: 'Luke 10:42', verse: '"Mary has chosen what is better."',             watermark: 'BETTER'       },
  ],
  phaseVisuals: {
    preparing:   { bg: 'linear-gradient(160deg, #1a0e08 0%, #3a2010 100%)', emoji: '🍽️', label: 'The Setup'     },
    alone:       { bg: 'linear-gradient(160deg, #180c08 0%, #301808 100%)', emoji: '🫙', label: 'The Kitchen'   },
    complaining: { bg: 'linear-gradient(160deg, #1a1008 0%, #382010 100%)', emoji: '🔥', label: 'She Said It'   },
    still:       { bg: 'linear-gradient(160deg, #0a1018 0%, #1a2030 100%)', emoji: '🌙', label: 'The Question'  },
    restored:    { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'Better'        },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Luke 10:38-42',
    invitation: 'The story is not a critique of service. It is a question about what drives it. Martha was not wrong to prepare. She was distracted by it, worried about it, resentful through it. Jesus said her name twice. He is saying it now. You can put the dish down.',
  },
};
