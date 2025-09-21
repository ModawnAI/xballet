import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User types for Korean UI
export type SkillLevel = '초급' | '중급' | '고급';
export type UserGoal = '체형 관리' | '유연성 향상' | '기술 향상' | '재활 운동' | '재미와 취미';

export interface User {
  id: string;
  email: string;
  name: string;
  nameKorean: string;
  avatar?: string;
  skillLevel: SkillLevel;
  goals: UserGoal[];
  preferences: {
    classDuration: number[]; // in minutes [5, 10, 15, 30, 60, 90]
    focusAreas: string[];
    musicStyle: '클래식' | '현대' | '팝' | '재즈' | '모두';
    notifications: boolean;
    language: 'ko' | 'en';
  };
  subscription: {
    type: 'free' | 'premium';
    expiresAt?: string;
    isActive: boolean;
  };
  progress: {
    totalClasses: number;
    totalMinutes: number;
    currentStreak: number;
    longestStreak: number;
    completedMovements: string[];
  };
  createdAt: string;
  lastLoginAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
    nameKorean: string;
    skillLevel: SkillLevel;
    goals: UserGoal[];
  }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<boolean>;
  clearError: () => void;
  checkAuth: () => void;
}

// Mock user data for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@xballet.com',
    name: 'Demo User',
    nameKorean: '데모 사용자',
    avatar: '/hojin.png', // Using the image you have
    skillLevel: '초급',
    goals: ['체형 관리', '유연성 향상'],
    preferences: {
      classDuration: [5, 10, 15],
      focusAreas: ['바워크', '워밍업'],
      musicStyle: '클래식',
      notifications: true,
      language: 'ko',
    },
    subscription: {
      type: 'free',
      isActive: true,
    },
    progress: {
      totalClasses: 5,
      totalMinutes: 75,
      currentStreak: 3,
      longestStreak: 7,
      completedMovements: ['plie-basic', 'tendu-basic'],
    },
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'advanced@xballet.com',
    name: 'Advanced User',
    nameKorean: '고급 사용자',
    skillLevel: '고급',
    goals: ['기술 향상', '재미와 취미'],
    preferences: {
      classDuration: [30, 60, 90],
      focusAreas: ['점프', '턴', '포인트'],
      musicStyle: '현대',
      notifications: true,
      language: 'ko',
    },
    subscription: {
      type: 'premium',
      expiresAt: '2024-12-31T23:59:59Z',
      isActive: true,
    },
    progress: {
      totalClasses: 25,
      totalMinutes: 750,
      currentStreak: 12,
      longestStreak: 30,
      completedMovements: ['plie-basic', 'tendu-basic', 'grand-plie', 'jete-basic', 'pirouette-basic'],
    },
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: new Date().toISOString(),
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock authentication logic
          const user = mockUsers.find(u => u.email === email);
          
          if (!user) {
            set({ 
              isLoading: false, 
              error: '이메일을 찾을 수 없습니다. 다시 확인해주세요.' 
            });
            return false;
          }
          
          // Simple password check (in real app, this would be hashed)
          if (password !== 'demo123') {
            set({ 
              isLoading: false, 
              error: '비밀번호가 올바르지 않습니다.' 
            });
            return false;
          }
          
          // Update last login
          const updatedUser = {
            ...user,
            lastLoginAt: new Date().toISOString(),
          };
          
          set({
            user: updatedUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: '로그인 중 오류가 발생했습니다. 다시 시도해주세요.' 
          });
          return false;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check if user already exists
          const existingUser = mockUsers.find(u => u.email === userData.email);
          if (existingUser) {
            set({ 
              isLoading: false, 
              error: '이미 가입된 이메일입니다.' 
            });
            return false;
          }
          
          // Create new user
          const newUser: User = {
            id: (mockUsers.length + 1).toString(),
            email: userData.email,
            name: userData.name,
            nameKorean: userData.nameKorean,
            skillLevel: userData.skillLevel,
            goals: userData.goals,
            preferences: {
              classDuration: [5, 10, 15],
              focusAreas: ['바워크', '워밍업'],
              musicStyle: '클래식',
              notifications: true,
              language: 'ko',
            },
            subscription: {
              type: 'free',
              isActive: true,
            },
            progress: {
              totalClasses: 0,
              totalMinutes: 0,
              currentStreak: 0,
              longestStreak: 0,
              completedMovements: [],
            },
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
          };
          
          // Add to mock users
          mockUsers.push(newUser);
          
          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.' 
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateProfile: async (updates) => {
        const { user } = get();
        if (!user) return false;
        
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const updatedUser = { ...user, ...updates };
          
          set({
            user: updatedUser,
            isLoading: false,
            error: null,
          });
          
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: '프로필 업데이트 중 오류가 발생했습니다.' 
          });
          return false;
        }
      },

      updatePreferences: async (preferences) => {
        const { user } = get();
        if (!user) return false;
        
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const updatedUser = {
            ...user,
            preferences: { ...user.preferences, ...preferences },
          };
          
          set({
            user: updatedUser,
            isLoading: false,
            error: null,
          });
          
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: '설정 업데이트 중 오류가 발생했습니다.' 
          });
          return false;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      checkAuth: () => {
        const { user } = get();
        set({ isAuthenticated: !!user });
      },
    }),
    {
      name: 'xballet-auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
