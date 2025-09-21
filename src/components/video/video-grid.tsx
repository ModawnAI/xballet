"use client";

import { useState } from "react";
import { KoreanHeading, KoreanBody } from "@/components/korean-text";
import { VideoThumbnail } from "./video-thumbnail";
import { VideoPlayerModal } from "./video-player-modal";
import { VideoMetadata } from "@/store/video-database-store";
import { Button } from "@/components/ui/button";
import { Grid, List, Filter } from "lucide-react";

interface VideoGridProps {
  videos: VideoMetadata[];
  onVideoSelect?: (video: VideoMetadata) => void;
  onFavorite?: (videoId: string) => void;
  favorites?: string[];
  title?: string;
  showViewToggle?: boolean;
  maxVideos?: number;
  columns?: 2 | 3 | 4;
}

export function VideoGrid({ 
  videos, 
  onVideoSelect, 
  onFavorite,
  favorites = [],
  title,
  showViewToggle = true,
  maxVideos,
  columns = 3
}: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoMetadata | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const displayVideos = maxVideos ? videos.slice(0, maxVideos) : videos;

  const handleVideoPlay = (video: VideoMetadata) => {
    setSelectedVideo(video);
    onVideoSelect?.(video);
  };

  const handleVideoFavorite = (videoId: string) => {
    onFavorite?.(videoId);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const getGridCols = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-4';
      default:
        return 'grid-cols-2';
    }
  };

  const getThumbnailVariant = () => {
    switch (columns) {
      case 2:
        return 'large' as const;
      case 3:
        return 'default' as const;
      case 4:
        return 'compact' as const;
      default:
        return 'large' as const;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-2">
        {(title || showViewToggle) && (
          <div className="flex items-center justify-between">
            {title && (
              <KoreanHeading level={3} className="text-lg font-semibold">
                {title}
              </KoreanHeading>
            )}
            
            {showViewToggle && (
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Video Count */}
        <KoreanBody size="sm" className="text-muted-foreground">
          {displayVideos.length}개의 동작 영상
        </KoreanBody>
      </div>

      {/* Video Grid/List */}
      {displayVideos.length === 0 ? (
        <div className="text-center py-12">
          <KoreanBody size="lg" className="text-muted-foreground">
            영상이 없습니다
          </KoreanBody>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? `grid ${getGridCols()} gap-3`
            : 'space-y-3'
        }>
          {displayVideos.map((video) => (
            <VideoThumbnail
              key={video.id}
              video={video}
              variant={viewMode === 'list' ? 'compact' : getThumbnailVariant()}
              onPlay={handleVideoPlay}
              onFavorite={handleVideoFavorite}
              isFavorite={favorites.includes(video.id)}
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {maxVideos && videos.length > maxVideos && (
        <div className="text-center pt-4">
          <Button variant="outline">
            더 보기 ({videos.length - maxVideos}개 더)
          </Button>
        </div>
      )}

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={handleCloseModal}
        onFavorite={handleVideoFavorite}
        isFavorite={selectedVideo ? favorites.includes(selectedVideo.id) : false}
      />
    </div>
  );
}
