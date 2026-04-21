#!/usr/bin/env bash
#
# Told — SQLite backup script
#
# Runs daily via cron. Uses SQLite's online `.backup` API (safe during writes)
# rather than `cp`, which can yield a torn file if pages are mid-update. Each
# nightly backup is gzipped and pruned after 14 days. A monthly snapshot on
# the 1st is copied into monthly/ and kept for ~6 months.
#
# Install:
#   sudo cp /opt/told/scripts/backup-db.sh /usr/local/bin/told-backup
#   sudo chmod 750 /usr/local/bin/told-backup
#   (crontab -l 2>/dev/null; echo "15 3 * * * /usr/local/bin/told-backup >> /var/log/told-backup.log 2>&1") | crontab -
#
# Verify:
#   sudo /usr/local/bin/told-backup && ls -la /opt/told/backups
set -euo pipefail

DB="/opt/told/backend/data/users.db"
BACKUP_DIR="/opt/told/backups"
DAILY_KEEP_DAYS=14
MONTHLY_KEEP_DAYS=180
STAMP=$(date +%Y%m%d-%H%M%S)
OUT="$BACKUP_DIR/users-${STAMP}.db"

# Ensure backup dirs exist with tight perms
mkdir -p "$BACKUP_DIR/monthly"
chmod 700 "$BACKUP_DIR" "$BACKUP_DIR/monthly"

# Consistent hot backup via SQLite's backup API
if ! sqlite3 "$DB" ".backup '$OUT'"; then
  echo "$(date -Iseconds) backup FAILED for $DB" >&2
  exit 1
fi

gzip "$OUT"
chmod 600 "${OUT}.gz"

# Copy to monthly/ on the first of the month
if [[ "$(date +%d)" == "01" ]]; then
  cp "${OUT}.gz" "$BACKUP_DIR/monthly/users-$(date +%Y%m%d).db.gz"
fi

# Prune old backups
find "$BACKUP_DIR" -maxdepth 1 -name "users-*.db.gz" -mtime +${DAILY_KEEP_DAYS} -delete
find "$BACKUP_DIR/monthly" -maxdepth 1 -name "users-*.db.gz" -mtime +${MONTHLY_KEEP_DAYS} -delete

SIZE=$(du -h "${OUT}.gz" | cut -f1)
echo "$(date -Iseconds) backup ok ${OUT}.gz (${SIZE})"
