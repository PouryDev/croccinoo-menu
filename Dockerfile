FROM php:8.3-fpm-alpine AS base

# Retry-aware package installation for reliability
RUN set -eux; \
    (apk update --no-cache || (sleep 10 && apk update --no-cache) || (sleep 20 && apk update --no-cache)) \
    && apk add --no-cache ca-certificates \
    && update-ca-certificates

RUN set -eux; \
    (apk add --no-cache --update bash icu-dev oniguruma-dev libzip-dev libpng-dev freetype-dev libjpeg-turbo-dev curl git || \
    (sleep 10 && apk add --no-cache --update bash icu-dev oniguruma-dev libzip-dev libpng-dev freetype-dev libjpeg-turbo-dev curl git) || \
    (sleep 20 && apk add --no-cache --update bash icu-dev oniguruma-dev libzip-dev libpng-dev freetype-dev libjpeg-turbo-dev curl git)) \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) pdo pdo_mysql intl mbstring zip gd bcmath \
    && (apk add --no-cache libpng freetype libjpeg-turbo icu-libs oniguruma libzip || \
    (sleep 10 && apk add --no-cache libpng freetype libjpeg-turbo icu-libs oniguruma libzip) || \
    (sleep 20 && apk add --no-cache libpng freetype libjpeg-turbo icu-libs oniguruma libzip)) \
    && apk del --no-network freetype-dev libjpeg-turbo-dev libpng-dev icu-dev oniguruma-dev libzip-dev

# Node for building frontend assets
RUN set -eux; \
    ((apk update --no-cache && apk add --no-cache nodejs npm) || \
    (sleep 10 && apk update --no-cache && apk add --no-cache nodejs npm) || \
    (sleep 20 && apk update --no-cache && apk add --no-cache nodejs npm))

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /var/www/html

# Copy project (bind-mounted in compose, but keep for image-only runs)
COPY . /var/www/html

# Ensure runtime directories exist and have proper permissions
RUN set -eux; \
    mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Entrypoint
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]

