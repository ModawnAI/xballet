"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KoreanHeading, KoreanBody, KoreanLabel } from '@/components/korean-text';
import { useSubscriptionStore, SubscriptionPlan, PaymentMethod } from '@/store/subscription-store';
import { 
  Crown, 
  CreditCard, 
  Users, 
  Calendar, 
  Check, 
  X, 
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubscriptionManagerProps {
  className?: string;
}

export function SubscriptionManager({ className }: SubscriptionManagerProps) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card' as PaymentMethod,
    cardNumber: '',
    cardExpiry: '',
    cardHolder: '',
    cvv: '',
  });
  const [familyMemberEmail, setFamilyMemberEmail] = useState('');

  const {
    currentSubscription,
    availablePlans,
    isLoading,
    error,
    loadPlans,
    subscribe,
    cancelSubscription,
    addFamilyMember,
    removeFamilyMember,
    clearError,
  } = useSubscriptionStore();

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const handleSubscribe = async () => {
    if (!selectedPlan) return;

    const success = await subscribe(selectedPlan, paymentInfo);
    if (success) {
      setShowPaymentForm(false);
      setSelectedPlan(null);
    }
  };

  const handleCancelSubscription = async () => {
    if (confirm('정말로 구독을 취소하시겠습니까?')) {
      await cancelSubscription();
    }
  };

  const handleAddFamilyMember = async () => {
    if (!familyMemberEmail) return;

    const success = await addFamilyMember(familyMemberEmail);
    if (success) {
      setFamilyMemberEmail('');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const getPlanStatus = () => {
    if (!currentSubscription) return 'free';
    return currentSubscription.status;
  };

  const getCurrentPlan = () => {
    if (!currentSubscription) return availablePlans.find(p => p.id === 'free');
    return availablePlans.find(p => p.id === currentSubscription.planId);
  };

  const currentPlan = getCurrentPlan();
  const planStatus = getPlanStatus();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Current Subscription Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="w-5 h-5" />
            <KoreanHeading level={4}>현재 구독</KoreanHeading>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentPlan ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <KoreanHeading level={5} className="text-lg">
                    {currentPlan.nameKorean}
                  </KoreanHeading>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    {currentPlan.descriptionKorean}
                  </KoreanBody>
                </div>
                <div className="text-right">
                  <KoreanHeading level={5} className="text-lg">
                    ₩{formatPrice(currentPlan.price)}
                  </KoreanHeading>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    {currentPlan.billingPeriod === 'year' ? '연간' : '월간'}
                  </KoreanBody>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge 
                  variant={planStatus === 'active' ? 'default' : 'secondary'}
                  className="flex items-center space-x-1"
                >
                  {planStatus === 'active' ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <X className="w-3 h-3" />
                  )}
                  <span>
                    {planStatus === 'active' ? '활성' : 
                     planStatus === 'cancelled' ? '취소됨' : 
                     planStatus === 'trial' ? '체험 중' : '만료됨'}
                  </span>
                </Badge>
                
                {currentSubscription?.autoRenew && (
                  <Badge variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    자동 갱신
                  </Badge>
                )}
              </div>

              {currentSubscription && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <KoreanLabel>시작일</KoreanLabel>
                    <KoreanBody size="sm" className="text-muted-foreground">
                      {new Date(currentSubscription.startDate).toLocaleDateString('ko-KR')}
                    </KoreanBody>
                  </div>
                  <div>
                    <KoreanLabel>만료일</KoreanLabel>
                    <KoreanBody size="sm" className="text-muted-foreground">
                      {new Date(currentSubscription.endDate).toLocaleDateString('ko-KR')}
                    </KoreanBody>
                  </div>
                </div>
              )}

              {/* Family Members Section */}
              {currentPlan.id === 'family' && currentSubscription?.familyMembers && (
                <div className="space-y-3">
                  <KoreanLabel>가족 구성원 ({currentSubscription.familyMembers.length}/{currentPlan.maxUsers})</KoreanLabel>
                  <div className="space-y-2">
                    {currentSubscription.familyMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <KoreanBody size="sm">{member}</KoreanBody>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFamilyMember(member)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {currentSubscription.familyMembers.length < (currentPlan.maxUsers || 4) && (
                      <div className="flex space-x-2">
                        <Input
                          placeholder="이메일 주소"
                          value={familyMemberEmail}
                          onChange={(e) => setFamilyMemberEmail(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          onClick={handleAddFamilyMember}
                          disabled={!familyMemberEmail}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                {planStatus === 'active' && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleCancelSubscription}
                    disabled={isLoading}
                  >
                    {isLoading ? '처리 중...' : '구독 취소'}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                >
                  결제 방법 변경
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <KoreanBody size="sm" className="text-muted-foreground">
                현재 구독 정보를 불러올 수 없습니다.
              </KoreanBody>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>
            <KoreanHeading level={4}>구독 플랜</KoreanHeading>
          </CardTitle>
          <CardDescription>
            <KoreanBody size="sm" className="text-muted-foreground">
              더 많은 기능을 원한다면 프리미엄 플랜을 선택하세요
            </KoreanBody>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {availablePlans.filter(plan => plan.id !== 'free').map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "p-4 rounded-lg border transition-all cursor-pointer",
                  selectedPlan === plan.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50",
                  plan.isPopular && "ring-2 ring-primary/20"
                )}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <KoreanHeading level={5} className="text-lg">
                        {plan.nameKorean}
                      </KoreanHeading>
                      {plan.isPopular && (
                        <Badge variant="default" className="text-xs">
                          인기
                        </Badge>
                      )}
                      {plan.discount && (
                        <Badge variant="destructive" className="text-xs">
                          {plan.discount}% 할인
                        </Badge>
                      )}
                    </div>
                    <KoreanBody size="sm" className="text-muted-foreground">
                      {plan.descriptionKorean}
                    </KoreanBody>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {plan.originalPrice && (
                        <KoreanBody size="sm" className="text-muted-foreground line-through">
                          ₩{formatPrice(plan.originalPrice)}
                        </KoreanBody>
                      )}
                      <KoreanHeading level={5} className="text-lg">
                        ₩{formatPrice(plan.price)}
                      </KoreanHeading>
                    </div>
                    <KoreanBody size="sm" className="text-muted-foreground">
                      {plan.billingPeriod === 'year' ? '연간' : '월간'}
                    </KoreanBody>
                  </div>
                </div>

                <div className="space-y-2">
                  {plan.featuresKorean.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-primary" />
                      <KoreanBody size="sm">{feature}</KoreanBody>
                    </div>
                  ))}
                </div>

                {plan.maxUsers && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <KoreanBody size="sm" className="text-muted-foreground">
                        최대 {plan.maxUsers}명
                      </KoreanBody>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedPlan && (
            <div className="mt-6 pt-6 border-t">
              <Button
                className="w-full"
                onClick={() => setShowPaymentForm(true)}
                disabled={isLoading}
              >
                {isLoading ? '처리 중...' : '구독하기'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                <KoreanHeading level={4}>결제 정보</KoreanHeading>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label>
                    <KoreanLabel>카드 번호</KoreanLabel>
                  </Label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>
                      <KoreanLabel>만료일</KoreanLabel>
                    </Label>
                    <Input
                      placeholder="MM/YY"
                      value={paymentInfo.cardExpiry}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardExpiry: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>
                      <KoreanLabel>CVV</KoreanLabel>
                    </Label>
                    <Input
                      placeholder="123"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>
                    <KoreanLabel>카드 소유자</KoreanLabel>
                  </Label>
                  <Input
                    placeholder="홍길동"
                    value={paymentInfo.cardHolder}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardHolder: e.target.value }))}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <KoreanBody size="sm">{error}</KoreanBody>
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowPaymentForm(false)}
                  disabled={isLoading}
                >
                  취소
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubscribe}
                  disabled={isLoading}
                >
                  {isLoading ? '처리 중...' : '결제하기'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
