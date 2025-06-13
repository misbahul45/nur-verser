export interface MemorizationNote {
  id: string;
  memorizationProgressId: string;
  userId: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;

  // Relasi
  memorizationProgress?: MemorizationProgress;
}
export interface MemorizationProgress {
  id: string;
  userId: string;
  surahNumber: number;
  totalAyahs: number;
  currentAyah: number;
  progress: number;
  isCompleted: boolean;
  startDate: Date;
  endDate: Date | null;
  lastReviewed: Date | null;
  createdAt: Date;
  updatedAt: Date;
  notes: MemorizationNote[];
}