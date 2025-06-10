'use server'

import prisma from "@/lib/prisma";
import { ActionResult } from "@/types";

export interface SaveFavoriteAyat{
    ayatKey:number;
    userId:string;
    surah_number:number;
}

export interface deleteFavoriteAyat{
    ayatKey:number;
    userId?:string;
}

export interface getFavoriteAyat{
    ayatKey:number;
    userId:string;
    surah_number:number;
}

export const saveFavoriteAyatAction=async(data:SaveFavoriteAyat): Promise<ActionResult> =>{
    try{
        await prisma.favoriteAyah.create({
            data:{
                ayahKey:data.ayatKey,
                userId:data.userId,
                surah_number:data.surah_number
            }
        })

        return{
            success:true
        }
    }catch(error){
        console.log(error)
        return{
            success:false,
            error:"An error occurred while saving favorite ayat"
        }
    }
}

export const deleteFavoriteAyatAction=async(data:deleteFavoriteAyat) : Promise<ActionResult>=>{
    try {

        if(!data.userId){
            return{
                success:false,
                error:"User id is required"
            }
        }

        await prisma.favoriteAyah.deleteMany({
            where:{
                ayahKey:data.ayatKey,
                userId:data.userId
            }
        })

        return{
            success:true
        }
    } catch (error) {
        return{
            success:false,
            error:"An error occurred while deleting favorite ayat"
        }
    }
}

export const getFavoriteAyatAction=async(data:getFavoriteAyat): Promise<ActionResult>=>{
    try {
        const findAyat=await prisma.favoriteAyah.count({
            where:{
                ayahKey:data.ayatKey,
                userId:data.userId,
                surah_number:data.surah_number
            }
        })

        if(findAyat==0){
            return{
                success:false,
                error:"An error occurred while getting favorite ayat"
            } 
        }
        return{
            success:true
        }
    } catch (error) {
        return{
            success:false,
            error:"An error occurred while getting favorite ayat"
        }
    }
}