// What I Couldn't Say   Nicodemus (John 3:1-21)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'standing',
  scene:
    "You have built something worth protecting. Not a fortune exactly. A name. A position. People know you as the one who has thought carefully about things that matter, who holds the institution together, who can be trusted with the hard conversations. It has taken twenty years. You are not going to throw it away over a feeling. But something has been bothering you for months, since you heard him speak, and the feeling is not going away. You have started reading his words in private. You have started agreeing with them.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'This is a phase. Keep your head down.' },
  rightChoice: { label: 'The question is real. You have to ask it.' },
  leftDeltas:  { stat1: 8,  stat2: -5, stat3: -10 },
  rightDeltas: { stat1: -5, stat2: 8,  stat3:  12 },
  journal: 'I have been reading his words in private and agreeing with them.',
};

const NIGHT_CARD = {
  id: 'night',
  type: 'fixed',
  phase: 'night',
  scene:
    "You arrange it for late. Not because you are ashamed, you tell yourself. Because the days are too busy. You go to where he is staying and you say the polite thing first: Rabbi, we know you are a teacher who has come from God. It is a compliment and it is true and it is also a way of not saying the real thing yet. He doesn't accept the compliment. He doesn't build on it. He says, very directly, that unless a person is born again they cannot see the kingdom of God. You did not come here for riddles.",
  characterName: 'The Teacher',
  characterRole: 'Who skipped the small talk',
  leftChoice: { label: 'Push back. Ask for clarity.' },
  rightChoice: { label: 'Sit with it. Don\'t deflect.' },
  leftDeltas:  { stat1: 5,  stat2: -5, stat3: -8  },
  rightDeltas: { stat1: -5, stat2: 8,  stat3:  15 },
  journal: 'I went at night. I said the polite thing first. He went somewhere else entirely.',
};

const WIND_CARD = {
  id: 'wind',
  type: 'fixed',
  phase: 'wind',
  scene:
    "He says the wind blows where it wants. You hear the sound of it but you don't know where it comes from or where it goes. It is like that with everyone born of the Spirit. You have managed your reputation by knowing exactly where everything comes from and where it's going. A life of traceable causes and controlled effects. He is describing something that does not operate that way at all. And for some reason that specific image is the one you cannot shake on the walk home.",
  characterName: 'The Teacher',
  characterRole: 'Who described the uncontrollable',
  leftChoice: { label: 'What you can\'t manage, you can\'t trust.' },
  rightChoice: { label: 'Maybe that\'s exactly the point.' },
  leftDeltas:  { stat1: 8,  stat2: -5, stat3: -15 },
  rightDeltas: { stat1: -8, stat2: 8,  stat3:  22 },
  journal: 'He said the wind goes where it wants. I am still thinking about that.',
};

const LIGHT_CARD = {
  id: 'light',
  type: 'fixed',
  phase: 'light',
  scene:
    "He says something toward the end that you did not plan to hear. He says people love darkness because their deeds are evil, but whoever lives by the truth comes into the light. You have been operating in the dark. Not because you are doing wrong things. Because you are doing right things privately that you are not willing to do publicly. The cost of the light is that other people can see you. You came here at night. That detail is not lost on you.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'The timing isn\'t right. Not yet.' },
  rightChoice: { label: 'You have been afraid of the light.' },
  leftDeltas:  { stat1: 8,  stat2: -5, stat3: -18 },
  rightDeltas: { stat1: -8, stat2: 8,  stat3:  28 },
  journal: 'I came here in the dark. He told me to come into the light.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.nightShown && actNum >= 4) {
    return { card: NIGHT_CARD, flags: { ...flags, nightShown: true } };
  }

  if (flags.nightShown && !flags.windShown && actNum >= 7) {
    return { card: WIND_CARD, flags: { ...flags, windShown: true } };
  }

  if (flags.windShown && !flags.lightShown && actNum >= 10) {
    return { card: LIGHT_CARD, flags: { ...flags, lightShown: true } };
  }

  if (flags.lightShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'standing';
  if (actNum <= 6)  return 'night';
  if (actNum <= 9)  return 'wind';
  return 'light';
}

function getEnding(stats) {
  if (stats.stat3 >= 60) return {
    headline: 'You came into the light.',
    body: "Not all at once. But you stopped protecting your reputation from the thing you already believed. That's what coming into the light looks like. Nicodemus got there eventually. So did you.",
    sceneType: 'longRoad',
  };
  if (stats.stat3 >= 35) return {
    headline: 'The wind is still blowing.',
    body: "You can\'t trace it. You can\'t control it. You went home with more questions than answers and one image you can\'t shake. That\'s what the beginning of this looks like.",
    sceneType: 'waterMeeting',
  };
  return {
    headline: 'You went home in the dark.',
    body: "The conversation happened. You heard what you heard. The question is still open and you are still protecting something. He knows. He didn't say it to condemn you.",
    sceneType: 'apartment',
  };
}

const PASSAGE = [
  { ref: '1-2', text: 'Now there was a Pharisee, a man named Nicodemus who was a member of the Jewish ruling council. He came to Jesus at night and said, "Rabbi, we know that you are a teacher who has come from God. For no one could perform the signs you are doing if God were not with him."' },
  { ref: '3-5', text: 'Jesus replied, "Very truly I tell you, no one can see the kingdom of God unless they are born again." "How can someone be born when they are old?" Nicodemus asked. "Surely they cannot enter a second time into their mother\'s womb to be born!" Jesus answered, "Very truly I tell you, no one can enter the kingdom of God unless they are born of water and the Spirit."' },
  { ref: '8', text: '"The wind blows wherever it pleases. You hear its sound, but you cannot tell where it comes from or where it is going. So it is with everyone born of the Spirit."' },
  { ref: '19-21', text: '"This is the verdict: Light has come into the world, but people loved darkness instead of light because their deeds were evil. Everyone who does evil hates the light, and will not come into the light for fear that their deeds will be exposed. But whoever lives by the truth comes into the light."' },
];

export const nicodemus = {
  id: 'nicodemus',
  title: 'What I Couldn\'t Say',
  subtitle: 'A modern story of Nicodemus',
  scripture: 'John 3:1-21',
  verse: '"He came to Jesus at night."',
  verseRef: 'John 3:2',
  tagline: "You believe something privately that you can't say publicly. You arranged a conversation for after dark.",
  description: "You've built something worth protecting. A name, a position, a reputation for careful thinking. For months something has been bothering you that you can't discuss in the open. So you go at night. The conversation goes somewhere you didn't plan. You track your reputation, your conviction, and your courage.",
  gradient: 'linear-gradient(135deg, #04040e 0%, #080818 50%, #0c0c28 100%)',
  accentColor: '#7a6ab4',
  statConfig: {
    stat1: { key: 'stat1', name: 'Reputation', color: 'linear-gradient(90deg, #1a1a4a, #4a4a9a)', icon: '🏛️' },
    stat2: { key: 'stat2', name: 'Conviction', color: 'linear-gradient(90deg, #2a1a4a, #6a4a9a)', icon: '💡' },
    stat3: { key: 'stat3', name: 'Courage',    color: 'linear-gradient(90deg, #3a2a1a, #9a7a4a)', icon: '✦' },
  },
  initialStats: { stat1: 90, stat2: 45, stat3: 10 },
  initialFlags: { nightShown: false, windShown: false, lightShown: false },
  phases: [
    { key: 'standing', label: 'The Position',   short: 'Standing',    ref: 'John 3:1',  verse: '"A member of the Jewish ruling council."',  watermark: 'STANDING'   },
    { key: 'night',    label: 'The Night Visit', short: 'The Night',   ref: 'John 3:2',  verse: '"He came to Jesus at night."',              watermark: 'THE NIGHT'  },
    { key: 'wind',     label: 'The Wind',        short: 'The Wind',    ref: 'John 3:8',  verse: '"The wind blows wherever it pleases."',    watermark: 'THE WIND'   },
    { key: 'light',    label: 'Light or Dark',   short: 'The Light',   ref: 'John 3:21', verse: '"Whoever lives by truth comes to light."', watermark: 'THE LIGHT'  },
    { key: 'restored', label: 'Coming Out',      short: 'Coming Out',  ref: 'John 3:21', verse: '"Comes into the light."',                  watermark: 'COMING OUT' },
  ],
  phaseVisuals: {
    standing:  { bg: 'linear-gradient(160deg, #04040e 0%, #0a0a1a 100%)', emoji: '🏛️', label: 'The Position'  },
    night:     { bg: 'linear-gradient(160deg, #020208 0%, #060620 100%)', emoji: '🌑', label: 'The Night'     },
    wind:      { bg: 'linear-gradient(160deg, #04040e 0%, #0e0e28 100%)', emoji: '🌬️', label: 'The Wind'      },
    light:     { bg: 'linear-gradient(160deg, #080808 0%, #201818 100%)', emoji: '🕯️', label: 'The Light'     },
    restored:  { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'Coming Out'    },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'John 3:1-21',
    invitation: 'Nicodemus came at night and left with the wind. He came back later, publicly, to defend Jesus in front of the council. Then he came at the end to help bury him. The belief that starts in the dark doesn\'t have to stay there. Whatever you believe privately: he already knows. The question is whether you want to come into the light.',
  },
};
