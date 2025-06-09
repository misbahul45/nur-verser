'use client'
import React, { useState, useRef } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { AyatType, TafsirItem } from '@/types';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp, Play, Pause } from 'lucide-react';

interface AyatProps{
    ayat: AyatType;
    tafsir: TafsirItem | null;
}

const Ayat = ({ ayat, tafsir }: AyatProps) => {
  const [showTafsir, setShowTafsir] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(typeof Audio !== 'undefined' ? new Audio(ayat.audio['05']) : null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }

      audioRef.current.onended = () => {
        setIsPlaying(false);
      }
    }
  }

  return (
    <Card className="mb-4 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-emerald-700">
            Ayat {ayat.nomorAyat}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleAudio}
              aria-label="Play Audio"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            {tafsir && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTafsir(!showTafsir)}
                aria-label="Toggle Tafsir"
                className="cursor-pointer"
              >
                {showTafsir ? <ChevronUp /> : <ChevronDown />}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <p className="text-3xl font-arabic text-right leading-relaxed">
            {ayat.teksArab}
          </p>
          <p className="italic text-sm text-right text-gray-600">
            {ayat.teksLatin}
          </p>
        </div>
        <p className="text-base text-gray-800 mb-3">
          {ayat.teksIndonesia}
        </p>
        {showTafsir && tafsir && (
          <div className="p-3 border-l-4 border-emerald-500 bg-emerald-50 rounded">
            <p className="text-sm text-gray-700">
              {tafsir.teks}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Ayat