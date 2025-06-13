'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Download, Smartphone, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const CallToActionSection = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-20 w-32 h-32 bg-amber-300/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Mulai Perjalanan Spiritual Anda
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Bergabunglah dengan ribuan Muslim yang telah merasakan kemudahan belajar Al-Qur'an dengan Nur Quran. 
            Download sekarang dan mulai perjalanan spiritual Anda hari ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-primary-foreground">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center">
                    <Star className="h-6 w-6 text-amber-800" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">4.9/5 Rating</h3>
                    <p className="text-primary-foreground/70">Dari 10K+ reviews</p>
                  </div>
                </div>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Aplikasi pembelajaran Al-Qur'an terbaik dengan fitur lengkap dan interface yang mudah digunakan. 
                  Dapatkan pengalaman belajar yang tak terlupakan.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-amber-900">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary-foreground mb-2">Pembelajaran Interaktif</h4>
                    <p className="text-primary-foreground/70">
                      Belajar dengan metode yang engaging dan mudah dipahami untuk semua usia
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-amber-900">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary-foreground mb-2">Pelacakan Progres</h4>
                    <p className="text-primary-foreground/70">
                      Monitor perkembangan hafalan dan pembelajaran Anda dengan detail
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-amber-900">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-primary-foreground mb-2">Komunitas Aktif</h4>
                    <p className="text-primary-foreground/70">
                      Bergabung dengan komunitas Muslim dan saling mendukung dalam belajar
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-left">
              <p className="text-primary-foreground font-semibold">Mulai gratis hari ini</p>
              <p className="text-primary-foreground/70 text-sm">Tanpa biaya tersembunyi, selamanya</p>
            </div>
            <Link href="/signin">
              <Button 
                size="lg"
                className="bg-amber-400 text-amber-900 hover:bg-amber-300 px-8 py-3 rounded-xl font-bold group"
              >
                Mulai Sekarang
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-primary-foreground/70 mb-6">Dipercaya oleh:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-primary-foreground font-semibold">50K+ Pengguna</div>
            <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>
            <div className="text-primary-foreground font-semibold">10+ Negara</div>
            <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>
            <div className="text-primary-foreground font-semibold">99.9% Uptime</div>
            <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>
            <div className="text-primary-foreground font-semibold">24/7 Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection