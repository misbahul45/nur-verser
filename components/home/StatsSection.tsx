'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Clock, Trophy } from "lucide-react"
import { useEffect, useState } from "react"

const StatsSection = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    {
      icon: Users,
      number: "50K+",
      label: "Pengguna Aktif",
      description: "Muslim di seluruh dunia",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: BookOpen,
      number: "6,236",
      label: "Ayat Al-Qur'an",
      description: "Lengkap dengan terjemahan",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Clock,
      number: "10M+",
      label: "Menit Belajar",
      description: "Total waktu pembelajaran",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Trophy,
      number: "95%",
      label: "Tingkat Kepuasan",
      description: "Rating dari pengguna",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    }
  ]

  if (!mounted) return null

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dipercaya Ribuan Muslim
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bergabunglah dengan komunitas Muslim yang terus berkembang dalam mempelajari Al-Qur'an
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg overflow-hidden"
            >
              <CardContent className="p-6 text-center relative">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </h3>
                  <p className="text-lg font-semibold text-gray-700">
                    {stat.label}
                  </p>
                  <p className="text-sm text-gray-500">
                    {stat.description}
                  </p>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection