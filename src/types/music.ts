export type MusicLanguage = 'hindi' | 'punjabi' | 'tamil' | 'telugu' | 'english';

export type MusicGenre = 
  | 'bollywood'
  | 'sufi'
  | 'bhangra'
  | 'classical'
  | 'romantic'
  | 'devotional'
  | 'lofi'
  | 'indie';

export interface Song {
  id: string;
  title: string;
  titleHi: string;
  artist: string;
  artistHi: string;
  album: string;
  albumHi: string;
  language: MusicLanguage;
  genre: MusicGenre;
  duration: number; // in seconds
  audioUrl: string;
  coverUrl: string;
  isTrending?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  lyrics?: string;
  license: string;
  plays: number;
}

export interface Playlist {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  coverUrl: string;
  songs: Song[];
  isSystem?: boolean;
  createdAt: string;
}

export interface Artist {
  id: string;
  name: string;
  nameHi: string;
  bio: string;
  bioHi: string;
  imageUrl: string;
  language: MusicLanguage;
  songCount: number;
  monthlyListeners: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isVip: boolean;
  vipExpiry?: string;
  likedSongIds: string[];
  playlists: Playlist[];
  recentlyPlayed: { songId: string; playedAt: number }[];
  downloadedSongIds: string[];
}

export type RepeatMode = 'off' | 'all' | 'one';
export type AudioQuality = '128k' | '256k' | '320k';

export interface UpiConfig {
  upiId: string;
  payeeName: string;
  merchantCode?: string;
}

export interface SubscriptionPayment {
  id: string;
  userName: string;
  userEmail: string;
  planId: string;
  planName: string;
  amount: number;
  upiId: string;
  utr: string;
  date: string;
  status: 'verified' | 'pending';
}

