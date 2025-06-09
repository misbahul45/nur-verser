'use client'

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Play, Pause } from "lucide-react"

const reciters = {
  '01': 'Abdullah Al-Juhany',
  '02': 'Abdul-Muhsin Al-Qasim',
  '03': 'Abdurrahman as-Sudais',
  '04': 'Ibrahim Al-Dossari',
  '05': 'Misyari Rasyid Al-Afasi',
}

const AudioPlayer = ({ audioUrls }: { audioUrls: { [key: string]: string } }) => {
  const [selectedReciter, setSelectedReciter] = useState('01')
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof Audio !== 'undefined') {
      audioRef.current = new Audio(audioUrls[selectedReciter])

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeAttribute('src')
        audioRef.current.load()
      }
    }
  }, [selectedReciter, audioUrls])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().catch(() => {})
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
      <Select
        value={selectedReciter}
        onValueChange={(value) => {
          if (audioRef.current) {
            audioRef.current.pause()
            setIsPlaying(false)
            setSelectedReciter(value)
          }
        }}
      >
        <SelectTrigger className="w-[250px] bg-white text-black">
          <SelectValue placeholder="Pilih Qari" />
        </SelectTrigger>
        <SelectContent className="bg-white text-emerald-800">
          {Object.entries(reciters).map(([key, name]) => (
            <SelectItem key={key} value={key}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={togglePlayPause}
        variant="outline"
        className="w-[120px] flex items-center gap-2 cursor-pointer"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
    </div>
  )
}

export default AudioPlayer
