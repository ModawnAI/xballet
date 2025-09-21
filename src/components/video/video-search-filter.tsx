"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KoreanHeading, KoreanBody, KoreanLabel } from "@/components/korean-text";
import { 
  Search, 
  Filter, 
  X, 
  Clock, 
  Star, 
  Users,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useVideoDatabaseStore, VideoSearchFilters } from "@/store/video-database-store";

interface VideoSearchFilterProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: VideoSearchFilters) => void;
  onClearFilters?: () => void;
}

export function VideoSearchFilter({ 
  onSearch, 
  onFilterChange, 
  onClearFilters 
}: VideoSearchFilterProps) {
  const { videos } = useVideoDatabaseStore();
  
  // Derive categories and difficulties from videos
  const categories = [...new Set(videos.map(video => video.category))];
  const difficulties = [...new Set(videos.map(video => video.difficulty))];
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
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

  const durationOptions = [
    { value: "5", label: "5분 이하" },
    { value: "10", label: "10분 이하" },
    { value: "15", label: "15분 이하" },
    { value: "30", label: "30분 이하" },
    { value: "60", label: "60분 이하" }
  ];


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleFilterToggle = (type: keyof VideoSearchFilters, value: string) => {
    const newFilters = { ...filters };
    
    if (type === 'category' || type === 'difficulty' || type === 'instructor' || type === 'tags') {
      const currentValues = (newFilters[type] as string[]) || [];
      if (currentValues.includes(value)) {
        (newFilters[type] as string[]) = currentValues.filter(v => v !== value);
      } else {
        (newFilters[type] as string[]) = [...currentValues, value];
      }
    } else if (type === 'duration') {
      // Handle duration as a single selection for simplicity
      const durationValue = parseInt(value);
      if (newFilters.duration?.max === durationValue) {
        newFilters.duration = undefined;
      } else {
        newFilters.duration = { min: 0, max: durationValue };
      }
    }
    
    setFilters(newFilters);
    onFilterChange?.(newFilters);
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
    onClearFilters?.();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category && filters.category.length > 0) count += filters.category.length;
    if (filters.difficulty && filters.difficulty.length > 0) count += filters.difficulty.length;
    if (filters.instructor && filters.instructor.length > 0) count += filters.instructor.length;
    if (filters.tags && filters.tags.length > 0) count += filters.tags.length;
    if (filters.duration) count += 1;
    if (filters.isPremium !== undefined) count += 1;
    if (filters.isFeatured !== undefined) count += 1;
    if (filters.searchTerm) count += 1;
    return count;
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="발레 동작 검색..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-4 h-12 text-base"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>필터</span>
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-1">
                {getActiveFilterCount()}
              </Badge>
            )}
            {showFilters ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
          
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-muted-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              초기화
            </Button>
          )}
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="space-y-4 pt-4 border-t">
            {/* Category Filter */}
            <div>
              <KoreanLabel className="text-sm font-medium mb-2 block">카테고리</KoreanLabel>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={filters.category?.includes(category) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterToggle('category', category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <KoreanLabel className="text-sm font-medium mb-2 block">난이도</KoreanLabel>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={filters.difficulty?.includes(difficulty) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterToggle('difficulty', difficulty)}
                    className="text-xs"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <KoreanLabel className="text-sm font-medium mb-2 block">길이</KoreanLabel>
              <div className="flex flex-wrap gap-2">
                {durationOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={filters.duration?.max === parseInt(option.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterToggle('duration', option.value)}
                    className="text-xs"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Active Filters Display */}
        {getActiveFilterCount() > 0 && (
          <div className="pt-4 border-t">
            <KoreanLabel className="text-sm font-medium mb-2 block">적용된 필터</KoreanLabel>
            <div className="flex flex-wrap gap-2">
              {filters.category?.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterToggle('category', category)}
                  />
                </Badge>
              ))}
              {filters.difficulty?.map((difficulty) => (
                <Badge key={difficulty} variant="secondary" className="text-xs">
                  {difficulty}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterToggle('difficulty', difficulty)}
                  />
                </Badge>
              ))}
              {filters.duration && (
                <Badge variant="secondary" className="text-xs">
                  {durationOptions.find(opt => opt.value === filters.duration?.max?.toString())?.label}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => handleFilterToggle('duration', filters.duration?.max?.toString() || '')}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
