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
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-primary/10 border-0 shadow-xl rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary to-transparent rounded-full transform rotate-12 scale-150" />
      </div>

      <CardContent className="relative z-10 p-4 sm:p-6 md:p-9 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Ayat of the Day
              </h2>
              <p className="text-primary font-medium text-sm">
                Daily Spiritual Reflection
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-primary/20 shadow-sm">
              <div className="text-right mb-6">
                <p className="text-2xl md:text-4xl font-['Amiri'] text-foreground leading-loose">
                  {ayat.teksArab}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                  "{ayat.teksIndonesia}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <div className="w-2 h-2 bg-primary rounded-full" />
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
                className="bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 text-secondary-foreground px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {showTafsir ? 'Hide Tafsir' : 'Read Tafsir'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handlePlayAudio}
                disabled={isPlaying}
                className="border-primary/30 bg-background/80 hover:bg-primary/5 text-primary hover:text-primary/80 px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
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
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 md:p-8 border border-secondary/20 shadow-sm animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Tafsir</h3>
                </div>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
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