#!/usr/bin/env bash
#
# deploy.sh — ship Told to production.
#
#   Target:  https://told.thegreatpursuit.faith
#   Host:    159.203.128.45 (the shared droplet)
#   Path:    /opt/told   — a real git checkout, on main
#   Process: pm2 `told`, backend on 127.0.0.1:3002, Caddy serves frontend/dist
#
# Runs unattended: Compass's agent invokes `bash ./deploy.sh` from a fresh shallow clone
# after a release is approved. That imposes three rules on this script.
#
#   1. NO `git push`. The house pattern ends with one; here it would run against a
#      depth-1 clone with no upstream branch. Whatever is being deployed is already on
#      main — that is what made it deployable.
#   2. NON-INTERACTIVE, and non-zero on any failure. A deploy that prompts hangs until a
#      timeout kills it, and one that swallows an error reports success for nothing.
#   3. NEVER touch prod data. `/opt/told/backend/data/*.db` and `backend/.env` are the
#      live database and the live secrets. This script does not copy either, and the
#      droplet's git checkout does not track them.
#
# The work happens ON the droplet rather than by rsyncing a local build, because
# /opt/told is a git checkout that can reach GitHub (Told is public). That keeps one
# source of truth for what production is running: `git log` there answers it.
#
set -euo pipefail
cd "$(dirname "$0")"

DROPLET="${TOLD_DROPLET:-root@159.203.128.45}"
REMOTE="/opt/told"
URL="https://told.thegreatpursuit.faith"
SSH="ssh -o BatchMode=yes -o ConnectTimeout=15"

say() { printf '\n▸ %s\n' "$1"; }

say "Checking the droplet is reachable"
$SSH "$DROPLET" 'echo ok >/dev/null'

# Refuse to deploy over unpushed work.
#
# A `git pull` on a checkout holding commits that never reached GitHub rolls them away.
# The droplet has been strictly behind every time it has been looked at, but "has been"
# is not "will be", and the failure is silent and unrecoverable.
say "Checking the droplet has nothing unpushed"
AHEAD=$($SSH "$DROPLET" "cd $REMOTE && git fetch -q origin && git rev-list --count origin/main..HEAD")
if [ "$AHEAD" != "0" ]; then
  echo "✗ $REMOTE has $AHEAD commit(s) that are not on origin/main." >&2
  echo "  Pulling would discard them. Push or inspect them first:" >&2
  echo "    ssh $DROPLET 'cd $REMOTE && git log origin/main..HEAD'" >&2
  exit 1
fi

# `vite build` empties its output directory, so a build that fails partway leaves no
# site at all — not the previous one. Keep a copy until the new one is serving.
say "Backing up the current build and database"
$SSH "$DROPLET" "cd $REMOTE && \
  cp -r frontend/dist frontend/dist.bak-\$(date +%Y%m%d-%H%M%S) && \
  cp backend/data/users.db backend/data/pre-deploy-\$(date +%Y%m%d-%H%M%S).db 2>/dev/null || true"

say "Updating the checkout"
$SSH "$DROPLET" "cd $REMOTE && git pull --ff-only origin main"

say "Installing and building"
# --omit=dev on the backend; the frontend needs its dev dependencies to build at all.
$SSH "$DROPLET" "cd $REMOTE/backend && npm ci --omit=dev"
$SSH "$DROPLET" "cd $REMOTE/frontend && npm ci && npm run build"

say "Restarting"
# Migrations run on boot via ensureColumn in lib/db.js, so there is no separate step.
$SSH "$DROPLET" "pm2 restart told --update-env && pm2 save >/dev/null"

say "Smoke test"
sleep 4
CODE=$(curl -s -o /dev/null -w '%{http_code}' -m 25 -L "$URL/")
HEALTH=$(curl -s -m 25 "$URL/health" || true)
echo "  GET /        -> $CODE"
echo "  GET /health  -> ${HEALTH:-(no response)}"

# The smoke test is the gate, not a courtesy. Exiting non-zero here is what tells
# Compass the release failed, so a broken deploy is reported as broken.
if [ "$CODE" != "200" ] || [[ "$HEALTH" != *'"ok":true'* ]]; then
  echo "✗ Told is not healthy after the deploy." >&2
  echo "  Roll back:  ssh $DROPLET 'cd $REMOTE && git reset --hard HEAD~1 && cd frontend && npm run build && pm2 restart told'" >&2
  echo "  Logs:       ssh $DROPLET 'pm2 logs told --lines 40 --nostream'" >&2
  exit 1
fi

say "Deployed — $(
  $SSH "$DROPLET" "cd $REMOTE && git log --oneline -1"
)"
echo "  $URL"
