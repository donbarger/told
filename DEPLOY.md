# Deploy Told to the Digital Ocean droplet

Target URL: **https://told.thegreatpursuit.faith**

Told will live on the same droplet as Harvest Fields (which is reached at `thegreatpursuit.faith`). Caddy already handles SSL via Let's Encrypt on that box, so adding a subdomain is a one-site-block affair.

## Before you start — two manual prerequisites

### 1. Add the DNS record (do this first, then wait a few minutes)

At your DNS registrar for `thegreatpursuit.faith`, add an **A record**:

| Type | Name  | Value                    | TTL  |
|------|-------|--------------------------|------|
| A    | told  | *(the droplet's IP)*     | 300  |

You can grab the droplet IP with `ssh root@thegreatpursuit.faith "hostname -I | awk '{print \$1}'"` or just look it up in the Digital Ocean console. Caddy will refuse to provision SSL until the DNS resolves.

### 2. Add the production redirect URI to Google OAuth

Google Cloud Console → APIs & Services → Credentials → your OAuth 2.0 Client.

**Add to Authorized redirect URIs:**
```
https://told.thegreatpursuit.faith/api/auth/google/callback
```

**Add to Authorized JavaScript origins:**
```
https://told.thegreatpursuit.faith
```

Save. Give it ~1 minute to propagate.

---

## On the droplet — one-time setup

SSH in:

```bash
ssh root@thegreatpursuit.faith
```

### 1. Clone the repo

```bash
cd /var/www
git clone https://github.com/donbarger/told.git
cd told
```

### 2. Install deps, build frontend

```bash
cd backend  && npm ci --omit=dev
cd ../frontend && npm ci && npm run build
```

The frontend's static site now lives at `/var/www/told/frontend/dist`.

### 3. Backend env file

```bash
cd /var/www/told/backend
cp .env.example .env
nano .env   # or vim — fill in the values below
```

Required values:

```env
PORT=3002
FRONTEND_URL=https://told.thegreatpursuit.faith
BACKEND_URL=https://told.thegreatpursuit.faith
JWT_SECRET=<generate a strong random string>
GOOGLE_CLIENT_ID=<from the same Google OAuth client used locally>
GOOGLE_CLIENT_SECRET=<same>
OPENROUTER_API_KEY=<your key>
ADMIN_EMAILS=dbarger@imb.org,donbarger@gmail.com

# Optional — only if you want TTS narration in production
# TTS_SERVER_URL=https://your-tts-endpoint
# HF_TTS_VOICE=am_michael
```

Generate a strong JWT secret:
```bash
openssl rand -base64 48
```

### 4. Start the backend under PM2

PM2 is already installed on this droplet (Harvest Fields uses it). Start Told:

```bash
cd /var/www/told/backend
pm2 start server.js --name told --time
pm2 save
```

Verify it came up on port 3002:
```bash
curl -s http://localhost:3002/health   # → {"ok":true}
pm2 logs told --lines 20               # watch for the startup line
```

### 5. Add the Caddy site block

Caddy's config is at `/etc/caddy/Caddyfile` on this droplet. Edit it:

```bash
nano /etc/caddy/Caddyfile
```

Append this block (leave the existing `thegreatpursuit.faith { ... }` block alone):

```caddy
told.thegreatpursuit.faith {
    encode gzip zstd

    # Serve the built SPA, fall back to index.html for client routes
    root * /var/www/told/frontend/dist
    file_server
    try_files {path} /index.html

    # API proxy to the Told backend
    handle /api/* {
        reverse_proxy localhost:3002
    }

    # Useful for health checks from monitoring
    handle /health {
        reverse_proxy localhost:3002
    }

    # Static assets can be cached aggressively (hashed filenames from Vite)
    @static path /assets/*
    header @static Cache-Control "public, max-age=31536000, immutable"
}
```

Reload Caddy:

```bash
caddy fmt --overwrite /etc/caddy/Caddyfile
caddy reload --config /etc/caddy/Caddyfile
```

Caddy will automatically provision a Let's Encrypt cert for `told.thegreatpursuit.faith` the first time it's hit (can take ~30 seconds). Watch:

```bash
journalctl -u caddy -f
```

### 6. Smoke test

```bash
curl -sI https://told.thegreatpursuit.faith/              # → 200
curl -s  https://told.thegreatpursuit.faith/health        # → {"ok":true}
```

Open https://told.thegreatpursuit.faith in a browser. You should see the Landing page → sign in with Google → land on Story Select.

---

## Deploying updates later

Standard pull → rebuild → restart:

```bash
ssh root@thegreatpursuit.faith
cd /var/www/told
git pull
cd backend  && npm ci --omit=dev
cd ../frontend && npm ci && npm run build
pm2 restart told
```

If the DB migrations ran (they run automatically on backend start via `ensureColumn` in `lib/db.js`), no extra step — the schema self-heals.

---

## Troubleshooting

**"Can't reach this site" in browser**
- DNS hasn't propagated. `dig told.thegreatpursuit.faith +short` should return the droplet IP. Wait a few minutes.

**Caddy errors about SSL provisioning**
- DNS isn't set or hasn't propagated. Caddy retries automatically; check `journalctl -u caddy -f`.

**Sign-in fails with "Access blocked: This app's request is invalid"**
- Google OAuth redirect URI hasn't been added (prerequisite #2 above), or propagation lag. Retry in a minute.

**"Could not reach the server" inside the app**
- `pm2 logs told --err` to see backend errors. Most common: missing `OPENROUTER_API_KEY` in `.env`.

**"Attempt to write a readonly database"**
- The SQLite file's directory isn't writable by the pm2 user. `chown -R <pm2-user> /var/www/told/backend/data` fixes it. On this droplet PM2 runs as root by default, so this normally isn't an issue.

---

## Rollback

```bash
ssh root@thegreatpursuit.faith
cd /var/www/told
git reset --hard HEAD~1   # or to a specific commit
cd frontend && npm run build
pm2 restart told
```

Or, for a full stop:
```bash
pm2 stop told && pm2 delete told && pm2 save
```
Remove the `told.thegreatpursuit.faith { ... }` block from the Caddyfile and `caddy reload`.
