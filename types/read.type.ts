export interface AyahNotes {
  id: string;
  userId: string;
  ayahKey: number;
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
  translation: string;
  tafsir: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}