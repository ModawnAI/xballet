"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { KoreanHeading, KoreanBody, KoreanLabel } from '@/components/korean-text';
import { useOnboardingStore, GoalType, getGoalKorean } from '@/store/onboarding-store';
import { 
  Target, 
  Heart, 
  TrendingUp, 
  Smile,
  CheckCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function OnboardingGoals() {
  const { data, updateData } = useOnboardingStore();

  const goalOptions: { 
    type: GoalType; 
    icon: React.ComponentType<{ className?: string }>; 
    title: string; 
    description: string; 
    benefits: string[] 
  }[] = [
    {
      type: 'fitness',
      icon: Heart,
      title: '피트니스',
      description: '체력 향상과 건강한 몸을 만들고 싶어요',
      benefits: [
        '전신 근력 강화',
        '유연성 향상',
        '자세 개선',
        '스트레스 해소'
      ]
    },
    {
      type: 'learning',
      icon: Target,
      title: '기초 학습',
      description: '발레의 기본기를 차근차근 배우고 싶어요',
      benefits: [
        '기본 자세 습득',
        '발레 용어 이해',
        '안전한 동작 연습',
        '체계적인 학습'
      ]
    },
    {
      type: 'improvement',
      icon: TrendingUp,
      title: '실력 향상',
      description: '현재 실력을 더욱 발전시키고 싶어요',
      benefits: [
        '기술 완성도 향상',
        '고급 동작 도전',
        '표현력 개발',
        '전문성 향상'
      ]
    },
    {
      type: 'recreation',
      icon: Smile,
      title: '취미 활동',
      description: '즐겁고 재미있는 발레를 하고 싶어요',
      benefits: [
        '재미있는 운동',
        '새로운 취미',
        '자신감 향상',
        '여가 시간 활용'
      ]
    }
  ];

  const timeCommitmentOptions = [
    { 
      value: 'light' as const, 
      label: '가벼운', 
      description: '주 2-3회, 15-20분',
      icon: '🌱'
    },
    { 
      value: 'moderate' as const, 
      label: '적당한', 
      description: '주 4-5회, 20-30분',
      icon: '🌿'
    },
    { 
      value: 'intensive' as const, 
      label: '집중적인', 
      description: '매일, 30-45분',
      icon: '🌳'
    }
  ];

  const handlePrimaryGoalSelect = (goalType: GoalType) => {
    updateData({ primaryGoal: goalType });
  };

  const handleSecondaryGoalToggle = (goalType: GoalType) => {
    const currentSecondary = data.secondaryGoals || [];
    const isSelected = currentSecondary.includes(goalType);
    
    if (isSelected) {
      updateData({ 
        secondaryGoals: currentSecondary.filter(g => g !== goalType) 
      });
    } else {
      updateData({ 
        secondaryGoals: [...currentSecondary, goalType] 
      });
    }
  };

  const handleTimeCommitmentChange = (commitment: 'light' | 'moderate' | 'intensive') => {
    updateData({ timeCommitment: commitment });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Target className="w-8 h-8 text-primary" />
          </div>
        </div>
        <KoreanHeading level={2} className="text-2xl">
          목표 설정
        </KoreanHeading>
        <KoreanBody size="sm" className="text-muted-foreground">
          발레를 통해 무엇을 이루고 싶으신가요?<br />
          목표에 맞는 클래스를 추천해드리겠습니다.
        </KoreanBody>
      </div>

      {/* Primary Goal */}
      <div className="space-y-4">
        <KoreanHeading level={3} className="text-lg">
          1. 가장 중요한 목표는 무엇인가요?
        </KoreanHeading>
        <div className="space-y-3">
          {goalOptions.map((goal) => {
            const Icon = goal.icon;
            const isSelected = data.primaryGoal === goal.type;
            
            return (
              <Card
                key={goal.type}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => handlePrimaryGoalSelect(goal.type)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <KoreanHeading level={5} className="font-semibold">
                          {goal.title}
                        </KoreanHeading>
                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <KoreanBody size="sm" className="text-muted-foreground">
                        {goal.description}
                      </KoreanBody>
                      <div className="grid grid-cols-2 gap-1">
                        {goal.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-primary rounded-full" />
                            <KoreanBody size="sm" className="text-muted-foreground">
                              {benefit}
                            </KoreanBody>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Secondary Goals */}
      <div className="space-y-4">
        <KoreanHeading level={3} className="text-lg">
          2. 추가로 관심 있는 목표가 있다면 선택해주세요 (선택사항)
        </KoreanHeading>
        <div className="grid grid-cols-2 gap-3">
          {goalOptions.map((goal) => {
            const Icon = goal.icon;
            const isSelected = data.secondaryGoals?.includes(goal.type);
            
            return (
              <Card
                key={goal.type}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => handleSecondaryGoalToggle(goal.type)}
              >
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <KoreanLabel className="font-semibold text-sm">
                          {goal.title}
                        </KoreanLabel>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Time Commitment */}
      <div className="space-y-4">
        <KoreanHeading level={3} className="text-lg">
          3. 얼마나 자주 발레를 연습하고 싶으신가요?
        </KoreanHeading>
        <div className="space-y-3">
          {timeCommitmentOptions.map((option) => {
            const isSelected = data.timeCommitment === option.value;
            
            return (
              <Card
                key={option.value}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => handleTimeCommitmentChange(option.value)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{option.icon}</div>
                      <div className="space-y-1">
                        <KoreanLabel className="font-semibold">
                          {option.label}
                        </KoreanLabel>
                        <KoreanBody size="sm" className="text-muted-foreground">
                          {option.description}
                        </KoreanBody>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      {(data.primaryGoal || data.timeCommitment) && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <KoreanHeading level={5} className="text-primary">
                선택한 목표
              </KoreanHeading>
            </div>
            <div className="space-y-2">
              {data.primaryGoal && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <KoreanBody size="sm">
                    주요 목표: <span className="font-medium">{getGoalKorean(data.primaryGoal)}</span>
                  </KoreanBody>
                </div>
              )}
              {data.secondaryGoals && data.secondaryGoals.length > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <KoreanBody size="sm">
                    추가 목표: <span className="font-medium">
                      {data.secondaryGoals.map(g => getGoalKorean(g)).join(', ')}
                    </span>
                  </KoreanBody>
                </div>
              )}
              {data.timeCommitment && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <KoreanBody size="sm">
                    연습 강도: <span className="font-medium">{data.timeCommitment}</span>
                  </KoreanBody>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
