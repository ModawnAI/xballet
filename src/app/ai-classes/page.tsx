"use client";

import { useState } from "react";
import { MobileHeader, MobileNavigation } from "@/components/mobile-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KoreanHeading, KoreanBody, KoreanLabel } from "@/components/korean-text";
import { 
  Play, 
  Clock, 
  Target, 
  Music, 
  Wand2, 
  Settings,
  Download,
  Share2,
  Heart,
  BookOpen,
  Zap
} from "lucide-react";

interface AIGeneratedClass {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  focusAreas: string[];
  musicStyle: string;
  movements: string[];
  aiGenerated: boolean;
  createdAt: string;
  thumbnail: string;
  isFavorite?: boolean;
}

export default function AIClassesPage() {
  const [selectedDuration, setSelectedDuration] = useState<number>(15);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("초급");
  const [selectedFocus, setSelectedFocus] = useState<string>("바워크");
  const [selectedMusicStyle, setSelectedMusicStyle] = useState<string>("클래식");
  const [selectedIntensity, setSelectedIntensity] = useState<string>("보통");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [favoriteClasses, setFavoriteClasses] = useState<string[]>(["2", "4"]);

  // Mock AI-generated classes
  const aiClasses: AIGeneratedClass[] = [
    {
      id: "1",
      title: "아침 바워크 클래스",
      description: "AI가 생성한 15분 아침 바워크 루틴으로 하루를 시작하세요",
      duration: 15,
      difficulty: "초급",
      focusAreas: ["바워크", "워밍업"],
      musicStyle: "클래식",
      movements: ["플리에", "텐듀", "데가제", "론드드잠브"],
      aiGenerated: true,
      createdAt: "2024-01-15",
      thumbnail: "/class-thumb-1.jpg",
      isFavorite: false
    },
    {
      id: "2", 
      title: "센터워크 마스터 클래스",
      description: "중급자를 위한 30분 센터워크 집중 클래스",
      duration: 30,
      difficulty: "중급",
      focusAreas: ["센터워크", "턴"],
      musicStyle: "현대",
      movements: ["아다지오", "피루엣", "그랜드 알레그로", "아라베스크"],
      aiGenerated: true,
      createdAt: "2024-01-14",
      thumbnail: "/class-thumb-2.jpg",
      isFavorite: true
    },
    {
      id: "3",
      title: "점프 테크닉 클래스",
      description: "고급 점프 동작들을 집중적으로 연습하는 45분 클래스",
      duration: 45,
      difficulty: "고급",
      focusAreas: ["점프", "알레그로"],
      musicStyle: "클래식",
      movements: ["그랜드 제테", "소테", "아쉬레", "카브리올"],
      aiGenerated: true,
      createdAt: "2024-01-13",
      thumbnail: "/class-thumb-3.jpg",
      isFavorite: false
    },
    {
      id: "4",
      title: "유연성 향상 클래스",
      description: "스트레칭과 유연성에 집중한 20분 클래스",
      duration: 20,
      difficulty: "초급",
      focusAreas: ["유연성", "스트레칭"],
      musicStyle: "발라드",
      movements: ["아라베스크", "데벨롭", "그랜드 바트망", "플리에"],
      aiGenerated: true,
      createdAt: "2024-01-12",
      thumbnail: "/class-thumb-4.jpg",
      isFavorite: true
    }
  ];

  const durations = [5, 10, 15, 20, 30, 45, 60];
  const difficulties = ["초급", "중급", "고급"];
  const focusAreas = ["바워크", "센터워크", "점프", "턴", "유연성", "스트레칭"];
  const musicStyles = ["클래식", "현대", "팝", "재즈", "발라드"];
  const intensities = ["부드러운", "보통", "강한"];

  const handleGenerateClass = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate AI generation with progress updates
    const steps = [
      { message: "사용자 선호도 분석 중...", progress: 20 },
      { message: "동작 시퀀스 생성 중...", progress: 40 },
      { message: "난이도 조절 중...", progress: 60 },
      { message: "음악 스타일 매칭 중...", progress: 80 },
      { message: "클래스 최적화 중...", progress: 100 }
    ];
    
    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setGenerationProgress(step.progress);
    }
    
    setIsGenerating(false);
    setGenerationProgress(0);
    // In real app, this would call AI API and add the generated class to the list
  };

  const handlePlayClass = (classId: string) => {
    console.log('Playing class:', classId);
  };

  const handleFavoriteClass = (classId: string) => {
    setFavoriteClasses(prev => 
      prev.includes(classId) 
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  const filteredClasses = aiClasses.filter(cls => 
    cls.duration === selectedDuration &&
    cls.difficulty === selectedDifficulty &&
    cls.focusAreas.includes(selectedFocus)
  );

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="AI 클래스" />
      
      <main className="px-4 py-6 pb-24 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <KoreanHeading level={2} className="text-2xl">
            AI 생성 발레 클래스
          </KoreanHeading>
          <KoreanBody size="sm" className="text-muted-foreground">
            AI가 당신의 실력과 선호도에 맞춰 개인 맞춤형 클래스를 생성합니다
          </KoreanBody>
        </div>

        {/* AI Generation Panel */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wand2 className="w-5 h-5 text-primary" />
              <KoreanHeading level={3}>새 클래스 생성</KoreanHeading>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Duration Selection */}
              <div>
                <KoreanLabel className="text-sm font-medium mb-3 block flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  클래스 길이
                </KoreanLabel>
                <div className="flex flex-wrap gap-2">
                  {durations.map((duration) => (
                    <Button
                      key={duration}
                      variant={selectedDuration === duration ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDuration(duration)}
                      className="text-xs"
                    >
                      {duration}분
                    </Button>
                  ))}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div>
                <KoreanLabel className="text-sm font-medium mb-3 block flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  난이도
                </KoreanLabel>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={selectedDifficulty === difficulty ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className="text-xs"
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Focus Area Selection */}
              <div>
                <KoreanLabel className="text-sm font-medium mb-3 block flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  집중 영역
                </KoreanLabel>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <Button
                      key={area}
                      variant={selectedFocus === area ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFocus(area)}
                      className="text-xs"
                    >
                      {area}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Music Style Selection */}
              <div>
                <KoreanLabel className="text-sm font-medium mb-3 block flex items-center">
                  <Music className="w-4 h-4 mr-2" />
                  음악 스타일
                </KoreanLabel>
                <div className="flex flex-wrap gap-2">
                  {musicStyles.map((style) => (
                    <Button
                      key={style}
                      variant={selectedMusicStyle === style ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMusicStyle(style)}
                      className="text-xs"
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Intensity Selection */}
              <div>
                <KoreanLabel className="text-sm font-medium mb-3 block flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  운동 강도
                </KoreanLabel>
                <div className="flex flex-wrap gap-2">
                  {intensities.map((intensity) => (
                    <Button
                      key={intensity}
                      variant={selectedIntensity === intensity ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedIntensity(intensity)}
                      className="text-xs"
                    >
                      {intensity}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleGenerateClass}
                disabled={isGenerating}
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-5 h-5 mr-2 animate-pulse" />
                    AI가 클래스를 생성 중...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    새 클래스 생성하기
                  </>
                )}
              </Button>
              
              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {generationProgress < 20 && "사용자 선호도 분석 중..."}
                      {generationProgress >= 20 && generationProgress < 40 && "동작 시퀀스 생성 중..."}
                      {generationProgress >= 40 && generationProgress < 60 && "난이도 조절 중..."}
                      {generationProgress >= 60 && generationProgress < 80 && "음악 스타일 매칭 중..."}
                      {generationProgress >= 80 && "클래스 최적화 중..."}
                    </span>
                    <span className="text-muted-foreground">{generationProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Generated Classes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <KoreanHeading level={3} className="text-lg">
              생성된 클래스 ({filteredClasses.length}개)
            </KoreanHeading>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-1" />
                필터
              </Button>
            </div>
          </div>

          {filteredClasses.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Wand2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <KoreanHeading level={3} className="text-lg mb-2">
                  아직 생성된 클래스가 없습니다
                </KoreanHeading>
                <KoreanBody size="sm" className="text-muted-foreground">
                  위의 설정으로 새 클래스를 생성해보세요
                </KoreanBody>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredClasses.map((aiClass) => (
                <Card key={aiClass.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Thumbnail */}
                      <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <Play className="w-8 h-8 text-primary" />
                        </div>
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Button
                            size="sm"
                            onClick={() => handlePlayClass(aiClass.id)}
                            className="rounded-full w-10 h-10"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="absolute top-1 right-1">
                          <Badge variant="secondary" className="text-xs">
                            AI
                          </Badge>
                        </div>
                      </div>

                      {/* Class Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <KoreanHeading level={4} className="text-base">
                              {aiClass.title}
                            </KoreanHeading>
                            <KoreanBody size="sm" className="text-muted-foreground line-clamp-2">
                              {aiClass.description}
                            </KoreanBody>
                            
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {aiClass.difficulty}
                              </Badge>
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{aiClass.duration}분</span>
                              </div>
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Music className="w-3 h-3" />
                                <span>{aiClass.musicStyle}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {aiClass.focusAreas.map((area, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFavoriteClass(aiClass.id)}
                              className={favoriteClasses.includes(aiClass.id) ? "text-red-500" : "text-muted-foreground"}
                            >
                              <Heart className={`w-4 h-4 ${favoriteClasses.includes(aiClass.id) ? "fill-current" : ""}`} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Class Structure */}
                    <div className="mt-4 pt-4 border-t">
                      <KoreanLabel className="text-sm font-medium mb-3 block">
                        클래스 구조
                      </KoreanLabel>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded text-center border border-primary/20">
                          <div className="font-medium text-primary dark:text-primary/90">워밍업</div>
                          <div className="text-primary/80 dark:text-primary/70">5분</div>
                        </div>
                        <div className="bg-secondary/10 dark:bg-secondary/20 p-2 rounded text-center border border-secondary/20">
                          <div className="font-medium text-secondary dark:text-secondary/90">메인</div>
                          <div className="text-secondary/80 dark:text-secondary/70">{Math.max(aiClass.duration - 10, 5)}분</div>
                        </div>
                        <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded text-center border border-accent/20">
                          <div className="font-medium text-accent dark:text-accent/90">쿨다운</div>
                          <div className="text-accent/80 dark:text-accent/70">5분</div>
                        </div>
                      </div>
                    </div>

                    {/* Movements List */}
                    <div className="mt-4 pt-4 border-t">
                      <KoreanLabel className="text-sm font-medium mb-2 block">
                        포함된 동작들
                      </KoreanLabel>
                      <div className="flex flex-wrap gap-1">
                        {aiClass.movements.map((movement, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {movement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <MobileNavigation />
    </div>
  );
}
