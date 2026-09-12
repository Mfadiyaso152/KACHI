export interface TrophyStep {
  id: string;
  title: string;
  description: string;
  isMissable?: boolean;
  type: 'platinum' | 'gold' | 'silver' | 'bronze';
  icon?: string;
}

export interface GameGuide {
  id: string;
  title: string;
  englishTitle: string;
  platform: string;
  genre: string;
  coverImage: string;
  difficulty: number; // 1-10
  estimatedHours: string;
  platinumRarity: string; // e.g., "12.4%"
  missableTrophiesCount: number;
  description: string;
  steps: TrophyStep[];
}

export interface LeaderboardUser {
  rank: number;
  psnId: string;
  avatar: string;
  city: string;
  totalTrophies: number;
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
  level: number;
  isVerified: boolean;
  isTopThree?: boolean;
}

export type ViewType = 'home' | 'trophies' | 'leaderboard' | 'verify' | 'about';
