"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KoreanHeading, KoreanBody, KoreanLabel } from '@/components/korean-text';
import { 
  useOnboardingStore, 
  FocusArea, 
  MusicStyle, 
  getFocusAreaKorean, 
  getMusicStyleKorean,
  getDifficultyPreferenceKorean
} from '@/store/onboarding-store';
import { 
  Music, 
  Target, 
  Clock, 
  CheckCircle,
  Zap,
  Shield,
  BarChart3,
  Activity,
  RotateCcw,
  Footprints
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function OnboardingPreferences() {
  const { data, updateData } = useOnboardingStore();

  const focusAreas: { 
    area: FocusArea; 
    icon: React.ComponentType<{ className?: string }>; 
    title: string; 
    description: string 
  }[] = [
    {
      area: 'barre-work',
      icon: BarChart3,
      title: '바워크',
      description: '기본 자세와 균형을 위한 바 워크'
    },
    {
      area: 'center-work',
      icon: Target,
      title: '센터워크',
      description: '중앙에서 하는 다양한 동작 연습'
    },
    {
      area: 'jumps',
      icon: Activity,
      title: '점프',
      description: '다양한 점프와 호버링 동작'
    },
    {
      area: 'turns',
      icon: RotateCcw,
      title: '턴',
      description: '회전 동작과 균형 유지'
    },
    {
      area: 'pointe',
      icon: Footprints,
      title: '포인트',
      description: '발끝으로 서는 고급 기술'
    }
  ];

  const musicStyles: { 
    style: MusicStyle; 
    icon: string; 
    title: string; 
    description: string 
  }[] = [
    {
      style: 'classical',
      icon: '🎼',
      title: '클래식',
      description: '전통적인 발레 음악'
    },
    {
      style: 'contemporary',
      icon: '🎵',
      title: '현대',
      description: '현대적인 발레 음악'
    },
    {
      style: 'pop',
      icon: '🎤',
      title: '팝',
      description: '인기 있는 팝 음악'
    },
    {
      style: 'jazz',
      icon: '🎷',
      title: '재즈',
      description: '자유로운 재즈 음악'
    }
  ];

  const classDurations = [
    { value: 5, label: '5분', description: '짧고 집중적인' },
    { value: 10, label: '10분', description: '빠르고 효과적인' },
    { value: 15, label: '15분', description: '적당한 길이의' },
    { value: 20, label: '20분', description: '충분한 연습' },
    { value: 30, label: '30분', description: '완전한 클래스' }
  ];

  const difficultyPreferences = [
    {
      value: 'conservative' as const,
      icon: Shield,
      title: '안정적인',
      description: '천천히 안전하게 배우고 싶어요'
    },
    {
      value: 'challenging' as const,
      icon: Zap,
      title: '도전적인',
      description: '빠르게 도전적인 내용을 원해요'
    }
  ];

  const handleFocusAreaToggle = (area: FocusArea) => {
    const currentAreas = data.focusAreas || [];
    const isSelected = currentAreas.includes(area);
    
    if (isSelected) {
      updateData({ 
        focusAreas: currentAreas.filter(a => a !== area) 
      });
    } else {
      updateData({ 
        focusAreas: [...currentAreas, area] 
      });
    }
  };

  const handleMusicStyleToggle = (style: MusicStyle) => {
    const currentStyles = data.musicStyles || [];
    const isSelected = currentStyles.includes(style);
    
    if (isSelected) {
      updateData({ 
        musicStyles: currentStyles.filter(s => s !== style) 
      });
    } else {
      updateData({ 
        musicStyles: [...currentStyles, style] 
      });
    }
  };

  const handleDurationChange = (duration: number) => {
    updateData({ classDuration: duration });
  };

  const handleDifficultyChange = (difficulty: 'conservative' | 'challenging') => {
    updateData({ difficultyPreference: difficulty });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Music className="w-8 h-8 text-primary" />
          </div>
        </div>
        <KoreanHeading level={2} className="text-2xl">
          선호도 설정
        </KoreanHeading>
        <KoreanBody size="sm" className="text-muted-foreground">
          어떤 종류의 클래스를 원하시나요?<br />
          여러 개를 선택할 수 있습니다.
        </KoreanBody>
      </div>

      {/* Focus Areas */}
      <div className="space-y-4">
        <KoreanHeading level={3} className="text-lg">
          1. 집중하고 싶은 발레 영역을 선택해주세요
        </KoreanHeading>
        <div className="grid grid-cols-2 gap-3">
          {focusAreas.map((focus) => {
            const Icon = focus.icon;
            const isSelected = data.focusAreas?.includes(focus.area);
            
            return (
              <Card
                key={focus.area}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => handleFocusAreaToggle(focus.area)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                        <KoreanLabel className="font-semibold">
                          {focus.title}
                        </KoreanLabel>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <KoreanBody size="sm" className="text-muted-foreground">
                      {focus.description}
                    </KoreanBody>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Music Styles */}
      <div className="space-y-4">
        <KoreanHeading level={3} className="text-lg">
          2. 좋아하는 음악 스타일을 선택해주세요
        </KoreanHeading>
        <div className="grid grid-cols-2 gap-3">
          {musicStyles.map((style) => {
            const isSelected = data.musicStyles?.includes(style.style);
            
            return (
              <Card
                key={style.style}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => handleMusicStyleToggle(style.style)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="text-xl">{style.icon}</div>
                        <KoreanLabel className="font-semibold">
                          {style.title}
                        </KoreanLabel>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <KoreanBody size="sm" className="text-muted-foreground">
                      {style.description}
                    </KoreanBody>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Class Duration */}
      <div className="space-y-4">
        <KoreanHeading level={3} className="text-lg">
          3. 선호하는 클래스 길이는?
        </KoreanHeading>
        <div className="space-y-3">
          {classDurations.map((duration) => {
            const isSelected = data.classDuration === duration.value;
            
            return (
              <Card
                key={duration.value}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => handleDurationChange(duration.value)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div className="space-y-1">
                        <KoreanLabel className="font-semibold">
                          {duration.label}
                        </KoreanLabel>
                        <KoreanBody size="sm" className="text-muted-foreground">
                          {duration.description}
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

      {/* Difficulty Preference */}
      <div className="space-y-4">
        <KoreanHeading level={3} className="text-lg">
          4. 클래스 난이도는 어떻게 원하시나요?
        </KoreanHeading>
        <div className="space-y-3">
          {difficultyPreferences.map((pref) => {
            const Icon = pref.icon;
            const isSelected = data.difficultyPreference === pref.value;
            
            return (
              <Card
                key={pref.value}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => handleDifficultyChange(pref.value)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <div className="space-y-1">
                        <KoreanLabel className="font-semibold">
                          {pref.title}
                        </KoreanLabel>
                        <KoreanBody size="sm" className="text-muted-foreground">
                          {pref.description}
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
      {(data.focusAreas?.length || data.musicStyles?.length || data.classDuration) && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Music className="w-5 h-5 text-primary" />
              <KoreanHeading level={5} className="text-primary">
                선택한 선호도
              </KoreanHeading>
            </div>
            <div className="space-y-2">
              {data.focusAreas && data.focusAreas.length > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <KoreanBody size="sm">
                    집중 영역: <span className="font-medium">
                      {data.focusAreas.map(a => getFocusAreaKorean(a)).join(', ')}
                    </span>
                  </KoreanBody>
                </div>
              )}
              {data.musicStyles && data.musicStyles.length > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <KoreanBody size="sm">
                    음악 스타일: <span className="font-medium">
                      {data.musicStyles.map(s => getMusicStyleKorean(s)).join(', ')}
                    </span>
                  </KoreanBody>
                </div>
              )}
              {data.classDuration && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <KoreanBody size="sm">
                    클래스 길이: <span className="font-medium">{data.classDuration}분</span>
                  </KoreanBody>
                </div>
              )}
              {data.difficultyPreference && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <KoreanBody size="sm">
                    난이도: <span className="font-medium">
                      {getDifficultyPreferenceKorean(data.difficultyPreference)}
                    </span>
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
