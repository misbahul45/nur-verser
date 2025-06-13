'use client'
import { useContext, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Play, Pause } from "lucide-react"
import { AudioContext } from "./ReadContext"

const AudioPlayer = ({ audioUrls }: { audioUrls: { [key: string]: string } }) => {
  const audioContext = useContext(AudioContext)
  const selectedReciter = audioContext?.selectedReciter ?? '01'
  const setSelectedReciter = audioContext?.setSelectedReciter ?? (() => {})
  const reciters = audioContext?.reciters ?? {}
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.removeEventListener('ended', handleAudioEnded)
    }

    if (typeof Audio !== 'undefined' && audioUrls[selectedReciter]) {
      audioRef.current = new Audio(audioUrls[selectedReciter])
      audioRef.current.addEventListener('ended', handleAudioEnded)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener('ended', handleAudioEnded)
        audioRef.current = null
      }
    }
  }, [selectedReciter, audioUrls])

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

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

  const handleReciterChange = (value: string) => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    setSelectedReciter(value)
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
      <Select value={selectedReciter} onValueChange={handleReciterChange}>
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
        className="w-[120px] flex items-center gap-2 cursor-pointer"
        disabled={!audioUrls[selectedReciter]}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
    </div>
  )
}

export default AudioPlayer