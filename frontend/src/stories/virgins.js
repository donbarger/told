// Not Ready   Ten Virgins (Matthew 25:1-13)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'waiting',
  scene:
    "You knew this was coming. Everyone did. You made the plan, you got your things together, you showed up. You are not the kind of person who misses things that matter. But there is a difference between being present and being prepared, and somewhere between those two things you may have miscalculated. The wait has been longer than expected. You have been here long enough that the urgency wore off. The lamp is getting low. You assumed that would not be a problem by now.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'You are here. That\'s what matters.' },
  rightChoice: { label: 'Being here and being ready are not the same.' },
  leftDeltas:  { stat1: 8,  stat2: 5,  stat3: -10 },
  rightDeltas: { stat1: -5, stat2: -5, stat3:  12 },
  journal: 'I showed up. I did not account for the wait being this long.',
};

const MIDNIGHT_CARD = {
  id: 'midnight',
  type: 'fixed',
  phase: 'midnight',
  scene:
    "The announcement comes at midnight. Not when you planned for it. Not at a convenient hour. The cry goes out: here he comes. Go and meet him. Everything that was theoretical is now immediate. You look at your lamp and you know. You know before you ask. You turn to the women next to you and ask if they can share. They say no, not because they are cruel, but because if they give you theirs there will not be enough for anyone. There is no one to be angry at. The oil was your responsibility and you knew it.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Go find more. There has to be a way.' },
  rightChoice: { label: 'Sit with what this reveals about you.' },
  leftDeltas:  { stat1: 5,  stat2: 8,  stat3: -12 },
  rightDeltas: { stat1: -5, stat2: -8, stat3:  20 },
  journal: 'The cry came at midnight. My lamp was not ready. No one else\'s oil could cover it.',
};

const DOOR_CARD = {
  id: 'door',
  type: 'fixed',
  phase: 'door',
  scene:
    "The five who were ready went in. The door closed. You arrive later and knock. Lord, lord, open to us. The answer comes through the door: I tell you, I do not know you. It is not cruel. It is just true. You were not present in the way that counts. You had the invitation. You had the lamp. You had the time. What you did not have was the oil, and the oil is the part no one can give you. You already knew this. That is the hardest part.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'I had the right intentions. That should count.' },
  rightChoice: { label: 'Intentions are not the same as preparation.' },
  leftDeltas:  { stat1: 5,  stat2: 8,  stat3: -18 },
  rightDeltas: { stat1: -8, stat2: -8, stat3:  25 },
  journal: 'I knocked. The door did not open. The oil was my responsibility.',
};

const WATCH_CARD = {
  id: 'watch',
  type: 'fixed',
  phase: 'watching',
  scene:
    "The parable ends with a command: watch, because you do not know the day or the hour. Not watch anxiously. Not watch nervously. Watch in the way that the prepared five watched: they had what they needed, so they could wait without fear. The question this story asks is not whether you will show up. It is what you are filling your lamp with in the long, quiet, ordinary time before the cry goes out. The ordinary time is not the waiting room. It is the preparation.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'I will handle this when it matters more.' },
  rightChoice: { label: 'The ordinary time is the preparation.' },
  leftDeltas:  { stat1: 5,  stat2: 5,  stat3: -15 },
  rightDeltas: { stat1: -5, stat2: -8, stat3:  28 },
  journal: 'Watch. Not anxiously. But actually. The ordinary time is not waiting. It is filling.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.midnightShown && actNum >= 4) {
    return { card: MIDNIGHT_CARD, flags: { ...flags, midnightShown: true } };
  }

  if (flags.midnightShown && !flags.doorShown && actNum >= 7) {
    return { card: DOOR_CARD, flags: { ...flags, doorShown: true } };
  }

  if (flags.doorShown && !flags.watchShown && actNum >= 10) {
    return { card: WATCH_CARD, flags: { ...flags, watchShown: true } };
  }

  if (flags.watchShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'waiting';
  if (actNum <= 6)  return 'midnight';
  if (actNum <= 9)  return 'door';
  return 'watching';
}

function getEnding(stats) {
  if (stats.stat3 >= 60) return {
    headline: 'You are filling the lamp.',
    body: "Not in a hurry, not in a panic. In the ordinary time, before the cry goes out. That is what the five who were ready were doing. You understand now what they understood. The oil is not something you borrow.",
    sceneType: 'longRoad',
  };
  if (stats.stat3 >= 35) return {
    headline: 'You heard the parable.',
    body: "You came in with the lamp and left asking whether it is actually full. That is more than most people do with this story. The question of what you are filling it with is now on the table.",
    sceneType: 'apartment',
  };
  return {
    headline: 'You were here.',
    body: "You showed up. You had the lamp. You meant to be ready. The story Jesus told says that is not enough. Not as condemnation. As an invitation to ask what the oil actually is, and whether you have been filling it.",
    sceneType: 'coldStreet',
  };
}

const PASSAGE = [
  { ref: '1-4', text: '"At that time the kingdom of heaven will be like ten virgins who took their lamps and went out to meet the bridegroom. Five of them were foolish and five were wise. The foolish ones took their lamps but did not take any oil with them. The wise ones, however, took oil in jars along with their lamps."' },
  { ref: '5-8', text: '"The bridegroom was a long time in coming, and they all became drowsy and fell asleep. At midnight the cry rang out: Here\'s the bridegroom! Come out to meet him! Then all the virgins woke up and trimmed their lamps. The foolish ones said to the wise, Give us some of your oil; our lamps are going out."' },
  { ref: '11-13', text: '"Later the others also came. Lord, lord, they said, open the door for us! But he replied, Truly I tell you, I don\'t know you. Therefore keep watch, because you do not know the day or the hour."' },
];

export const virgins = {
  id: 'virgins',
  title: 'Not Ready',
  subtitle: 'A modern story of the ten virgins',
  scripture: 'Matthew 25:1-13',
  verse: '"I don\'t know you."',
  verseRef: 'Matthew 25:12',
  tagline: "You showed up. You had the lamp. You assumed that would be enough.",
  description: "You knew this was coming. You made the plan, showed up on time, got your things together. But the wait was longer than expected and something ran low that no one else can refill for you. You track your comfort, your time, and your readiness.",
  gradient: 'linear-gradient(135deg, #0a080e 0%, #181420 50%, #281e38 100%)',
  accentColor: '#9a8ab4',
  statConfig: {
    stat1: { key: 'stat1', name: 'Comfort',   color: 'linear-gradient(90deg, #2a2a4a, #5a5a8a)', icon: '🕯️' },
    stat2: { key: 'stat2', name: 'Time',      color: 'linear-gradient(90deg, #3a2a1a, #7a5a3a)', icon: '⏳' },
    stat3: { key: 'stat3', name: 'Readiness', color: 'linear-gradient(90deg, #1a3a2a, #4a8a6a)', icon: '✦' },
  },
  initialStats: { stat1: 70, stat2: 75, stat3: 10 },
  initialFlags: { midnightShown: false, doorShown: false, watchShown: false },
  phases: [
    { key: 'waiting',  label: 'The Wait',        short: 'Waiting',   ref: 'Matt 25:1',  verse: '"They went out to meet the bridegroom."',      watermark: 'THE WAIT'     },
    { key: 'midnight', label: 'The Midnight Cry', short: 'Midnight',  ref: 'Matt 25:6',  verse: '"Here\'s the bridegroom! Come out!"',           watermark: 'MIDNIGHT'     },
    { key: 'door',     label: 'The Closed Door',  short: 'The Door',  ref: 'Matt 25:11', verse: '"Lord, lord, open the door for us."',          watermark: 'THE DOOR'     },
    { key: 'watching', label: 'The Oil',          short: 'Watching',  ref: 'Matt 25:13', verse: '"Keep watch."',                                watermark: 'THE OIL'      },
    { key: 'restored', label: 'The Lamp',         short: 'The Lamp',  ref: 'Matt 25:13', verse: '"You do not know the day or the hour."',       watermark: 'READY'        },
  ],
  phaseVisuals: {
    waiting:  { bg: 'linear-gradient(160deg, #0a080e 0%, #181420 100%)', emoji: '🌑', label: 'The Wait'    },
    midnight: { bg: 'linear-gradient(160deg, #060608 0%, #120c18 100%)', emoji: '🕯️', label: 'Midnight'    },
    door:     { bg: 'linear-gradient(160deg, #080808 0%, #181010 100%)', emoji: '🚪', label: 'The Door'    },
    watching: { bg: 'linear-gradient(160deg, #0a0a18 0%, #1a1a30 100%)', emoji: '⏳', label: 'The Oil'     },
    restored: { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'Ready'       },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Matthew 25:1-13',
    invitation: 'The parable is not about missing a wedding. It is about the long, unglamorous stretch between knowing something matters and actually being ready for it. The five who were ready were not more committed. They were more prepared. The oil is what happens in the ordinary days, in the quiet, before any cry goes out. It cannot be borrowed at the last minute. It cannot be given away. It grows quietly over time or it does not grow at all.',
  },
};
