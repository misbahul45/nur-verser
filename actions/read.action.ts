'use server'
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ActionResult } from "@/types";
import { SaveFavoriteAyat, SaveFavoriteAyatSchema, DeleteFavoriteAyatSchema, GetFavoriteAyatSchema, DeleteFavoriteAyat, CreateNoteAyat, CreateNoteAyatSchema, GetFavoriteAyat, DeleteNoteAyatSchema, DeleteNoteAyat, GetNoteAyat, GetNoteAyatSchema, upsertReadingHistory, UpsertReadingHistory, DeleteReadingHistory, deleteReadingHistorySchema } from "@/schemas/read.schema";
import { getUser } from ".";
import { redirect } from "next/navigation";

export const saveFavoriteAyatAction = async (data: SaveFavoriteAyat): Promise<ActionResult> => {
  try {
    const validatedData = SaveFavoriteAyatSchema.parse(data);

    await prisma.favoriteAyah.create({
      data: {
        userId: validatedData.userId,
        ayahKey: validatedData.ayahKey,
        surahNumber: validatedData.surah_number,
        ayahNumber: validatedData.ayahKey, 
        arabic: validatedData.arabic,         
        translation: validatedData.terjemahan, 
        tafsir: validatedData.tafsir           
      }
    });

    return {
      success: true
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => e.message).join(", ")
      };
    }
    return {
      success: false,
      error: "An error occurred while saving favorite ayat"
    };
  }
};

export const deleteFavoriteAyatAction = async (data: DeleteFavoriteAyat): Promise<ActionResult> => {
  try {
    const validatedData = DeleteFavoriteAyatSchema.parse(data);

    if (!data.userId) {
      return {
        success: false,
        error: "User id is required"
      };
    }

    await prisma.favoriteAyah.deleteMany({
      where: {
        AND: [
          { ayahKey: validatedData.ayatKey },
          { userId: validatedData.userId }
        ]
      }
    });

    return {
      success: true
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => e.message).join(", ")
      };
    }
    return {
      success: false,
      error: "An error occurred while deleting favorite ayat"
    };
  }
};

export const getFavoriteAyatAction = async (data: GetFavoriteAyat): Promise<ActionResult> => {
  try {

    const validatedData = GetFavoriteAyatSchema.parse(data);

    const findAyat = await prisma.favoriteAyah.count({
      where: {
        AND: [
          { ayahKey: validatedData.ayatKey },
          { userId: validatedData.userId },
          { surahNumber: validatedData.surah_number }
        ]
      }
    });

    if (findAyat === 0) {
      return {
        success: false,
        error: "No favorite ayat found"
      };
    }
    return {
      success: true,
      data: findAyat
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => e.message).join(", ")
      };
    }
    return {
      success: false,
      error: "An error occurred while getting favorite ayat"
    };
  }
};

export const createNoteAyatAction = async (
  data: CreateNoteAyat
): Promise<ActionResult> => {
  try {
    const validatedData = CreateNoteAyatSchema.parse(data);

    await prisma.ayahNotes.upsert({
      where: {
        userId_ayahKey_surahNumber: {
          userId: validatedData.userId,
          ayahKey: validatedData.ayatKey,
          surahNumber: validatedData.surah_number,
        },
      },
      update: {
        note: validatedData.note,
        tafsir: validatedData.tafsir,
        translation: validatedData.terjemahan,
        arabic: validatedData.arabic,
      },
      create: {
        userId: validatedData.userId,
        note: validatedData.note,
        tafsir: validatedData.tafsir,
        translation: validatedData.terjemahan,
        arabic: validatedData.arabic,
        ayahKey: validatedData.ayatKey,
        surahNumber: validatedData.surah_number,
        ayahNumber: validatedData.ayatKey, 
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => e.message).join(", "),
      };
    }
    return {
      success: false,
      error: "An error occurred while creating/updating note ayat",
    };
  }
};

export const getNoteAyatAction = async (data: GetNoteAyat): Promise<ActionResult> => {
  try {
    const validatedData = GetNoteAyatSchema.parse(data);

    const note = await prisma.ayahNotes.findFirst({
      where: {
        AND: [
          { ayahKey: validatedData.ayatKey },
          { userId: validatedData.userId },
          { surahNumber: validatedData.surah_number }
        ]
      }
    });

    if (!note) {
      return {
        success: false,
        error: "No note found for this ayat"
      };
    }

    return {
      success: true,
      data: note
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => e.message).join(", ")
      };
    }
    return {
      success: false,
      error: "An error occurred while getting note ayat"
    };
  }
};

export const deleteNoteAyatAction = async (data: DeleteNoteAyat): Promise<ActionResult> => {
  try {
    const validatedData = DeleteNoteAyatSchema.parse(data);

    await prisma.ayahNotes.deleteMany({
      where: {
        AND: [
          { ayahKey: validatedData.ayatKey },
          { userId: validatedData.userId },
          { surahNumber: validatedData.surah_number }
        ]
      }
    });

    return {
      success: true
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => e.message).join(", ")
      };
    }
    return {
      success: false,
      error: "An error occurred while deleting note ayat"
    };
  }
};



export const upsertReadingHistoryAction = async (data: UpsertReadingHistory): Promise<ActionResult> => {
  try {
    const user = await getUser();
    if (!user || !user.id) {
      return {
        success: true,
      };
    }

    const validatedData = upsertReadingHistory.parse(data);

    // Try to find existing record first
    const existingRecord = await prisma.readingHistory.findFirst({
      where: {
        userId: user.id,
        surahNumber: validatedData.surahNumber,
      },
    });

    if (existingRecord) {
      await prisma.readingHistory.update({
        where: {
          id: existingRecord.id,
        },
        data: {
          timestamp: validatedData.timestamp,
        },
      });
    } else {
      await prisma.readingHistory.create({
        data: {
          userId: user.id,
          surahNumber: validatedData.surahNumber,
          surahName: validatedData.surahName,
          timestamp: validatedData.timestamp,
        },
      });
    }
    return{
      success:true
    }
  } catch (error) {

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => e.message).join(", "),
      };
    }
    
    return {
      success: false,
      error: "An error occurred while upserting reading history",
    };
  }
}

export const deleteReadingHistoryAction = async (data: DeleteReadingHistory): Promise<ActionResult> => {
  try {
    const user = await getUser();
    if (!user || !user.id) {
      return {
        success: false,
        error: "User not authenticated"
      };
    }

    const validatedData = deleteReadingHistorySchema.parse(data);

        await prisma.readingHistory.deleteMany({
          where: {
            userId: user.id,
            surahNumber: validatedData.surahNumber,
          },
        });
    
        return {
          success: true,
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            success: false,
            error: error.errors.map((e) => e.message).join(", "),
          };
        }
        return {
          success: false,
          error: "An error occurred while deleting reading history",
        };
      }
    }

