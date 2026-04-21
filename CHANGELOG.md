# Changelog

All notable changes to **Told** are documented here.
The format is loosely based on [Keep a Changelog](https://keepachangelog.com/).

## [0.5.0] — 2026-04-21

### Added
- **5 new seeker-focused stories** — catalog grows from 19 to 24 stories, all chosen for people who are exploring faith rather than deepening it:
  - *I Was Blind* (Man Born Blind / John 9:1–41) — stats: Belonging, Testimony, Sight. Five phases: mud, neighbors, pharisees, exile, worship.
  - *On the Ground* (Woman Caught in Adultery / John 8:1–11) — stats: Shame, Voice, Seen. Four phases: dragged, ground, cleared, freed.
  - *The Find* (Hidden Treasure and Pearl / Matthew 13:44–46) — stats: Certainty, Cost, Joy. Four phases: searching, counting, sold, joy.
  - *The Last Hour* (Laborers in the Vineyard / Matthew 20:1–16) — stats: Resentment, Worth, Grace. Four phases: waiting, field, wage, reckoning.
  - *Among the Tombs* (Gerasene Demoniac / Mark 5:1–20) — stats: Chaos, Isolation, Name. Four phases: tombs, shore, legion, sent.
- **Backend system prompts** for all 5 new stories with phase maps, stat axes, and scene-type guidance calibrated for the seeker perspective.
- **SVG story art** for all 5 new stories in `StoryArt.jsx`:
  - *I Was Blind* — figure kneeling at pool edge, both hands raised to eyes, first light on the water
  - *On the Ground* — woman crouching in an emptied courtyard, stones scattered on the ground untouched, writing marks in the dirt
  - *The Find* — merchant at a lamp-lit table, pearl raised into the light, the rest of the inventory around him
  - *The Last Hour* — lone figure standing in the hiring square in late-afternoon light, others long gone to the vineyard
  - *Among the Tombs* — dark hillside with carved tomb openings, broken chain, boat light on the water below

---

## [0.4.0] — 2026-04-21

### Added
- **8 new stories** — catalog grows from 11 to 19 complete parables and encounters:
  - *The Years I Stayed* (Elder Brother / Luke 15:25–32)
  - *The Better Prayer* (Pharisee and Tax Collector / Luke 18:9–14)
  - *The Other Room* (Mary and Martha / Luke 10:38–42)
  - *What I Couldn't Say* (Nicodemus / John 3:1–21)
  - *The Bigger Barn* (Rich Fool / Luke 12:13–21)
  - *Not Ready* (Ten Virgins / Matthew 25:1–13)
  - *The Step* (Peter Walking on Water / Matthew 14:22–33)
  - *Do You Want to Get Well?* (Pool of Bethesda / John 5:1–15)
- **Backend system prompts** for all 8 new stories — each follows the shared scaffold with 4 story phases, three stat axes, 10 core rules, and scene-type guidance.

### Changed
- **Complete StoryArt redesign** — all 19 stories now have bespoke SVG illustrations. The prior release had 5 custom pieces and a generic fallback for the rest; now every card on the Story Select screen gets a unique scene:
  - *The Portfolio* (Talents) — figure slumped at dark desk, sealed envelope untouched, city in window
  - *The Debt* — fluorescent office hallway, suited figure grabbing a smaller person, torn "FORGIVEN" document on the floor
  - *The Gate* / Lazarus — iron estate gate at night, warm amber glow inside, Lazarus lying outside
  - *The Better Prayer* — morning community room split between a presenter and a lone hunched figure at the back
  - *The Fight* — institutional corridor, woman with fist raised to knock again, rejection notices on the floor
  - *The Step* — Peter sinking from the waist, arm thrust upward, luminous divine hand reaching down through the storm
  - *Not Ready* — midnight corridor split in two: five figures with lit candles walking through an open door into warmth; five with dead candles at a closed door
  - *The Bigger Barn* — glass executive office at night, laptop glowing green with financial charts, single fading star overhead
  - *What I Couldn't Say* — suited professional alone at a small table with a single lamp, briefcase on the floor, private question in a public man
- **Contrast and readability pass** on all night/interior scenes — background gradients lifted from near-black to visible dark, glow radii and opacities boosted, figure colors given warm skin tones so characters read clearly against their settings.
- **Serif font: EB Garamond → Lora** — Lora's larger x-height and stronger stroke contrast hold up better at the small sizes used for journal entries, phase labels, and choice callouts.
- **Minimum label size bumped** — all UI labels previously below `0.65rem` raised to that floor; journal prose and featured-text sizes also bumped to improve legibility at small viewport sizes.

### Fixed
- **Production TTS narration** — `TTS_SERVER_URL` was missing from the Digital Ocean production environment, causing the health check to return `ok: false` and the narration button to never render. Added `TTS_SERVER_URL` and `HF_TTS_VOICE` to the droplet `.env` and restarted PM2. Narration now works at `told.thegreatpursuit.faith`.
- **Dev server CORS drift** — accumulated stale Vite dev servers on ports 5175–5177 caused active sessions on 5177 to be rejected by the backend CORS allow-list (which only trusts 5175). Fixed by killing stale processes.

---

## [0.3.0] — 2026-04-21

### Deployed
- **Live at `https://told.thegreatpursuit.faith`** on the IMB Innovation Digital Ocean droplet.
  - Caddy reverse proxy handles TLS (Let's Encrypt) and security headers.
  - Told backend runs under PM2 as service `told`.
  - Installed at `/opt/told`; PM2 process list saved so it survives reboot.
  - DNS A record `told.thegreatpursuit.faith` → droplet IP.
  - Google OAuth client authorized for `https://told.thegreatpursuit.faith`.

### Added
- **`DEPLOY.md`** — full runbook for first-time deploy and subsequent updates.
- **Three UI templates** for storytelling — declared per story via `template`:
  - `journey` — original card-swipe deck with phase-timeline journal sidebar.
  - `encounter` — full-bleed reader, tap buttons, no stats during play.
  - `witness` *(current default)* — contemplative reader, reflection prompts, no stats, paper-warm background.
- **StoryArt** — inline SVG illustrations per story (Prodigal road, Samaritan lamplit street, Widow temple with coins, Sower field, Zacchaeus in a sycamore, plus a thematic fallback).
- **Story Select hero** — context-aware recommendation at the top of the grid:
  - New user → "Start here: The Prodigal Son"
  - In-progress game → "Pick up where you left off"
  - Some stories played → "Just added" surfaces an unplayed one
  followed by the full grid with **"Played" badges** and an "N of 11 played" counter.
- `/api/auth/me` now returns `history: { completed: string[], inProgress: {storyId,startedAt} | null }` so the frontend can choose the hero.

### Security
- **Backend now binds `127.0.0.1` only.** Previously it bound `0.0.0.0:3002`, which would let clients bypass Caddy's CSP/HSTS/security headers by hitting the port directly. Caddy remains the only public entry point.
- **`users.db` permissions tightened to `600`** in production (previously world-readable `644`).
- Verified no secrets have ever been committed to git history. `.env` stays out of VCS; `600 root:root` on the droplet.
- Confirmed CORS origin allow-list rejects foreign origins. Rate limit (60 req/min/IP) active on all `/api/*`.
- `npm audit --omit=dev` → 0 known vulnerabilities on production dependencies.

### Changed
- Default story template switched from `journey` (card-swipe) to `witness` — all eleven stories now use the contemplative reader by default. Individual stories can opt into other templates by setting `template: 'journey'` or `template: 'encounter'`.

---

## [0.2.0] — 2026-04-21 (IMB brand overhaul)

### Changed — IMB brand system
- **Visual system now follows IMB's canonical brand** (aligned with Harvest Fields / imb.org).
  - Palette: IMB navy `#1B365D`, teal `#009681`, orange `#E87722`, red `#B83A4B`, gold `#B8893F`, light `#F7F8FA` surface — replacing the prior near-black + desaturated gold palette.
  - Type: **Nunito Sans** (display/UI), **Source Sans 3** (body), **Lora** / **EB Garamond** (narrative + verses) — replacing Playfair Display + Inter.
  - Default surface is light; dark navy gradient reserved for hero moments (Landing hero, Title screen, EndScreen hero, "Get involved" CTA block).
- **IMB Innovation logo** added to Landing hero (white on navy) and Story Select header (navy on light).
- All component styling rebuilt under new tokens: StorySelect cards, TitleScreen, GameScreen (mobile + desktop), DesktopScene, journal timeline, narration button, stat bars, SettingsModal, AdminScreen, EndScreen (pull-quote + "Get involved" block with teal IMB CTA + ghost Share button), choice buttons (IMB red-left / teal-right).
- Favicon regenerated: IMB navy with white serif "T" and teal accent.
- Swipe overlays use IMB red/teal instead of generic red/green.
- WCAG contrast raised: narrative body at full ink; muted text meets AA on light.

### Added
- `ADMIN_EMAILS` default now includes `dbarger@imb.org,donbarger@gmail.com`.
- Privacy/Terms pages with IMB brand treatment — rewritten for Told (interactive parables language, Google-OAuth-only auth language, no references to AI provider specifics).
- Scripture pull-quote and "Get involved with IMB" CTA block with share button on EndScreen.

### Removed
- Landing sign-in privacy disclaimer line (kept only the footer Privacy Policy link).

---

## [0.1.1] — earlier 2026-04-21 (first multi-story release)

### Added
- **Told** brand / landing page. Multi-section marketing page (hero, what it is, how it works, story lineup, final CTA).
- **Story select screen**: choose from eleven parables after signing in. Each story has its own stat system, color accents, phase arc, and fixed + AI-generated scenes.
- **Google OAuth + JWT sessions**. Accounts persist across devices; `/api/auth/me` returns `{isAdmin, isBlocked, prefs}`.
- **Admin panel** (`ADMIN_EMAILS` env var gate):
  - Aggregate stats: players, games started, completed, completion rate, avg act count.
  - User table with last-seen timestamp, games played/completed, and block/unblock action.
- **Settings modal**: account info, narration autoplay toggle (persisted per user), sign out, admin panel link (admin only).
- **Header controls**: quick audio on/off toggle + settings gear on Title and Game screens.
- **Game telemetry**: `/api/game/start` and `/api/game/complete` record each run (story id, final stats, act count).
- **Richer journal**: entries carry `{text, phase, act, direction, choiceLabel}`. During play the sidebar shows the choice you made alongside the reflection; at the end, the journal groups by phase (Departure → Wild Living → Famine → …).
- **Blocked-user screen**: friendly notice on Landing when `/me` returns 403 blocked.

### Changed
- Generalized the game engine from a single Prodigal-Son codebase to a story-agnostic model: stats are `stat1/stat2/stat3` with per-story `statConfig`, and each story exposes its own `openingCard`, `getNextCard`, `getAIPhase`, and `phases[]`.
- Split backend prompts into `backend/lib/prompts/*.js`, one per story, with a shared scaffold in `shared.js`.
- Brand rename: *Gospel Stories* → **Told**.

### Fixed
- Landing page scroll — replaced flex centering on side panels with block layout + `touch-action: pan-y` (fixed a flex-overflow bug where tall content was clipped above the viewport and unreachable).

### Security
- `backend/data/*.db` and `backend/cache/` excluded from VCS; `.env` stays out of git.

---

## [0.1.0] — 2026-04-20

Initial prototype: single-story **The Return** (Prodigal Son), mobile card swipe + desktop layout, AI-generated scenes between fixed story beats, optional Kokoro TTS narration.
