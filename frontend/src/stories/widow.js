// The Fight   Persistent Widow (Luke 18:1–8)

const OPENING_CARD = {
  id: 'opening',
  type: 'fixed',
  phase: 'injustice',
  scene:
    "The landlord changed the locks while you were at work. You came home to your bags on the stoop and a notice you can barely parse. Your lease was proper. You paid every month. You have the receipts. But you're a single woman with three kids in a building that just sold to a development company, and apparently that changes the math. Your sister says, 'Let it go. You can stay with us.' You look at the paper in your hand.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'You can\'t fight this. Let it go.' },
  rightChoice: { label: 'Get a lawyer. Fight it.' },
  leftDeltas:  { stat1: -10, stat2: -5, stat3: -12 },
  rightDeltas: { stat1: -5,  stat2: 8,  stat3:  15 },
  journal: 'I came home to my bags on the stoop. I\'m not letting this go.',
};

const FIRST_REJECTION = {
  id: 'firstRejection',
  type: 'fixed',
  phase: 'rejection',
  scene:
    "The judge looked at your case for forty seconds. He told his clerk to schedule a continuance. That was six weeks ago. You've called the clerk's office fourteen times. You've sat in the waiting area twice and been told the judge is not available. Your free legal aid lawyer says this is normal, which you already knew was something people said when they meant you probably won't win. You still have to go back tomorrow.",
  characterName: 'The Clerk',
  characterRole: 'Who tells you to wait',
  leftChoice: { label: 'Your lawyer is right. Settle.' },
  rightChoice: { label: 'Go back tomorrow. And the day after.' },
  leftDeltas:  { stat1: 0, stat2: -10, stat3: -15 },
  rightDeltas: { stat1: -5, stat2: 8,  stat3:  18 },
  journal: 'First rejection. Fourteen calls. I\'m going back tomorrow.',
};

const EXHAUSTION_CARD = {
  id: 'exhaustion',
  type: 'fixed',
  phase: 'persistence',
  scene:
    "You are tired in a way that started in your bones. Months of this. People in your life are starting to say things like 'you've done everything you can.' Your kids ask when they're going home. You don't have a good answer. You drive past the courthouse some mornings just to remind yourself it exists, that the fight is still real, that you haven't imagined it. The judge has now seen your face enough times that he looks away first.",
  characterName: null,
  characterRole: null,
  leftChoice: { label: 'This is too much. Enough.' },
  rightChoice: { label: 'You get up and go back.' },
  leftDeltas:  { stat1: 5, stat2: -15, stat3: -20 },
  rightDeltas: { stat1: -5, stat2: 12, stat3:  22 },
  journal: 'I\'m tired in a way that started in my bones. I go back anyway.',
};

const JUSTICE_CARD = {
  id: 'justice',
  type: 'fixed',
  phase: 'justice',
  scene:
    "The clerk calls your name different this time. The judge rules in your favor. Not because the law suddenly changed, or because he became a good man. He says plainly that he is granting the motion to stop your incessant appearances. You sit in the hallway afterward and don't know whether to laugh or cry. Your kids are getting their home back. You went every day when nobody believed you would. You did not stop.",
  characterName: 'The Judge',
  characterRole: 'Who finally relented',
  leftChoice: { label: 'Take the win. Quietly go home.' },
  rightChoice: { label: 'Tell everyone who helped you fight.' },
  leftDeltas:  { stat1: 5,  stat2: 10, stat3: 10 },
  rightDeltas: { stat1: -5, stat2: 20, stat3: 20 },
  journal: 'He ruled in my favor. I sat in the hallway and didn\'t know whether to cry.',
};

function getNextCard({ previousCardId, direction, stats, actNum, flags }) {
  if (previousCardId === 'opening') return null;

  if (!flags.rejectionShown && actNum >= 4) {
    return { card: FIRST_REJECTION, flags: { ...flags, rejectionShown: true } };
  }

  if (flags.rejectionShown && !flags.exhaustionShown && actNum >= 7) {
    return { card: EXHAUSTION_CARD, flags: { ...flags, exhaustionShown: true } };
  }

  if (flags.exhaustionShown && !flags.justiceShown) {
    if (direction === 'right' || actNum >= flags.exhaustionAct + 3) {
      return { card: JUSTICE_CARD, flags: { ...flags, justiceShown: true, exhaustionAct: actNum } };
    }
  }

  if (flags.justiceShown && actNum >= 12) {
    return { card: { id: 'ending', type: 'ending', phase: 'restored' }, flags, isEnding: true };
  }

  return null;
}

function getAIPhase(actNum) {
  if (actNum <= 3)  return 'injustice';
  if (actNum <= 6)  return 'rejection';
  if (actNum <= 9)  return 'persistence';
  return 'justice';
}

function getEnding(stats) {
  if (stats.stat3 >= 65) return {
    headline: 'Justice came.',
    body: "Not easily, not quickly. It came because you went back every day when stopping made sense. That is faith. That is persistence. That is how it works.",
    sceneType: 'courthouse',
  };
  if (stats.stat3 >= 40) return {
    headline: 'You didn\'t quit.',
    body: "That's the whole story. The system wore you down and you didn't quit. Whatever came of it, the going back mattered.",
    sceneType: 'longRoad',
  };
  return {
    headline: 'You kept showing up.',
    body: "Even exhausted. Even doubted. The parable is about what happens when you don\'t stop. You found out.",
    sceneType: 'longRoad',
  };
}

const PASSAGE = [
  { ref: '1–3', text: 'Then Jesus told his disciples a parable to show them that they should always pray and not give up. He said: "In a certain town there was a judge who neither feared God nor cared what people thought. And there was a widow in that town who kept coming to him with the plea, \'Grant me justice against my adversary.\'"' },
  { ref: '4–5', text: '"For some time he refused. But finally he said to himself, \'Even though I don\'t fear God or care what people think, yet because this widow keeps bothering me, I will see that she gets justice, so that she won\'t eventually come and attack me!\'"' },
  { ref: '6–8', text: 'And the Lord said, "Listen to what the unjust judge says. And will not God bring about justice for his chosen ones, who cry out to him day and night? Will he keep putting them off? I tell you, he will see that they get justice, and quickly. However, when the Son of Man comes, will he find faith on the earth?"' },
];

export const widow = {
  id: 'widow',
  title: 'The Fight',
  subtitle: 'A modern story of the persistent widow',
  scripture: 'Luke 18:1–8',
  verse: '"She should always pray and not give up."',
  verseRef: 'Luke 18:1',
  tagline: 'They changed the locks while you were at work. You\'re not letting this go.',
  description: 'You came home to your bags on the stoop. The system doesn\'t care. Your lawyer says settle. But you have receipts, a case, and kids who need to go home. Every rejection is a reason to come back. You track your exhaustion, your resolve, and your justice.',
  gradient: 'linear-gradient(135deg, #2a1a0a 0%, #4a2a0a 50%, #7a4a1a 100%)',
  accentColor: '#c47a3a',
  statConfig: {
    stat1: { key: 'stat1', name: 'Exhaustion', color: 'linear-gradient(90deg, #4a2a0a, #9a5a1a)', icon: '🔋' },
    stat2: { key: 'stat2', name: 'Resolve',    color: 'linear-gradient(90deg, #1a3a2a, #4a8a5a)', icon: '✊' },
    stat3: { key: 'stat3', name: 'Justice',    color: 'linear-gradient(90deg, #1a2a4a, #4a6aaa)', icon: '✦' },
  },
  initialStats: { stat1: 60, stat2: 80, stat3: 20 },
  initialFlags: { rejectionShown: false, exhaustionShown: false, exhaustionAct: 0, justiceShown: false },
  phases: [
    { key: 'injustice',   label: 'The Lock-Out',    short: 'Injustice',  ref: 'Luke 18:3', verse: '"Grant me justice against my adversary."',         watermark: 'INJUSTICE'   },
    { key: 'rejection',   label: 'First Rejection', short: 'Rejected',   ref: 'Luke 18:4', verse: '"For some time he refused."',                      watermark: 'REJECTED'    },
    { key: 'persistence', label: 'Going Back',       short: 'Persisting', ref: 'Luke 18:5', verse: '"Because this widow keeps bothering me..."',       watermark: 'PERSISTING'  },
    { key: 'justice',     label: 'Justice Comes',   short: 'Justice',    ref: 'Luke 18:5', verse: '"I will see that she gets justice."',              watermark: 'JUSTICE'     },
    { key: 'restored',    label: 'The Verdict',     short: 'Won',        ref: 'Luke 18:8', verse: '"He will see that they get justice, and quickly."', watermark: 'WON'         },
  ],
  phaseVisuals: {
    injustice:   { bg: 'linear-gradient(160deg, #1a0a0a 0%, #3a1a1a 100%)', emoji: '🔑', label: 'Injustice'  },
    rejection:   { bg: 'linear-gradient(160deg, #1a1a0a 0%, #3a3a1a 100%)', emoji: '⛔', label: 'Rejected'   },
    persistence: { bg: 'linear-gradient(160deg, #0a1a0a 0%, #1a3a1a 100%)', emoji: '🚶', label: 'Going Back'  },
    justice:     { bg: 'linear-gradient(160deg, #0a0a1a 0%, #1a2a4a 100%)', emoji: '⚖️', label: 'Justice'    },
    restored:    { bg: 'linear-gradient(160deg, #1a2a1a 0%, #3a5a3a 100%)', emoji: '🌅', label: 'Won'         },
  },
  openingCard: OPENING_CARD,
  getNextCard,
  getAIPhase,
  endingConfig: {
    getEnding,
    passage: PASSAGE,
    passageRef: 'Luke 18:1–8',
    invitation: 'Jesus told this story to people who were ready to give up. He said: don\'t. Not because the system is fair. The judge in the parable is explicitly unjust. But because persistence is faith in action. What are you about to stop fighting for?',
  },
};
