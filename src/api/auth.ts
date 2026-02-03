import { apiClient } from './client';
import { User } from '@/lib/index';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    return data;
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', userData);
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    return data;
  },

  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<{ success: boolean; user: User }>('/auth/me');
    return data.user;
  },

  updateProfile: async (updates: Partial<User>): Promise<User> => {
    const { data } = await apiClient.put<{ success: boolean; user: User }>('/auth/profile', updates);
    return data.user;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('action_items_manager_auth_2026');
  },
};
