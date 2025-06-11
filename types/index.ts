export interface User {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: string;
  image?: string;
  password?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: string;
}


export interface MemorizationProgress {
  id: string;
  userId: string;
  surah: string;
  ayah: number;
  progress: number;
  lastReviewed?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LearningHistory {
  id: string;
  userId: string;
  surah: string;
  ayah: number;
  action: string;
  timestamp: string;
}

export interface FavoriteAyah {
  id: string;
  userId: string;
  ayahKey: string;
  createdAt: string;
}

export interface DailyVerse {
  id: string;
  ayahKey: string;
  date: string;
  reflection?: string;
}

export interface AIQueryHistory {
  id: string;
  userId: string;
  query: string;
  response: string;
  createdAt: string;
}

export interface Quiz {
  id: string;
  userId: string;
  ayahKey: string;
  question: string;
  answer: string;
  correct: boolean;
  createdAt: string;
}

export interface LearningTarget {
  id: string;
  userId: string;
  goalType: string;
  targetAyah: number;
  achievedAyah: number;
  startDate: string;
  endDate: string;
}

export interface Community {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityMembership {
  id: string;
  userId: string;
  communityId: string;
  role: string;
  joinedAt: string;
}

export interface UserWithProgress extends User {
  memorizationProgress: MemorizationProgress[];
  learningHistory: LearningHistory[];
  favoriteAyahs: FavoriteAyah[];
  communityMemberships: CommunityMembership[];
  aiQueryHistory: AIQueryHistory[];
  quizzes: Quiz[];
  learningTargets: LearningTarget[];
}

export interface SurahTypeList {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: 'Mekah' | 'Madinah'; 
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
  
}


export interface QuranApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface AyatType{
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    [key: string]: string; 
  };
};

interface Audio {
  [key: string]: string; 
}

interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Audio;
}

export interface TafsirItem {
  ayat: number;
  teks: string;
}

interface SuratNavigation {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
}

interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: Audio;
  ayat: Ayat[];
  suratSelanjutnya: SuratNavigation;
  suratSebelumnya: SuratNavigation | false;
}

interface Tafsir {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: Audio;
  tafsir: TafsirItem[];
  suratSelanjutnya: SuratNavigation;
  suratSebelumnya: SuratNavigation | false;
}

export interface SurahData {
  surah: Surah;
  tafsir: Tafsir;
  userId? :string
}

export type ActionResult = {
  success: boolean
  error?: string
  data?: any
}