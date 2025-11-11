#!/bin/sh
set -e

cd /var/www/html

if [ ! -f composer.json ]; then
    echo "composer.json not found; skipping composer install."
else
    if [ ! -d vendor ]; then
        echo "Installing PHP dependencies..."
        composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction --no-progress
    else
        echo "Vendor directory already present; running composer install to ensure freshness..."
        composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction --no-progress
    fi
fi

php artisan config:clear || true
php artisan cache:clear || true
php artisan view:clear || true

if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" ]; then
    echo "Generating APP_KEY..."
    php artisan key:generate --force --no-interaction || true
fi

exec "$@"

