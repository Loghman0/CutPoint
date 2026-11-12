export type AspectRatio = '16:9' | '9:16';

export type EditCategory =
  | 'Gaming'
  | 'Anime'
  | 'Sports'
  | 'Cinematic'
  | 'Cars'
  | 'Music'
  | 'Motion Design'
  | 'Short-form'
  | 'VFX'
  | '3D/CGI';

export type SoftwareTool =
  | 'After Effects'
  | 'Premiere Pro'
  | 'DaVinci Resolve'
  | 'Final Cut Pro'
  | 'Blender'
  | 'Cinema 4D'
  | 'Photoshop'
  | 'CapCut Pro';

export type SkillTag =
  | 'Color Grading'
  | 'Speed Ramping'
  | 'Sound Design'
  | '3D Tracking'
  | 'Typography'
  | 'Transitions'
  | 'VFX Compositing'
  | 'Velocity'
  | 'Masking'
  | 'Character Anim';

export interface EditorSkill {
  name: SkillTag | string;
  level: number; // percentage 0-100
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  dateAwarded?: string;
  rarity?: 'Legendary' | 'Epic' | 'Rare' | 'Common';
}

export interface Editor {
  id: string;
  name: string;
  username: string;
  avatar: string;
  banner: string;
  role: 'Editor' | 'Creator' | 'Viewer';
  bio: string;
  level: number;
  xp?: number;
  nextLevelXp: number;
  percentileRank: string; // e.g. "Top 1%", "Top 5%"
  specialties: EditCategory[];
  software: SoftwareTool[];
  skills: EditorSkill[];
  achievements: AchievementBadge[];
  followersCount: number;
  followingCount: number;
  totalViews: number;
  totalLikes: number;
  editsCount: number;
  challengeWins: number;
  battleWins: number;
  isVerified: boolean;
  isFollowing?: boolean;
  availableForHire: boolean;
  startingPrice?: number;
  location?: string;
  socials?: {
    youtube?: string;
    tiktok?: string;
    twitter?: string;
    discord?: string;
    instagram?: string;
  };
}

export interface Comment {
  id: string;
  editId: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    level: number;
    isVerified?: boolean;
  };
  text: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface EditItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  aspectRatio: AspectRatio;
  category: EditCategory;
  tags: string[];
  software: SoftwareTool[];
  skills: SkillTag[];
  editorId: string;
  editor: {
    name: string;
    username: string;
    avatar: string;
    level: number;
    percentileRank: string;
    isVerified: boolean;
  };
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  savesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
  challengeId?: string;
  challengeName?: string;
  duration?: string;
}

export interface Challenge {
  id: string;
  title: string;
  theme: string;
  subtitle: string;
  description: string;
  bannerUrl: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  startDate: string;
  endDate: string;
  daysRemaining: number;
  participantsCount: number;
  prizePool: string;
  badgeReward: string;
  sponsor?: string;
  providedFootageUrl?: string;
  rules: string[];
  winningEdits?: {
    rank: 1 | 2 | 3;
    edit: EditItem;
    editor: Editor;
  }[];
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'challenge' | 'system';
  actor: {
    name: string;
    username: string;
    avatar: string;
  };
  message: string;
  targetEditId?: string;
  targetChallengeId?: string;
  createdAt: string;
  isRead: boolean;
}

export interface EditBattle {
  id: string;
  title: string;
  category: EditCategory;
  editorA: {
    editor: Editor;
    edit: EditItem;
    votes: number;
  };
  editorB: {
    editor: Editor;
    edit: EditItem;
    votes: number;
  };
  totalVotes: number;
  status: 'Live' | 'Ended';
  endsIn: string;
  userVotedFor?: 'A' | 'B';
}

export interface MarketplaceAsset {
  id: string;
  title: string;
  category: 'LUTs' | 'Transitions' | 'Presets' | 'Templates' | 'SFX' | 'Project Files';
  editor: Editor;
  price: number; // 0 for free
  rating: number;
  reviewsCount: number;
  thumbnailUrl: string;
  software: SoftwareTool;
  downloadsCount: number;
}
