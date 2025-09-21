"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KoreanHeading, KoreanBody } from "@/components/korean-text";
import { Play, Clock, Star, Heart, MoreVertical } from "lucide-react";
import { VideoMetadata } from "@/store/video-database-store";

// Helper function to convert category to Korean
const getCategoryKorean = (category: string) => {
  const categoryMap: Record<string, string> = {
    'barre-work': '바워크',
    'center-work': '센터워크', 
    'jumps': '점프',
    'turns': '턴',
    'pointe': '포인트',
    'stretching': '스트레칭',
    'warmup': '워밍업',
    'cool-down': '쿨다운'
  };
  return categoryMap[category] || category;
};

interface VideoThumbnailProps {
  video: VideoMetadata;
  onPlay?: (video: VideoMetadata) => void;
  onFavorite?: (videoId: string) => void;
  onMore?: (video: VideoMetadata) => void;
  isFavorite?: boolean;
  variant?: 'default' | 'compact' | 'large';
  showOverlay?: boolean;
}

export function VideoThumbnail({ 
  video, 
  onPlay, 
  onFavorite, 
  onMore,
  isFavorite = false,
  variant = 'default',
  showOverlay = true
}: VideoThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    onPlay?.(video);
  };

  const handleFavorite = () => {
    onFavorite?.(video.id);
  };

  const handleMore = () => {
    onMore?.(video);
  };

  const getThumbnailSize = () => {
    switch (variant) {
      case 'compact':
        return 'w-full h-32'; // Horizontal compact layout
      case 'large':
        return 'w-full'; // Full width for large
      default:
        return 'w-full'; // Full width for default
    }
  };

  const getContentPadding = () => {
    switch (variant) {
      case 'compact':
        return 'p-2';
      case 'large':
        return 'p-4';
      default:
        return 'p-3';
    }
  };

  return (
    <Card 
      className={`overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer ${getThumbnailSize()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlay}
    >
      <CardContent className={`p-0 h-full flex flex-col ${getContentPadding()}`}>
        {/* Thumbnail Image Area - Responsive Aspect Ratio */}
        <div className={`relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden ${
          variant === 'compact' ? 'h-24' : 'aspect-[9/16]'
        }`}>
          {/* Placeholder Video Thumbnail */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 bg-primary/30 rounded-full flex items-center justify-center mx-auto">
                <Play className="w-4 h-4 text-primary" />
              </div>
              {variant !== 'compact' && (
                <KoreanBody size="sm" className="text-muted-foreground">
                  {video.difficulty}
                </KoreanBody>
              )}
            </div>
          </div>

          {/* Overlay Controls */}
          {showOverlay && (
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <Button
                size="sm"
                onClick={handlePlay}
                className="rounded-full w-10 h-10"
              >
                <Play className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Top Right Badges */}
          <div className="absolute top-2 right-2 flex flex-col space-y-1">
            <Badge variant="secondary" className="text-xs">
              {video.difficulty}
            </Badge>
            {video.isPremium && (
              <Badge variant="default" className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500">
                프리미엄
              </Badge>
            )}
          </div>

          {/* Bottom Right Duration */}
          <div className="absolute bottom-2 right-2">
            <div className="flex items-center space-x-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
              <Clock className="w-3 h-3" />
              <span>{video.duration}분</span>
            </div>
          </div>

          {/* Favorite Button */}
          <div className="absolute top-2 left-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite();
              }}
              className={`w-8 h-8 p-0 ${isFavorite ? "text-red-500" : "text-white/70 hover:text-white"}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* More Options Button */}
          {onMore && (
            <div className="absolute top-2 left-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMore();
                }}
                className="w-8 h-8 p-0 text-white/70 hover:text-white"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Video Info */}
        {variant !== 'compact' && (
          <div className="mt-3 space-y-2">
            <KoreanHeading level={5} className="text-sm font-medium line-clamp-2 leading-tight">
              {video.titleKorean}
            </KoreanHeading>
            <KoreanBody size="sm" className="text-muted-foreground line-clamp-2 leading-relaxed">
              {video.descriptionKorean}
            </KoreanBody>
            
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500" />
                 <span className="text-xs text-muted-foreground">
                   {video.difficulty}/10
                </span>
              </div>
              <Badge variant="outline" className="text-xs">
                {getCategoryKorean(video.category)}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
