import { z } from 'zod';

export const SaveFavoriteAyatSchema = z.object({
  ayahKey: z.number().int().positive(),
  userId: z.string().min(1, "User ID is required"),
  surah_number: z.number().int().positive(),
  arabic: z.string().min(1, "Arabic text is required"),
  terjemahan: z.string().min(1, "Terjemahan is required"),
  tafsir: z.string().min(1, "Tafsir is required"),
});

export const DeleteFavoriteAyatSchema = z.object({
  ayatKey: z.number().int().positive(),
  userId: z.string().min(1, "User ID is required").optional(),
});

export const GetFavoriteAyatSchema = z.object({
  ayatKey: z.number().int().positive(),
  userId: z.string().min(1, "User ID is required"),
  surah_number: z.number().int().positive(),
});

export const GetNoteAyatSchema = z.object({
  ayatKey: z.number().int().positive(),
  userId: z.string().min(1, "User ID is required"),
  surah_number: z.number().int().positive(),
});

export const CreateNoteAyatSchema = z.object({
  ayatKey: z.number().int().positive(),
  userId: z.string().min(1, "User ID is required"),
  surah_number: z.number().int().positive(),
  note: z.string().min(1, "Note is required"),
  arabic: z.string().min(1, "Arabic text is required"),
  terjemahan: z.string().min(1, "Terjemahan is required"),
  tafsir: z.string().min(1, "Tafsir is required"),
});



export const DeleteNoteAyatSchema = z.object({
  ayatKey: z.number().int().positive(),
  userId: z.string().min(1, "User ID is required"),
  surah_number: z.number().int().positive(),
});

export const upsertReadingHistory = z.object({
  surahName: z.string().min(1, "Surah name is required"),
  surahNumber: z.number().int().positive(),
  timestamp: z.date().default(new Date()),
})

export const deleteReadingHistorySchema = z.object({
  surahNumber: z.number().int().positive(),
})

// Types via z.infer
export type SaveFavoriteAyat = z.infer<typeof SaveFavoriteAyatSchema>;
export type DeleteFavoriteAyat = z.infer<typeof DeleteFavoriteAyatSchema>;
export type GetFavoriteAyat = z.infer<typeof GetFavoriteAyatSchema>;
export type CreateNoteAyat = z.infer<typeof CreateNoteAyatSchema>;
export type DeleteNoteAyat = z.infer<typeof DeleteNoteAyatSchema>;
export type GetNoteAyat = z.infer<typeof GetNoteAyatSchema>;
export type UpsertReadingHistory = z.infer<typeof upsertReadingHistory>;
export type DeleteReadingHistory = z.infer<typeof deleteReadingHistorySchema>;

