import { Router } from 'express';
import { PROMPTS, buildUserMessage } from '../lib/prompts/index.js';
import { requireAuth } from '../lib/auth.js';
import { gameQueries } from '../lib/db.js';
import { pregenerate as pregenTts } from '../lib/tts.js';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();

// Scenes come from Anthropic's API directly, through the official SDK (was OpenRouter's
// `anthropic/claude-haiku-5.5`). Told calls no other model, so OpenRouter is gone entirely.
const MODEL = 'claude-haiku-5-5';

// Haiku 5.5 thinks on every call (adaptive, no way to turn it off) and the thinking counts
// against max_tokens. The old 750-token cap was for the card alone; 16000 leaves the thinking
// room so a card is never cut off. The card itself is still ~3-5 sentences of JSON.
const MAX_TOKENS = 16000;

// Built on first use, not at import: the routes test boots the server with no key, and the SDK
// constructor throws without one. maxRetries 0 and a 20s timeout match the frontend, which
// abandons the request at 20s (useGame.js), so a retry after that would be paid for and unseen.
let client = null;
function anthropic() {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  client ||= new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 0, timeout: 20_000 });
  return client;
}

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

  console.log('[game/next] storyId=%s phase=%s actNum=%s user=%s', storyId, phase, actNum, req.user?.id);

  if (!phase || !stats || actNum === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const systemPrompt = PROMPTS[storyId] || PROMPTS.prodigal;

  const ai = anthropic();
  if (!ai) {
    console.error('[game/next] ERROR: ANTHROPIC_API_KEY is not set');
    return res.status(503).json({ error: 'Scene generation not configured' });
  }

  try {
    // No temperature/top_p/top_k: API version 2026-10-21 (SDK 1.x) rejects them on every model.
    // Effort is set explicitly because Haiku 5.5 defaults to medium, and this is an interactive
    // game where the player is waiting on the card. No `fallbacks`: Haiku 5.5 has no server-side
    // refusal fallback.
    const msg = await ai.messages.create({
      model:      MODEL,
      max_tokens: MAX_TOKENS,
      system:     systemPrompt,
      messages: [
        { role: 'user', content: buildUserMessage({ phase, stats, journal, actNum, choiceHistory, characters, callbackChoice, statNames }) },
      ],
      output_config: { effort: 'low' },
    });

    // Checked before reading content. A refusal or a truncated reply is an error, never a card:
    // half a JSON object would fail to parse anyway, and a refusal's text is not a scene.
    if (msg.stop_reason === 'refusal') throw new Error('Anthropic refused to write this scene (stop_reason: refusal)');
    if (msg.stop_reason === 'max_tokens') throw new Error(`Anthropic hit max_tokens (${MAX_TOKENS}) before finishing the card`);

    // content holds thinking blocks first, then text. Only the text is the card.
    const raw = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
    console.log('[game/next] raw response:', raw.slice(0, 200));
    const card = extractJSON(raw);
    console.log('[game/next] parsed card keys:', Object.keys(card));
    // Fire-and-forget TTS pre-render so the audio is cached by the time the
    // client's NarrationButton requests it (cache HIT → ~0.2s vs ~4s MISS).
    if (card?.scene) pregenTts(card.scene);
    res.json(card);
  } catch (err) {
    console.error('[game/next] ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
