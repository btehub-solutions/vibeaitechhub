import { createContext, useContext, useEffect, useState } from "react";
import { authService, User } from "@/services/auth.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const initAuth = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem('access_token');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = async (credentials: any) => {
    const data = await authService.login(credentials);
    // If login response includes user data, set it, otherwise fetch it
    if (data.user) {
        setUser(data.user);
    } else {
        const userData = await authService.getCurrentUser();
        setUser(userData);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
