
import axios from 'axios';
import { supabase } from '@/lib/supabase';

// Create api instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', // Fallback to local Django
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to inject Token
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for global error handling
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Handle 401 (Unauthorized) - maybe redirect to login?
  if (error.response?.status === 401) {
    // console.log('Unauthorized - redirecting to login?');
  }
  return Promise.reject(error);
});

export default api;
