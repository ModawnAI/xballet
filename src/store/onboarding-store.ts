import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SkillLevel = '초급' | '중급' | '고급';
export type GoalType = 'fitness' | 'learning' | 'improvement' | 'recreation';
export type FocusArea = 'barre-work' | 'center-work' | 'jumps' | 'turns' | 'pointe';
export type MusicStyle = 'classical' | 'contemporary' | 'pop' | 'jazz';

export interface OnboardingData {
  // Step 1: Welcome
  hasSeenWelcome: boolean;
  
  // Step 2: Skill Assessment
  skillLevel: SkillLevel | null;
  experienceYears: number;
  previousClasses: boolean;
  flexibilityLevel: 'low' | 'medium' | 'high';
  
  // Step 3: Goals
  primaryGoal: GoalType | null;
  secondaryGoals: GoalType[];
  timeCommitment: 'light' | 'moderate' | 'intensive';
  
  // Step 4: Preferences
  focusAreas: FocusArea[];
  musicStyles: MusicStyle[];
  classDuration: number; // in minutes
  difficultyPreference: 'conservative' | 'challenging';
  
  // Step 5: Completion
  isCompleted: boolean;
  completionDate: string | null;
}

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  data: OnboardingData;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateData: (data: Partial<OnboardingData>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  clearError: () => void;
}

const initialData: OnboardingData = {
  hasSeenWelcome: false,
  skillLevel: null,
  experienceYears: 0,
  previousClasses: false,
  flexibilityLevel: 'medium',
  primaryGoal: null,
  secondaryGoals: [],
  timeCommitment: 'moderate',
  focusAreas: [],
  musicStyles: [],
  classDuration: 15,
  difficultyPreference: 'conservative',
  isCompleted: false,
  completionDate: null,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      totalSteps: 5,
      data: initialData,
      isLoading: false,
      error: null,

      setCurrentStep: (step: number) => {
        const { totalSteps } = get();
        if (step >= 1 && step <= totalSteps) {
          set({ currentStep: step });
        }
      },

      nextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps) {
          set({ currentStep: currentStep + 1 });
        }
      },

      previousStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      updateData: (newData: Partial<OnboardingData>) => {
        set(state => ({
          data: { ...state.data, ...newData }
        }));
      },

      completeOnboarding: () => {
        set({
          data: {
            ...get().data,
            isCompleted: true,
            completionDate: new Date().toISOString(),
          }
        });
      },

      resetOnboarding: () => {
        set({
          currentStep: 1,
          data: initialData,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'xballet-onboarding',
      partialize: (state) => ({ 
        currentStep: state.currentStep,
        data: state.data 
      }),
    }
  )
);

// Helper functions for onboarding data
export const getGoalKorean = (goal: GoalType): string => {
  const goals = {
    fitness: '피트니스',
    learning: '기초 학습',
    improvement: '실력 향상',
    recreation: '취미 활동'
  };
  return goals[goal];
};

export const getFocusAreaKorean = (area: FocusArea): string => {
  const areas = {
    'barre-work': '바워크',
    'center-work': '센터워크',
    'jumps': '점프',
    'turns': '턴',
    'pointe': '포인트'
  };
  return areas[area];
};

export const getMusicStyleKorean = (style: MusicStyle): string => {
  const styles = {
    classical: '클래식',
    contemporary: '현대',
    pop: '팝',
    jazz: '재즈'
  };
  return styles[style];
};

export const getSkillLevelKorean = (level: SkillLevel): string => {
  return level; // Already in Korean
};

export const getTimeCommitmentKorean = (commitment: 'light' | 'moderate' | 'intensive'): string => {
  const commitments = {
    light: '가벼운',
    moderate: '적당한',
    intensive: '집중적인'
  };
  return commitments[commitment];
};

export const getDifficultyPreferenceKorean = (preference: 'conservative' | 'challenging'): string => {
  const preferences = {
    conservative: '안정적인',
    challenging: '도전적인'
  };
  return preferences[preference];
};
