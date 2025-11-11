#!/bin/sh
set -e

cd /var/www/html

if [ ! -f .env ]; then
    if [ -n "${ENV_FILE_SOURCE}" ] && [ -f "${ENV_FILE_SOURCE}" ]; then
        echo "Copying environment file from ${ENV_FILE_SOURCE}"
        cp "${ENV_FILE_SOURCE}" .env
    elif [ -f .env.docker ]; then
        echo "Copying environment file from .env.docker"
        cp .env.docker .env
    elif [ -f .env.example ]; then
        echo "Copying environment file from .env.example"
        cp .env.example .env
    else
        echo "No environment template found; creating empty .env"
        touch .env
    fi
fi

if [ -f composer.json ]; then
    if [ ! -d vendor ]; then
        echo "Installing PHP dependencies..."
        composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction --no-progress
    else
        echo "Vendor directory already present; skipping composer install."
    fi
else
    echo "composer.json not found; skipping composer install."
fi

if [ -f .env ] && [ -n "${APP_KEY}" ]; then
    if grep -q "^APP_KEY=" .env; then
        sed -i "s/^APP_KEY=.*/APP_KEY=${APP_KEY}/" .env
    else
        echo "APP_KEY=${APP_KEY}" >> .env
    fi
fi

if [ -f artisan ]; then
    php artisan config:clear || true
    php artisan cache:clear || true
    php artisan view:clear || true

    CURRENT_KEY=""
    if [ -f .env ]; then
        CURRENT_KEY=$(grep "^APP_KEY=" .env | cut -d= -f2-)
    fi

    if [ -z "$CURRENT_KEY" ]; then
        echo "Generating APP_KEY..."
        php artisan key:generate --force --no-interaction || true
    fi
else
    echo "artisan not found; skipping Laravel optimizations."
fi

exec "$@"
