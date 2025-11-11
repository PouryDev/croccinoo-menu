import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                latte: {
                    50: '#fff8f1',
                    100: '#fbeade',
                    200: '#f6d8bf',
                    300: '#edc29a',
                    400: '#dfa772',
                    500: '#c8874a',
                    600: '#a46936',
                    700: '#7e502a',
                    800: '#5b3920',
                    900: '#322012',
                    950: '#1b100a',
                },
                cocoa: {
                    50: '#f5efea',
                    100: '#e6dad0',
                    200: '#ccb4a2',
                    300: '#b3927f',
                    400: '#9d7866',
                    500: '#825e4d',
                    600: '#684a3d',
                    700: '#513a30',
                    800: '#3a2922',
                    900: '#241912',
                    950: '#150e0a',
                },
                foam: {
                    50: '#f8fbff',
                    100: '#eef3fb',
                    200: '#d9e4f4',
                    300: '#c0d1ea',
                    400: '#8ba7d0',
                    500: '#5e84b3',
                    600: '#476897',
                    700: '#3a537a',
                    800: '#2f4261',
                    900: '#293952',
                    950: '#1b2535',
                },
            },
            fontFamily: {
                sans: ['"Vazirmatn"', ...defaultTheme.fontFamily.sans],
                display: ['"Playfair Display"', '"Vazirmatn"', ...defaultTheme.fontFamily.serif],
            },
            backgroundImage: {
                'croissant-gradient':
                    'linear-gradient(135deg, rgba(248,244,239,1) 0%, rgba(248,231,211,1) 40%, rgba(210,170,120,1) 100%)',
                'cappuccino-foam':
                    'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8), transparent 55%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.5), transparent 45%)',
            },
            boxShadow: {
                'menu-card':
                    '0 12px 35px -18px rgba(90, 57, 32, 0.45), 0 8px 20px -15px rgba(210, 170, 120, 0.35)',
                'menu-card-hover':
                    '0 18px 45px -20px rgba(90, 57, 32, 0.55), 0 14px 32px -20px rgba(210, 170, 120, 0.45)',
            },
            borderRadius: {
                latte: '2rem',
            },
        },
    },

    plugins: [forms],
};
