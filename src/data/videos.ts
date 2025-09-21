// Dummy video data for XBallet frontend demo
// Ballet movement videos with Korean metadata

export interface VideoMetadata {
  id: string;
  title: string;
  titleKorean: string;
  description: string;
  descriptionKorean: string;
  duration: number; // in seconds
  difficulty: '초급' | '중급' | '고급';
  category: '바워크' | '센터워크' | '점프' | '턴' | '포인트' | '워밍업' | '쿨다운';
  focusAreas: string[];
  thumbnail: string;
  videoUrl: string;
  instructions: string[];
  instructionsKorean: string[];
  tips: string[];
  tipsKorean: string[];
  musicStyle: '클래식' | '현대' | '팝' | '재즈';
  createdAt: string;
}

export const dummyVideos: VideoMetadata[] = [
  {
    id: 'plie-basic',
    title: 'Basic Plie',
    titleKorean: '기본 플리에',
    description: 'Fundamental ballet movement for building strength and flexibility',
    descriptionKorean: '발레의 기본 동작으로 힘과 유연성을 기르는 운동입니다',
    duration: 180, // 3 minutes
    difficulty: '초급',
    category: '바워크',
    focusAreas: ['하체', '균형', '자세'],
    thumbnail: '/api/placeholder/300/400',
    videoUrl: '/api/placeholder/video/plie-basic.mp4',
    instructions: [
      'Stand with feet in first position',
      'Slowly bend knees while keeping heels on floor',
      'Lower as far as comfortable',
      'Return to starting position'
    ],
    instructionsKorean: [
      '첫 번째 자세로 서세요',
      '발뒤꿈치를 바닥에 붙인 채 천천히 무릎을 구부리세요',
      '편안한 만큼 낮춰보세요',
      '시작 자세로 돌아가세요'
    ],
    tips: [
      'Keep spine straight',
      'Don\'t let knees go past toes',
      'Engage core muscles'
    ],
    tipsKorean: [
      '척추를 곧게 유지하세요',
      '무릎이 발가락을 넘지 않도록 하세요',
      '코어 근육을 사용하세요'
    ],
    musicStyle: '클래식',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'tendu-basic',
    title: 'Basic Tendu',
    titleKorean: '기본 땅듀',
    description: 'Essential foot stretching movement in ballet',
    descriptionKorean: '발레에서 발을 뻗는 필수 동작입니다',
    duration: 240, // 4 minutes
    difficulty: '초급',
    category: '바워크',
    focusAreas: ['발목', '발가락', '균형'],
    thumbnail: '/api/placeholder/300/400',
    videoUrl: '/api/placeholder/video/tendu-basic.mp4',
    instructions: [
      'Start in first position',
      'Slide foot along floor to front',
      'Point toes and extend leg',
      'Return to starting position'
    ],
    instructionsKorean: [
      '첫 번째 자세에서 시작하세요',
      '발을 바닥에 붙여 앞으로 미세요',
      '발가락을 펴고 다리를 뻗으세요',
      '시작 자세로 돌아가세요'
    ],
    tips: [
      'Keep supporting leg straight',
      'Work through the foot gradually',
      'Maintain turnout'
    ],
    tipsKorean: [
      '지지하는 다리를 곧게 유지하세요',
      '발을 단계적으로 움직이세요',
      '턴아웃을 유지하세요'
    ],
    musicStyle: '클래식',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'grand-plie',
    title: 'Grand Plie',
    titleKorean: '그랜드 플리에',
    description: 'Deep plie movement for advanced flexibility',
    descriptionKorean: '고급 유연성을 위한 깊은 플리에 동작입니다',
    duration: 300, // 5 minutes
    difficulty: '중급',
    category: '바워크',
    focusAreas: ['하체', '유연성', '균형'],
    thumbnail: '/api/placeholder/300/400',
    videoUrl: '/api/placeholder/video/grand-plie.mp4',
    instructions: [
      'Start in first position',
      'Begin demi plie',
      'Continue lowering with heels lifting',
      'Return through demi plie to starting position'
    ],
    instructionsKorean: [
      '첫 번째 자세에서 시작하세요',
      '데미 플리에로 시작하세요',
      '발뒤꿈치가 들리면서 계속 낮춰보세요',
      '데미 플리에를 거쳐 시작 자세로 돌아가세요'
    ],
    tips: [
      'Maintain turnout throughout',
      'Keep spine elongated',
      'Use arms for balance'
    ],
    tipsKorean: [
      '전체적으로 턴아웃을 유지하세요',
      '척추를 길게 유지하세요',
      '균형을 위해 팔을 사용하세요'
    ],
    musicStyle: '클래식',
    createdAt: '2024-01-15T11:00:00Z'
  },
  {
    id: 'jete-basic',
    title: 'Basic Jete',
    titleKorean: '기본 제테',
    description: 'Jumping movement for building explosive power',
    descriptionKorean: '폭발적인 힘을 기르는 점프 동작입니다',
    duration: 360, // 6 minutes
    difficulty: '중급',
    category: '점프',
    focusAreas: ['하체', '점프력', '코어'],
    thumbnail: '/api/placeholder/300/400',
    videoUrl: '/api/placeholder/video/jete-basic.mp4',
    instructions: [
      'Start in fifth position',
      'Demi plie and push off both feet',
      'Land on one foot in coupe position',
      'Return to starting position'
    ],
    instructionsKorean: [
      '다섯 번째 자세에서 시작하세요',
      '데미 플리에 후 양발로 밀어 올리세요',
      '쿠페 자세로 한 발에 착지하세요',
      '시작 자세로 돌아가세요'
    ],
    tips: [
      'Use arms for momentum',
      'Land softly with bent knee',
      'Engage core for stability'
    ],
    tipsKorean: [
      '모멘텀을 위해 팔을 사용하세요',
      '구부린 무릎으로 부드럽게 착지하세요',
      '안정성을 위해 코어를 사용하세요'
    ],
    musicStyle: '현대',
    createdAt: '2024-01-15T11:30:00Z'
  },
  {
    id: 'pirouette-basic',
    title: 'Basic Pirouette',
    titleKorean: '기본 피루엣',
    description: 'Turning movement for balance and coordination',
    descriptionKorean: '균형과 조화를 위한 회전 동작입니다',
    duration: 420, // 7 minutes
    difficulty: '고급',
    category: '턴',
    focusAreas: ['균형', '회전', '코어'],
    thumbnail: '/api/placeholder/300/400',
    videoUrl: '/api/placeholder/video/pirouette-basic.mp4',
    instructions: [
      'Start in fourth position',
      'Demi plie and push off back leg',
      'Bring arms to first position',
      'Spot and complete the turn'
    ],
    instructionsKorean: [
      '네 번째 자세에서 시작하세요',
      '데미 플리에 후 뒷다리로 밀어 올리세요',
      '팔을 첫 번째 자세로 가져오세요',
      '스팟팅하며 회전을 완성하세요'
    ],
    tips: [
      'Keep spotting throughout turn',
      'Maintain strong core',
      'Practice balance exercises first'
    ],
    tipsKorean: [
      '회전 중 스팟팅을 계속하세요',
      '강한 코어를 유지하세요',
      '먼저 균형 연습을 하세요'
    ],
    musicStyle: '클래식',
    createdAt: '2024-01-15T12:00:00Z'
  },
  {
    id: 'warm-up-stretches',
    title: 'Ballet Warm-up Stretches',
    titleKorean: '발레 워밍업 스트레칭',
    description: 'Essential warm-up exercises before ballet class',
    descriptionKorean: '발레 클래스 전 필수 워밍업 운동입니다',
    duration: 480, // 8 minutes
    difficulty: '초급',
    category: '워밍업',
    focusAreas: ['유연성', '순환', '준비'],
    thumbnail: '/api/placeholder/300/400',
    videoUrl: '/api/placeholder/video/warm-up.mp4',
    instructions: [
      'Start with gentle neck rolls',
      'Move to shoulder circles',
      'Include spinal twists',
      'Finish with leg swings'
    ],
    instructionsKorean: [
      '부드러운 목 돌리기로 시작하세요',
      '어깨 원운동으로 넘어가세요',
      '척추 비틀기를 포함하세요',
      '다리 흔들기로 마무리하세요'
    ],
    tips: [
      'Move slowly and controlled',
      'Breathe deeply throughout',
      'Listen to your body'
    ],
    tipsKorean: [
      '천천히 조절하며 움직이세요',
      '전체적으로 깊게 숨쉬세요',
      '몸의 신호를 들어보세요'
    ],
    musicStyle: '현대',
    createdAt: '2024-01-15T08:00:00Z'
  }
];

// Helper functions for video data
export const getVideosByDifficulty = (difficulty: '초급' | '중급' | '고급') => {
  return dummyVideos.filter(video => video.difficulty === difficulty);
};

export const getVideosByCategory = (category: VideoMetadata['category']) => {
  return dummyVideos.filter(video => video.category === category);
};

export const getVideoById = (id: string) => {
  return dummyVideos.find(video => video.id === id);
};

export const getVideosByMusicStyle = (style: VideoMetadata['musicStyle']) => {
  return dummyVideos.filter(video => video.musicStyle === style);
};

export const searchVideos = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return dummyVideos.filter(video => 
    video.title.toLowerCase().includes(lowerQuery) ||
    video.titleKorean.includes(query) ||
    video.description.toLowerCase().includes(lowerQuery) ||
    video.descriptionKorean.includes(query) ||
    video.focusAreas.some(area => area.toLowerCase().includes(lowerQuery))
  );
};
