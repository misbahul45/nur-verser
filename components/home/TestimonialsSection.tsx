'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"

const TestimonialsSection = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const testimonials = [
    {
      name: "Ahmad Fadli",
      role: "Mahasiswa",
      location: "Jakarta",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      testimonial: "Aplikasi ini sangat membantu saya dalam menghafal Al-Qur'an. Fitur pengulangan dan pelacakan progres membuatnya sangat mudah digunakan. Alhamdulillah, hafalan saya meningkat drastis!",
      highlight: "Hafalan meningkat 3x lebih cepat"
    },
    {
      name: "Siti Nurhaliza",
      role: "Ibu Rumah Tangga",
      location: "Bandung",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      testimonial: "Sebagai ibu yang sibuk, aplikasi ini memungkinkan saya belajar Al-Qur'an di waktu luang. Terjemahan dan tafsirnya sangat membantu pemahaman saya. Jazakallahu khairan!",
      highlight: "Belajar fleksibel kapan saja"
    },
    {
      name: "Muhammad Rizki",
      role: "Guru Mengaji",
      location: "Surabaya",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      testimonial: "Saya merekomendasikan aplikasi ini kepada semua santri saya. Fitur komunitas dan diskusi memungkinkan mereka saling belajar. Interface yang user-friendly membuatnya mudah digunakan.",
      highlight: "Direkomendasikan untuk santri"
    }
  ]

  if (!mounted) return null

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            💬 Testimoni Pengguna
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Apa Kata Pengguna Kami?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dengarkan pengalaman nyata dari ribuan Muslim yang telah merasakan manfaat belajar Al-Qur'an bersama Nur Quran
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg overflow-hidden relative"
            >
              <CardContent className="p-8 relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Quote className="h-8 w-8 text-emerald-600" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.testimonial}"
                </blockquote>

                {/* Highlight Badge */}
                <Badge className="mb-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                  ✨ {testimonial.highlight}
                </Badge>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-emerald-100">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-xs text-emerald-600">{testimonial.location}</p>
                  </div>
                </div>

                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ingin berbagi pengalaman Anda? 
          </p>
          <button className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-4 transition-colors">
            Tulis Testimoni Anda
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection