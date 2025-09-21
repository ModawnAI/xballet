"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KoreanHeading, KoreanBody, KoreanLabel } from '@/components/korean-text';
import { useAuthStore } from '@/store/auth-store';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSuccess?: () => void;
  className?: string;
}

export function LoginForm({ onSwitchToRegister, onSuccess, className }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const { login, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    // Basic validation
    if (!formData.email || !formData.password) {
      setLocalError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (!formData.email.includes('@')) {
      setLocalError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    const success = await login(formData.email, formData.password);
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

  const demoCredentials = () => {
    setFormData({
      email: 'demo@xballet.com',
      password: 'demo123',
    });
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="space-y-2">
        <CardTitle className="text-center">
          <KoreanHeading level={2} className="text-2xl">
            로그인
          </KoreanHeading>
        </CardTitle>
        <CardDescription className="text-center">
          <KoreanBody size="sm" className="text-muted-foreground">
            XBallet에 오신 것을 환영합니다
          </KoreanBody>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">
              <KoreanLabel>이메일</KoreanLabel>
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
              <KoreanLabel>비밀번호</KoreanLabel>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10"
                disabled={isLoading}
                autoComplete="current-password"
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

          {/* Error Messages */}
          {(localError || error) && (
            <div className="flex items-center space-x-2 text-destructive text-sm">
              <AlertCircle className="h-4 w-4" />
              <KoreanBody size="sm">{localError || error}</KoreanBody>
            </div>
          )}

          {/* Demo Credentials Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={demoCredentials}
            disabled={isLoading}
            className="w-full"
          >
            <KoreanBody size="sm">데모 계정으로 로그인</KoreanBody>
          </Button>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12"
            disabled={isLoading}
          >
            {isLoading ? (
              <KoreanBody size="sm">로그인 중...</KoreanBody>
            ) : (
              <KoreanBody size="sm">로그인</KoreanBody>
            )}
          </Button>
        </form>

        {/* Switch to Register */}
        <div className="text-center">
          <KoreanBody size="sm" className="text-muted-foreground">
            아직 계정이 없으신가요?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary hover:underline font-medium"
              disabled={isLoading}
            >
              회원가입
            </button>
          </KoreanBody>
        </div>

        {/* Demo Info */}
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <KoreanBody size="sm" className="text-muted-foreground text-center">
            데모 계정 정보:
          </KoreanBody>
          <KoreanBody size="sm" className="text-center font-mono text-xs">
            이메일: demo@xballet.com<br />
            비밀번호: demo123
          </KoreanBody>
        </div>
      </CardContent>
    </Card>
  );
}
