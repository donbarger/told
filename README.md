# Told

**The parables, firsthand.**

Told is an interactive parables project. Eleven of the stories Jesus told, stepped into one choice at a time. You're not watching from a pew — you're the younger son, the Samaritan, the rich ruler, the widow with two coins. Each scene is a card. Swipe left or right. Some scenes are written; most are generated for you by AI based on where you've been. The arc is fixed. The texture of your journey is your own.

## The stories

| Story | Reference |
|---|---|
| The Return (Prodigal Son) | Luke 15:11–32 |
| The Good Samaritan | Luke 10:25–37 |
| Zacchaeus | Luke 19:1–10 |
| The Woman at the Well | John 4:1–42 |
| The Rich Young Ruler | Matthew 19:16–30 |
| Bartimaeus | Mark 10:46–52 |
| The Talents | Matthew 25:14–30 |
| The Unmerciful Servant | Matthew 18:21–35 |
| The Narrow Gate | Matthew 7:13–14 |
| The Widow's Two Coins | Mark 12:41–44 |
| The Sower | Matthew 13:1–23 |

## Stack

- **Frontend**: React 18 + Vite, vanilla CSS, Playfair Display + Inter
- **Backend**: Node + Express, SQLite (better-sqlite3), Passport (Google OAuth), JWT sessions
- **AI**: OpenRouter → Anthropic Claude Sonnet 4.6 for scene generation
- **TTS** (optional): self-hosted Kokoro endpoint for scene narration, WAV disk cache

## Architecture

```
frontend/
  src/
    App.jsx                 # top-level routing: landing → story select → title → game → ending
    hooks/
      useAuth.js            # Google OAuth + JWT storage + user prefs
      useGame.js            # story-agnostic game engine (stat1/stat2/stat3)
    stories/                # one file per parable — cards, stat config, phase map, AI phase logic
    components/
      LandingScreen.jsx     # Told marketing/sign-in page (unauthenticated)
      StorySelectScreen.jsx # pick a parable (authenticated)
      TitleScreen.jsx       # scripture + begin
      GameScreen.jsx        # mobile card swipe
      DesktopScene.jsx      # desktop layout w/ journal sidebar
      EndScreen.jsx         # final stats + journal grouped by phase + invitation
      AdminScreen.jsx       # user mgmt + aggregate stats
      SettingsModal.jsx     # account + narration autoplay toggle

backend/
  server.js
  lib/
    auth.js     # JWT + admin gate (ADMIN_EMAILS env var)
    db.js       # SQLite schema + migrations
    prompts/    # one prompt file per story
  routes/
    auth.js     # Google OAuth + /me + /me/prefs
    game.js     # /start, /complete, /next (AI scene generation)
    admin.js    # /users, /stats, /users/:id/{block,unblock}
    tts.js      # proxy + disk cache of narration audio
  data/         # users.db (gitignored)
  cache/tts/    # WAV cache (gitignored)
```

## Run it locally

### Prerequisites
- Node 20+
- A Google OAuth 2.0 Client with authorized redirect URI `http://localhost:3002/api/auth/google/callback` and JavaScript origin `http://localhost:5175`
- An OpenRouter API key

### Setup

```bash
# Backend
cd backend
cp .env.example .env
# Fill in OPENROUTER_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET
npm install
npm run dev   # :3002

# Frontend (in another terminal)
cd frontend
npm install
npm run dev   # :5175
```

Visit [http://localhost:5175](http://localhost:5175).

### Environment variables (backend/.env)

| Key | Purpose |
|---|---|
| `PORT` | Backend port (default 3002) |
| `FRONTEND_URL` | Origin of the Vite dev server (e.g. `http://localhost:5175`) |
| `BACKEND_URL` | Where Google redirects after OAuth — must match the registered callback |
| `JWT_SECRET` | Signing key for session tokens |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | OAuth 2.0 credentials |
| `OPENROUTER_API_KEY` | Scene generation (Anthropic via OpenRouter) |
| `ADMIN_EMAILS` | Comma-separated admin emails (default: `dbarger@imb.org`) |
| `TTS_SERVER_URL` *(optional)* | Kokoro-style TTS endpoint for narration |
| `HF_TTS_VOICE` *(optional)* | Voice key (default `am_michael`) |

## Admin

Admins (emails listed in `ADMIN_EMAILS`) get a panel reachable from **Settings → Open admin panel**. It shows:
- Total players, games started/completed, completion rate, average acts per run
- Per-user table with last-seen time, games played, and a block/unblock action

Google OAuth handles authentication, so there are no passwords to reset — blocking cuts off access.

## License

Source under MIT. Scripture quotations are from the NIV.
