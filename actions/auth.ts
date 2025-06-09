'use server'

import { prisma } from "@/lib/prisma"
import { SigninSchema, SignupSchema } from "@/schemas/auth.schema"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { signIn, signOut } from "@/auth"

export const signupAction = async (data: z.infer<typeof SignupSchema>) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })
    if (existingUser) {
      throw new Error("User already exists")
    }

    await SignupSchema.parseAsync(data)
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await prisma.user.create({
      data: {
        name: data.fullName,
        email: data.email,
        password: hashedPassword,
      },
    })

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect:false,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error("Validation error: " + error.errors.map(e => e.message).join(", "))
    }
    throw error
  }
}

export const signinAction = async (data: z.infer<typeof SigninSchema>) => {
  try {
    await SigninSchema.parseAsync(data)

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      throw new Error("User not found")
    }

    const isMatch = await bcrypt.compare(data.password, user.password as string)
    if (!isMatch) {
      throw new Error("Invalid password")
    }

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
  } catch (error) {
    console.error('signinAction error:', error)
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw new Error("Redirect loop detected, please check credentials or callback URL")
    }
    throw new Error(error instanceof Error ? error.message : "An error occurred during sign in")
  }
}


export const signoutAction=async()=>{
    await signOut()
}