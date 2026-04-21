# Changelog

All notable changes to **Told** are documented here.
The format is loosely based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Changed — IMB brand overhaul (2026-04-21)
- **Visual system now follows IMB's canonical brand** (aligned with Harvest Fields / imb.org).
  - Palette: IMB navy `#1B365D`, teal `#009681`, orange `#E87722`, red `#B83A4B`, gold `#B8893F`, light `#F7F8FA` surface — replacing the prior near-black + desaturated gold palette.
  - Type: **Nunito Sans** (display/UI), **Source Sans 3** (body), **EB Garamond** (narrative + verses) — replacing Playfair Display + Inter.
  - Default surface is light; dark navy gradient reserved for hero moments (Landing hero, Title screen, EndScreen hero, "Get involved" CTA block).
- **IMB Innovation logo** added to Landing hero (white on navy) and Story Select header (navy on light).
- All component styling rebuilt under new tokens: StorySelect cards, TitleScreen, GameScreen (mobile + desktop), DesktopScene, journal timeline, narration button, stat bars, SettingsModal, AdminScreen, EndScreen (pull-quote + "Get involved" block with teal IMB CTA + ghost Share button), choice buttons (IMB red-left / teal-right).
- Favicon regenerated: IMB navy with white serif "T" and teal accent.
- Swipe overlays use IMB red/teal instead of generic red/green.
- WCAG contrast raised: narrative body at full ink; muted text meets AA on light.

### Added
- `ADMIN_EMAILS` default now includes `dbarger@imb.org,donbarger@gmail.com`.
- Privacy/Terms pages with IMB brand treatment (copied from Harvest Fields, rewritten for Told — interactive parables language, Google-OAuth-only auth language, no references to AI provider specifics).
- Scripture pull-quote and "Get involved with IMB" CTA block with share button on EndScreen.

### Removed
- Landing sign-in privacy disclaimer line (kept only the footer Privacy Policy link).

### Added — earlier
- **Told** brand / landing page. Multi-section marketing page (hero, what it is, how it works, story lineup, final CTA) with large serif wordmark and warm gold palette.
- **Story select screen**: choose from eleven parables after signing in. Each story has its own stat system, color accents, phase arc, and fixed + AI-generated scenes.
- **Google OAuth + JWT sessions**. Accounts persist across devices; `/api/auth/me` returns `{isAdmin, isBlocked, prefs}`.
- **Admin panel** (`ADMIN_EMAILS` env var gate):
  - Aggregate stats: players, games started, completed, completion rate, avg act count.
  - User table with last-seen timestamp, games played/completed, and block/unblock action.
- **Settings modal**: account info, narration autoplay toggle (persisted per user), sign out, admin panel link (admin only).
- **Header controls**: quick audio on/off toggle + settings gear on Title and Game screens (both mobile + desktop layouts).
- **Game telemetry**: `/api/game/start` and `/api/game/complete` record each run (story id, final stats, act count) for admin analytics.
- **Richer journal**: entries now carry `{text, phase, act, direction, choiceLabel}`. During play the sidebar shows the choice you made alongside the reflection; at the end, the journal groups by phase (Departure → Wild Living → Famine → …) so the arc reads like chapters.
- **Blocked-user screen**: friendly notice on Landing when `/me` returns 403 blocked.

### Changed
- Generalized the game engine from a single Prodigal-Son codebase to a story-agnostic model: stats are `stat1/stat2/stat3` with per-story `statConfig` (name/icon/color), and each story exposes its own `openingCard`, `getNextCard`, `getAIPhase`, and `phases[]`.
- Split backend prompts into `backend/lib/prompts/*.js`, one per story, with a shared scaffold in `shared.js`.
- Brand rename: *Gospel Stories* → **Told**. HTML title, OpenRouter `X-Title`, and header copy updated.

### Fixed
- Landing page scroll: replaced flex centering on side panels with block layout + `touch-action: pan-y`, fixing a flex-overflow bug where tall content was clipped above the viewport and unreachable.

### Security
- `backend/data/*.db` and `backend/cache/` excluded from VCS; `.env` stays out of git.

---

## [0.1.0] — 2026-04-20

Initial prototype: single-story **The Return** (Prodigal Son), mobile card swipe + desktop layout, AI-generated scenes between fixed story beats, optional Kokoro TTS narration.
