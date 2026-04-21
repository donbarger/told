// The Ask   Rich Young Ruler (Mark 10:17–22)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'achievement',
  scene:
    "By any metric, you are doing well. The company you built employs forty-seven people. You run every morning. You give to three charities and you know which ones actually deploy the money. You don't lie, you don't cheat on your wife, and you haven't been drunk since college. You're thirty-one. The thing that keeps you up at night isn't failure. It's the feeling that doing everything right still leaves a gap you can't close.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'The gap doesn\'t matter. Keep building.' },
  rightChoice: { label: 'The gap is the whole question.' },
  leftDeltas:  { stat1:  8, stat2: -5, stat3: -8  },
  rightDeltas: { stat1: -5, stat2:  5, stat3:  12 },
  journal: 'I have everything I was supposed to want and there\'s still something missing.',
};

const ENCOUNTER_CARD = {
  id: 'encounter',
  type: 'fixed',
  phase: 'question',
  scene:
    "You didn't plan to go. A colleague mentioned the name, and you looked the guy up, and somehow you ended up in the back of a room that was more crowded than it had any right to be. Afterward you pushed through to ask your question, the real one, the one you've been carrying, and he listened to it all the way through. Then he looked at you. Not at your watch or your shoes. At you. He said, 'You already know the answer.'",
  characterName: 'The Teacher',
  characterRole: 'Who saw you clearly',
  leftChoice: { label: '"Enlighten me. Which answer?"' },
  rightChoice: { label: '"I think I do know."' },
  leftDeltas:  { stat1: 5, stat2: -5, stat3: -5  },
  rightDeltas: { stat1: 0, stat2:  8, stat3:  12 },
  journal: 'He said I already know the answer. I think he was right.',
};

const THE_ASK_CARD = {
  id: 'theAsk',
  type: 'fixed',
  phase: 'invitation',
  scene:
    "He named the one thing. Not a category. The specific thing. Your company. Not a charitable donation of it, not a restructured philanthropy version of it. The whole thing, liquidated, given away. Then come, and follow. The room got very quiet. He wasn't accusing you. He was inviting you. The two things are not the same, but right now they feel identical. Your hands have gone cold.",
  characterName: 'The Teacher',
  characterRole: 'Who named the one thing',
  leftChoice: { label: 'Walk away. You can\'t do it.' },
  rightChoice: { label: 'Stay. Consider it for real.' },
  leftDeltas:  { stat1: 5, stat2: -15, stat3: -25 },
  rightDeltas: { stat1: -10, stat2: 15, stat3:  22 },
  journal: 'He asked for the one thing I wouldn\'t give. I felt it.',
};

const RECKONING_CARD = {
  id: 'reckoning',
  type: 'fixed',
  phase: 'reckoning',
  scene:
    "You sit in your car for an hour. Then you drive home. Then you sit at your kitchen table until 2 AM. The gap you've been feeling for three years. Tonight you have a name for it. The invitation is still open. You haven't decided anything. But you know the difference now between the life you've built and the life you've been offered, and the knowing is going to change things either way.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'Some invitations you decline with grace.' },
  rightChoice: { label: 'Something has to change. I don\'t know what.' },
  leftDeltas:  { stat1:  5, stat2: -10, stat3: -15 },
  rightDeltas: { stat1: -5, stat2:  8,  stat3:  20 },
  journal: 'I sat in my car for an hour. Then I drove home and couldn\'t sleep.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.encounterShown && actNum >= 5) {
    return { card: ENCOUNTER_CARD, flags: { ...flags, encounterShown: true } };
  }

  if (flags.encounterShown && !flags.askShown && actNum >= 8) {
    return { card: THE_ASK_CARD, flags: { ...flags, askShown: true } };
  }

  if (flags.askShown && !flags.reckoningShown && actNum >= 10) {
    return { card: RECKONING_CARD, flags: { ...flags, reckoningShown: true } };
  }

  if (flags.reckoningShown && actNum >= 13) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 4)  return 'achievement';
  if (actNum <= 7)  return 'question';
  if (actNum <= 9)  return 'invitation';
  return 'reckoning';
}

function getEnding(stats) {
  if (stats.stat3 >= 60) return {
    headline: 'You let go.',
    body: "Not easily. Not without grief. But something in you chose the invitation over the portfolio. And you felt the gap close for the first time.",
    sceneType: 'longRoad',
  };
  if (stats.stat3 >= 35) return {
    headline: 'You\'re still sitting with it.',
    body: "He asked for the one thing. You haven't answered yet. But you're not the same person you were before he asked. That matters.",
    sceneType: 'apartment',
  };
  return {
    headline: 'You walked away.',
    body: "And you were sad when you did it. That sadness is the most honest thing about you. It means you knew.",
    sceneType: 'walkingAway',
  };
}

const PASSAGE = [
  { ref: '17', text: 'As Jesus started on his way, a man ran up to him and fell on his knees before him. "Good teacher," he asked, "what must I do to inherit eternal life?"' },
  { ref: '18–20', text: '"Why do you call me good?" Jesus answered. "No one is good, except God alone. You know the commandments: \'Do not murder, do not commit adultery, do not steal, do not give false testimony, do not defraud, honor your father and mother.\'" "Teacher," he declared, "all these I have kept since I was a boy."' },
  { ref: '21', text: 'Jesus looked at him and loved him. "One thing you lack," he said. "Go, sell everything you have and give to the poor, and you will have treasure in heaven. Then come, follow me."' },
  { ref: '22', text: 'At this the man\'s face fell. He went away sad, because he had great wealth.' },
  { ref: '23', text: 'Jesus looked around and said to his disciples, "How hard it is for the rich to enter the kingdom of God!"' },
];

export const richRuler = {
  id: 'richRuler',
  title: 'The Ask',
  subtitle: 'A modern story of the rich young ruler',
  scripture: 'Mark 10:17–22',
  verse: '"Jesus looked at him and loved him."',
  verseRef: 'Mark 10:21',
  tagline: 'You\'ve done everything right. There\'s still a gap. Tonight someone named it.',
  description: 'You\'ve built something real: career, ethics, reputation. But there\'s a gap that success hasn\'t closed. When you finally ask the right question, the answer is the one thing you can\'t give. You track your security, your identity, and your surrender.',
  gradient: 'linear-gradient(135deg, #0a1a3a 0%, #1a2a5a 50%, #2a3a7a 100%)',
  accentColor: '#4a6abc',
  statConfig: {
    stat1: { key: 'stat1', name: 'Security',   color: 'linear-gradient(90deg, #1a2a6a, #4a6abc)', icon: '🏛️' },
    stat2: { key: 'stat2', name: 'Identity',   color: 'linear-gradient(90deg, #1a4a3a, #3a9a7a)', icon: '🪪' },
    stat3: { key: 'stat3', name: 'Surrender',  color: 'linear-gradient(90deg, #4a3a1a, #9a7a3a)', icon: '✦' },
  },
  initialStats: { stat1: 85, stat2: 80, stat3: 10 },
  initialFlags: { encounterShown: false, askShown: false, reckoningShown: false },
  phases: [
    { key: 'achievement', label: 'The Good Life',    short: 'The Life',    ref: 'Mark 10:17', verse: '"A man ran up to him and fell on his knees."',    watermark: 'THE LIFE'     },
    { key: 'question',    label: 'The Question',     short: 'The Ask',     ref: 'Mark 10:19', verse: '"All these I have kept since I was a boy."',      watermark: 'THE QUESTION' },
    { key: 'invitation',  label: 'One Thing Lacks',  short: 'One Thing',   ref: 'Mark 10:21', verse: '"One thing you lack."',                          watermark: 'ONE THING'    },
    { key: 'reckoning',   label: 'The Long Night',   short: 'The Night',   ref: 'Mark 10:22', verse: '"He went away sad."',                            watermark: 'THE NIGHT'    },
    { key: 'restored',    label: 'The Decision',     short: 'The Choice',  ref: 'Mark 10:21', verse: '"Then come, follow me."',                        watermark: 'THE CHOICE'   },
  ],
  phaseVisuals: {
    achievement: { bg: 'linear-gradient(160deg, #0a1a3a 0%, #1a2a5a 100%)', emoji: '🏛️', label: 'The Good Life'  },
    question:    { bg: 'linear-gradient(160deg, #0a2a2a 0%, #1a4a4a 100%)', emoji: '❓', label: 'The Question'   },
    invitation:  { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a4a3a 100%)', emoji: '📜', label: 'One Thing Lacks' },
    reckoning:   { bg: 'linear-gradient(160deg, #1a1a2a 0%, #2a2a4a 100%)', emoji: '🌙', label: 'The Long Night'  },
    restored:    { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'The Decision'    },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Mark 10:17–22',
    invitation: 'He looked at you and loved you. Before the question and after the answer. Whatever you chose, the love was not conditional on it. But the invitation was real. It may still be. What is the one thing for you?',
  },
};
