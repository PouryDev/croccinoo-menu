FROM node:20-alpine AS frontend

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && npm install -g pnpm@8.15.4

FROM php:8.3-fpm AS php-base

ARG WORKDIR=/var/www/html

WORKDIR ${WORKDIR}

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    gnupg \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip gd mbstring exif pcntl bcmath \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock ./

RUN composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction --no-progress --no-scripts

COPY . .

RUN chown -R www-data:www-data storage bootstrap/cache

CMD ["php-fpm"]

