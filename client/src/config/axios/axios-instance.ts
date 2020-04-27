import axios from 'axios';
import interceptors from './axios-interceptors';

const baseURL = 'http://localhost:3000';

const api = axios.create({
    baseURL,
    timeout: 1000,
});

interceptors(api);

export default api;
