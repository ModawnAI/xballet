"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KoreanHeading, KoreanBody, KoreanLabel } from "@/components/korean-text";
import { Play, Clock, Star, Users, BookOpen, Heart } from "lucide-react";
import { VideoMetadata } from "@/store/video-database-store";

interface VideoCardProps {
  video: VideoMetadata;
  onPlay?: (video: VideoMetadata) => void;
  onFavorite?: (videoId: string) => void;
  onViewDetails?: (video: VideoMetadata) => void;
  isFavorite?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export function VideoCard({ 
  video, 
  onPlay, 
  onFavorite, 
  onViewDetails,
  isFavorite = false,
  variant = 'default'
}: VideoCardProps) {
  const handlePlay = () => {
    onPlay?.(video);
  };

  const handleFavorite = () => {
    onFavorite?.(video.id);
  };

  const handleViewDetails = () => {
    onViewDetails?.(video);
  };

  if (variant === 'compact') {
    return (
      <Card className="w-full hover:shadow-md transition-shadow">
        <CardContent className="p-3">
          <div className="flex items-center space-x-3">
            <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <KoreanHeading level={4} className="text-sm font-medium truncate">
                {video.title}
              </KoreanHeading>
              <KoreanBody size="sm" className="text-muted-foreground">
                {video.difficulty} • {video.duration}분
              </KoreanBody>
              <div className="flex items-center space-x-1 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {video.category}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlay}
              className="flex-shrink-0"
            >
              <Play className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className="w-full hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <KoreanHeading level={3} className="text-lg">
                {video.title}
              </KoreanHeading>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{video.difficulty}</Badge>
                <Badge variant="secondary">{video.category}</Badge>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}분</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavorite}
              className={isFavorite ? "text-red-500" : "text-muted-foreground"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Play className="w-12 h-12 text-primary" />
            </div>
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button
                size="lg"
                onClick={handlePlay}
                className="rounded-full w-16 h-16"
              >
                <Play className="w-6 h-6" />
              </Button>
            </div>
          </div>
          
          <KoreanBody size="sm" className="text-muted-foreground">
            {video.description}
          </KoreanBody>

          <div className="space-y-2">
            <KoreanLabel className="text-sm font-medium">기술 노트</KoreanLabel>
            <KoreanBody size="sm" className="text-muted-foreground">
              {video.techniqueNotes}
            </KoreanBody>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>{video.difficulty}/10</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{video.difficulty}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewDetails}
            >
              <BookOpen className="w-3 h-3 mr-1" />
              자세히
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="relative w-full h-32 bg-muted rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Play className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button
                size="sm"
                onClick={handlePlay}
                className="rounded-full w-12 h-12"
              >
                <Play className="w-4 h-4" />
              </Button>
            </div>
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                className={`w-8 h-8 p-0 ${isFavorite ? "text-red-500" : "text-white"}`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <KoreanHeading level={4} className="text-base">
              {video.title}
            </KoreanHeading>
            <KoreanBody size="sm" className="text-muted-foreground line-clamp-2">
              {video.description}
            </KoreanBody>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {video.difficulty}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {video.category}
                </Badge>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{video.duration}분</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
