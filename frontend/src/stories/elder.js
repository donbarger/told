// The Years I Stayed   Elder Brother (Luke 15:25-32)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'faithful',
  scene:
    "Your name is not in the story. That's the first thing. The younger one has a name: the prodigal. The father has a role: the one who runs. You are just 'the older son.' You've been here the whole time. Waking up early, working the field, doing what was asked. You never left. You never asked for your half. You have never once embarrassed your father in front of the neighbors. The smell of dinner is drifting from the house. And it is not for you.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: "You've earned your place. This is fine." },
  rightChoice: { label: 'Something about this is not fine.' },
  leftDeltas:  { stat1: 8,  stat2: 5,  stat3: -12 },
  rightDeltas: { stat1: -5, stat2: 8,  stat3:  10 },
  journal: "I've been here the whole time and my name is not in the story.",
};

const MUSIC_CARD = {
  id: 'music',
  type: 'fixed',
  phase: 'party',
  scene:
    "You come in from the field and hear it before you see it. Music. People laughing. A servant tells you your brother has come home and your father has killed the fattened calf. The calf you watched grow up. The one you never asked for. He spent your father's money on everything your father warned him about, and now your father is dancing. You stand at the edge of the yard. You cannot make yourself go in.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: "Don't go in. You're done." },
  rightChoice: { label: 'Stay. Wait to hear it from your father.' },
  leftDeltas:  { stat1: 5,  stat2: 15, stat3: -18 },
  rightDeltas: { stat1: 0,  stat2: 8,  stat3:   8 },
  journal: 'I heard the music and I could not go in.',
};

const FATHER_COMES_CARD = {
  id: 'fatherComes',
  type: 'fixed',
  phase: 'outside',
  scene:
    "Your father comes out to you. He doesn't send a servant. He comes himself, out of the party he threw for the one who left, and he stands with you in the dark. You tell him all of it. Every year. Every morning you got up and worked when you could have left. He does not argue with a single thing you say. He says: you are always with me. Everything I have is yours. He is not taking anything from you. It just feels like he is.",
  characterName: 'Your Father',
  characterRole: 'Who came out to find you',
  leftChoice: { label: 'I know what he cost this family. I was here.' },
  rightChoice: { label: 'He came out to find me too.' },
  leftDeltas:  { stat1: 5,  stat2: 12, stat3: -15 },
  rightDeltas: { stat1: -5, stat2: -8, stat3:  22 },
  journal: 'My father came out to me. He said everything he has is mine.',
};

const DOOR_CARD = {
  id: 'door',
  type: 'fixed',
  phase: 'door',
  scene:
    "The music is still going. He's asked you to come in. Not ordered. Asked. He hasn't cancelled the party. He hasn't sent your brother back out. He is holding both things at once and somehow that isn't a contradiction to him. You have every reason not to go in. You also have a father who just walked out of a party to stand in the dark with you. The door is right there.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'You stay outside.' },
  rightChoice: { label: 'You go in.' },
  leftDeltas:  { stat1: 5,  stat2: 8,  stat3: -20 },
  rightDeltas: { stat1: -8, stat2: -12, stat3: 30 },
  journal: 'He asked me to come in. I had to decide what to do with that.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.musicShown && actNum >= 4) {
    return { card: MUSIC_CARD, flags: { ...flags, musicShown: true } };
  }

  if (flags.musicShown && !flags.fatherShown && actNum >= 7) {
    return { card: FATHER_COMES_CARD, flags: { ...flags, fatherShown: true } };
  }

  if (flags.fatherShown && !flags.doorShown && actNum >= 10) {
    return { card: DOOR_CARD, flags: { ...flags, doorShown: true } };
  }

  if (flags.doorShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'faithful';
  if (actNum <= 6)  return 'party';
  if (actNum <= 9)  return 'outside';
  return 'door';
}

function getEnding(stats) {
  if (stats.stat3 >= 60) return {
    headline: 'You went in.',
    body: "Not because you were wrong about what he did. Not because the math added up. Because your father came out to find you and that meant something you couldn't argue with.",
    sceneType: 'feast',
  };
  if (stats.stat3 >= 35) return {
    headline: 'You stood in the doorway.',
    body: "Not all the way out, not all the way in. The resentment was real and so was the pull. Standing there is still a choice. It's not finished.",
    sceneType: 'homeGate',
  };
  return {
    headline: 'You stayed outside.',
    body: "You were right about everything. That's the hardest part of this story. Being right and being free are not the same thing.",
    sceneType: 'coldStreet',
  };
}

const PASSAGE = [
  { ref: '25-27', text: '"Meanwhile, the older son was in the field. When he came near the house, he heard music and dancing. So he called one of the servants and asked him what was going on. Your brother has come, he replied, and your father has killed the fattened calf because he has him back safe and sound."' },
  { ref: '28-30', text: '"The older brother became angry and refused to go in. So his father went out and pleaded with him. But he answered his father, Look! All these years I have been slaving for you and never disobeyed your orders. Yet you never gave me even a young goat so I could celebrate with my friends. But when this son of yours who has squandered your property comes home, you kill the fattened calf for him!"' },
  { ref: '31-32', text: '"My son, the father said, you are always with me, and everything I have is yours. But we had to celebrate and be glad, because this brother of yours was dead and is alive again; he was lost and is found."' },
];

export const elder = {
  id: 'elder',
  title: 'The Years I Stayed',
  subtitle: 'A modern story of the elder brother',
  scripture: 'Luke 15:25-32',
  verse: '"You are always with me, and everything I have is yours."',
  verseRef: 'Luke 15:31',
  tagline: "Your brother left, blew everything, and now there's a party. You've been here the whole time.",
  description: "You are the one who stayed. You worked, you were faithful, you never embarrassed anyone. Your brother came back with nothing and your father threw him a party. You're standing in the field. You track your loyalty, your resentment, and your grace.",
  gradient: 'linear-gradient(135deg, #080f06 0%, #142410 50%, #1e3818 100%)',
  accentColor: '#8a7a3a',
  statConfig: {
    stat1: { key: 'stat1', name: 'Loyalty',    color: 'linear-gradient(90deg, #2a3a10, #6a7a30)', icon: '⚒️' },
    stat2: { key: 'stat2', name: 'Resentment', color: 'linear-gradient(90deg, #3a1a0a, #8a4a2a)', icon: '🔥' },
    stat3: { key: 'stat3', name: 'Grace',      color: 'linear-gradient(90deg, #1a2a4a, #4a6a9a)', icon: '✦' },
  },
  initialStats: { stat1: 80, stat2: 50, stat3: 15 },
  initialFlags: { musicShown: false, fatherShown: false, doorShown: false },
  phases: [
    { key: 'faithful', label: 'The Long Years',    short: 'Faithful',   ref: 'Luke 15:25', verse: '"The older son was in the field."',           watermark: 'FAITHFUL'   },
    { key: 'party',    label: 'The Music',          short: 'The Party',  ref: 'Luke 15:25', verse: '"He heard music and dancing."',               watermark: 'THE PARTY'  },
    { key: 'outside',  label: 'Standing Outside',   short: 'Outside',    ref: 'Luke 15:28', verse: '"He refused to go in."',                    watermark: 'OUTSIDE'    },
    { key: 'door',     label: 'The Door',           short: 'The Door',   ref: 'Luke 15:31', verse: '"Everything I have is yours."',              watermark: 'THE DOOR'   },
    { key: 'restored', label: 'The Choice',         short: 'The Choice', ref: 'Luke 15:32', verse: '"We had to celebrate."',                    watermark: 'THE CHOICE' },
  ],
  phaseVisuals: {
    faithful:  { bg: 'linear-gradient(160deg, #080f06 0%, #1a3010 100%)', emoji: '⚒️', label: 'The Field'   },
    party:     { bg: 'linear-gradient(160deg, #1a1a08 0%, #3a3a10 100%)', emoji: '🎵', label: 'The Music'   },
    outside:   { bg: 'linear-gradient(160deg, #080808 0%, #181810 100%)', emoji: '🌑', label: 'Outside'     },
    door:      { bg: 'linear-gradient(160deg, #1a0a08 0%, #3a2a18 100%)', emoji: '🚪', label: 'The Door'    },
    restored:  { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'The Choice'  },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Luke 15:25-32',
    invitation: 'The story of the prodigal has two sons. Most people read it from the outside and root for the younger one. But some of us are standing in the field right now, faithful and furious. The father came out to find the elder son too. He is still coming.',
  },
};
