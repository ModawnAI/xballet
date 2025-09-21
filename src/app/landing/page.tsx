"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KoreanHeading, KoreanBody, KoreanLabel } from "@/components/korean-text";
import { MobileNavigation, MobileHeader } from "@/components/mobile-navigation";
import { MobileFAB, QuickActionMenu } from "@/components/mobile-fab";
import { MobileFeatureCard, MobileDifficultyButton } from "@/components/mobile-card";
import { FounderSection } from "@/components/founder-section";
import { LoginForm, RegisterForm } from "@/components/auth/auth-forms";
import { responsive, mobile } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import { Target, Music, Mic, Play, BookOpen, Users } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("초급");
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const quickActions = [
    {
      id: 'start-class',
      label: '클래스 시작하기',
      icon: Play,
      onClick: () => console.log('Start class'),
    },
    {
      id: 'technique-guide',
      label: '테크닉 가이드',
      icon: BookOpen,
      onClick: () => console.log('Technique guide'),
    },
    {
      id: 'group-class',
      label: '그룹 클래스',
      icon: Users,
      onClick: () => console.log('Group class'),
    },
  ];

  const handleAuthSuccess = () => {
    router.push('/classes');
  };

  const quickStartDemo = () => {
    router.push('/classes');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="px-4 py-12 text-center space-y-8">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-2xl">X</span>
          </div>
          
          <KoreanHeading level={1} className="text-4xl md:text-5xl">
            XBallet
          </KoreanHeading>
          
          <KoreanHeading level={2} className="text-xl md:text-2xl text-muted-foreground">
            AI가 생성하는 개인 맞춤형 발레 클래스
          </KoreanHeading>
          
          <KoreanBody size="lg" className="max-w-md mx-auto">
            집에서 전문적인 발레 연습을 경험하세요.<br />
            당신의 실력과 목표에 맞는 클래스를 AI가 자동으로 생성합니다.
          </KoreanBody>
        </div>

        {/* Quick Start Button */}
        <Button 
          onClick={quickStartDemo}
          size="lg"
          className="w-full max-w-xs h-14 text-base font-medium"
        >
          <Play className="w-5 h-5 mr-2" />
          무료로 체험해보기
        </Button>
      </div>

      {/* Features Preview */}
      <div className="px-4 py-8 space-y-6">
        <KoreanHeading level={3} className="text-center text-xl">
          주요 기능
        </KoreanHeading>
        
        <div className="grid gap-4 max-w-md mx-auto">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <KoreanHeading level={4} className="text-base">
                    개인 맞춤형 클래스
                  </KoreanHeading>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    AI가 당신만의 클래스를 생성
                  </KoreanBody>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Music className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <KoreanHeading level={4} className="text-base">
                    음악 동기화
                  </KoreanHeading>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    동작과 완벽하게 맞는 음악
                  </KoreanBody>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mic className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <KoreanHeading level={4} className="text-base">
                    AI 음성 코칭
                  </KoreanHeading>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    실시간 한국어 안내
                  </KoreanBody>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Authentication Section */}
      <div className="px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setAuthMode('login')}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                authMode === 'login'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              로그인
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                authMode === 'register'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              회원가입
            </button>
          </div>

          {authMode === 'login' ? (
            <LoginForm 
              onSwitchToRegister={() => setAuthMode('register')}
              onSuccess={handleAuthSuccess}
            />
          ) : (
            <RegisterForm 
              onSwitchToLogin={() => setAuthMode('login')}
              onSuccess={handleAuthSuccess}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-8 text-center">
        <KoreanBody size="sm" className="text-muted-foreground">
          XBallet과 함께 시작하는 발레 여정
        </KoreanBody>
      </div>
    </div>
  );
}