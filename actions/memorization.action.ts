'use server'
import prisma from "@/lib/prisma"
import { ActionResult } from "@/types"
import { getUser } from "."
import { getMemorizationSchema, GetMemorizationSchmeaType, MemorizationProgressCreate, memorizationProgressCreateSchema } from "@/schemas/memorization.schema"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { MemorizationProgress } from "@/types/memorization.type"

export const getAllMemorization = async (): Promise<ActionResult<MemorizationProgress[]>> => {
    try {
        const user = await getUser()
        if (!user) {
            return {
                success: false,
                error: 'Cannot get a personal data'
            }
        }
        const data = await prisma.memorizationProgress.findMany({
            where: {
                userId: user.id
            },
            include: {
                notes: true
            }
        })

        return {
            success: true,
            data
        }
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error.message : String(error) 
        };
    }
}

export const getOneMemorizationAction = async (data: GetMemorizationSchmeaType): Promise<ActionResult<MemorizationProgress>> => {
    try {
        const validatedData = getMemorizationSchema.parse(data)
        const user = await getUser()
        if (!user) {
            return {
                success: false,
                error: 'Cannot get a personal data'
            }
        }
        
        const note = await prisma.memorizationProgress.findFirst({
            where: {
                userId: user.id,
                surahNumber: validatedData.surahNumber,
            },
            include: { notes: true }
        })

        if (!note) {
            return {
                success: false,
                error: 'No data found'
            }
        }
        
        return {
            success: true,
            data: note
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: 'Validation error: ' + error.errors.map(e => e.message).join(', ')
            }
        }
        return { 
            success: false, 
            error: error instanceof Error ? error.message : String(error) 
        };
    }
}

export const createOrUpdateMemorizationAction = async (data: MemorizationProgressCreate): Promise<ActionResult> => {
    try {
        const validatedData = memorizationProgressCreateSchema.parse(data)
        const user = await getUser()
        if (!user) {
            return {
                success: false,
                error: 'Cannot get a personal data'
            }
        }

        const existingRecord = await prisma.memorizationProgress.findFirst({
            where: {
                userId: user.id,
                surahNumber: validatedData.surahNumber
            }
        })

        if (existingRecord) {
            await prisma.memorizationProgress.update({
                where: {
                    id: existingRecord.id
                },
                data: {
                    ...validatedData,
                    userId: user.id
                }
            })
        } else {
            await prisma.memorizationProgress.create({
                data: {
                   totalAyahs: validatedData.totalsAyahs,
                   surahNumber: validatedData.surahNumber,
                   endDate: validatedData.endDate,
                   startDate: validatedData.startDate,
                   userId: user.id
                }
            })
        }

        revalidatePath('/memorization')

        return {
            success: true,
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: 'Validation error: ' + error.errors.map(e => e.message).join(', ')
            }
        }
        return {
            success: false,
            error: 'An error occurred while creating/updating data: ' + (error instanceof Error ? error.message : String(error))
        }
    }
}