// The Well   Woman at the Well (John 4:1–42)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'routine',
  scene:
    "You go to the park at noon because nobody else does. Early morning and evening are the social hours   the joggers, the dog walkers, the couples. Noon in July is dead. That's the point. You fill your water bottle at the fountain near the parking lot, same as always. You don't need the water. You just needed to leave the apartment. It's been six weeks since Jake moved out. Four years. You stopped counting which relationship number he was.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Turn back. Go home.' },
  rightChoice: { label: 'Sit by the fountain a while.' },
  leftDeltas:  { stat1: -5, stat2: -5, stat3: -8 },
  rightDeltas: { stat1:  5, stat2:  8, stat3:  5 },
  journal: 'I went to the park at noon so I wouldn\'t have to see anyone.',
};

const ENCOUNTER_CARD = {
  id: 'encounter',
  type: 'fixed',
  phase: 'encounter',
  scene:
    "There's a man sitting on the bench. He looks tired, like he's been traveling. He asks if he can use your charger, then after a pause he says, 'What do you come here looking for?' It's such a strange question. You start to say 'nothing'   you almost say 'water'   but instead you say, 'I don't know.' He nods like that's the most honest thing he's heard all day.",
  characterName: 'The Stranger',
  characterRole: 'Who asked the right question',
  leftChoice: { label: 'Change the subject. Keep it light.' },
  rightChoice: { label: 'Stay with the honesty.' },
  leftDeltas:  { stat1: 5, stat2: -5, stat3: -10 },
  rightDeltas: { stat1: 0, stat2: 10, stat3:  15 },
  journal: 'A stranger asked what I was looking for. I said I didn\'t know.',
};

const KNOWN_CARD = {
  id: 'known',
  type: 'fixed',
  phase: 'revelation',
  scene:
    "The conversation has gone places you didn't expect. Then he says something that stops you cold. Not about the past specifically, more like he described the shape of your life without knowing any of the details. Five times you thought you found it. Five times the thing you were reaching for turned out to be something else entirely. And this stranger, who doesn't know your name, somehow understood that. Your first instinct is to change the subject.",
  characterName: 'The Stranger',
  characterRole: 'Who already knew',
  leftChoice: { label: 'Deflect. Ask him something else.' },
  rightChoice: { label: 'Let yourself be seen.' },
  leftDeltas:  { stat1: 5, stat2: -10, stat3: -15 },
  rightDeltas: { stat1: -5, stat2: 15, stat3:  28 },
  journal: 'He knew the shape of my life. I let him see me anyway.',
};

const RUNNING_CARD = {
  id: 'running',
  type: 'fixed',
  phase: 'telling',
  scene:
    "You leave the park faster than you arrived. But not the way you left the others. You call your sister from the parking lot   the one you haven't talked to in seven months   and you say, 'Something happened. I need to tell you.' She's quiet for a second, then says, 'I'm listening.' You don't have words yet for what happened on that bench. But for the first time in years, the going-home feels different from the running-away.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Tell her. The whole thing.' },
  rightChoice: { label: 'Start small. See if she\'ll listen.' },
  leftDeltas:  { stat1: -5, stat2: 25, stat3: 20 },
  rightDeltas: { stat1:  0, stat2: 15, stat3: 15 },
  journal: 'I called my sister and said something happened. I told her everything.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.encounterShown && actNum >= 4) {
    return { card: ENCOUNTER_CARD, flags: { ...flags, encounterShown: true } };
  }

  if (flags.encounterShown && !flags.knownShown && actNum >= 7) {
    return { card: KNOWN_CARD, flags: { ...flags, knownShown: true } };
  }

  if (flags.knownShown && !flags.runningShown && actNum >= 10) {
    return { card: RUNNING_CARD, flags: { ...flags, runningShown: true } };
  }

  if (flags.runningShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'routine';
  if (actNum <= 6)  return 'encounter';
  if (actNum <= 9)  return 'revelation';
  return 'telling';
}

function getEnding(stats) {
  if (stats.stat3 >= 65) return {
    headline: 'You found living water.',
    body: "Not at the fountain. Not from any of the five. From a conversation you didn't plan at noon in the park. You told everyone. You couldn't stop.",
    sceneType: 'feast',
  };
  if (stats.stat3 >= 40) return {
    headline: 'You were seen.',
    body: "Truly known, not just known about. And it didn't end you. It was the first thing in a long time that felt like it might actually last.",
    sceneType: 'embrace',
  };
  return {
    headline: 'Something cracked open.',
    body: "You still don't have the words for it. But noon at the park was different. You were different. The thirst you've been carrying is finally on the table.",
    sceneType: 'longRoad',
  };
}

const PASSAGE = [
  { ref: '7–10', text: 'When a Samaritan woman came to draw water, Jesus said to her, "Will you give me a drink?" The Samaritan woman said to him, "You are a Jew and I am a Samaritan woman. How can you ask me for a drink?" Jesus answered her, "If you knew the gift of God and who it is that asks you for a drink, you would have asked him and he would have given you living water."' },
  { ref: '13–14', text: '"Everyone who drinks this water will be thirsty again, but whoever drinks the water I give them will never thirst. Indeed, the water I give them will become in them a spring of water welling up to eternal life."' },
  { ref: '17–18', text: '"I have no husband," she replied. Jesus said to her, "You are right when you say you have no husband. The fact is, you have had five husbands, and the man you now have is not your husband. What you have just said is quite true."' },
  { ref: '28–30', text: 'Then, leaving her water jar, the woman went back to the town and said to the people, "Come, see a man who told me everything I ever did. Could this be the Messiah?" They came out of the town and made their way toward him.' },
];

export const well = {
  id: 'well',
  title: 'The Well',
  subtitle: 'A modern story of the woman at the well',
  scripture: 'John 4:1–42',
  verse: '"Come, see a man who told me everything I ever did."',
  verseRef: 'John 4:29',
  tagline: 'Five tries. Still thirsty. You go alone at noon so you don\'t have to explain yourself.',
  description: 'You\'ve been in five relationships that didn\'t hold. You go to the park at noon to avoid the morning crowd. A stranger on a bench asks a question you can\'t brush off. You track your longing, your honesty, and your openness.',
  gradient: 'linear-gradient(135deg, #1a1a3a 0%, #3a2a5a 50%, #6a4a8a 100%)',
  accentColor: '#9a6ac4',
  statConfig: {
    stat1: { key: 'stat1', name: 'Longing',  color: 'linear-gradient(90deg, #2a1a5a, #6a4a9a)', icon: '💧' },
    stat2: { key: 'stat2', name: 'Honesty',  color: 'linear-gradient(90deg, #1a3a4a, #4a8aaa)', icon: '🪞' },
    stat3: { key: 'stat3', name: 'Openness', color: 'linear-gradient(90deg, #3a2a1a, #9a6a3a)', icon: '✦' },
  },
  initialStats: { stat1: 80, stat2: 25, stat3: 15 },
  initialFlags: { encounterShown: false, knownShown: false, runningShown: false },
  phases: [
    { key: 'routine',   label: 'The Noon Routine',   short: 'The Routine', ref: 'John 4:6',  verse: '"It was about noon."',                              watermark: 'THE ROUTINE'  },
    { key: 'encounter', label: 'The Stranger',        short: 'The Ask',     ref: 'John 4:7',  verse: '"Will you give me a drink?"',                       watermark: 'THE ASK'      },
    { key: 'revelation',label: 'Being Known',         short: 'Being Known', ref: 'John 4:18', verse: '"What you have just said is quite true."',          watermark: 'BEING KNOWN'  },
    { key: 'telling',   label: 'Running Back',        short: 'Running Back',ref: 'John 4:29', verse: '"Come, see a man who told me everything..."',       watermark: 'RUNNING BACK' },
    { key: 'restored',  label: 'Living Water',        short: 'Living Water',ref: 'John 4:14', verse: '"A spring of water welling up to eternal life."',   watermark: 'LIVING WATER' },
  ],
  phaseVisuals: {
    routine:    { bg: 'linear-gradient(160deg, #1a1a2a 0%, #3a2a5a 100%)', emoji: '💧', label: 'The Routine'  },
    encounter:  { bg: 'linear-gradient(160deg, #1a2a3a 0%, #3a4a6a 100%)', emoji: '🌊', label: 'The Ask'      },
    revelation: { bg: 'linear-gradient(160deg, #2a1a4a 0%, #5a3a8a 100%)', emoji: '🪞', label: 'Being Known'  },
    telling:    { bg: 'linear-gradient(160deg, #2a2a1a 0%, #5a5a3a 100%)', emoji: '🏃', label: 'Running Back' },
    restored:   { bg: 'linear-gradient(160deg, #1a3a2a 0%, #3a6a5a 100%)', emoji: '🌅', label: 'Living Water' },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'John 4:7–30',
    invitation: 'The water you keep reaching for, in relationships, in busyness, in the next thing, keeps running dry. There is a water that does not. And the one who offers it already knows your whole story. That\'s the point.',
  },
};
