'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Eye, EyeOff, Check } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { PasswordStrengthText } from '@/types'
import { SignupSchema as formSchema } from '@/schemas/auth.schema'
import { toast } from 'sonner'
import { signupAction } from '@/actions/auth.actions'
import { signIn } from 'next-auth/react'

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  })


const passwordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
}


const getPasswordStrengthText = (strength: number): PasswordStrengthText => {
    switch (strength) {
        case 0: case 1: return { text: 'Weak', color: 'text-red-500' }
        case 2: return { text: 'Fair', color: 'text-yellow-500' }
        case 3: return { text: 'Good', color: 'text-blue-500' }
        case 4: return { text: 'Strong', color: 'text-green-500' }
        default: return { text: '', color: '' }
    }
}

  const password = form.watch('password')
  const strength = passwordStrength(password)
  const strengthInfo = getPasswordStrengthText(strength)

  const onSubmit = async(data: z.infer<typeof formSchema>) => {
    try {
        await signupAction(data)
        await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect:false,
        })
        toast.success('Sign up successful')
        form.reset()
    } catch (error) {
        toast.error((error as Error).message)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Full Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500 pr-12"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            strength === 1 ? 'bg-red-500 w-1/4' :
                            strength === 2 ? 'bg-yellow-500 w-2/4' :
                            strength === 3 ? 'bg-blue-500 w-3/4' :
                            strength === 4 ? 'bg-green-500 w-full' : 'w-0'
                          }`}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium ${strengthInfo.color}`}>
                        {strengthInfo.text}
                      </span>
                    </div>
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className="px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500 pr-12"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
                {field.value && (
                  <div className="mt-2 flex items-center space-x-2">
                    {field.value === password ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600">Passwords match</span>
                      </>
                    ) : (
                      <span className="text-xs text-red-500">Passwords do not match</span>
                    )}
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-4 h-4 mt-1 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </FormControl>
                <FormLabel className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                  I agree to the{' '}
                  <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                    Privacy Policy
                  </Link>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="w-full bg-gradient-to-r cursor-pointer from-emerald-600 to-emerald-700 text-white py-4 rounded-2xl font-semibold text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {form.formState.isSubmitting?'Loading...':'Sign Up'}
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link href="/signin" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </>
  )
}
