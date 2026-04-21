import { Router } from 'express';
import passport from 'passport';
import { signToken, isAdminEmail, requireAuth } from '../lib/auth.js';
import { userQueries, gameQueries } from '../lib/db.js';

const router = Router();
const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5175';

function serializeUser(u) {
  const played = gameQueries.userPlayedStoryIds.all(u.id).map((r) => r.story_id);
  const open   = gameQueries.userInProgress.get(u.id);
  return {
    id: u.id,
    email: u.email,
    displayName: u.display_name,
    isAdmin: isAdminEmail(u.email),
    isBlocked: !!u.is_blocked,
    prefs: {
      autoplayNarration: !!u.autoplay_narration,
    },
    history: {
      completed: played,
      inProgress: open ? { storyId: open.story_id, startedAt: open.started_at } : null,
    },
  };
}

// Redirect to Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

// Google callback — issue JWT, redirect to frontend
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${FRONTEND}/?error=auth` }),
  (req, res) => {
    const token = signToken(req.user.id);
    res.redirect(`${FRONTEND}/?token=${token}`);
  }
);

// Current user
router.get('/me', (req, res) => {
  if (!req.userId) return res.status(401).json({ error: 'Not authenticated' });
  const user = userQueries.findById.get(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.is_blocked) return res.status(403).json({ error: 'Account blocked', blocked: true });
  userQueries.touchLastSeen.run(user.id);
  res.json(serializeUser(user));
});

// Update preferences
router.patch('/me/prefs', requireAuth, (req, res) => {
  const { autoplayNarration } = req.body || {};
  if (typeof autoplayNarration === 'boolean') {
    userQueries.setAutoplay.run(autoplayNarration ? 1 : 0, req.user.id);
  }
  const fresh = userQueries.findById.get(req.user.id);
  res.json(serializeUser(fresh));
});

// Logout (client just drops the token; this is a convenience endpoint)
router.post('/logout', (_req, res) => res.json({ ok: true }));

export default router;
