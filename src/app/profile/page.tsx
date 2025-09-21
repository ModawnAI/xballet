"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { KoreanHeading, KoreanBody, KoreanLabel } from "@/components/korean-text";
import { MobileNavigation, MobileHeader } from "@/components/mobile-navigation";
import { useAuthStore, User as UserType } from "@/store/auth-store";

// Extended user type for demo purposes
interface ExtendedUser extends UserType {
  bio?: string;
  professionalInfo?: {
    position: string;
    company: string;
    previousPosition?: string;
    joinDate?: string;
    education: string;
  };
}
import { useRouter } from "next/navigation";
import { 
  User, 
  Settings, 
  Crown, 
  Calendar, 
  Target, 
  Trophy, 
  Clock, 
  Music,
  Bell,
  LogOut,
  Edit3,
  Star
} from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<'overview' | 'progress' | 'settings' | 'achievements'>('overview');

  // Founder profile - 전호진 (XBallet 창립자)
  const founderProfile = {
    id: 'founder',
    email: 'founder@xballet.com',
    name: 'Jeon Hojin',
    nameKorean: '전호진',
    avatar: '/hojin.png',
    role: '창립자 & CEO',
    bio: 'XBallet의 창립자이자 CEO. 국립발레단 솔리스트 출신으로 10년간의 전문 무용수 경험을 바탕으로 AI 기술과 발레 교육을 결합한 혁신적인 플랫폼을 만들었습니다.',
    skillLevel: '전문가' as const,
    goals: ['발레 교육 민주화', 'AI 기술 혁신', '전문성과 접근성의 조화'],
    preferences: {
      classDuration: [30, 60, 90],
      focusAreas: ['파드되', '그랜드 알레그로', '아다지오'],
      musicStyle: '클래식' as const,
      notifications: true,
      language: 'ko' as const,
    },
    subscription: {
      type: 'founder' as const,
      isActive: true,
    },
    progress: {
      totalClasses: 0, // Founder doesn't take classes
      totalMinutes: 0,
      currentStreak: 0,
      longestStreak: 0,
      completedMovements: [],
    },
    achievements: [
      { id: 'founder', name: 'XBallet 창립자', description: 'AI 기반 발레 교육 플랫폼 XBallet 창립', icon: '🚀', unlockedAt: '2024-01-01' },
      { id: 'international-gold', name: '국제 콩쿠르 금상', description: '2016년 핀란드 헬싱키 국제발레콩쿠르 파드되 부문 1위', icon: '🏆', unlockedAt: '2016-06-15' },
      { id: 'national-gold', name: '전국 콩쿠르 금상', description: '2012년 동아무용콩쿠르 및 대구신인무용콩쿠르 금상', icon: '⭐', unlockedAt: '2012-08-20' },
    ],
    professionalInfo: {
      position: '창립자 & CEO',
      company: 'XBallet',
      previousPosition: '국립발레단 솔리스트',
      education: '세종대학교 무용과 (2014), 융합예술대학원 (2018)',
      joinDate: '2013',
      awards: [
        '2016 핀란드 헬싱키 국제발레콩쿠르 파드되 부문 1위',
        '2012 동아무용콩쿠르 금상',
        '2012 대구신인무용콩쿠르 금상',
        '2012 한국발레협회 서울발레콩쿨 은상',
        '2011 전국신인무용콩쿠르 입상',
        '2010 한국발레협회 서울발레콩쿨 특상'
      ]
    },
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: new Date().toISOString(),
  };

  // Use founder profile if no real user is logged in
  const currentUser = user || founderProfile;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleEditProfile = () => {
    // TODO: Implement profile editing
    console.log('Edit profile');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader title="프로필" />

      {/* Main Content */}
      <main className="px-4 py-6 pb-24 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={currentUser.avatar} alt={currentUser.nameKorean} />
                <AvatarFallback>
                  {currentUser.nameKorean.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <KoreanHeading level={3} className="text-xl">
                    {currentUser.nameKorean}
                  </KoreanHeading>
                  {currentUser.subscription.type === 'premium' && (
                    <Badge variant="secondary" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      프리미엄
                    </Badge>
                  )}
                </div>
                <KoreanBody size="sm" className="text-muted-foreground">
                  {currentUser.skillLevel} • {currentUser.goals.join(', ')}
                </KoreanBody>
                <KoreanBody size="sm" className="text-muted-foreground">
                  가입일: {formatDate(currentUser.createdAt)}
                </KoreanBody>
              </div>
              <Button variant="outline" size="sm" onClick={handleEditProfile}>
                <Edit3 className="w-4 h-4 mr-2" />
                편집
              </Button>
            </div>
            
            {/* Bio Section */}
            {(currentUser as ExtendedUser).bio && (
              <div className="mt-4 pt-4 border-t">
                <KoreanBody size="sm" className="text-muted-foreground leading-relaxed">
                  {(currentUser as ExtendedUser).bio}
                </KoreanBody>
              </div>
            )}

            {/* Professional Info Section */}
            {(currentUser as ExtendedUser).professionalInfo && (
              <div className="mt-4 pt-4 border-t">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-primary" />
                    <KoreanLabel className="text-sm font-medium">
                      {(currentUser as ExtendedUser).professionalInfo?.position} • {(currentUser as ExtendedUser).professionalInfo?.company}
                    </KoreanLabel>
                  </div>
                  {(currentUser as ExtendedUser).professionalInfo?.previousPosition && (
                    <KoreanBody size="sm" className="text-muted-foreground">
                      이전: {(currentUser as ExtendedUser).professionalInfo?.previousPosition} ({(currentUser as ExtendedUser).professionalInfo?.joinDate}년 입단)
                    </KoreanBody>
                  )}
                  <KoreanBody size="sm" className="text-muted-foreground">
                    {(currentUser as ExtendedUser).professionalInfo?.education}
                  </KoreanBody>
                  <div className="mt-2 p-3 bg-primary/5 rounded-lg">
                    <KoreanBody size="sm" className="text-primary font-medium">
                      ✨ 국제 콩쿠르 수상자 출신의 전문가가 직접 만든 AI 발레 플랫폼
                    </KoreanBody>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {[
            { id: 'overview', label: '개요', icon: User },
            { id: 'settings', label: '설정', icon: Settings },
            { id: 'achievements', label: '성과', icon: Trophy },
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as 'overview' | 'progress' | 'achievements' | 'settings')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <section.icon className="w-4 h-4" />
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-4">
            {/* Progress Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <KoreanHeading level={4}>진행도</KoreanHeading>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <KoreanHeading level={3} className="text-2xl text-primary">
                      {currentUser.progress.totalClasses}
                    </KoreanHeading>
                    <KoreanBody size="sm" className="text-muted-foreground">
                      완료한 클래스
                    </KoreanBody>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <KoreanHeading level={3} className="text-2xl text-primary">
                      {currentUser.progress.totalMinutes}
                    </KoreanHeading>
                    <KoreanBody size="sm" className="text-muted-foreground">
                      총 연습 시간 (분)
                    </KoreanBody>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <KoreanHeading level={3} className="text-2xl text-primary">
                      {currentUser.progress.currentStreak}
                    </KoreanHeading>
                    <KoreanBody size="sm" className="text-muted-foreground">
                      현재 연속일
                    </KoreanBody>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <KoreanHeading level={3} className="text-2xl text-primary">
                      {currentUser.progress.longestStreak}
                    </KoreanHeading>
                    <KoreanBody size="sm" className="text-muted-foreground">
                      최고 연속일
                    </KoreanBody>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <KoreanHeading level={4}>최근 활동</KoreanHeading>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <KoreanBody size="sm" className="font-medium">
                        기본 플리에 클래스 완료
                      </KoreanBody>
                      <KoreanBody size="sm" className="text-muted-foreground">
                        2시간 전
                      </KoreanBody>
                    </div>
                    <Badge variant="secondary">초급</Badge>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <KoreanBody size="sm" className="font-medium">
                        3일 연속 연습 달성!
                      </KoreanBody>
                      <KoreanBody size="sm" className="text-muted-foreground">
                        1일 전
                      </KoreanBody>
                    </div>
                    <Badge variant="default">성취</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="space-y-4">
            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <KoreanHeading level={4}>선호 설정</KoreanHeading>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <KoreanLabel>클래스 길이</KoreanLabel>
                      <KoreanBody size="sm" className="text-muted-foreground">
                        {currentUser.preferences.classDuration.join(', ')}분
                      </KoreanBody>
                    </div>
                    <Button variant="outline" size="sm">
                      변경
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <KoreanLabel>음악 스타일</KoreanLabel>
                      <KoreanBody size="sm" className="text-muted-foreground">
                        {currentUser.preferences.musicStyle}
                      </KoreanBody>
                    </div>
                    <Button variant="outline" size="sm">
                      변경
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <KoreanLabel>알림 설정</KoreanLabel>
                      <KoreanBody size="sm" className="text-muted-foreground">
                        {currentUser.preferences.notifications ? '켜짐' : '꺼짐'}
                      </KoreanBody>
                    </div>
                    <Button variant="outline" size="sm">
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <KoreanHeading level={4}>계정</KoreanHeading>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-3" />
                  계정 설정
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Music className="w-4 h-4 mr-3" />
                  데이터 내보내기
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  로그아웃
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Achievements Section */}
        {activeSection === 'achievements' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <KoreanHeading level={4}>성취</KoreanHeading>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: '첫 클래스', description: '첫 발레 클래스를 완료했습니다', unlocked: true },
                    { title: '연속 연습', description: '3일 연속으로 연습했습니다', unlocked: true },
                    { title: '10회 클래스', description: '10개의 클래스를 완료했습니다', unlocked: false },
                    { title: '월간 목표', description: '한 달 동안 목표를 달성했습니다', unlocked: false },
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg text-center ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20' 
                          : 'bg-muted/50 border border-border'
                      }`}
                    >
                      <Trophy className={`w-8 h-8 mx-auto mb-2 ${
                        achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <KoreanHeading level={5} className="text-sm">
                        {achievement.title}
                      </KoreanHeading>
                      <KoreanBody size="sm" className="text-muted-foreground">
                        {achievement.description}
                      </KoreanBody>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
        <MobileNavigation />
    </div>
  );
}
