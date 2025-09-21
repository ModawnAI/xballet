import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type VideoCategory = 'barre-work' | 'center-work' | 'jumps' | 'turns' | 'pointe' | 'stretching' | 'warmup' | 'cool-down';
export type DifficultyLevel = '초급' | '중급' | '고급';
export type VideoStatus = 'active' | 'processing' | 'error' | 'draft';
export type VideoFormat = 'vertical' | 'horizontal' | 'square';

export interface VideoMetadata {
  id: string;
  title: string;
  titleKorean: string;
  description: string;
  descriptionKorean: string;
  category: VideoCategory;
  difficulty: DifficultyLevel;
  duration: number; // in seconds
  thumbnailUrl: string;
  videoUrl: string;
  instructor: string;
  instructorKorean: string;
  tags: string[];
  tagsKorean: string[];
  createdAt: string;
  updatedAt: string;
  status: VideoStatus;
  format: VideoFormat;
  quality: '720p' | '1080p' | '4K';
  fileSize: number; // in MB
  viewCount: number;
  likeCount: number;
  isFeatured: boolean;
  isPremium: boolean;
  movementName?: string; // French ballet term
  movementNameKorean?: string; // Korean translation
  techniqueNotes?: string;
  techniqueNotesKorean?: string;
  commonMistakes?: string[];
  commonMistakesKorean?: string[];
  prerequisites?: string[];
  prerequisitesKorean?: string[];
  relatedMovements?: string[];
  relatedMovementsKorean?: string[];
}

export interface VideoSearchFilters {
  category?: VideoCategory[];
  difficulty?: DifficultyLevel[];
  duration?: {
    min: number;
    max: number;
  };
  instructor?: string[];
  tags?: string[];
  isPremium?: boolean;
  isFeatured?: boolean;
  searchTerm?: string;
}

export interface VideoDatabaseState {
  videos: VideoMetadata[];
  filteredVideos: VideoMetadata[];
  searchFilters: VideoSearchFilters;
  isLoading: boolean;
  error: string | null;
  selectedVideo: VideoMetadata | null;
  
  // Actions
  loadVideos: () => void;
  searchVideos: (filters: VideoSearchFilters) => void;
  getVideoById: (id: string) => VideoMetadata | null;
  getVideosByCategory: (category: VideoCategory) => VideoMetadata[];
  getVideosByDifficulty: (difficulty: DifficultyLevel) => VideoMetadata[];
  getFeaturedVideos: () => VideoMetadata[];
  getRelatedVideos: (videoId: string) => VideoMetadata[];
  addVideo: (video: Omit<VideoMetadata, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateVideo: (id: string, updates: Partial<VideoMetadata>) => void;
  deleteVideo: (id: string) => void;
  clearFilters: () => void;
  setSelectedVideo: (video: VideoMetadata | null) => void;
  clearError: () => void;
}

// Mock video database with comprehensive Korean ballet movements
const mockVideos: VideoMetadata[] = [
  // Barre Work (바워크)
  {
    id: 'v1',
    title: 'Basic Plié',
    titleKorean: '기본 플리에',
    description: 'Foundation of all ballet movements',
    descriptionKorean: '모든 발레 동작의 기초',
    category: 'barre-work',
    difficulty: '초급',
    duration: 45,
    thumbnailUrl: '/thumbnails/plie.jpg',
    videoUrl: 'https://www.youtube.com/embed/example1',
    instructor: 'Kim Ballet',
    instructorKorean: '김발레',
    tags: ['basic', 'foundation', 'warmup'],
    tagsKorean: ['기본', '기초', '워밍업'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    status: 'active',
    format: 'vertical',
    quality: '1080p',
    fileSize: 25.5,
    viewCount: 1250,
    likeCount: 89,
    isFeatured: true,
    isPremium: false,
    movementName: 'Plié',
    movementNameKorean: '플리에',
    techniqueNotes: 'Keep knees over toes, maintain turnout',
    techniqueNotesKorean: '무릎이 발가락 위에 오도록 하고, 턴아웃을 유지하세요',
    commonMistakes: ['Knees collapsing inward', 'Losing turnout'],
    commonMistakesKorean: ['무릎이 안쪽으로 무너짐', '턴아웃 상실'],
    prerequisites: ['Basic stance'],
    prerequisitesKorean: ['기본 자세'],
    relatedMovements: ['Relevé', 'Tendu'],
    relatedMovementsKorean: ['르레베', '탕듀']
  },
  {
    id: 'v2',
    title: 'Tendu Exercise',
    titleKorean: '탕듀 연습',
    description: 'Pointing and stretching the foot',
    descriptionKorean: '발끝을 뻗고 스트레칭하는 동작',
    category: 'barre-work',
    difficulty: '초급',
    duration: 60,
    thumbnailUrl: '/thumbnails/tendu.jpg',
    videoUrl: 'https://www.youtube.com/embed/example2',
    instructor: 'Park Ballet',
    instructorKorean: '박발레',
    tags: ['footwork', 'technique', 'flexibility'],
    tagsKorean: ['발기술', '테크닉', '유연성'],
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
    status: 'active',
    format: 'vertical',
    quality: '1080p',
    fileSize: 30.2,
    viewCount: 980,
    likeCount: 67,
    isFeatured: false,
    isPremium: false,
    movementName: 'Tendu',
    movementNameKorean: '탕듀',
    techniqueNotes: 'Keep leg straight, point through the foot',
    techniqueNotesKorean: '다리를 곧게 유지하고 발끝까지 뻗으세요',
    commonMistakes: ['Bent knee', 'Sickled foot'],
    commonMistakesKorean: ['무릎이 구부러짐', '발이 안쪽으로 꺾임'],
    prerequisites: ['Plié'],
    prerequisitesKorean: ['플리에'],
    relatedMovements: ['Dégagé', 'Rond de jambe'],
    relatedMovementsKorean: ['데가제', '론드 드 잠브']
  },
  {
    id: 'v3',
    title: 'Grand Battement',
    titleKorean: '그랑 바트망',
    description: 'Large kicking movement for flexibility',
    descriptionKorean: '유연성을 위한 큰 킥 동작',
    category: 'barre-work',
    difficulty: '중급',
    duration: 90,
    thumbnailUrl: '/thumbnails/battement.jpg',
    videoUrl: 'https://www.youtube.com/embed/example3',
    instructor: 'Lee Ballet',
    instructorKorean: '이발레',
    tags: ['flexibility', 'strength', 'dynamic'],
    tagsKorean: ['유연성', '근력', '역동적'],
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
    status: 'active',
    format: 'vertical',
    quality: '1080p',
    fileSize: 45.8,
    viewCount: 2100,
    likeCount: 156,
    isFeatured: true,
    isPremium: true,
    movementName: 'Grand Battement',
    movementNameKorean: '그랑 바트망',
    techniqueNotes: 'Keep torso stable, use core strength',
    techniqueNotesKorean: '몸통을 안정적으로 유지하고 코어 근력을 사용하세요',
    commonMistakes: ['Leaning back', 'Bent supporting leg'],
    commonMistakesKorean: ['뒤로 기울어짐', '지지하는 다리가 구부러짐'],
    prerequisites: ['Tendu', 'Dégagé'],
    prerequisitesKorean: ['탕듀', '데가제'],
    relatedMovements: ['Petit Battement', 'Fouetté'],
    relatedMovementsKorean: ['프티 바트망', '푸에테']
  },

  // Center Work (센터워크)
  {
    id: 'v4',
    title: 'Port de Bras',
    titleKorean: '포르 드 브라',
    description: 'Arm movements and carriage',
    descriptionKorean: '팔 동작과 자세',
    category: 'center-work',
    difficulty: '초급',
    duration: 75,
    thumbnailUrl: '/thumbnails/port-de-bras.jpg',
    videoUrl: 'https://www.youtube.com/embed/example4',
    instructor: 'Choi Ballet',
    instructorKorean: '최발레',
    tags: ['arms', 'grace', 'expression'],
    tagsKorean: ['팔', '우아함', '표현력'],
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z',
    status: 'active',
    format: 'vertical',
    quality: '1080p',
    fileSize: 35.6,
    viewCount: 890,
    likeCount: 45,
    isFeatured: false,
    isPremium: false,
    movementName: 'Port de Bras',
    movementNameKorean: '포르 드 브라',
    techniqueNotes: 'Keep shoulders down, move from the back',
    techniqueNotesKorean: '어깨를 내리고 등에서 움직이세요',
    commonMistakes: ['Tense shoulders', 'Rigid arms'],
    commonMistakesKorean: ['어깨가 긴장됨', '팔이 뻣뻣함'],
    prerequisites: ['Basic posture'],
    prerequisitesKorean: ['기본 자세'],
    relatedMovements: ['Arabesque', 'Attitude'],
    relatedMovementsKorean: ['아라베스크', '아티튜드']
  },
  {
    id: 'v5',
    title: 'Pirouette',
    titleKorean: '피루엣',
    description: 'Classic ballet turn',
    descriptionKorean: '클래식 발레 회전',
    category: 'center-work',
    difficulty: '중급',
    duration: 120,
    thumbnailUrl: '/thumbnails/pirouette.jpg',
    videoUrl: 'https://www.youtube.com/embed/example5',
    instructor: 'Kim Ballet',
    instructorKorean: '김발레',
    tags: ['turns', 'balance', 'technique'],
    tagsKorean: ['회전', '균형', '테크닉'],
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
    status: 'active',
    format: 'vertical',
    quality: '1080p',
    fileSize: 52.3,
    viewCount: 3200,
    likeCount: 234,
    isFeatured: true,
    isPremium: true,
    movementName: 'Pirouette',
    movementNameKorean: '피루엣',
    techniqueNotes: 'Spot the head, use plié for power',
    techniqueNotesKorean: '머리를 스팟하고 플리에로 힘을 얻으세요',
    commonMistakes: ['Not spotting', 'Rushing the turn'],
    commonMistakesKorean: ['스팟팅 안함', '회전을 급하게 함'],
    prerequisites: ['Plié', 'Relevé', 'Spotting'],
    prerequisitesKorean: ['플리에', '르레베', '스팟팅'],
    relatedMovements: ['Fouetté', 'Chaînés'],
    relatedMovementsKorean: ['푸에테', '셰네']
  },

  // Jumps (점프)
  {
    id: 'v6',
    title: 'Sauté',
    titleKorean: '소테',
    description: 'Basic jump in first position',
    descriptionKorean: '1번 자세에서의 기본 점프',
    category: 'jumps',
    difficulty: '초급',
    duration: 60,
    thumbnailUrl: '/thumbnails/saute.jpg',
    videoUrl: 'https://www.youtube.com/embed/example6',
    instructor: 'Park Ballet',
    instructorKorean: '박발레',
    tags: ['jumps', 'basic', 'rhythm'],
    tagsKorean: ['점프', '기본', '리듬'],
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
    status: 'active',
    format: 'vertical',
    quality: '1080p',
    fileSize: 28.7,
    viewCount: 1100,
    likeCount: 78,
    isFeatured: false,
    isPremium: false,
    movementName: 'Sauté',
    movementNameKorean: '소테',
    techniqueNotes: 'Land softly, maintain turnout',
    techniqueNotesKorean: '부드럽게 착지하고 턴아웃을 유지하세요',
    commonMistakes: ['Heavy landing', 'Losing turnout'],
    commonMistakesKorean: ['무거운 착지', '턴아웃 상실'],
    prerequisites: ['Plié', 'Relevé'],
    prerequisitesKorean: ['플리에', '르레베'],
    relatedMovements: ['Échappé', 'Assemblé'],
    relatedMovementsKorean: ['에샤페', '아상블레']
  },
  {
    id: 'v7',
    title: 'Grand Jeté',
    titleKorean: '그랑 제테',
    description: 'Large leap across the floor',
    descriptionKorean: '바닥을 가로지르는 큰 도약',
    category: 'jumps',
    difficulty: '고급',
    duration: 150,
    thumbnailUrl: '/thumbnails/grand-jete.jpg',
    videoUrl: 'https://www.youtube.com/embed/example7',
    instructor: 'Lee Ballet',
    instructorKorean: '이발레',
    tags: ['leaps', 'advanced', 'dramatic'],
    tagsKorean: ['도약', '고급', '드라마틱'],
    createdAt: '2024-01-21T10:00:00Z',
    updatedAt: '2024-01-21T10:00:00Z',
    status: 'active',
    format: 'vertical',
    quality: '4K',
    fileSize: 78.9,
    viewCount: 4500,
    likeCount: 312,
    isFeatured: true,
    isPremium: true,
    movementName: 'Grand Jeté',
    movementNameKorean: '그랑 제테',
    techniqueNotes: 'Use plié for takeoff, stretch in the air',
    techniqueNotesKorean: '이륙을 위해 플리에를 사용하고 공중에서 뻗으세요',
    commonMistakes: ['Not enough height', 'Poor landing'],
    commonMistakesKorean: ['높이 부족', '착지 실패'],
    prerequisites: ['Sauté', 'Arabesque', 'Strong legs'],
    prerequisitesKorean: ['소테', '아라베스크', '강한 다리'],
    relatedMovements: ['Tour en l\'air', 'Cabriole'],
    relatedMovementsKorean: ['투르 앙 레르', '카브리올']
  },

  // Turns (턴)
  {
    id: 'v8',
    title: 'Chaînés',
    titleKorean: '셰네',
    description: 'Chain of turns across the floor',
    descriptionKorean: '바닥을 가로지르는 연속 회전',
    category: 'turns',
    difficulty: '중급',
    duration: 90,
    thumbnailUrl: '/thumbnails/chaines.jpg',
    videoUrl: 'https://www.youtube.com/embed/example8',
    instructor: 'Choi Ballet',
    instructorKorean: '최발레',
    tags: ['turns', 'traveling', 'momentum'],
    tagsKorean: ['회전', '이동', '모멘텀'],
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z',
    status: 'active',
    format: 'vertical',
    quality: '1080p',
    fileSize: 42.1,
    viewCount: 1800,
    likeCount: 123,
    isFeatured: false,
    isPremium: true,
    movementName: 'Chaînés',
    movementNameKorean: '셰네',
    techniqueNotes: 'Keep arms in first, spot each turn',
    techniqueNotesKorean: '팔을 1번 자세로 유지하고 매 회전마다 스팟하세요',
    commonMistakes: ['Losing balance', 'Not spotting consistently'],
    commonMistakesKorean: ['균형 상실', '일관된 스팟팅 부족'],
    prerequisites: ['Pirouette', 'Spotting'],
    prerequisitesKorean: ['피루엣', '스팟팅'],
    relatedMovements: ['Pirouette', 'Fouetté'],
    relatedMovementsKorean: ['피루엣', '푸에테']
  },

  // Pointe (포인트)
  {
    id: 'v9',
    title: 'Basic Pointe Work',
    titleKorean: '기본 포인트 워크',
    description: 'Introduction to dancing on pointe',
    descriptionKorean: '포인트 댄싱 입문',
    category: 'pointe',
    difficulty: '중급',
    duration: 180,
    thumbnailUrl: '/thumbnails/pointe-basic.jpg',
    videoUrl: 'https://www.youtube.com/embed/example9',
    instructor: 'Kim Ballet',
    instructorKorean: '김발레',
    tags: ['pointe', 'advanced', 'strength'],
    tagsKorean: ['포인트', '고급', '근력'],
    createdAt: '2024-01-23T10:00:00Z',
    updatedAt: '2024-01-23T10:00:00Z',
    status: 'active',
    format: 'vertical',
    quality: '1080p',
    fileSize: 95.6,
    viewCount: 2800,
    likeCount: 189,
    isFeatured: true,
    isPremium: true,
    movementName: 'Pointe Work',
    movementNameKorean: '포인트 워크',
    techniqueNotes: 'Strong ankles, proper alignment',
    techniqueNotesKorean: '강한 발목, 올바른 정렬',
    commonMistakes: ['Weak ankles', 'Poor alignment'],
    commonMistakesKorean: ['약한 발목', '잘못된 정렬'],
    prerequisites: ['Strong feet', 'Years of training'],
    prerequisitesKorean: ['강한 발', '수년간의 훈련'],
    relatedMovements: ['Relevé', 'Pirouette'],
    relatedMovementsKorean: ['르레베', '피루엣']
  },

  // Stretching (스트레칭)
  {
    id: 'v10',
    title: 'Flexibility Stretches',
    titleKorean: '유연성 스트레칭',
    description: 'Essential stretches for ballet dancers',
    descriptionKorean: '발레 댄서를 위한 필수 스트레칭',
    category: 'stretching',
    difficulty: '초급',
    duration: 300,
    thumbnailUrl: '/thumbnails/stretching.jpg',
    videoUrl: 'https://www.youtube.com/embed/example10',
    instructor: 'Park Ballet',
    instructorKorean: '박발레',
    tags: ['flexibility', 'recovery', 'wellness'],
    tagsKorean: ['유연성', '회복', '웰니스'],
    createdAt: '2024-01-24T10:00:00Z',
    updatedAt: '2024-01-24T10:00:00Z',
    status: 'active',
    format: 'vertical',
    quality: '1080p',
    fileSize: 120.3,
    viewCount: 5600,
    likeCount: 445,
    isFeatured: true,
    isPremium: false,
    movementName: 'Stretching',
    movementNameKorean: '스트레칭',
    techniqueNotes: 'Breathe deeply, hold each stretch',
    techniqueNotesKorean: '깊게 숨쉬고 각 스트레치를 유지하세요',
    commonMistakes: ['Bouncing', 'Overstretching'],
    commonMistakesKorean: ['튀기기', '과도한 스트레칭'],
    prerequisites: ['Basic flexibility'],
    prerequisitesKorean: ['기본 유연성'],
    relatedMovements: ['Warm-up', 'Cool-down'],
    relatedMovementsKorean: ['워밍업', '쿨다운']
  }
];

export const useVideoDatabaseStore = create<VideoDatabaseState>()(
  persist(
    (set, get) => ({
      videos: [],
      filteredVideos: [],
      searchFilters: {},
      isLoading: false,
      error: null,
      selectedVideo: null,

      loadVideos: () => {
        set({ 
          videos: mockVideos,
          filteredVideos: mockVideos,
          isLoading: false 
        });
      },

      searchVideos: (filters: VideoSearchFilters) => {
        const { videos } = get();
        set({ searchFilters: filters });

        let filtered = [...videos];

        // Apply filters
        if (filters.category && filters.category.length > 0) {
          filtered = filtered.filter(video => 
            filters.category!.includes(video.category)
          );
        }

        if (filters.difficulty && filters.difficulty.length > 0) {
          filtered = filtered.filter(video => 
            filters.difficulty!.includes(video.difficulty)
          );
        }

        if (filters.duration) {
          filtered = filtered.filter(video => 
            video.duration >= filters.duration!.min && 
            video.duration <= filters.duration!.max
          );
        }

        if (filters.instructor && filters.instructor.length > 0) {
          filtered = filtered.filter(video => 
            filters.instructor!.includes(video.instructor)
          );
        }

        if (filters.tags && filters.tags.length > 0) {
          filtered = filtered.filter(video => 
            filters.tags!.some(tag => video.tags.includes(tag))
          );
        }

        if (filters.isPremium !== undefined) {
          filtered = filtered.filter(video => video.isPremium === filters.isPremium);
        }

        if (filters.isFeatured !== undefined) {
          filtered = filtered.filter(video => video.isFeatured === filters.isFeatured);
        }

        if (filters.searchTerm) {
          const searchTerm = filters.searchTerm.toLowerCase();
          filtered = filtered.filter(video => 
            video.titleKorean.toLowerCase().includes(searchTerm) ||
            video.descriptionKorean.toLowerCase().includes(searchTerm) ||
            video.tagsKorean.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            video.movementNameKorean?.toLowerCase().includes(searchTerm)
          );
        }

        set({ filteredVideos: filtered });
      },

      getVideoById: (id: string) => {
        const { videos } = get();
        return videos.find(video => video.id === id) || null;
      },

      getVideosByCategory: (category: VideoCategory) => {
        const { videos } = get();
        return videos.filter(video => video.category === category);
      },

      getVideosByDifficulty: (difficulty: DifficultyLevel) => {
        const { videos } = get();
        return videos.filter(video => video.difficulty === difficulty);
      },

      getFeaturedVideos: () => {
        const { videos } = get();
        return videos.filter(video => video.isFeatured);
      },

      getRelatedVideos: (videoId: string) => {
        const { videos } = get();
        const video = videos.find(v => v.id === videoId);
        if (!video) return [];

        return videos
          .filter(v => 
            v.id !== videoId && 
            (v.category === video.category || 
             v.difficulty === video.difficulty ||
             v.relatedMovements?.some(movement => 
               video.relatedMovements?.includes(movement)
             ))
          )
          .slice(0, 5);
      },

      addVideo: (videoData) => {
        const newVideo: VideoMetadata = {
          ...videoData,
          id: `v${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set(state => ({
          videos: [...state.videos, newVideo],
          filteredVideos: [...state.filteredVideos, newVideo]
        }));
      },

      updateVideo: (id: string, updates: Partial<VideoMetadata>) => {
        set(state => ({
          videos: state.videos.map(video => 
            video.id === id 
              ? { ...video, ...updates, updatedAt: new Date().toISOString() }
              : video
          ),
          filteredVideos: state.filteredVideos.map(video => 
            video.id === id 
              ? { ...video, ...updates, updatedAt: new Date().toISOString() }
              : video
          )
        }));
      },

      deleteVideo: (id: string) => {
        set(state => ({
          videos: state.videos.filter(video => video.id !== id),
          filteredVideos: state.filteredVideos.filter(video => video.id !== id)
        }));
      },

      clearFilters: () => {
        const { videos } = get();
        set({ 
          searchFilters: {},
          filteredVideos: videos 
        });
      },

      setSelectedVideo: (video: VideoMetadata | null) => {
        set({ selectedVideo: video });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'xballet-video-database',
      partialize: (state) => ({ 
        videos: state.videos,
        searchFilters: state.searchFilters 
      }),
    }
  )
);

// Helper functions for Korean text
export const getCategoryKorean = (category: VideoCategory): string => {
  const categories = {
    'barre-work': '바워크',
    'center-work': '센터워크',
    'jumps': '점프',
    'turns': '턴',
    'pointe': '포인트',
    'stretching': '스트레칭',
    'warmup': '워밍업',
    'cool-down': '쿨다운'
  };
  return categories[category];
};

export const getDifficultyKorean = (difficulty: DifficultyLevel): string => {
  return difficulty; // Already in Korean
};

export const getStatusKorean = (status: VideoStatus): string => {
  const statuses = {
    'active': '활성',
    'processing': '처리 중',
    'error': '오류',
    'draft': '초안'
  };
  return statuses[status];
};
