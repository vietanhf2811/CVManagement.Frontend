import axios from 'axios';
import { environment } from '../config/environment';

export const api = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (optional redirect or token refresh)
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
