"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { KoreanHeading, KoreanBody } from "@/components/korean-text";
import { MobileNavigation, MobileHeader } from "@/components/mobile-navigation";
import { dummyVideos, getVideosByDifficulty, searchVideos } from "@/data/videos";
import { Search, Play, Clock, Star, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<'초급' | '중급' | '고급' | '전체'>('전체');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const difficulties = [
    { id: '전체', label: '전체', color: 'default' },
    { id: '초급', label: '초급', color: 'secondary' },
    { id: '중급', label: '중급', color: 'default' },
    { id: '고급', label: '고급', color: 'destructive' },
  ];

  // Filter videos based on search and difficulty
  const filteredVideos = searchQuery 
    ? searchVideos(searchQuery)
    : selectedDifficulty === '전체'
      ? dummyVideos
      : getVideosByDifficulty(selectedDifficulty);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}분`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader title="발레 클래스" />

      {/* Main Content */}
      <main className="px-4 py-6 pb-24 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <KoreanHeading level={2} className="text-2xl">
            발레 클래스
          </KoreanHeading>
          <KoreanBody size="sm" className="text-muted-foreground">
            당신에게 맞는 클래스를 선택하세요
          </KoreanBody>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="클래스를 검색하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty.id}
                variant={selectedDifficulty === difficulty.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty.id as '초급' | '중급' | '고급' | '전체')}
                className="whitespace-nowrap"
              >
                {difficulty.label}
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <KoreanBody size="sm" className="text-muted-foreground">
              {filteredVideos.length}개 클래스
            </KoreanBody>
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === 'grid' 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === 'list' 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Classes Grid/List */}
        <div className={cn(
          "space-y-4",
          viewMode === 'grid' && "grid gap-4"
        )}>
          {filteredVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {viewMode === 'grid' ? (
                  // Grid View
                  <div className="flex">
                    {/* Video Thumbnail */}
                    <div className="w-24 h-24 bg-muted flex items-center justify-center">
                      <Play className="w-6 h-6 text-muted-foreground" />
                    </div>
                    
                    {/* Video Info */}
                    <div className="flex-1 p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <KoreanHeading level={4} className="text-base leading-tight">
                            {video.titleKorean}
                          </KoreanHeading>
                          <Badge variant="secondary" className="text-xs">
                            {video.difficulty}
                          </Badge>
                        </div>
                        
                        <KoreanBody size="sm" className="text-muted-foreground">
                          {video.descriptionKorean}
                        </KoreanBody>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatDuration(video.duration)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>{video.category}</span>
                          </div>
                          <span>{video.musicStyle}</span>
                        </div>

                        <Button size="sm" className="w-full mt-3">
                          <Play className="w-4 h-4 mr-2" />
                          클래스 시작
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <KoreanHeading level={4} className="text-lg">
                            {video.titleKorean}
                          </KoreanHeading>
                          <Badge variant="secondary" className="text-xs">
                            {video.difficulty}
                          </Badge>
                        </div>
                        
                        <KoreanBody size="sm" className="text-muted-foreground">
                          {video.descriptionKorean}
                        </KoreanBody>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatDuration(video.duration)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{video.category}</span>
                          </div>
                          <span>{video.musicStyle}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {video.focusAreas.map((area, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        시작하기
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <Search className="w-12 h-12 text-muted-foreground mx-auto" />
            <KoreanHeading level={3} className="text-lg text-muted-foreground">
              검색 결과가 없습니다
            </KoreanHeading>
            <KoreanBody size="sm" className="text-muted-foreground">
              다른 검색어나 필터를 시도해보세요
            </KoreanBody>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('전체');
              }}
            >
              모든 클래스 보기
            </Button>
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}