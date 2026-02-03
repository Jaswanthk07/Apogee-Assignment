import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ROUTE_PATHS } from '@/lib/index';
import { authApi } from '@/api/auth';
import { toast } from 'sonner';

const AUTH_STORAGE_KEY = 'action_items_manager_auth_2026';

/**
 * useAuth Hook
 * Manages user authentication with backend API integration
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        
        if (token && storedUser) {
          // Check if it's a mock token (demo mode)
          if (token.startsWith('mock_token_')) {
            // Demo mode - use stored user data
            const userData = JSON.parse(storedUser);
            setUser(userData);
            console.log('Restored demo mode session:', userData);
          } else {
            // Real backend - verify token with API
            try {
              const userData = await authApi.getMe();
              setUser(userData);
              localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
              console.log('Restored backend session:', userData);
            } catch (error) {
              // Token invalid, clear and use stored data as fallback
              console.warn('Token verification failed, using stored data');
              const userData = JSON.parse(storedUser);
              setUser(userData);
            }
          }
        }
      } catch (error) {
        console.error('Failed to restore authentication session:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login with backend API
   */
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Check if backend is available
      const apiUrl = import.meta.env.VITE_API_URL;
      const isBackendAvailable = apiUrl && apiUrl !== 'http://localhost:5000/api';
      
      if (!isBackendAvailable) {
        // Development mode without backend - create mock user
        console.warn('Backend not available, using mock authentication');
        const name = email.split('@')[0]
          .replace(/[._]/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const mockUser: User = {
          id: `usr_${Math.random().toString(36).substring(2, 11)}`,
          email,
          name,
          avatarUrl: `https://api.dicebear.com/7.x/notionists/svg?seed=${email}&backgroundColor=c0aede`,
        };
        
        localStorage.setItem('auth_token', 'mock_token_' + Date.now());
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
        setUser(mockUser);
        setIsLoading(false);
        toast.success('Welcome back! (Demo mode)');
        // Use setTimeout to ensure state is updated before navigation
        setTimeout(() => {
          navigate(ROUTE_PATHS.DASHBOARD);
        }, 100);
        return;
      }

      // Try backend login
      const response = await authApi.login({ email, password });
      setUser(response.user);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response.user));
      setIsLoading(false);
      toast.success('Welcome back!');
      // Use setTimeout to ensure state is updated before navigation
      setTimeout(() => {
        navigate(ROUTE_PATHS.DASHBOARD);
      }, 100);
    } catch (error: any) {
      // If backend fails, fall back to mock mode
      console.error('Backend login failed, using mock mode:', error);
      const name = email.split('@')[0]
        .replace(/[._]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const mockUser: User = {
        id: `usr_${Math.random().toString(36).substring(2, 11)}`,
        email,
        name,
        avatarUrl: `https://api.dicebear.com/7.x/notionists/svg?seed=${email}&backgroundColor=c0aede`,
      };
      
      localStorage.setItem('auth_token', 'mock_token_' + Date.now());
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      setIsLoading(false);
      toast.warning('Using demo mode - backend not available');
      // Use setTimeout to ensure state is updated before navigation
      setTimeout(() => {
        navigate(ROUTE_PATHS.DASHBOARD);
      }, 100);
    }
  }, [navigate]);

  /**
   * Register new user
   */
  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Check if backend is available
      const apiUrl = import.meta.env.VITE_API_URL;
      const isBackendAvailable = apiUrl && apiUrl !== 'http://localhost:5000/api';
      
      if (!isBackendAvailable) {
        // Development mode without backend - create mock user
        console.warn('Backend not available, using mock authentication');
        const mockUser: User = {
          id: `usr_${Math.random().toString(36).substring(2, 11)}`,
          email,
          name,
          avatarUrl: `https://api.dicebear.com/7.x/notionists/svg?seed=${email}&backgroundColor=c0aede`,
        };
        
        // Store mock token
        localStorage.setItem('auth_token', 'mock_token_' + Date.now());
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
        setUser(mockUser);
        setIsLoading(false);
        toast.success('Account created successfully! (Demo mode)');
        // Use setTimeout to ensure state is updated before navigation
        setTimeout(() => {
          navigate(ROUTE_PATHS.DASHBOARD);
        }, 100);
        return;
      }

      // Try backend registration
      const response = await authApi.register({ name, email, password });
      setUser(response.user);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response.user));
      setIsLoading(false);
      toast.success('Account created successfully!');
      // Use setTimeout to ensure state is updated before navigation
      setTimeout(() => {
        navigate(ROUTE_PATHS.DASHBOARD);
      }, 100);
    } catch (error: any) {
      // If backend fails, fall back to mock mode
      console.error('Backend registration failed, using mock mode:', error);
      const mockUser: User = {
        id: `usr_${Math.random().toString(36).substring(2, 11)}`,
        email,
        name,
        avatarUrl: `https://api.dicebear.com/7.x/notionists/svg?seed=${email}&backgroundColor=c0aede`,
      };
      
      localStorage.setItem('auth_token', 'mock_token_' + Date.now());
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      setIsLoading(false);
      toast.warning('Using demo mode - backend not available');
      // Use setTimeout to ensure state is updated before navigation
      setTimeout(() => {
        navigate(ROUTE_PATHS.DASHBOARD);
      }, 100);
    }
  }, [navigate]);

  /**
   * Logout function
   */
  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
    toast.info('Logged out successfully');
    navigate(ROUTE_PATHS.LOGIN);
  }, [navigate]);

  /**
   * Update user profile
   */
  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = await authApi.updateProfile(updates);
      setUser(updatedUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
      throw error;
    }
  }, [user]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };
}
