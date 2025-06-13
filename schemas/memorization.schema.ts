import { z } from 'zod';

const memorizationProgressCreateSchema = z.object({
  surahNumber: z.number().int().positive(),
  totalsAyahs: z.number().int().positive(),
  startDate:z.date(),
  endDate:z.date().optional(),
  currentAyah: z.number().int().positive(),
});

const memorizationNoteCreateSchema = z.object({
  memorizationProgressId: z.string().cuid(),
  userId: z.string().cuid(),
  note: z.string().min(1, 'Note cannot be empty'),
});

const getMemorizationSchema=z.object({
    surahNumber:z.number().positive(),
    startAyahNumber:z.number().positive(),
    endAyahNumber:z.number().positive()
})

type GetMemorizationSchmeaType=z.infer<typeof getMemorizationSchema>
type MemorizationProgressCreate = z.infer<typeof memorizationProgressCreateSchema>;
type MemorizationNoteCreate = z.infer<typeof memorizationNoteCreateSchema>;
export {
  memorizationProgressCreateSchema,
  memorizationNoteCreateSchema,
  getMemorizationSchema
};

export type {
  MemorizationProgressCreate,
  MemorizationNoteCreate,
  GetMemorizationSchmeaType
};