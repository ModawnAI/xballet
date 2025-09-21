"use client";

import { MobileHeader, MobileNavigation } from "@/components/mobile-navigation";
import { VideoGallery } from "@/components/video/video-gallery";
import { VideoGrid } from "@/components/video/video-grid";
import { KoreanHeading, KoreanBody } from "@/components/korean-text";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVideoDatabaseStore } from "@/store/video-database-store";
import { BookOpen, Search, Filter, Star, Clock, Users } from "lucide-react";
import { useState, useEffect } from "react";

export default function VideosPage() {
  const { videos, loadVideos } = useVideoDatabaseStore();

  // Load videos on component mount
  useEffect(() => {
    if (videos.length === 0) {
      loadVideos();
    }
  }, [videos.length, loadVideos]);

  // Derive categories and difficulties from videos
  const categories = [...new Set(videos.map(video => video.category))];
  const difficulties = [...new Set(videos.map(video => video.difficulty))];

  // Get some stats for the dashboard
  const totalVideos = videos.length;
  const totalCategories = categories.length;
  const totalDifficulties = difficulties.length;
  const averageDuration = totalVideos > 0 
    ? Math.round(videos.reduce((sum, video) => sum + video.duration, 0) / totalVideos)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="동작 데이터베이스" />
      
      <main className="px-4 py-6 pb-24 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <KoreanHeading level={2} className="text-2xl">
            발레 동작 데이터베이스
          </KoreanHeading>
          <KoreanBody size="sm" className="text-muted-foreground">
            AI가 생성하는 개인 맞춤형 클래스의 기반이 되는 발레 동작 영상들
          </KoreanBody>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <KoreanHeading level={3} className="text-lg">
                  {totalVideos}
                </KoreanHeading>
              </div>
              <KoreanBody size="sm" className="text-muted-foreground">
                총 동작 수
              </KoreanBody>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Filter className="w-5 h-5 text-primary" />
                <KoreanHeading level={3} className="text-lg">
                  {totalCategories}
                </KoreanHeading>
              </div>
              <KoreanBody size="sm" className="text-muted-foreground">
                카테고리
              </KoreanBody>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-primary" />
                <KoreanHeading level={3} className="text-lg">
                  {totalDifficulties}
                </KoreanHeading>
              </div>
              <KoreanBody size="sm" className="text-muted-foreground">
                난이도 레벨
              </KoreanBody>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <KoreanHeading level={3} className="text-lg">
                  {averageDuration}분
                </KoreanHeading>
              </div>
              <KoreanBody size="sm" className="text-muted-foreground">
                평균 길이
              </KoreanBody>
            </CardContent>
          </Card>
        </div>

        {/* Category Overview */}
        <Card>
          <CardContent className="p-4">
            <KoreanHeading level={3} className="text-lg mb-4">
              카테고리별 동작 분포
            </KoreanHeading>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const categoryCount = videos.filter(v => v.category === category).length;
                return (
                  <Badge key={category} variant="outline" className="text-sm">
                    {category} ({categoryCount})
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Video Grid with 9:16 Aspect Ratio */}
        <VideoGrid 
          videos={videos}
          onVideoSelect={(video) => console.log('Selected video:', video)}
          onFavorite={(videoId) => console.log('Favorited video:', videoId)}
          favorites={[]}
          title="모든 동작 영상"
          columns={2}
          maxVideos={12}
        />
      </main>

      <MobileNavigation />
    </div>
  );
}
