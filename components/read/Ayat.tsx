'use client';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { AyatType, TafsirItem } from '@/types';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp, Play, Pause, Heart, StickyNote } from 'lucide-react';
import { AudioContext } from './ReadContext';
import AyatNotes from './AyatNotes';
import { deleteFavoriteAyatAction, saveFavoriteAyatAction, getNoteAyatAction } from '@/actions/read.action';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { ActionResult } from "@/types"

interface AyatProps {
  ayat: AyatType;
  surat_number: number;
  tafsir: TafsirItem | null;
  userId?: string;
  isFavorite: boolean;
}

const Ayat = ({ ayat, tafsir, userId, surat_number, isFavorite }: AyatProps) => {
  const [showTafsir, setShowTafsir] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favoriteAyat, setFavoriteAyat] = useState(isFavorite);
  const [showNotes, setShowNotes] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);

  const audioContext = useContext(AudioContext);
  const selectedReciter = audioContext?.selectedReciter ?? '01';
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data: noteData } = useQuery<ActionResult, Error>({
    queryKey: ['notes', ayat.nomorAyat, surat_number, userId],
    queryFn: ({ queryKey }) => {
      const [, ayatKeyParam, surahNumberParam, userIdParam] = queryKey as [string, number, number, string];
      return getNoteAyatAction({
        ayatKey: ayatKeyParam,
        surah_number: surahNumberParam,
        userId: userIdParam,
      });
    },
    enabled: !!userId,
  });

  const hasNote = Boolean(noteData?.data?.note);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener('ended', handleAudioEnded);
    }

    if (typeof Audio !== 'undefined' && ayat.audio?.[selectedReciter]) {
      audioRef.current = new Audio(ayat.audio[selectedReciter]);
      audioRef.current.addEventListener('ended', handleAudioEnded);
    }

    setIsPlaying(false);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleAudioEnded);
        audioRef.current = null;
      }
    };
  }, [selectedReciter, ayat.audio]);

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          toast.error('Maaf audio tidak dapat diputar');
        });
        setIsPlaying(true);
      }
    }
  };

  const toggleFavorite = async () => {
    if (userId) {
      let res;
      setIsLoadingFavorite(true);
      
      if (!favoriteAyat) {
        res = await saveFavoriteAyatAction({
          userId,
          ayahKey: ayat.nomorAyat,
          surah_number: surat_number,
          arabic: ayat.teksArab,
          terjemahan: ayat.teksIndonesia,
          tafsir: tafsir?.teks!
        });
        
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success('Ayat berhasil ditambahkan ke favorit');
          setFavoriteAyat(true);
        }
      } else {
        res = await deleteFavoriteAyatAction({
          userId,
          ayatKey: ayat.nomorAyat,
        });
        
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success('Ayat berhasil dihapus dari favorit');
          setFavoriteAyat(false);
        }
      }
      
      setIsLoadingFavorite(false);
      return;
    }
    toast.error('Silakan login terlebih dahulu');
  };

  return (
    <Card className="mb-4 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-emerald-700 flex justify-center items-center gap-2">
            Ayat {ayat.nomorAyat}
            {favoriteAyat && <div className="size-2 rounded-full bg-pink-600" />}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleAudio}
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              className="cursor-pointer"
              disabled={!ayat.audio?.[selectedReciter]}
            >
              {ayat.audio?.[selectedReciter] ? (
                isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )
              ) : (
                <span className="text-xs text-gray-400">No Audio</span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotes(!showNotes)}
              aria-label="Toggle notes"
              className={`cursor-pointer hover:bg-yellow-50 ${
                hasNote ? 'text-yellow-600' : 'text-gray-400'
              }`}
            >
              <StickyNote className={`w-5 h-5 ${hasNote ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFavorite}
              aria-label={favoriteAyat ? 'Remove from favorites' : 'Add to favorites'}
              className={`cursor-pointer hover:bg-red-50 ${
                favoriteAyat ? 'text-red-500' : 'text-gray-400'
              }`}
              disabled={isLoadingFavorite}
            >
              <Heart className={`w-5 h-5 ${favoriteAyat ? 'fill-current' : ''}`} />
            </Button>
            {tafsir && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTafsir(!showTafsir)}
                aria-label={showTafsir ? 'Hide tafsir' : 'Show tafsir'}
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
          <p className="md:text-3xl sm:text-2xl text-xl font-arabic text-right leading-relaxed">{ayat.teksArab}</p>
          <p className="italic text-sm text-right text-gray-600">{ayat.teksLatin}</p>
        </div>
        <p className="sm:text-base text-sm text-gray-800 mb-3">{ayat.teksIndonesia}</p>
        {userId && (
          <AyatNotes
            userId={userId}
            ayatKey={ayat.nomorAyat}
            surah_number={surat_number}
            arabic={ayat.teksArab}
            terjemahan={ayat.teksIndonesia}
            tafsir={tafsir?.teks!}
            showNotes={showNotes}
            setShowNotes={setShowNotes}
            noteData={noteData}
          />
        )}
        {showTafsir && tafsir && (
          <div className="p-3 border-l-4 border-emerald-500 bg-emerald-50 rounded">
            <p className="text-sm text-gray-700">{tafsir.teks}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Ayat;