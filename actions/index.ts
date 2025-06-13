'use server'
import { auth } from "@/auth"
import { UserSession } from "@/types";

export const fetchSession=async()=>{
    try {
        const session=await auth()
        return session;
    } catch (error) {
       return null 
    }
}

export const getUser = async (): Promise<UserSession | undefined> => {
    try {
        const session = await auth();
        const user = session?.user;
        if (user && typeof user.id === "string") {
            return user as UserSession;
        }
        return undefined;
    } catch {
        return undefined;
    }
}