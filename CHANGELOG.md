# Changelog

All notable changes to **Told** are documented here.
The format is loosely based on [Keep a Changelog](https://keepachangelog.com/).

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
