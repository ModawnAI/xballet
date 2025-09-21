import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SubscriptionPlan = 'free' | 'premium-monthly' | 'premium-yearly' | 'family';
export type PaymentMethod = 'card' | 'bank-transfer' | 'mobile-payment';

export interface SubscriptionPlanDetails {
  id: SubscriptionPlan;
  name: string;
  nameKorean: string;
  description: string;
  descriptionKorean: string;
  price: number; // in KRW
  originalPrice?: number; // for discounted plans
  billingPeriod: 'month' | 'year';
  features: string[];
  featuresKorean: string[];
  maxUsers?: number; // for family plans
  isPopular?: boolean;
  discount?: number; // percentage
}

export interface PaymentInfo {
  method: PaymentMethod;
  cardNumber?: string;
  cardExpiry?: string;
  cardHolder?: string;
  bankAccount?: string;
  mobileNumber?: string;
}

export interface Subscription {
  planId: SubscriptionPlan;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentInfo: PaymentInfo;
  trialDaysRemaining?: number;
  familyMembers?: string[]; // user IDs for family plan
}

export interface SubscriptionState {
  currentSubscription: Subscription | null;
  availablePlans: SubscriptionPlanDetails[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadPlans: () => void;
  subscribe: (planId: SubscriptionPlan, paymentInfo: PaymentInfo) => Promise<boolean>;
  cancelSubscription: () => Promise<boolean>;
  updatePaymentMethod: (paymentInfo: PaymentInfo) => Promise<boolean>;
  addFamilyMember: (email: string) => Promise<boolean>;
  removeFamilyMember: (userId: string) => Promise<boolean>;
  clearError: () => void;
}

// Mock subscription plans
const mockPlans: SubscriptionPlanDetails[] = [
  {
    id: 'free',
    name: 'Free Plan',
    nameKorean: '무료 플랜',
    description: 'Limited access to basic classes',
    descriptionKorean: '기본 클래스에 제한적 접근',
    price: 0,
    billingPeriod: 'month',
    features: [
      '3-minute free trial classes',
      'Basic movement library',
      'Community access'
    ],
    featuresKorean: [
      '3분 무료 체험 클래스',
      '기본 동작 라이브러리',
      '커뮤니티 접근'
    ]
  },
  {
    id: 'premium-monthly',
    name: 'Premium Monthly',
    nameKorean: '프리미엄 월간',
    description: 'Full access to all classes and features',
    descriptionKorean: '모든 클래스와 기능에 완전 접근',
    price: 19900,
    billingPeriod: 'month',
    features: [
      'Unlimited class access',
      'AI voice coaching',
      'Progress tracking',
      'Premium music library',
      'Personalized recommendations'
    ],
    featuresKorean: [
      '무제한 클래스 접근',
      'AI 음성 코칭',
      '진행도 추적',
      '프리미엄 음악 라이브러리',
      '개인 맞춤 추천'
    ],
    isPopular: true
  },
  {
    id: 'premium-yearly',
    name: 'Premium Yearly',
    nameKorean: '프리미엄 연간',
    description: 'Best value for serious ballet enthusiasts',
    descriptionKorean: '진지한 발레 애호가를 위한 최고의 가치',
    price: 199000,
    originalPrice: 238800,
    billingPeriod: 'year',
    discount: 17,
    features: [
      'Unlimited class access',
      'AI voice coaching',
      'Progress tracking',
      'Premium music library',
      'Personalized recommendations',
      'Exclusive master classes',
      'Priority support',
      'Advanced analytics'
    ],
    featuresKorean: [
      '무제한 클래스 접근',
      'AI 음성 코칭',
      '진행도 추적',
      '프리미엄 음악 라이브러리',
      '개인 맞춤 추천',
      '독점 마스터 클래스',
      '우선 지원',
      '고급 분석'
    ]
  },
  {
    id: 'family',
    name: 'Family Plan',
    nameKorean: '가족 플랜',
    description: 'Perfect for families who love ballet together',
    descriptionKorean: '함께 발레를 사랑하는 가족들을 위한 플랜',
    price: 29900,
    billingPeriod: 'month',
    maxUsers: 4,
    features: [
      'Up to 4 family members',
      'Individual progress tracking',
      'Family challenges',
      'All premium features',
      'Parental controls',
      'Family calendar'
    ],
    featuresKorean: [
      '최대 4명의 가족 구성원',
      '개별 진행도 추적',
      '가족 챌린지',
      '모든 프리미엄 기능',
      '부모 제어',
      '가족 캘린더'
    ]
  }
];

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      currentSubscription: null,
      availablePlans: [],
      isLoading: false,
      error: null,

      loadPlans: () => {
        set({ availablePlans: mockPlans });
      },

      subscribe: async (planId: SubscriptionPlan, paymentInfo: PaymentInfo) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const plan = mockPlans.find(p => p.id === planId);
          if (!plan) {
            set({ 
              isLoading: false, 
              error: '선택한 플랜을 찾을 수 없습니다.' 
            });
            return false;
          }

          // Calculate subscription dates
          const startDate = new Date();
          const endDate = new Date();
          
          if (plan.billingPeriod === 'year') {
            endDate.setFullYear(endDate.getFullYear() + 1);
          } else {
            endDate.setMonth(endDate.getMonth() + 1);
          }

          // Create subscription
          const subscription: Subscription = {
            planId,
            status: 'active',
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            autoRenew: true,
            paymentInfo,
            familyMembers: planId === 'family' ? [] : undefined
          };

          set({
            currentSubscription: subscription,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: '구독 처리 중 오류가 발생했습니다. 다시 시도해주세요.' 
          });
          return false;
        }
      },

      cancelSubscription: async () => {
        const { currentSubscription } = get();
        if (!currentSubscription) return false;
        
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({
            currentSubscription: {
              ...currentSubscription,
              status: 'cancelled',
              autoRenew: false,
            },
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: '구독 취소 중 오류가 발생했습니다.' 
          });
          return false;
        }
      },

      updatePaymentMethod: async (paymentInfo: PaymentInfo) => {
        const { currentSubscription } = get();
        if (!currentSubscription) return false;
        
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({
            currentSubscription: {
              ...currentSubscription,
              paymentInfo,
            },
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: '결제 방법 업데이트 중 오류가 발생했습니다.' 
          });
          return false;
        }
      },

      addFamilyMember: async (email: string) => {
        const { currentSubscription } = get();
        if (!currentSubscription || currentSubscription.planId !== 'family') return false;
        
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check if family plan has space
          const maxMembers = mockPlans.find(p => p.id === 'family')?.maxUsers || 4;
          const currentMembers = currentSubscription.familyMembers?.length || 0;
          
          if (currentMembers >= maxMembers) {
            set({ 
              isLoading: false, 
              error: '가족 플랜의 최대 구성원 수에 도달했습니다.' 
            });
            return false;
          }

          // Add family member (in real app, this would be a user ID)
          const newMembers = [...(currentSubscription.familyMembers || []), email];

          set({
            currentSubscription: {
              ...currentSubscription,
              familyMembers: newMembers,
            },
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: '가족 구성원 추가 중 오류가 발생했습니다.' 
          });
          return false;
        }
      },

      removeFamilyMember: async (userId: string) => {
        const { currentSubscription } = get();
        if (!currentSubscription || currentSubscription.planId !== 'family') return false;
        
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newMembers = currentSubscription.familyMembers?.filter(id => id !== userId) || [];

          set({
            currentSubscription: {
              ...currentSubscription,
              familyMembers: newMembers,
            },
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: '가족 구성원 제거 중 오류가 발생했습니다.' 
          });
          return false;
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'xballet-subscription',
      partialize: (state) => ({ 
        currentSubscription: state.currentSubscription 
      }),
    }
  )
);
