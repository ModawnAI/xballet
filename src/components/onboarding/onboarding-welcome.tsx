"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { KoreanHeading, KoreanBody } from '@/components/korean-text';
import { useOnboardingStore } from '@/store/onboarding-store';
import { 
  Sparkles, 
  Target, 
  Music, 
  Users, 
  Heart,
  Play
} from 'lucide-react';

export function OnboardingWelcome() {
  const { updateData } = useOnboardingStore();

  const handleStart = () => {
    updateData({ hasSeenWelcome: true });
  };

  const features = [
    {
      icon: Target,
      title: "개인 맞춤형 클래스",
      description: "AI가 당신의 실력과 목표에 맞는 클래스를 생성합니다"
    },
    {
      icon: Music,
      title: "완벽한 음악 동기화",
      description: "동작과 완벽하게 맞는 음악으로 몰입감 있는 연습"
    },
    {
      icon: Users,
      title: "전문가 지도",
      description: "발레 전문가들의 정확한 자세 안내와 피드백"
    },
    {
      icon: Heart,
      title: "안전한 연습",
      description: "초보자부터 고급자까지 안전한 발레 연습 환경"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        <div className="space-y-4">
          <KoreanHeading level={1} className="text-3xl font-bold">
            XBallet에 오신 것을 환영합니다!
          </KoreanHeading>
          <KoreanBody size="lg" className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            집에서 전문적인 발레 연습을 시작해보세요.<br />
            AI가 당신만의 맞춤형 클래스를 만들어드립니다.
          </KoreanBody>
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <KoreanHeading level={5} className="font-semibold">
                      {feature.title}
                    </KoreanHeading>
                    <KoreanBody size="sm" className="text-muted-foreground">
                      {feature.description}
                    </KoreanBody>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Demo Video */}
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-primary" />
              <KoreanHeading level={5} className="font-semibold">
                XBallet 체험하기
              </KoreanHeading>
            </div>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <KoreanBody size="sm" className="text-muted-foreground">
                  소개 영상 보기
                </KoreanBody>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <div className="space-y-4">
        <KoreanHeading level={3} className="text-xl text-center">
          시작하기 전에
        </KoreanHeading>
        <KoreanBody size="sm" className="text-muted-foreground text-center leading-relaxed">
          당신에게 맞는 발레 클래스를 만들기 위해<br />
          몇 가지 간단한 질문에 답해주세요.<br />
          <span className="text-primary font-medium">약 3분 정도</span> 소요됩니다.
        </KoreanBody>
      </div>

      {/* CTA */}
      <div className="pt-4">
        <button
          onClick={handleStart}
          className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-xl font-medium text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
