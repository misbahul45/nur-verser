'use server'

import { auth } from "@/auth"

export const getUser=async()=>{
    try {
        const session=await auth()
        return session?.user
    } catch (error) {
       return null 
    }
}