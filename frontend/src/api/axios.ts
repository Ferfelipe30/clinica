import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

console.log(import.meta.env.VITE_APP_NAME);

export const api = axios.create({
  baseURL: API_URL,
});

export default api;