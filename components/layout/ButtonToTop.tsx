'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ChevronUp } from 'lucide-react'

const ButtonToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <Button
      onClick={scrollToTop}
      className='fixed bottom-5 right-8 bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white rounded-full shadow-lg p-2'
      size="icon"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  )
}

export default ButtonToTop
