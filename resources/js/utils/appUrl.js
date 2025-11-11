const resolveAppUrl = () => {
    if (typeof window === 'undefined') {
        return '';
    }

    const base =
        window.APP_URL && window.APP_URL.length > 0
            ? window.APP_URL
            : window.location?.origin ?? '';

    return base.replace(/\/+$/, '');
};

export const appUrl = resolveAppUrl();

export const withAppUrl = (path = '') => {
    if (!path) {
        return appUrl;
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${appUrl}${normalizedPath}`;
};

