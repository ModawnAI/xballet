"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { KoreanHeading, KoreanBody } from "@/components/korean-text";
import { MobileNavigation, MobileHeader } from "@/components/mobile-navigation";
import { Search, BookOpen, Play, Clock, Star } from "lucide-react";
import { dummyVideos, getVideosByCategory } from "@/data/videos";

export default function TechniquePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "전체", icon: BookOpen },
    { id: "바워크", label: "바워크", icon: BookOpen },
    { id: "센터워크", label: "센터워크", icon: BookOpen },
    { id: "점프", label: "점프", icon: BookOpen },
    { id: "턴", label: "턴", icon: BookOpen },
    { id: "포인트", label: "포인트", icon: BookOpen },
  ];

  const filteredVideos = selectedCategory === "all" 
    ? dummyVideos 
    : getVideosByCategory(selectedCategory as '바워크' | '센터워크' | '점프' | '턴' | '포인트' | '워밍업' | '쿨다운');

  const searchResults = searchQuery 
    ? filteredVideos.filter(video => 
        video.titleKorean.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.descriptionKorean.includes(searchQuery)
      )
    : filteredVideos;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader title="테크닉 클래스" />

      {/* Main Content */}
      <main className="px-4 py-6 pb-24 space-y-6">
        {/* Search Section */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="발레 동작을 검색하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <KoreanHeading level={3} className="text-lg">
            발레 동작 가이드
          </KoreanHeading>
          <KoreanBody size="sm" className="text-muted-foreground">
            {searchResults.length}개 동작
          </KoreanBody>
        </div>

        {/* Video Grid */}
        <div className="grid gap-4">
          {searchResults.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Video Thumbnail */}
                  <div className="w-24 h-24 bg-muted flex items-center justify-center">
                    <Play className="w-6 h-6 text-muted-foreground" />
                  </div>
                  
                  {/* Video Info */}
                  <div className="flex-1 p-4">
                    <div className="space-y-2">
                      <KoreanHeading level={4} className="text-base leading-tight">
                        {video.titleKorean}
                      </KoreanHeading>
                      
                      <KoreanBody size="sm" className="text-muted-foreground">
                        {video.descriptionKorean}
                      </KoreanBody>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{Math.floor(video.duration / 60)}분</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{video.difficulty}</span>
                        </div>
                        <span>{video.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {searchResults.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto" />
            <KoreanHeading level={3} className="text-lg text-muted-foreground">
              검색 결과가 없습니다
            </KoreanHeading>
            <KoreanBody size="sm" className="text-muted-foreground">
              다른 검색어로 시도해보세요
            </KoreanBody>
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}
