'use server'
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ActionResult } from "@/types";
import { SaveFavoriteAyat, SaveFavoriteAyatSchema, DeleteFavoriteAyatSchema, GetFavoriteAyatSchema, DeleteFavoriteAyat, CreateNoteAyat, CreateNoteAyatSchema, GetFavoriteAyat, DeleteNoteAyatSchema, DeleteNoteAyat, UpdateNoteAyat, UpdateNoteAyatSchema, GetNoteAyat, GetNoteAyatSchema } from "@/schemas/read.schema";

export const saveFavoriteAyatAction = async (data: SaveFavoriteAyat): Promise<ActionResult> => {
  try {
    const validatedData = SaveFavoriteAyatSchema.parse(data);

    await prisma.favoriteAyah.create({
      data: validatedData
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
    // Validate input
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
    // Validate input
    const validatedData = GetFavoriteAyatSchema.parse(data);

    const findAyat = await prisma.favoriteAyah.count({
      where: {
        AND: [
          { ayahKey: validatedData.ayatKey },
          { userId: validatedData.userId },
          { surah_number: validatedData.surah_number }
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

export const createNoteAyatAction = async (data: CreateNoteAyat): Promise<ActionResult> => {
  try {
    const validatedData = CreateNoteAyatSchema.parse(data);

    await prisma.ayahNotes.create({
      data: {
        ...validatedData,
        ayahKey: validatedData.ayatKey,
        surah_number: validatedData.surah_number,
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
      error: "An error occurred while creating note ayat"
    };
  }
};

export const getNoteAyatAction = async (data: GetNoteAyat): Promise<ActionResult> => {
  try {
    // Validate input
    const validatedData = GetNoteAyatSchema.parse(data);

    const note = await prisma.ayahNotes.findFirst({
      where: {
        AND: [
          { ayahKey: validatedData.ayatKey },
          { userId: validatedData.userId },
          { surah_number: validatedData.surah_number }
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

export const updateNoteAyatAction = async (data: UpdateNoteAyat): Promise<ActionResult> => {
  try {
    // Validate input
    const validatedData = UpdateNoteAyatSchema.parse(data);

    await prisma.ayahNotes.updateMany({
      where: {
        AND: [
          { ayahKey: validatedData.ayatKey },
          { userId: validatedData.userId },
          { surah_number: validatedData.surah_number }
        ]
      },
      data: {
        note: validatedData.note,
        arabic: validatedData.arabic,
        terjemahan: validatedData.terjemahan,
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
      error: "An error occurred while updating note ayat"
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
          { surah_number: validatedData.surah_number }
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