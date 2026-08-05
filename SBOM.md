# SBOM — Told — the parables, firsthand

**Last updated:** 2026-08-04  
**Runtime:** Node.js (Express) + React frontend  
**Lockfile of record:** `backend/package-lock.json`, `frontend/package-lock.json` — transitive dependencies live there, not here  
**Deployed at:** https://told.thegreatpursuit.faith

An interactive parables project: twenty-four of the stories Jesus told, stepped into one choice at a time — you're not watching from a pew, you're inside the story.

## Direct dependencies

| Package | Version | License | Why it's here | Workspace |
|---|---|---|---|---|
| `better-sqlite3` | ^12.9.0 | MIT | SQLite storage (synchronous driver) | `backend/` |
| `cors` | ^2.8.5 | MIT | CORS headers | `backend/` |
| `dotenv` | ^16.4.5 | BSD-2-Clause | loads .env at boot | `backend/` |
| `express` | ^4.19.2 | MIT | HTTP server | `backend/` |
| `express-rate-limit` | ^7.4.0 | MIT | per-IP rate limiting | `backend/` |
| `jsonwebtoken` | ^9.0.3 | MIT | signs/verifies JWTs | `backend/` |
| `passport` | ^0.7.0 | MIT | simple, unobtrusive authentication for Node.js | `backend/` |
| `passport-google-oauth20` | ^2.0.0 | MIT | google (OAuth 2.0) authentication strategy for Passport | `backend/` |
| `react` | ^18.3.1 | MIT | UI framework | `frontend/` |
| `react-dom` | ^18.3.1 | MIT | React DOM renderer | `frontend/` |

## External services & APIs

| Service | Used for | Credential (env var name) | What leaves the machine |
|---|---|---|---|
| OpenRouter | LLM inference gateway | `OPENROUTER_API_KEY` | prompt text — user input plus whatever context the app supplies |

> Values are never recorded here — only the variable names. Secrets live in the macOS Keychain locally and in the service `.env` on the droplet.

## AI models

| Model | Provider routing | Notes |
|---|---|---|
| `anthropic/claude-haiku-4-5` | OpenRouter | — |

## Third-party frontend assets

| Asset | Version | Source | Self-hosted? |
|---|---|---|---|
| Google Fonts (CSS) | — | `fonts.googleapis.com` | no — Google CDN |
| Google Fonts (font files) | — | `fonts.gstatic.com` | no — Google CDN |

## Infrastructure

| Component | Detail |
|---|---|
| Host | DigitalOcean droplet `159.203.128.45` (Ubuntu) |
| Path on host | `/opt/told` (`frontend/dist` + `backend/`) |
| Process | PM2 — `told`, 127.0.0.1:3002 |
| Reverse proxy / TLS | Caddy — TLS + shared `sec_headers` snippet |
| Deploy | manual `rsync` + `pm2 restart told` |

## License summary

All direct dependencies are permissive — MIT / Apache-2.0 / BSD / ISC / Unlicense. No copyleft (GPL / AGPL / LGPL) in the direct dependency set.

## SBOM history

| Date | Change |
|---|---|
| 2026-08-04 | Initial SBOM — generated from the repo, the running droplet services, and installed package metadata, then reviewed by hand. |
