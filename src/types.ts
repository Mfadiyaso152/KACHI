export type TrophyType = 'platinum' | 'gold' | 'silver' | 'bronze';

export interface TrophyStep {
  id: string;
  title: string;
  description: string;
  isMissable?: boolean;
  type: TrophyType;
  icon?: string;
}

export interface TrophyItem {
  id: string;
  title: string;
  englishTitle?: string;
  description: string;
  type: TrophyType;
  isMissable?: boolean;
  isOnline?: boolean;
  isHidden?: boolean;
  guide?: string;
}

export interface RoadmapStep {
  stepNumber: number;
  title: string;
  description: string;
  estimatedHours?: string;
  unlockedTrophies?: string;
}

export interface GameGuide {
  id: string;
  slug: string;
  title: string;
  englishTitle: string;
  platform: string;
  genre: string;
  coverImage: string;
  bannerImage?: string;
  difficulty: number; // 1-10
  estimatedHours: string;
  platinumRarity?: string;
  totalTrophiesCount?: number;
  platinumCount?: number;
  goldCount?: number;
  silverCount?: number;
  bronzeCount?: number;
  missableTrophiesCount: number;
  onlineTrophiesCount: number;
  description?: string;
  roadmap?: RoadmapStep[];
  trophiesList: TrophyItem[];
  steps?: TrophyStep[];
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

export interface VerificationRequest {
  id: string;
  userEmail: string;
  displayName: string;
  psnId: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: string;
  notes?: string;
}

export interface AppUserAccount {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  isBanned: boolean;
  isVerified: boolean;
  psnId?: string;
  role: 'admin' | 'user';
}

export type ViewType = 'home' | 'games' | 'trophies' | 'leaderboard' | 'verify' | 'admin';
