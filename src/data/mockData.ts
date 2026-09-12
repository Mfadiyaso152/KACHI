import { LeaderboardUser } from '../types';
export { GAMES_DATA } from './gamesData';

// Generate 100 Saudi leaderboard users with Top 3 highlighted
const saudiCities = ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة', 'الخبر', 'أبها', 'تبوك', 'بريدة', 'الطائف'];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    rank: 1,
    psnId: 'FALCON_KSA_999',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
    city: 'الرياض',
    totalTrophies: 14820,
    platinum: 342,
    gold: 1820,
    silver: 4210,
    bronze: 8448,
    level: 928,
    isVerified: true,
    isTopThree: true
  },
  {
    rank: 2,
    psnId: 'SAMURAI_JEDDAH',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    city: 'جدة',
    totalTrophies: 13950,
    platinum: 310,
    gold: 1650,
    silver: 3990,
    bronze: 8000,
    level: 890,
    isVerified: true,
    isTopThree: true
  },
  {
    rank: 3,
    psnId: 'NINJA_DAHRAN',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    city: 'الدمام',
    totalTrophies: 12890,
    platinum: 285,
    gold: 1540,
    silver: 3650,
    bronze: 7415,
    level: 845,
    isVerified: true,
    isTopThree: true
  },
  {
    rank: 4,
    psnId: 'RIYADH_ELITE_X',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    city: 'الرياض',
    totalTrophies: 11420,
    platinum: 250,
    gold: 1320,
    silver: 3200,
    bronze: 6650,
    level: 780,
    isVerified: true,
    isTopThree: false
  },
  {
    rank: 5,
    psnId: 'SHOGUN_KSA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    city: 'المدينة المنورة',
    totalTrophies: 10980,
    platinum: 238,
    gold: 1250,
    silver: 3100,
    bronze: 6392,
    level: 740,
    isVerified: true,
    isTopThree: false
  },
  {
    rank: 6,
    psnId: 'DESERT_WOLF_PS',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    city: 'مكة المكرمة',
    totalTrophies: 10250,
    platinum: 215,
    gold: 1180,
    silver: 2900,
    bronze: 5955,
    level: 690,
    isVerified: true,
    isTopThree: false
  },
  {
    rank: 7,
    psnId: 'KHOBAR_SNIPER',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    city: 'الخبر',
    totalTrophies: 9840,
    platinum: 198,
    gold: 1100,
    silver: 2800,
    bronze: 5742,
    level: 655,
    isVerified: true,
    isTopThree: false
  },
  {
    rank: 8,
    psnId: 'ABHA_PEAK_HUNTER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    city: 'أبها',
    totalTrophies: 9420,
    platinum: 185,
    gold: 1050,
    silver: 2650,
    bronze: 5535,
    level: 620,
    isVerified: true,
    isTopThree: false
  },
  {
    rank: 9,
    psnId: 'TABUK_GHOST',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    city: 'تبوك',
    totalTrophies: 9100,
    platinum: 172,
    gold: 990,
    silver: 2550,
    bronze: 5388,
    level: 590,
    isVerified: false,
    isTopThree: false
  },
  {
    rank: 10,
    psnId: 'TAIF_VIPER_99',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    city: 'الطائف',
    totalTrophies: 8850,
    platinum: 160,
    gold: 950,
    silver: 2450,
    bronze: 5290,
    level: 560,
    isVerified: true,
    isTopThree: false
  }
];
