// The Neighbor   Good Samaritan (Luke 10:25–37)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'drive',
  scene:
    "It's 9:40 PM and you're almost home. You cut through the back of the parking garage the way you always do. It saves five minutes. That's when you see him. A man on the ground between two cars. Not drunk-leaning. On his back. One shoe off. Your first thought is that you don't know what happened, you weren't here, and you have an early call tomorrow. Your second thought is: he might be dying.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Keep walking. Not your problem.' },
  rightChoice: { label: 'Stop. Check on him.' },
  leftDeltas:  { stat1: 0, stat2: -5, stat3: -15 },
  rightDeltas: { stat1: 0, stat2: 8,  stat3:  12 },
  journal: 'I saw him on the ground and had to decide right then.',
};

const COST_CARD = {
  id: 'cost',
  type: 'fixed',
  phase: 'involvement',
  scene:
    "You're sitting in the hospital waiting room at midnight. Your phone has 12% battery. Marcus, that's the name on his insurance card, is in the ER with three cracked ribs and a concussion. The nurse said he'll be okay but someone needs to stay until they can reach his family. The charge nurse looked at you and said, 'Are you with him?' You said yes before you thought about it. You have no idea why.",
  characterName: 'Marcus',
  characterRole: 'The man from the garage',
  leftChoice: { label: 'Give them your number. Go home.' },
  rightChoice: { label: 'Stay until his family comes.' },
  leftDeltas:  { stat1: 0, stat2: -5, stat3: -8 },
  rightDeltas: { stat1: -5, stat2: 15, stat3: 18 },
  journal: 'I stayed at the hospital when I had no reason to.',
};

const ENCOUNTER_CARD = {
  id: 'encounter',
  type: 'fixed',
  phase: 'sacrifice',
  scene:
    "It's been three weeks. Marcus's sister called to thank you. He had been robbed, beaten, left there. You sent her your number and told her you were glad he was okay. Now you're in the parking garage again, same time, same route. And you're thinking: what is it you actually believe about strangers? About people who aren't your people? You've been asked your whole life who your neighbor is. Tonight you walked past one answer and gave another.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Some things you do once.' },
  rightChoice: { label: 'This changed something in me.' },
  leftDeltas:  { stat1: 0, stat2: 0,  stat3:  5  },
  rightDeltas: { stat1: 0, stat2: 10, stat3:  20 },
  journal: 'Three weeks later, I understood what I had done.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') {
    if (direction === 'left') {
      // Walked past   story continues with guilt and second chances
      return null;
    }
    return null; // → AI scenes of helping
  }

  if (!flags.costShown && actNum >= 6) {
    return { card: COST_CARD, flags: { ...flags, costShown: true } };
  }

  if (flags.costShown && !flags.encounterShown && actNum >= 10) {
    return { card: ENCOUNTER_CARD, flags: { ...flags, encounterShown: true } };
  }

  if (flags.encounterShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 5)  return 'drive';
  if (actNum <= 9)  return 'involvement';
  return 'sacrifice';
}

function getEnding(stats) {
  if (stats.stat3 >= 65) return {
    headline: 'You became a neighbor.',
    body: "Not because it was convenient or safe or expected. Because mercy costs something, and you paid it. That's the whole story.",
    sceneType: 'roadsideHelp',
  };
  if (stats.stat3 >= 40) return {
    headline: 'You showed up.',
    body: "More than you had to, less than you wanted to. But you didn't walk past. In the end, that's what it comes down to.",
    sceneType: 'embrace',
  };
  return {
    headline: 'You saw him.',
    body: "Even if you hesitated. Even if the cost surprised you. You looked. That matters more than you know.",
    sceneType: 'longRoad',
  };
}

const PASSAGE = [
  { ref: '30', text: 'Jesus said: "A man was going down from Jerusalem to Jericho, when he was attacked by robbers. They stripped him of his clothes, beat him and went away, leaving him half dead."' },
  { ref: '31–32', text: 'A priest happened to be going down the same road, and when he saw the man, he passed by on the other side. So too, a Levite, when he came to the place and saw him, passed by on the other side.' },
  { ref: '33–35', text: 'But a Samaritan, as he traveled, came where the man was; and when he saw him, he took pity on him. He went to him and bandaged his wounds, pouring on oil and wine. Then he put the man on his own donkey, brought him to an inn and took care of him. The next day he took out two denarii and gave them to the innkeeper. "Look after him," he said, "and when I return, I will reimburse you for any extra expense you may have."' },
  { ref: '36–37', text: '"Which of these three do you think was a neighbor to the man who fell into the hands of robbers?" The expert in the law replied, "The one who had mercy on him." Jesus told him, "Go and do likewise."' },
];

export const samaritan = {
  template: 'encounter',
  id: 'samaritan',
  title: 'The Neighbor',
  subtitle: 'A modern story of the Good Samaritan',
  scripture: 'Luke 10:25–37',
  verse: '"Go and do likewise."',
  verseRef: 'Luke 10:37',
  tagline: 'You found someone who needed help. The question is what you did next.',
  description: 'You\'re driving home late when you find someone beaten in a parking garage. Nobody\'s watching. You track three things: your safety, your reputation, and your mercy. The story turns on whether you stop.',
  gradient: 'linear-gradient(135deg, #0a1a2a 0%, #1a3a5a 50%, #2a5a7a 100%)',
  accentColor: '#4a9fc4',
  statConfig: {
    stat1: { key: 'stat1', name: 'Safety',     color: 'linear-gradient(90deg, #1a4a6a, #4a9fc4)', icon: '🛡️' },
    stat2: { key: 'stat2', name: 'Reputation', color: 'linear-gradient(90deg, #1a4a2a, #4a9f5a)', icon: '🤝' },
    stat3: { key: 'stat3', name: 'Mercy',      color: 'linear-gradient(90deg, #4a2a6a, #9a6ac4)', icon: '❤️' },
  },
  initialStats: { stat1: 80, stat2: 75, stat3: 20 },
  initialFlags: { costShown: false, encounterShown: false },
  phases: [
    { key: 'drive',       label: 'The Parking Garage', short: 'The Find',   ref: 'Luke 10:30', verse: '"Leaving him half dead."',                    watermark: 'THE FIND'    },
    { key: 'involvement', label: 'Getting Involved',    short: 'Involved',   ref: 'Luke 10:33', verse: '"When he saw him, he took pity on him."',     watermark: 'INVOLVED'    },
    { key: 'sacrifice',   label: 'The Cost',            short: 'The Cost',   ref: 'Luke 10:35', verse: '"When I return, I will reimburse you."',      watermark: 'THE COST'    },
    { key: 'restored',    label: 'The Answer',          short: 'The Answer', ref: 'Luke 10:37', verse: '"The one who had mercy on him."',             watermark: 'THE ANSWER'  },
  ],
  phaseVisuals: {
    drive:       { bg: 'linear-gradient(160deg, #0a0a1a 0%, #1a1a3a 100%)', emoji: '🚗', label: 'The Drive'   },
    involvement: { bg: 'linear-gradient(160deg, #0a1a2a 0%, #1a3a5a 100%)', emoji: '🏥', label: 'Involved'    },
    sacrifice:   { bg: 'linear-gradient(160deg, #0a1a0a 0%, #1a3a1a 100%)', emoji: '💸', label: 'The Cost'    },
    restored:    { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'The Answer'  },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Luke 10:30–37',
    invitation: 'The question Jesus asked is still the right question. Not "who is my neighbor?" but "which one became a neighbor?" The answer is the one who stopped. The one who paid. You have a parking garage in your life right now. Someone is in it.',
  },
};
