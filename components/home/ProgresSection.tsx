'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, Users, Play, Clock, Target, TrendingUp, Award } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function ProgressSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: BookOpen,
      title: "Baca Al-Qur'an",
      description: "Akses Al-Qur'an digital dengan terjemahan dan tafsir terpercaya, kapan saja, di mana saja.",
      highlights: ["30 Juz lengkap", "Terjemahan akurat", "Tafsir mendalam", "Mode offline"],
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      href: "/read",
      buttonText: "Mulai Membaca",
      stats: "6,236 Ayat"
    },
    {
      icon: Brain,
      title: "Hafal Ayat",
      description: "Latih hafalan Anda dengan panduan interaktif dan pelacakan progres yang mudah.",
      highlights: ["Metode bertahap", "Pengulangan otomatis", "Tracking progres", "Reminder harian"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      href: "/memorize",
      buttonText: "Mulai Menghafal",
      stats: "95% Berhasil"
    },
    {
      icon: Users,
      title: "Bergabung dengan Komunitas",
      description: "Terhubung dengan ribuan Muslim lainnya, berbagi pengalaman, dan belajar bersama.",
      highlights: ["Forum diskusi", "Grup belajar", "Mentor berpengalaman", "Event rutin"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      href: "/community",
      buttonText: "Gabung Sekarang",
      stats: "50K+ Member"
    }
  ]

  if (!mounted) return null

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            🚀 Fitur Utama
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Belajar Al-Qur'an Jadi Lebih Mudah dengan Nur Quran
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Temukan fitur-fitur unggulan kami untuk membantu Anda membaca, menghafal, 
            dan terhubung dengan komunitas Muslim di seluruh dunia.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Belajar 15 menit/hari</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Target yang dapat dicapai</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Progres yang terukur</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden relative"
            >
              <CardHeader className="pb-4">
                {/* Icon and Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.textColor}`} />
                  </div>
                  <Badge variant="outline" className={`${feature.textColor} border-current`}>
                    {feature.stats}
                  </Badge>
                </div>

                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </CardTitle>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                  {feature.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${feature.color}`}></div>
                      {highlight}
                    </div>
                  ))}
                </div>

                <Link href={feature.href}>
                  <Button
                    className={`w-full bg-gradient-to-r ${feature.color} text-white hover:opacity-90 transition-all duration-200 group-hover:scale-105 font-semibold py-3`}
                  >
                    {feature.buttonText}
                    <Play className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>

              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Nur Quran?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lebih dari sekedar aplikasi, Nur Quran adalah teman spiritual Anda dalam perjalanan mendekatkan diri kepada Allah SWT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Terpercaya", desc: "Direkomendasikan ulama" },
              { icon: Clock, title: "Fleksibel", desc: "Belajar kapan saja" },
              { icon: Target, title: "Terarah", desc: "Kurikulum terstruktur" },
              { icon: TrendingUp, title: "Progresif", desc: "Hasil yang terukur" }
            ].map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}