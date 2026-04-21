import { Router } from 'express';
import { PROMPTS, buildUserMessage } from '../lib/prompts/index.js';
import { requireAuth } from '../lib/auth.js';
import { gameQueries } from '../lib/db.js';

const router = Router();
const OR_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL  = 'anthropic/claude-sonnet-4-6';

router.use(requireAuth);

function extractJSON(raw) {
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('No JSON in response');
  return JSON.parse(m[0]);
}

router.post('/start', (req, res) => {
  const { storyId = 'prodigal' } = req.body || {};
  const result = gameQueries.start.run(req.user.id, storyId);
  res.json({ gameId: result.lastInsertRowid });
});

router.post('/complete', (req, res) => {
  const { gameId, stat1, stat2, stat3, actCount } = req.body || {};
  let targetId = Number(gameId);
  if (!targetId) {
    const open = gameQueries.latestOpenByUser.get(req.user.id);
    if (open) targetId = open.id;
  }
  if (!targetId) return res.status(400).json({ error: 'No game to complete' });
  gameQueries.complete.run(
    Number.isFinite(stat1)     ? stat1     : null,
    Number.isFinite(stat2)     ? stat2     : null,
    Number.isFinite(stat3)     ? stat3     : null,
    Number.isFinite(actCount)  ? actCount  : null,
    targetId,
    req.user.id,
  );
  res.json({ ok: true });
});

router.post('/next', async (req, res) => {
  const {
    storyId = 'prodigal',
    phase, stats, journal, actNum,
    choiceHistory = [], characters = [], callbackChoice = null,
    statNames,
  } = req.body;

  if (!phase || !stats || actNum === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const systemPrompt = PROMPTS[storyId] || PROMPTS.prodigal;

  try {
    const response = await fetch(OR_URL, {
      method: 'POST',
      headers: {
        Authorization:  `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer':  'https://prodigal.tools',
        'X-Title':       'Told — Interactive Parables',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: buildUserMessage({ phase, stats, journal, actNum, choiceHistory, characters, callbackChoice, statNames }) },
        ],
        max_tokens:  750,
        temperature: 0.85,
      }),
    });

    if (!response.ok) {
      const txt = await response.text();
      throw new Error(`OpenRouter ${response.status}: ${txt}`);
    }

    const data = await response.json();
    const raw  = data.choices[0].message.content.trim();
    const card = extractJSON(raw);
    res.json(card);
  } catch (err) {
    console.error('[game/next]', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
