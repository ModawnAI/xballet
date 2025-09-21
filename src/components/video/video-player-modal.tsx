"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { KoreanHeading, KoreanBody } from "@/components/korean-text";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
  Heart,
  Share2,
  X
} from "lucide-react";
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

interface VideoPlayerModalProps {
  video: VideoMetadata | null;
  isOpen: boolean;
  onClose: () => void;
  onFavorite?: (videoId: string) => void;
  isFavorite?: boolean;
}

export function VideoPlayerModal({ 
  video, 
  isOpen, 
  onClose, 
  onFavorite,
  isFavorite = false 
}: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (video && isOpen) {
      // Reset video state when opening
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [video, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === ' ') {
          e.preventDefault();
          togglePlay();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = parseFloat(e.target.value);
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleFavorite = () => {
    if (video && onFavorite) {
      onFavorite(video.id);
    }
  };

  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-sm w-full max-h-[95vh] p-0 sm:max-w-md"
        showCloseButton={false}
      >
        <DialogHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold truncate pr-2">
              {video.titleKorean}
            </DialogTitle>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                className={`p-2 ${isFavorite ? "text-red-500" : "text-muted-foreground"}`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col">
          {/* Video Player */}
          <div 
            className="relative bg-black flex items-center justify-center px-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* 9:16 Aspect Ratio Container */}
            <div className="relative w-full max-w-xs" style={{ aspectRatio: '9/16' }}>
              {/* Placeholder Video Area */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center rounded-lg overflow-hidden">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    동영상 재생 영역
                  </KoreanBody>
                  <KoreanBody size="sm" className="text-muted-foreground">
                    9:16 비율
                  </KoreanBody>
                </div>
              </div>

              {/* Video Element (Hidden for demo) */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover hidden"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Play Button Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={togglePlay}
                    className="rounded-full w-12 h-12 bg-white/20 hover:bg-white/30"
                  >
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
              )}

              {/* Video Controls Overlay */}
              {showControls && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg">
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => skipTime(-10)}
                        className="text-white hover:bg-white/20 p-1"
                      >
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={togglePlay}
                        className="text-white hover:bg-white/20 p-1"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => skipTime(10)}
                        className="text-white hover:bg-white/20 p-1"
                      >
                        <SkipForward className="w-4 h-4" />
                      </Button>
                      <div className="text-xs">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMute}
                        className="text-white hover:bg-white/20 p-1"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleFullscreen}
                        className="text-white hover:bg-white/20 p-1"
                      >
                        {isFullscreen ? (
                          <Minimize className="w-4 h-4" />
                        ) : (
                          <Maximize className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video Info */}
          <div className="p-4 space-y-3">
            <div className="flex items-center space-x-2 flex-wrap">
              <Badge variant="outline" className="text-xs">{video.difficulty}</Badge>
              <Badge variant="secondary" className="text-xs">{getCategoryKorean(video.category)}</Badge>
              <div className="text-xs text-muted-foreground">
                {video.duration}분
              </div>
            </div>

            <KoreanBody size="sm" className="text-muted-foreground">
              {video.descriptionKorean}
            </KoreanBody>

            {video.relatedMovementsKorean && video.relatedMovementsKorean.length > 0 && (
              <div>
                <KoreanBody size="sm" className="font-medium mb-2">
                  관련 동작들
                </KoreanBody>
                <div className="flex flex-wrap gap-1">
                  {video.relatedMovementsKorean.map((movement, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {movement}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
