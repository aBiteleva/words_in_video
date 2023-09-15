import axios from 'axios';

const $api = axios.create({
    withCredentials: true
});

$api.defaults.baseURL = '/api';

export {$api};
