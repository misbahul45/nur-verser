import SignUpForm from '@/components/auth/SignupForm'
import { BookOpen, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 p-8">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl transform -translate-x-8 translate-y-8"></div>
            
            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back to Home</span>
              </Link>
              
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Join Us</h1>
                  <p className="text-emerald-100">Create your Nur Quran account</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  )
}