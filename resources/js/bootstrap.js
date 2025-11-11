import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if (typeof window.Ziggy !== 'undefined') {
    window.Ziggy = {
        ...window.Ziggy,
        url: '',
        absolute: false,
    };
}
