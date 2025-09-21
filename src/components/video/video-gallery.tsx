"use client";

import { useState } from "react";
import { KoreanHeading, KoreanBody } from "@/components/korean-text";
import { VideoCard } from "./video-card";
import { VideoMetadataPanel } from "./video-metadata-panel";
import { VideoSearchFilter } from "./video-search-filter";
import { useVideoDatabaseStore, VideoMetadata, VideoSearchFilters, VideoCategory, DifficultyLevel } from "@/store/video-database-store";
import { Button } from "@/components/ui/button";
import { Grid, List, Filter } from "lucide-react";

interface VideoGalleryProps {
  onVideoSelect?: (video: VideoMetadata) => void;
  showFilters?: boolean;
  variant?: 'grid' | 'list';
  maxVideos?: number;
}

export function VideoGallery({ 
  onVideoSelect, 
  showFilters = true,
  variant = 'grid',
  maxVideos 
}: VideoGalleryProps) {
  const { videos, filteredVideos, searchVideos } = useVideoDatabaseStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<VideoMetadata | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(variant);
  const [filters, setFilters] = useState<VideoSearchFilters>({
    category: [],
    difficulty: [],
    duration: undefined,
    instructor: [],
    tags: [],
    isPremium: undefined,
    isFeatured: undefined,
    searchTerm: ""
  });

  // Use filteredVideos from store, fallback to all videos if not filtered
  const videosToDisplay = filteredVideos.length > 0 ? filteredVideos : videos;
  const displayVideos = maxVideos ? videosToDisplay.slice(0, maxVideos) : videosToDisplay;

  const handleVideoPlay = (video: VideoMetadata) => {
    setSelectedVideo(video);
    onVideoSelect?.(video);
  };

  const handleVideoFavorite = (videoId: string) => {
    setFavorites(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleVideoViewDetails = (video: VideoMetadata) => {
    setSelectedVideo(video);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Update store search filters
    const searchFilters: VideoSearchFilters = {
      ...filters,
      searchTerm: query
    };
    searchVideos(searchFilters);
  };

  const handleFilterChange = (newFilters: VideoSearchFilters) => {
    setFilters(newFilters);
    // Update store search filters
    const searchFilters: VideoSearchFilters = {
      ...newFilters,
      searchTerm: searchQuery
    };
    searchVideos(searchFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: VideoSearchFilters = {
      category: [],
      difficulty: [],
      duration: undefined,
      instructor: [],
      tags: [],
      isPremium: undefined,
      isFeatured: undefined,
      searchTerm: ""
    };
    setFilters(clearedFilters);
    setSearchQuery("");
    // Clear store filters
    searchVideos(clearedFilters);
  };

  const handleCloseDetails = () => {
    setSelectedVideo(null);
  };

  if (selectedVideo) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <KoreanHeading level={2} className="text-xl">
            동작 상세 정보
          </KoreanHeading>
          <Button variant="outline" onClick={handleCloseDetails}>
            목록으로
          </Button>
        </div>
        <VideoMetadataPanel
          video={selectedVideo}
          onClose={handleCloseDetails}
          onPlay={handleVideoPlay}
          onFavorite={handleVideoFavorite}
          isFavorite={favorites.includes(selectedVideo.id)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <KoreanHeading level={2} className="text-xl">
            발레 동작 갤러리
          </KoreanHeading>
          <KoreanBody size="sm" className="text-muted-foreground">
            {videosToDisplay.length}개의 동작을 찾았습니다
          </KoreanBody>
        </div>
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
      </div>

      {/* Search and Filters */}
      {showFilters && (
        <VideoSearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      )}

      {/* Video Grid/List */}
      {displayVideos.length === 0 ? (
        <div className="text-center py-12">
          <KoreanBody size="lg" className="text-muted-foreground">
            검색 결과가 없습니다
          </KoreanBody>
          <KoreanBody size="sm" className="text-muted-foreground mt-2">
            다른 검색어나 필터를 시도해보세요
          </KoreanBody>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-3"
        }>
          {displayVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              variant={viewMode === 'list' ? 'compact' : 'default'}
              onPlay={handleVideoPlay}
              onFavorite={handleVideoFavorite}
              onViewDetails={handleVideoViewDetails}
              isFavorite={favorites.includes(video.id)}
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {maxVideos && videosToDisplay.length > maxVideos && (
        <div className="text-center">
          <Button variant="outline">
            더 보기 ({videosToDisplay.length - maxVideos}개 더)
          </Button>
        </div>
      )}
    </div>
  );
}
