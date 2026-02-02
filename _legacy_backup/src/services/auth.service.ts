import api from './api';

export interface User {
  pk: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export const authService = {
  async login(credentials: any) {
    // try both email and username fields, backend might expect one or the other
    // standard dj-rest-auth expects 'username' (which can be email if configured)
    // or 'email' depending on settings.
    // We'll send whatever the user typed as 'username' first, or 'email' if it looks like one.
    
    const payload = {
      username: credentials.email, // The form field is named 'email' currently
      password: credentials.password,
    };
    
    // Check if input is email-like, if so, maybe send as email? 
    // dj-rest-auth usually handles 'username' field, even if it's an email value.
    // If backend is configured with ACCOUNT_AUTHENTICATION_METHOD = 'email' or 'username_email'
    
    // Using '/auth/login/' based on dj-rest-auth default
    const response = await api.post('/auth/login/', payload);
    
    if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        if (response.data.refresh) {
            localStorage.setItem('refresh_token', response.data.refresh);
        }
    } else if (response.data.key) {
        // Fallback for TokenAuth
        localStorage.setItem('access_token', response.data.key);
    }
    
    return response.data;
  },

  async logout() {
    try {
        await api.post('/auth/logout/');
    } catch (e) {
        // ignore error on logout
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  async getCurrentUser() {
    const response = await api.get('/auth/user/');
    return response.data;
  }
};
