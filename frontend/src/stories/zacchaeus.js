// The Climb   Zacchaeus (Luke 19:1–10)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'collection',
  scene:
    "It's Tuesday. You have a 9 AM with a small business owner who's three quarters behind on his taxes, and by noon you'll have everything you came for. This is your job. You're good at it. The office is cold, the coffee is decent, and your car is the nicest one in the lot. People don't like you. You've made peace with that. The ones who really don't like you are the ones who owe the most, and that's just math.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Get in. Get what you came for.' },
  rightChoice: { label: 'See if you can cut him a break.' },
  leftDeltas:  { stat1: 8,  stat2: -5, stat3: -10 },
  rightDeltas: { stat1: -5, stat2: 8,  stat3:  8  },
  journal: 'Another Tuesday. Another collection. This is my life.',
};

const CLIMB_CARD = {
  id: 'climb',
  type: 'fixed',
  phase: 'encounter',
  scene:
    "There's a crowd blocking the entire street. Word spread fast. Apparently someone remarkable is passing through town and everyone wants to see. You don't usually care about things like this. But something about the noise, the way people are craning and talking over each other, makes you slow down. You're short. You can't see over anyone. And then you notice the oak tree. Nobody's climbed it. You're forty-three years old in a dress shirt.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'This is beneath me. Keep walking.' },
  rightChoice: { label: 'You climb the tree.' },
  leftDeltas:  { stat1: 0, stat2: 5,  stat3: -5  },
  rightDeltas: { stat1: 0, stat2: -8, stat3:  18 },
  journal: 'I climbed a tree in a dress shirt to see him. I don\'t know why.',
};

const CALLED_CARD = {
  id: 'called',
  type: 'fixed',
  phase: 'encounter',
  scene:
    "He stops directly under you. He looks up. The crowd goes quiet. He says your name. Not 'hey you' or 'get down from there.' Your name. 'Zacchaeus. Come down. I'm coming to your house today.' The crowd mutters. They know what you do for a living. The man doesn't seem to care. He's waiting. Your hands are shaking on the branch.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Make an excuse. Climb down alone.' },
  rightChoice: { label: 'Come down. Invite him in.' },
  leftDeltas:  { stat1: 0, stat2:  5, stat3: -15 },
  rightDeltas: { stat1: 0, stat2: -8, stat3:  22 },
  journal: 'He knew my name. He came to my house. I don\'t understand it.',
};

const TRANSFORMATION_CARD = {
  id: 'transformation',
  type: 'fixed',
  phase: 'transformation',
  scene:
    "Dinner is finished and he's still at your table. And you hear yourself say it before you've decided to: 'Half of everything I own, I'll give it to the poor. And anyone I've cheated, I'll pay back four times over.' The math doesn't work. It doesn't matter. The crowd outside can hear you through the window. Your accountant would faint. But sitting here, you feel lighter than you have in years. Like the number in your account was always a cage, and you just opened the door.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Say it. Commit to it fully.' },
  rightChoice: { label: 'Say it, but quietly doubt yourself.' },
  leftDeltas:  { stat1: -25, stat2: 20, stat3: 30 },
  rightDeltas: { stat1: -15, stat2: 10, stat3: 15 },
  journal: 'I said I would give it back. I meant it.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.climbShown && actNum >= 5) {
    return { card: CLIMB_CARD, flags: { ...flags, climbShown: true } };
  }

  if (flags.climbShown && !flags.calledShown) {
    if (direction === 'right' || actNum >= flags.climbAct + 1) {
      return { card: CALLED_CARD, flags: { ...flags, calledShown: true, climbAct: actNum } };
    }
  }

  if (flags.calledShown && !flags.transformShown && actNum >= 8) {
    return { card: TRANSFORMATION_CARD, flags: { ...flags, transformShown: true } };
  }

  if (flags.transformShown && actNum >= 11) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 4)  return 'collection';
  if (actNum <= 7)  return 'encounter';
  return 'transformation';
}

function getEnding(stats) {
  if (stats.stat3 >= 60) return {
    headline: 'Salvation came to your house.',
    body: "Not because you climbed that tree. Not because of what you promised at dinner. Because someone saw you, really saw you, and still came in. And that changed everything.",
    sceneType: 'feast',
  };
  if (stats.stat3 >= 35) return {
    headline: 'You made the climb.',
    body: "It was undignified. You didn't care. That's the thing about moments that matter. They don't ask you to look good first.",
    sceneType: 'embrace',
  };
  return {
    headline: 'Something shifted.',
    body: "You can't put a name on it yet. But dinner that night felt different. You felt different. Whatever he saw in you, it wasn't what you saw in yourself.",
    sceneType: 'longRoad',
  };
}

const PASSAGE = [
  { ref: '1–4', text: 'Jesus entered Jericho and was passing through. A man was there by the name of Zacchaeus; he was a chief tax collector and was wealthy. He wanted to see who Jesus was, but because he was short he could not see over the crowd. So he ran ahead and climbed a sycamore-fig tree to see him, since Jesus was coming that way.' },
  { ref: '5–6', text: 'When Jesus reached the spot, he looked up and said to him, "Zacchaeus, come down immediately. I must stay at your house today." So he came down at once and welcomed him gladly.' },
  { ref: '7–8', text: 'All the people saw this and began to mutter, "He has gone to be the guest of a sinner." But Zacchaeus stood up and said to the Lord, "Look, Lord! Here and now I give half of my possessions to the poor, and if I have cheated anybody out of anything, I will pay back four times the amount."' },
  { ref: '9–10', text: 'Jesus said to him, "Today salvation has come to this house, because this man, too, is a son of Abraham. For the Son of Man came to seek and to save the lost."' },
];

export const zacchaeus = {
  id: 'zacchaeus',
  title: 'The Climb',
  subtitle: 'A modern story of Zacchaeus',
  scripture: 'Luke 19:1–10',
  verse: '"He was seeking to see who Jesus was."',
  verseRef: 'Luke 19:3',
  tagline: 'You built a life being hated. Now you\'re climbing a tree to see why.',
  description: 'You\'re a tax collector: efficient, wealthy, despised. When a commotion fills the street, something makes you climb an oak tree in your dress shirt. The crowd sees a sinner. Someone else sees a son.',
  gradient: 'linear-gradient(135deg, #0a1a0a 0%, #1a4a1a 50%, #2a6a2a 100%)',
  accentColor: '#4a9a4a',
  statConfig: {
    stat1: { key: 'stat1', name: 'Status',  color: 'linear-gradient(90deg, #1a4a1a, #4a9a4a)', icon: '📊' },
    stat2: { key: 'stat2', name: 'Wealth',  color: 'linear-gradient(90deg, #6a5a1a, #c4a03a)', icon: '💰' },
    stat3: { key: 'stat3', name: 'Dignity', color: 'linear-gradient(90deg, #3a2a6a, #7a6ab4)', icon: '✦' },
  },
  initialStats: { stat1: 70, stat2: 85, stat3: 20 },
  initialFlags: { climbShown: false, climbAct: 0, calledShown: false, transformShown: false },
  phases: [
    { key: 'collection',     label: 'Another Tuesday',  short: 'The Job',    ref: 'Luke 19:2',  verse: '"He was a chief tax collector, and was rich."',   watermark: 'THE JOB'    },
    { key: 'encounter',      label: 'The Crowd',        short: 'The Crowd',  ref: 'Luke 19:3',  verse: '"He was seeking to see who Jesus was."',          watermark: 'THE CROWD'  },
    { key: 'transformation', label: 'The Table',        short: 'The Table',  ref: 'Luke 19:8',  verse: '"Look, Lord! Here and now I give half..."',       watermark: 'THE TABLE'  },
    { key: 'restored',       label: 'Salvation Comes',  short: 'Salvation',  ref: 'Luke 19:9',  verse: '"Today salvation has come to this house."',       watermark: 'SALVATION'  },
  ],
  phaseVisuals: {
    collection:     { bg: 'linear-gradient(160deg, #0a1a0a 0%, #1a3a1a 100%)', emoji: '📋', label: 'The Job'       },
    encounter:      { bg: 'linear-gradient(160deg, #1a2a0a 0%, #3a5a1a 100%)', emoji: '🌳', label: 'The Crowd'     },
    transformation: { bg: 'linear-gradient(160deg, #1a1a0a 0%, #3a3a1a 100%)', emoji: '🍽️', label: 'The Table'     },
    restored:       { bg: 'linear-gradient(160deg, #1a2a1a 0%, #4a6a4a 100%)', emoji: '🌅', label: 'Salvation'     },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Luke 19:1–10',
    invitation: 'The Son of Man came to seek and to save the lost. That includes tax collectors. That includes people who built their lives on taking. If there\'s something in you that climbed a tree to see. He already saw you from the road.',
  },
};
