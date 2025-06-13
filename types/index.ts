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

export type ActionResult<T = unknown> = {
  success: boolean;
  error?: string;
  data?: T;
};

export interface UserSession{
  id:string;
  email:string;
  name:string;
}