'use server'
import { auth } from "@/auth"

export const fetchSession=async()=>{
    try {
        const session=await auth()
        return session;
    } catch (error) {
       return null 
    }
}