"use client";

import { KoreanHeading, KoreanBody } from "@/components/korean-text";
import { MobileNavigation, MobileHeader } from "@/components/mobile-navigation";
import { SubscriptionManager } from "@/components/subscription/subscription-manager";
import { Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader title="샵" />

      {/* Main Content */}
      <main className="px-4 py-6 pb-24 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <KoreanHeading level={2} className="text-2xl">
            XBallet 스토어
          </KoreanHeading>
          <KoreanBody size="sm" className="text-muted-foreground">
            발레 여정을 더욱 풍성하게 만들어줄 상품들
          </KoreanBody>
        </div>

        {/* Featured Banner */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-6 text-center space-y-3">
            <Gift className="w-8 h-8 text-primary mx-auto" />
            <KoreanHeading level={3} className="text-lg">
              신규 가입자 특별 혜택
            </KoreanHeading>
            <KoreanBody size="sm" className="text-muted-foreground">
              첫 달 50% 할인 + 무료 체험 7일
            </KoreanBody>
            <Button size="sm" className="mt-2">
              지금 시작하기
            </Button>
          </CardContent>
        </Card>

        {/* Subscription Management */}
        <SubscriptionManager />
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}