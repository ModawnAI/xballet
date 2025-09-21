"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KoreanHeading, KoreanBody, KoreanLabel } from '@/components/korean-text';
import { useOnboardingStore, SkillLevel } from '@/store/onboarding-store';
import { 
  Star, 
  Calendar, 
  CheckCircle, 
  Zap,
  User,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function OnboardingSkillAssessment() {
  const { data, updateData } = useOnboardingStore();

  const skillLevels: { level: SkillLevel; icon: React.ComponentType<{ className?: string }>; description: string; details: string[] }[] = [
    {
      level: '초급',
      icon: BookOpen,
      description: '발레를 처음 시작하시는 분',
      details: [
        '발레 기본 자세를 배우고 싶어요',
        '기초 워밍업과 간단한 동작을 원해요',
        '천천히 차근차근 배우고 싶어요'
      ]
    },
    {
      level: '중급',
      icon: Star,
      description: '어느 정도 발레 경험이 있으신 분',
      details: [
        '기본 동작은 알고 있어요',
        '조금 더 어려운 동작을 도전하고 싶어요',
        '자세를 더 정확하게 만들고 싶어요'
      ]
    },
    {
      level: '고급',
      icon: Zap,
      description: '발레를 오랫동안 해오신 분',
      details: [
        '복잡한 동작을 수행할 수 있어요',
        '기술적 완성도를 높이고 싶어요',
        '도전적인 클래스를 원해요'
      ]
    }
  ];

  const experienceOptions = [
    { value: 0, label: '전혀 없음' },
    { value: 1, label: '1년 미만' },
    { value: 2, label: '1-2년' },
    { value: 3, label: '3-5년' },
    { value: 5, label: '5년 이상' }
  ];

  const flexibilityLevels = [
    { value: 'low' as const, label: '유연하지 않음', description: '스트레칭이 어려워요' },
    { value: 'medium' as const, label: '보통', description: '평범한 유연성을 가지고 있어요' },
    { value: 'high' as const, label: '매우 유연함', description: '유연성이 좋아요' }
  ];

  const handleSkillLevelSelect = (level: SkillLevel) => {
    updateData({ skillLevel: level });
  };

  const handleExperienceChange = (years: number) => {
    updateData({ experienceYears: years });
  };

  const handlePreviousClassesChange = (hasClasses: boolean) => {
    updateData({ previousClasses: hasClasses });
  };

  const handleFlexibilityChange = (level: 'low' | 'medium' | 'high') => {
    updateData({ flexibilityLevel: level });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
        </div>
        <KoreanHeading level={2} className="text-2xl">
          실력 평가
        </KoreanHeading>
        <KoreanBody size="sm" className="text-muted-foreground">
          당신의 발레 실력에 맞는 클래스를 추천해드리기 위해<br />
          몇 가지 질문에 답해주세요.
        </KoreanBody>
      </div>

      {/* Skill Level Selection */}
      <div className="space-y-4">
        <KoreanHeading level={3} className="text-lg">
          1. 발레 실력은 어느 정도인가요?
        </KoreanHeading>
        <div className="space-y-3">
          {skillLevels.map((skill) => {
            const Icon = skill.icon;
            const isSelected = data.skillLevel === skill.level;
            
            return (
              <Card
                key={skill.level}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => handleSkillLevelSelect(skill.level)}
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
                          {skill.level}
                        </KoreanHeading>
                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <KoreanBody size="sm" className="text-muted-foreground">
                        {skill.description}
                      </KoreanBody>
                      <div className="space-y-1">
                        {skill.details.map((detail, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                            <KoreanBody size="sm" className="text-muted-foreground">
                              {detail}
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

      {/* Experience */}
      <div className="space-y-4">
        <KoreanHeading level={3} className="text-lg">
          2. 발레 경험은 얼마나 되나요?
        </KoreanHeading>
        <div className="grid grid-cols-2 gap-2">
          {experienceOptions.map((option) => (
            <Button
              key={option.value}
              variant={data.experienceYears === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleExperienceChange(option.value)}
              className="justify-start"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Previous Classes */}
      <div className="space-y-4">
        <KoreanHeading level={3} className="text-lg">
          3. 발레 클래스를 수강한 적이 있나요?
        </KoreanHeading>
        <div className="flex space-x-3">
          <Button
            variant={data.previousClasses ? "default" : "outline"}
            size="sm"
            onClick={() => handlePreviousClassesChange(true)}
            className="flex-1"
          >
            네, 있어요
          </Button>
          <Button
            variant={!data.previousClasses ? "default" : "outline"}
            size="sm"
            onClick={() => handlePreviousClassesChange(false)}
            className="flex-1"
          >
            아니요, 처음이에요
          </Button>
        </div>
      </div>

      {/* Flexibility */}
      <div className="space-y-4">
        <KoreanHeading level={3} className="text-lg">
          4. 유연성은 어떤가요?
        </KoreanHeading>
        <div className="space-y-3">
          {flexibilityLevels.map((level) => {
            const isSelected = data.flexibilityLevel === level.value;
            
            return (
              <Card
                key={level.value}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => handleFlexibilityChange(level.value)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <KoreanLabel className="font-semibold">
                        {level.label}
                      </KoreanLabel>
                      <KoreanBody size="sm" className="text-muted-foreground">
                        {level.description}
                      </KoreanBody>
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
    </div>
  );
}
