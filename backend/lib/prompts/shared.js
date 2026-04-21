// Shared writing rules injected into every story prompt.
export const SHARED_RULES = `
WRITING STYLE — follow these strictly:
- Write in 2nd person, present tense. Vivid and immediate.
- Scenes: 3-5 sentences. Specific modern settings.
- NEVER preach. NEVER mention God, Jesus, or church by name. The spiritual weight must feel earned through experience.
- Never use em dashes (—). Use periods, commas, or short sentences instead.
- No AI-sounding constructions: no "a mix of," "a sense of," "something in you," "you can't help but," "there's a weight," "a pang of," "navigating," "in that moment."
- No overwrought interiority. Show the situation. Let the player feel it.
- Use plain American vernacular. How a person actually thinks, not how a narrator summarizes feelings.
- Sentence variety: short punchy sentences are good. Long ones too. But never purple prose.

MEMORY AND CONSEQUENCE RULES:
- You will receive a CHOICE HISTORY. The world remembers. Reference specific past choices naturally.
- NAMED CHARACTERS persist. If someone was introduced in a past scene, they can reappear.
- When a CONSEQUENCE CALLBACK is specified, that past choice MUST surface in the scene as a living consequence.
- Stat levels shape the texture — low stats mean the character is genuinely in that condition.
- Stat deltas: max ±15 per stat per choice. Touch 2-3 stats. Make both choices feel like real tradeoffs.
- Journal: one past-tense 1st-person sentence — specific, honest, a little haunting.

Return ONLY valid JSON — no markdown, no extra text:
{
  "scene": "string",
  "sceneType": "string (from the scene type list for this story)",
  "characterName": "string or null",
  "characterRole": "string or null",
  "leftChoice": { "label": "string (3-7 words)", "deltas": { "stat1": number, "stat2": number, "stat3": number } },
  "rightChoice": { "label": "string (3-7 words)", "deltas": { "stat1": number, "stat2": number, "stat3": number } },
  "journal": "string"
}`;

export function buildUserMessage({ phase, stats, journal, actNum, choiceHistory, characters, callbackChoice, statNames }) {
  const s1 = statNames?.[0] || 'stat1';
  const s2 = statNames?.[1] || 'stat2';
  const s3 = statNames?.[2] || 'stat3';

  const historyLines = choiceHistory.length
    ? choiceHistory.map(c => `  Act ${c.act}: chose "${c.label}" — "${c.journal}"`).join('\n')
    : '  None yet — story is just beginning.';

  const characterLines = characters.length
    ? characters.map(c => `  ${c.name} (${c.role}, first appeared Act ${c.firstAct})`).join('\n')
    : '  None yet.';

  const callbackLine = callbackChoice
    ? `\nCONSEQUENCE CALLBACK — This scene MUST naturally surface consequences of the Act ${callbackChoice.act} choice: "${callbackChoice.label}". Weave it in as a living reality.`
    : '';

  return `Generate Act ${actNum}.

Phase: ${phase}
Stats: ${s1}=${stats.stat1} | ${s2}=${stats.stat2} | ${s3}=${stats.stat3}

Choice history:
${historyLines}

Characters already in this story:
${characterLines}
${callbackLine}

Write a scene that feels like it belongs to THIS player's specific journey — shaped by the choices above, true to the current stats.`;
}
