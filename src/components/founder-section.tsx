"use client";

import { Card, CardContent } from "@/components/ui/card";
import { KoreanHeading, KoreanBody, KoreanLabel } from "@/components/korean-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, Award, GraduationCap, Users } from "lucide-react";

export function FounderSection() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <KoreanHeading level={3} className="text-lg mb-4">
            창립자 소개
          </KoreanHeading>
          
          {/* Founder Profile */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/hojin.png" alt="전호진" />
              <AvatarFallback>전호진</AvatarFallback>
            </Avatar>
            
            <div className="space-y-2">
              <KoreanHeading level={4} className="text-xl">
                전호진 (Jeon Hojin)
              </KoreanHeading>
              <div className="flex items-center justify-center space-x-2">
                <Crown className="w-4 h-4 text-primary" />
                <KoreanLabel className="text-primary font-medium">
                  XBallet 창립자 & CEO
                </KoreanLabel>
              </div>
              <KoreanBody size="sm" className="text-muted-foreground">
                국립발레단 솔리스트 출신
              </KoreanBody>
            </div>
          </div>

          {/* Credentials */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Award className="w-6 h-6 text-primary mx-auto mb-2" />
              <KoreanBody size="sm" className="font-medium">
                2016년 핀란드 헬싱키<br />
                국제발레콩쿠르<br />
                <span className="text-primary">파드되 부문 1위</span>
              </KoreanBody>
            </div>
            
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <GraduationCap className="w-6 h-6 text-primary mx-auto mb-2" />
              <KoreanBody size="sm" className="font-medium">
                세종대학교<br />
                무용과 & 융합예술대학원<br />
                <span className="text-primary">졸업</span>
              </KoreanBody>
            </div>
          </div>

          {/* Service Quality Assurance */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
            <KoreanBody size="sm" className="text-center leading-relaxed">
              <strong className="text-primary">10년간의 전문 무용수 경험</strong>과<br />
              <strong className="text-primary">국제 콩쿠르 수상 실력</strong>을 바탕으로<br />
              최고 품질의 AI 발레 교육을 제공합니다
            </KoreanBody>
          </div>

          {/* Additional Awards */}
          <div className="mt-4">
            <KoreanBody size="sm" className="text-muted-foreground text-center">
              다수의 국내 발레콩쿠르 입상 경력 보유
            </KoreanBody>
            <div className="flex flex-wrap justify-center gap-1 mt-2">
              <Badge variant="secondary" className="text-xs">2012 동아무용콩쿠르 금상</Badge>
              <Badge variant="secondary" className="text-xs">2012 대구신인무용콩쿠르 금상</Badge>
              <Badge variant="secondary" className="text-xs">2012 서울발레콩쿨 은상</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}