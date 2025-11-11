#!/bin/sh
set -e

TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_DIR=${BACKUP_PATH:-/backups}
FILENAME="${DB_DATABASE:-croccinoo}_${TIMESTAMP}.sql.gz"

mkdir -p "$BACKUP_DIR"

echo "Creating backup ${FILENAME}..."

mysqldump -h "${DB_HOST:-db}" \
          -u "${DB_USERNAME:-croccinoo}" \
          -p"${DB_PASSWORD:-secret}" \
          --databases "${DB_DATABASE:-croccinoo}" \
          --single-transaction \
          --quick \
          --lock-tables=false | gzip > "${BACKUP_DIR}/${FILENAME}"

echo "Backup finished: ${BACKUP_DIR}/${FILENAME}"

