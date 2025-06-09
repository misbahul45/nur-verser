'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Home, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"

export default function NotFound() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  if (!mounted) return null

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#059669]/10 via-white to-[#f59e0b]/10 p-4">
      <div className="text-center p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-lg w-full border border-[#059669]/20 relative overflow-hidden">
        {/* Dekorasi Kaligrafi Sederhana */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#f59e0b]/20 rounded-full opacity-50 blur-md animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#059669]/20 rounded-full opacity-50 blur-md animate-pulse delay-500"></div>

        <div className="relative z-10">
          <h1 className="text-7xl font-bold text-[#059669] mb-4 drop-shadow-md animate-fadeIn">
            404
          </h1>
          <div className="absolute -top-2 -right-4 w-5 h-5 bg-[#f59e0b] rounded-full animate-bounce"></div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-2">
            Halaman Tidak Ditemukan
          </h2>
          
          <p className="text-lg text-gray-600 mb-4">
            Maaf, halaman yang Anda cari tidak ditemukan.
          </p>
          
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Seperti musafir yang tersesat, mari kita kembali ke jalan Al-Qur'an! 🌙
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 cursor-pointer bg-[#059669] hover:bg-[#047857] text-white px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg"
            >
              <Home size={18} />
              Kembali ke Beranda
            </Button>
            
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="flex cursor-pointer items-center gap-2 border-2 border-[#059669] text-[#059669] hover:bg-[#059669]/10 hover:border-[#059669]/50 px-6 py-3 rounded-full transition-all duration-200"
            >
              <ArrowLeft size={18} />
              Kembali
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}