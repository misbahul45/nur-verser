'use client';

import React from 'react';
import { Play, BookOpen, Volume2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { AyatType } from '@/types';

interface AyatOfTheDayProps {
  ayat: AyatType;
  surahName?: string;
  surahNumber?: number;
  textTafsir: string;
}

const AyatOfTheDay: React.FC<AyatOfTheDayProps> = ({
  ayat,
  surahName = 'Surah',
  surahNumber,
  textTafsir,
}) => {
  const [showTafsir, setShowTafsir] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayAudio = () => {
    const audioUrl = ayat.audio?.['05'];
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      setIsPlaying(true);
      audio.play();
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-0 shadow-xl rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5" />
      
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-300 to-transparent rounded-full transform rotate-12 scale-150" />
      </div>

      <CardContent className="relative z-10 p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Ayat of the Day
              </h2>
              <p className="text-emerald-600 font-medium text-sm">
                Daily Spiritual Reflection
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-emerald-100 shadow-sm">
              <div className="text-right mb-6">
                <p className="text-2xl md:text-4xl font-['Amiri'] text-gray-800 leading-loose">
                  {ayat.teksArab}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                  "{ayat.teksIndonesia}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-sm">
                      {surahName} [{surahNumber}:{ayat.nomorAyat}]
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setShowTafsir(!showTafsir)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {showTafsir ? 'Hide Tafsir' : 'Read Tafsir'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handlePlayAudio}
                disabled={isPlaying}
                className="border-emerald-200 bg-white/80 hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800 px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {isPlaying ? (
                  <Volume2 className="w-4 h-4 mr-2 animate-pulse" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isPlaying ? 'Playing...' : 'Listen'}
              </Button>
            </div>

            {showTafsir && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-100 shadow-sm animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Tafsir</h3>
                </div>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {textTafsir}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AyatOfTheDay;