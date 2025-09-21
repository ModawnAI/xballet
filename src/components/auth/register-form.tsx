"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { KoreanHeading, KoreanBody, KoreanLabel } from '@/components/korean-text';
import { useAuthStore, SkillLevel, UserGoal } from '@/store/auth-store';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSuccess?: () => void;
  className?: string;
}

const skillLevels: { value: SkillLevel; label: string; description: string }[] = [
  { value: '초급', label: '초급', description: '발레를 처음 시작하시는 분' },
  { value: '중급', label: '중급', description: '기본 동작을 알고 있는 분' },
  { value: '고급', label: '고급', description: '고급 기술을 연습하고 싶은 분' },
];

const userGoals: { value: UserGoal; label: string }[] = [
  { value: '체형 관리', label: '체형 관리' },
  { value: '유연성 향상', label: '유연성 향상' },
  { value: '기술 향상', label: '기술 향상' },
  { value: '재활 운동', label: '재활 운동' },
  { value: '재미와 취미', label: '재미와 취미' },
];

export function RegisterForm({ onSwitchToLogin, onSuccess, className }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nameKorean: '',
    skillLevel: '초급' as SkillLevel,
    goals: [] as UserGoal[],
    agreeToTerms: false,
    agreeToPrivacy: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const { register, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    // Validation
    if (!formData.email || !formData.password || !formData.name || !formData.nameKorean) {
      setLocalError('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (!formData.email.includes('@')) {
      setLocalError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.goals.length === 0) {
      setLocalError('최소 하나의 목표를 선택해주세요.');
      return;
    }

    if (!formData.agreeToTerms || !formData.agreeToPrivacy) {
      setLocalError('이용약관 및 개인정보처리방침에 동의해주세요.');
      return;
    }

    const success = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      nameKorean: formData.nameKorean,
      skillLevel: formData.skillLevel,
      goals: formData.goals,
    });

    if (success) {
      onSuccess?.();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (localError || error) {
      setLocalError('');
      clearError();
    }
  };

  const toggleGoal = (goal: UserGoal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="space-y-2">
        <CardTitle className="text-center">
          <KoreanHeading level={2} className="text-2xl">
            회원가입
          </KoreanHeading>
        </CardTitle>
        <CardDescription className="text-center">
          <KoreanBody size="sm" className="text-muted-foreground">
            XBallet과 함께 발레 여정을 시작하세요
          </KoreanBody>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">
              <KoreanLabel>이메일 *</KoreanLabel>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">
              <KoreanLabel>비밀번호 *</KoreanLabel>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요 (최소 6자)"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              <KoreanLabel>비밀번호 확인 *</KoreanLabel>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="pl-10 pr-10"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="name">
                <KoreanLabel>이름 (영문) *</KoreanLabel>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="영문 이름"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nameKorean">
                <KoreanLabel>이름 (한글) *</KoreanLabel>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="nameKorean"
                  type="text"
                  placeholder="한글 이름"
                  value={formData.nameKorean}
                  onChange={(e) => handleInputChange('nameKorean', e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Skill Level Selection */}
          <div className="space-y-3">
            <Label>
              <KoreanLabel>발레 실력 *</KoreanLabel>
            </Label>
            <div className="space-y-2">
              {skillLevels.map((level) => (
                <div
                  key={level.value}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors",
                    formData.skillLevel === level.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => handleInputChange('skillLevel', level.value)}
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                    formData.skillLevel === level.value
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  )}>
                    {formData.skillLevel === level.value && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div>
                    <KoreanBody size="sm" className="font-medium">
                      {level.label}
                    </KoreanBody>
                    <KoreanBody size="sm" className="text-muted-foreground">
                      {level.description}
                    </KoreanBody>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals Selection */}
          <div className="space-y-3">
            <Label>
              <KoreanLabel>목표 (최소 1개 선택) *</KoreanLabel>
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {userGoals.map((goal) => (
                <div
                  key={goal.value}
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors",
                    formData.goals.includes(goal.value)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => toggleGoal(goal.value)}
                >
                  <Checkbox
                    checked={formData.goals.includes(goal.value)}
                    onChange={() => toggleGoal(goal.value)}
                    disabled={isLoading}
                  />
                  <KoreanBody size="sm">
                    {goal.label}
                  </KoreanBody>
                </div>
              ))}
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', String(checked))}
                disabled={isLoading}
              />
              <Label htmlFor="terms" className="text-sm">
                <KoreanBody size="sm">
                  <button type="button" className="text-primary hover:underline">
                    이용약관
                  </button>에 동의합니다 *
                </KoreanBody>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy"
                checked={formData.agreeToPrivacy}
                onCheckedChange={(checked) => handleInputChange('agreeToPrivacy', String(checked))}
                disabled={isLoading}
              />
              <Label htmlFor="privacy" className="text-sm">
                <KoreanBody size="sm">
                  <button type="button" className="text-primary hover:underline">
                    개인정보처리방침
                  </button>에 동의합니다 *
                </KoreanBody>
              </Label>
            </div>
          </div>

          {/* Error Messages */}
          {(localError || error) && (
            <div className="flex items-center space-x-2 text-destructive text-sm">
              <AlertCircle className="h-4 w-4" />
              <KoreanBody size="sm">{localError || error}</KoreanBody>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12"
            disabled={isLoading}
          >
            {isLoading ? (
              <KoreanBody size="sm">회원가입 중...</KoreanBody>
            ) : (
              <KoreanBody size="sm">회원가입</KoreanBody>
            )}
          </Button>
        </form>

        {/* Switch to Login */}
        <div className="text-center">
          <KoreanBody size="sm" className="text-muted-foreground">
            이미 계정이 있으신가요?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary hover:underline font-medium"
              disabled={isLoading}
            >
              로그인
            </button>
          </KoreanBody>
        </div>
      </CardContent>
    </Card>
  );
}
