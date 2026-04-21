// MUST be first — auth.js and db.js read process.env at module load time.
import "dotenv/config";

import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import rateLimit from 'express-rate-limit';
import gameRouter from './routes/game.js';
import authRouter from './routes/auth.js';
import ttsRouter from './routes/tts.js';
import adminRouter from './routes/admin.js';
import { userQueries } from './lib/db.js';
import { optionalAuth } from './lib/auth.js';

// ── Passport: Google OAuth ────────────────────────────────────────────────
passport.use(new GoogleStrategy(
  {
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  `${process.env.BACKEND_URL || 'http://localhost:3002'}/api/auth/google/callback`,
  },
  (_accessToken, _refreshToken, profile, done) => {
    const email       = profile.emails?.[0]?.value;
    const displayName = profile.displayName || email;

    let user = userQueries.findByGoogleId.get(profile.id);
    if (user) return done(null, user);

    if (email) {
      user = userQueries.findByEmail.get(email);
      if (user) {
        userQueries.linkGoogle.run(profile.id, user.id);
        return done(null, user);
      }
    }

    const result = userQueries.create.run(email || null, profile.id, displayName);
    user = userQueries.findById.get(result.lastInsertRowid);
    done(null, user);
  }
));

// ── App ───────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5175' }));
app.use(express.json());
app.use(passport.initialize());
app.use(optionalAuth);
app.use('/api/', rateLimit({ windowMs: 60_000, max: 60 }));

app.use('/api/auth',  authRouter);
app.use('/api/tts',   ttsRouter);
app.use('/api/game',  gameRouter);
app.use('/api/admin', adminRouter);

app.get('/health', (_req, res) => res.json({ ok: true }));

// Bind to loopback only — Caddy (or another local proxy) terminates TLS
// and forwards traffic. Exposing this port publicly would bypass the
// CSP/HSTS/security headers applied at the reverse proxy.
app.listen(PORT, '127.0.0.1', () => console.log(`Told backend on 127.0.0.1:${PORT}`));
