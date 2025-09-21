"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { KoreanHeading, KoreanBody } from "@/components/korean-text";
import { MobileNavigation, MobileHeader } from "@/components/mobile-navigation";
import { QuickActionMenu, MobileFAB } from "@/components/mobile-fab";
import { MobileFeatureCard, MobileDifficultyButton } from "@/components/mobile-card";
import { FounderSection } from "@/components/founder-section";
import { useAuthStore } from "@/store/auth-store";
import { mobile } from "@/lib/responsive";
import { Target, Music, Mic, Play, BookOpen, Users } from "lucide-react";

export default function Home() {
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("초급");
  const { user } = useAuthStore();
  const router = useRouter();

  const quickActions = [
    {
      id: 'start-class',
      label: 'AI 클래스 시작',
      icon: Play,
      onClick: () => router.push('/ai-classes'),
    },
    {
      id: 'technique-guide',
      label: '테크닉 가이드',
      icon: BookOpen,
      onClick: () => router.push('/technique'),
    },
    {
      id: 'videos',
      label: '동작 데이터베이스',
      icon: BookOpen,
      onClick: () => router.push('/videos'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader title="XBallet" />

      {/* Main Content */}
      <main className={`${mobile.contentPadding} pb-24 space-y-6`}>
        {/* Hero Section */}
        <div className="text-center space-y-6 pt-6">
          <KoreanHeading 
            level={2} 
            className="text-2xl md:text-3xl lg:text-4xl font-bold"
          >
            AI가 생성하는 개인 맞춤형 발레 클래스
          </KoreanHeading>
          <KoreanBody size="lg" className="text-center">
            집에서 전문적인 발레 연습을 경험하세요.<br />
            당신의 실력과 목표에 맞는 클래스를 AI가 자동으로 생성합니다.
          </KoreanBody>
        </div>

        {/* Video Player Section */}
        <Card className="w-full">
          <CardContent className="p-4">
            <div className="space-y-3">
              <KoreanHeading level={3} className="text-center text-lg">
                XBallet 소개 영상
              </KoreanHeading>
              <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-muted rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/_PZnS-FAdlc"
                  title="XBallet 소개 영상"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <KoreanBody size="sm" className="text-center text-muted-foreground">
                AI가 생성하는 개인 맞춤형 발레 클래스를 경험해보세요
              </KoreanBody>
            </div>
          </CardContent>
        </Card>

        {/* Class Difficulty Selection */}
        <div className="space-y-4">
          <KoreanHeading level={3} className="text-lg">난이도 선택</KoreanHeading>
          <KoreanBody size="sm" className="text-muted-foreground">
            원하는 난이도를 선택하면 AI가 맞춤형 클래스를 생성합니다
          </KoreanBody>
          <div className="flex space-x-3">
            <MobileDifficultyButton
              level="초급"
              isSelected={selectedDifficulty === "초급"}
              onClick={() => setSelectedDifficulty("초급")}
            />
            <MobileDifficultyButton
              level="중급"
              isSelected={selectedDifficulty === "중급"}
              onClick={() => setSelectedDifficulty("중급")}
            />
            <MobileDifficultyButton
              level="고급"
              isSelected={selectedDifficulty === "고급"}
              onClick={() => setSelectedDifficulty("고급")}
            />
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => router.push('/ai-classes')}
          >
            {selectedDifficulty} 클래스 시작하기
          </Button>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <KoreanHeading level={3} className="text-lg">주요 기능</KoreanHeading>
          <div className="space-y-3">
            <MobileFeatureCard
              icon={Target}
              title="개인 맞춤형 클래스"
              description="AI가 당신만의 클래스를 생성"
              onClick={() => router.push('/ai-classes')}
            />
            <MobileFeatureCard
              icon={Music}
              title="음악 동기화"
              description="동작과 완벽하게 맞는 음악"
              onClick={() => router.push('/ai-classes')}
            />
            <MobileFeatureCard
              icon={Mic}
              title="AI 음성 코칭"
              description="실시간 한국어 안내"
              onClick={() => router.push('/ai-classes')}
            />
                </div>
              </div>

              {/* Founder Section */}
              <FounderSection />

              {/* CTA Button */}
              <Button 
                className="w-full h-14 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
                size="lg"
                onClick={() => router.push('/ai-classes')}
              >
                무료 체험 시작하기
              </Button>
      </main>

      {/* Floating Action Button */}
      <MobileFAB 
        onClick={() => setIsQuickMenuOpen(true)}
        variant="primary"
        size="md"
      />

      {/* Quick Action Menu */}
      <QuickActionMenu
        isOpen={isQuickMenuOpen}
        onClose={() => setIsQuickMenuOpen(false)}
        actions={quickActions}
      />

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}
