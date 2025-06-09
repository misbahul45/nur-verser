'use server'
import { SigninSchema, SignupSchema } from "@/schemas/auth.schema"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { signIn, signOut } from "@/auth"
import prisma from "@/lib/prisma"

type ActionResult = {
  success: boolean
  error?: string
  data?: any
}

export const signupAction = async (data: z.infer<typeof SignupSchema>): Promise<ActionResult> => {
  try {
    const validatedData = await SignupSchema.parseAsync(data)
    
    const existingUser = await prisma.user.findFirst({
      where: { email: validatedData.email },
    })
    
    if (existingUser) {
      return { success: false, error: "User already exists" }
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10)
    const user = await prisma.user.create({
      data: {
        name: validatedData.fullName,
        email: validatedData.email,
        password: hashedPassword,
      },
    })

    const result = await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false
    })

    return { success: true, data: { userId: user.id } }
    
  } catch (error) {
    console.error('Signup error:', error)
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: "Validation error: " + error.errors.map(e => e.message).join(", ") 
      }
    }
    
    return { success: false, error: "An error occurred during sign up" }
  }
}

export const signinAction = async (data: z.infer<typeof SigninSchema>): Promise<ActionResult> => {
  try {
    const validatedData = await SigninSchema.parseAsync(data)

    const user = await prisma.user.findFirst({
      where: { email: validatedData.email },
    })

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    const isMatch = await bcrypt.compare(validatedData.password, user.password as string)
    if (!isMatch) {
      return { success: false, error: "Invalid email or password" }
    }

    const result = await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false
    })

    return { success: true, data: { userId: user.id } }
    
  } catch (error) {
    console.error('Signin error:', error)
    
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      return { success: true }
    }
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: "Validation error: " + error.errors.map(e => e.message).join(", ") 
      }
    }
    
    return { success: false, error: (error as Error).message }
  }
}

export const signoutAction = async (): Promise<ActionResult> => {
  try {
    await signOut({
      redirectTo:'/signin'
    })
    return { success: true }
  } catch (error) {
    console.error('Signout error:', error)
    return { success: false, error: "An error occurred during sign out" }
  }
}