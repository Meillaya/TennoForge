import create from 'zustand';
import { AuthState, User } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock login - replace with actual API call
      const mockUser = {
        id: '1',
        username: 'TennoMaster',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80'
      };
      const mockToken = 'mock-jwt-token';
      set({ user: mockUser, token: mockToken, isLoading: false });
    } catch (error) {
      set({ error: 'Login failed', isLoading: false });
      throw new Error('Login failed');
    }
  },
  logout: () => {
    set({ user: null, token: null });
  },
  register: async (email: string, username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock registration - replace with actual API call
      const mockUser = {
        id: '1',
        username,
        email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80'
      };
      const mockToken = 'mock-jwt-token';
      set({ user: mockUser, token: mockToken, isLoading: false });
    } catch (error) {
      set({ error: 'Registration failed', isLoading: false });
      throw new Error('Registration failed');
    }
  }
}));