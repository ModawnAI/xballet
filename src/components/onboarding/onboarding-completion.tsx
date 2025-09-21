"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KoreanHeading, KoreanBody, KoreanLabel } from '@/components/korean-text';
import { useOnboardingStore, getGoalKorean, getFocusAreaKorean, getMusicStyleKorean } from '@/store/onboarding-store';
import { 
  CheckCircle, 
  Sparkles, 
  Play, 
  Target,
  Music,
  Clock,
  Zap,
  ArrowRight
} from 'lucide-react';

export function OnboardingCompletion() {
  const router = useRouter();
  const { data, completeOnboarding } = useOnboardingStore();

  const handleComplete = () => {
    completeOnboarding();
    router.push('/'); // Go back to main page
  };

  const handleStartFirstClass = () => {
    completeOnboarding();
    router.push('/classes'); // Go to classes page
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        <div className="space-y-3">
          <KoreanHeading level={1} className="text-3xl font-bold">
            설정 완료!
          </KoreanHeading>
          <KoreanBody size="lg" className="text-muted-foreground">
            당신만의 맞춤형 발레 클래스가 준비되었습니다.<br />
            이제 XBallet과 함께 발레 여정을 시작해보세요!
          </KoreanBody>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <KoreanHeading level={3} className="text-primary">
              나의 발레 프로필
            </KoreanHeading>
          </div>
          
          <div className="space-y-4">
            {/* Skill Level */}
            {data.skillLevel && (
              <div className="flex items-center space-x-3">
                <Target className="w-4 h-4 text-muted-foreground" />
                <div>
                  <KoreanLabel className="text-sm font-medium">실력 레벨</KoreanLabel>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    {data.skillLevel}
                  </KoreanBody>
                </div>
              </div>
            )}

            {/* Primary Goal */}
            {data.primaryGoal && (
              <div className="flex items-center space-x-3">
                <Target className="w-4 h-4 text-muted-foreground" />
                <div>
                  <KoreanLabel className="text-sm font-medium">주요 목표</KoreanLabel>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    {getGoalKorean(data.primaryGoal)}
                  </KoreanBody>
                </div>
              </div>
            )}

            {/* Focus Areas */}
            {data.focusAreas && data.focusAreas.length > 0 && (
              <div className="flex items-center space-x-3">
                <Target className="w-4 h-4 text-muted-foreground" />
                <div>
                  <KoreanLabel className="text-sm font-medium">집중 영역</KoreanLabel>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    {data.focusAreas.map(area => getFocusAreaKorean(area)).join(', ')}
                  </KoreanBody>
                </div>
              </div>
            )}

            {/* Music Styles */}
            {data.musicStyles && data.musicStyles.length > 0 && (
              <div className="flex items-center space-x-3">
                <Music className="w-4 h-4 text-muted-foreground" />
                <div>
                  <KoreanLabel className="text-sm font-medium">음악 스타일</KoreanLabel>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    {data.musicStyles.map(style => getMusicStyleKorean(style)).join(', ')}
                  </KoreanBody>
                </div>
              </div>
            )}

            {/* Class Duration */}
            {data.classDuration && (
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <KoreanLabel className="text-sm font-medium">선호 클래스 길이</KoreanLabel>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    {data.classDuration}분
                  </KoreanBody>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <KoreanHeading level={3} className="text-lg">
              다음 단계
            </KoreanHeading>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">1</span>
                </div>
                <div>
                  <KoreanLabel className="font-medium">첫 클래스 시작하기</KoreanLabel>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    당신의 설정에 맞는 추천 클래스를 시작해보세요
                  </KoreanBody>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">2</span>
                </div>
                <div>
                  <KoreanLabel className="font-medium">진행도 추적</KoreanLabel>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    매일의 연습과 향상을 확인해보세요
                  </KoreanBody>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">3</span>
                </div>
                <div>
                  <KoreanLabel className="font-medium">새로운 클래스 탐색</KoreanLabel>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    다양한 발레 클래스와 테크닉을 경험해보세요
                  </KoreanBody>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleStartFirstClass}
          className="w-full h-14 text-lg font-medium"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          첫 클래스 시작하기
        </Button>
        
        <Button
          onClick={handleComplete}
          variant="outline"
          className="w-full h-12"
          size="lg"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          메인 화면으로 이동
        </Button>
      </div>

      {/* Encouragement */}
      <div className="text-center py-4">
        <KoreanBody size="sm" className="text-muted-foreground">
          🩰 발레는 여정입니다. 작은 한 걸음부터 시작해보세요! 🩰
        </KoreanBody>
      </div>
    </div>
  );
}
