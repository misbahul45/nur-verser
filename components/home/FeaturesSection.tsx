import React from 'react'
import { Badge } from '../ui/badge'
import { features } from '@/constants'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const FeaturesSection = () => {
  return (
    <section id="fitur" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary/80 hover:bg-emerald/20">
            ⚡ Fitur Unggulan
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fitur Lengkap untuk Pembelajaran
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rasakan pengalaman belajar Al-Qur'an yang tak terlupakan dengan fitur-fitur canggih dan intuitif
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                  feature.color.includes('emerald') ? 'bg-primary/10' : 'bg-primary-foreground'
                }`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-center">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection