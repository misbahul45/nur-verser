import { z } from "zod";

export const SignupSchema = z.object({
  fullName: z.string().min(4, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
  agreeTerms: z
    .boolean()
    .refine((val) => val === true, { message: 'You must agree to the terms and conditions' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const SigninSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean(),
})