import axios from 'axios';

// Create api instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to inject Token
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for global error handling
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Handle 401 (Unauthorized)
  if (error.response?.status === 401) {
    // Optional: Clear token and redirect if needed
    // localStorage.removeItem('access_token');
    // window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;
