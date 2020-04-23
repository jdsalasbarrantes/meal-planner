import axios from 'axios';

const baseURL = 'http://localhost:3000';

const api = axios.create({
    baseURL,
    timeout: 1000,
});

export default api;
