"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KoreanHeading, KoreanBody, KoreanLabel } from "@/components/korean-text";
import { 
  Clock, 
  Star, 
  Users, 
  Target, 
  Music, 
  BookOpen, 
  AlertTriangle,
  CheckCircle,
  Heart,
  Share2,
  Download,
  Play
} from "lucide-react";
import { VideoMetadata } from "@/store/video-database-store";

interface VideoMetadataPanelProps {
  video: VideoMetadata;
  onClose?: () => void;
  onPlay?: (video: VideoMetadata) => void;
  onFavorite?: (videoId: string) => void;
  isFavorite?: boolean;
}

export function VideoMetadataPanel({ 
  video, 
  onClose, 
  onPlay, 
  onFavorite,
  isFavorite = false 
}: VideoMetadataPanelProps) {
  const handlePlay = () => {
    onPlay?.(video);
  };

  const handleFavorite = () => {
    onFavorite?.(video.id);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share video:', video.id);
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Download video:', video.id);
  };

  return (
    <div className="space-y-4">
      {/* Video Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <KoreanHeading level={2} className="text-xl">
                {video.title}
              </KoreanHeading>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-sm">
                  {video.difficulty}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {video.category}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{video.duration}분</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                className={isFavorite ? "text-red-500" : "text-muted-foreground"}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <KoreanBody size="lg" className="text-muted-foreground leading-relaxed">
            {video.description}
          </KoreanBody>
        </CardContent>
      </Card>

      {/* Video Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-primary" />
              <div>
                <KoreanLabel className="text-sm">난이도</KoreanLabel>
                <KoreanBody size="sm" className="font-medium">
                  {video.difficulty}/10
                </KoreanBody>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <KoreanLabel className="text-sm">대상</KoreanLabel>
                <KoreanBody size="sm" className="font-medium">
                  {video.difficulty}
                </KoreanBody>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technique Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <KoreanHeading level={3}>기술 정보</KoreanHeading>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <KoreanLabel className="text-sm font-medium">기술 노트</KoreanLabel>
            <KoreanBody size="sm" className="text-muted-foreground mt-1">
              {video.techniqueNotes}
            </KoreanBody>
          </div>
          
          <div>
            <KoreanLabel className="text-sm font-medium">관련 동작</KoreanLabel>
            <div className="flex flex-wrap gap-2 mt-2">
              {video.relatedMovementsKorean?.map((movement, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {movement}
                </Badge>
              )) || (
                <KoreanBody size="sm" className="text-muted-foreground">
                  관련 동작 정보 없음
                </KoreanBody>
              )}
            </div>
          </div>

          <div>
            <KoreanLabel className="text-sm font-medium">카테고리</KoreanLabel>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {video.category}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prerequisites and Common Mistakes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <KoreanHeading level={4}>사전 요구사항</KoreanHeading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {video.prerequisites?.map((prereq, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <KoreanBody size="sm" className="text-muted-foreground">
                    {prereq}
                  </KoreanBody>
                </div>
              )) || (
                <KoreanBody size="sm" className="text-muted-foreground">
                  사전 요구사항 정보 없음
                </KoreanBody>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <KoreanHeading level={4}>주의사항</KoreanHeading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {video.commonMistakes?.map((mistake, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <KoreanBody size="sm" className="text-muted-foreground">
                    {mistake}
                  </KoreanBody>
                </div>
              )) || (
                <KoreanBody size="sm" className="text-muted-foreground">
                  주의사항 정보 없음
                </KoreanBody>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button 
          onClick={handlePlay}
          className="flex-1 h-12 text-base font-medium"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          재생하기
        </Button>
        {onClose && (
          <Button 
            variant="outline"
            onClick={onClose}
            className="h-12 px-6"
          >
            닫기
          </Button>
        )}
      </div>
    </div>
  );
}
