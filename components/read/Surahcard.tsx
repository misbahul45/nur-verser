'use client';
import { BookOpen, MapPin, Play, Volume2, Pause, ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { SurahTypeList } from "@/types";
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { upsertReadingHistoryAction } from "@/actions/read.action";

const qariList = [
  { id: '01', name: 'Abdullah Al-Juhany' },
  { id: '02', name: 'Abdul Muhsin Al-Qasim' },
  { id: '03', name: 'Abdurrahman as-Sudais' },
  { id: '04', name: 'Ibrahim Al-Dossari' },
  { id: '05', name: 'Misyari Rasyid Al-Afasi' }
];

const SurahCard = ({ surah }: { surah: SurahTypeList }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedQari, setSelectedQari] = useState('05');
  const [showQariDropdown, setShowQariDropdown] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  const handlePlayPause = () => {
    const audioUrl = surah.audioFull?.[selectedQari];
    
    if (!audioUrl) return;

    if (audioRef.current && audioRef.current.src === audioUrl) {
      if (isPlaying && !isPaused) {
        audioRef.current.pause();
        setIsPaused(true);
      } else if (isPaused) {
        audioRef.current.play();
        setIsPaused(false);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setIsPlaying(true);
      setIsPaused(false);
      
      audio.play();
      
      audio.onended = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      
      audio.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handleQariChange = (qariId: string) => {
    if (isPlaying) {
      handleStop();
    }
    setSelectedQari(qariId);
    setShowQariDropdown(false);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const currentQari = qariList.find(q => q.id === selectedQari);

  const onSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    const res = await upsertReadingHistoryAction({
      surahNumber: surah.nomor,
      surahName: surah.namaLatin,
      timestamp: new Date()
    });

    if (res.success) { 
      router.push(`/read/${surah.nomor}`); 
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              {surah.nomor}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-800">{surah.namaLatin}</h3>
                <Badge 
                  variant={surah.tempatTurun === 'Mekah' ? 'default' : 'secondary'}
                  className={`${
                    surah.tempatTurun === 'Mekah' 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                  } text-white border-0 shadow-sm`}
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  {surah.tempatTurun}
                </Badge>
              </div>
              <p className="text-2xl font-['Amiri'] text-gray-700 mb-1">{surah.nama}</p>
              <p className="text-sm text-emerald-600 font-medium">"{surah.arti}"</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Jumlah Ayat</p>
            <p className="text-lg font-bold text-gray-800">{surah.jumlahAyat}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <button
              onClick={() => setShowQariDropdown(!showQariDropdown)}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg text-sm hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700 font-medium">
                  {currentQari?.name || 'Select Qari'}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-purple-600 transition-transform duration-200 ${showQariDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showQariDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                {qariList.map((qari) => (
                  <button
                    key={qari.id}
                    onClick={() => handleQariChange(qari.id)}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-purple-50 transition-colors duration-150 ${
                      selectedQari === qari.id ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {qari.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            onClick={handlePlayPause}
            variant="outline"
            size="sm"
            className={`${
              isPlaying 
                ? 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100' 
                : 'border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800'
            } rounded-lg transition-all duration-200`}
          >
            {isPlaying && !isPaused ? (
              <Pause className="w-4 h-4 mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isPlaying && !isPaused ? 'Pause' : isPaused ? 'Resume' : 'Play'}
          </Button>

          {isPlaying && (
            <Button
              onClick={handleStop}
              variant="outline"
              size="sm"
              className="border-red-200 bg-white hover:bg-red-50 text-red-700 hover:text-red-800 rounded-lg transition-all duration-200"
            >
              Stop
            </Button>
          )}
          
          <Button
            onClick={() => setShowDescription(!showDescription)}
            variant="outline"
            size="sm"
            className="border-blue-200 bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-800 rounded-lg transition-all duration-200"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {showDescription ? 'Hide' : 'Read'} Description
          </Button>
        </div>

        {isPlaying && (
          <div className="mb-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-purple-600 animate-pulse" />
              <span className="text-sm text-purple-700 font-medium">
                {isPaused ? 'Paused' : 'Now Playing'} - {currentQari?.name}
              </span>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <Button
            variant="outline"
            type="submit"
            className="mt-4 block ml-auto rounded-lg cursor-pointer border-emerald-200 bg-white text-emerald-600 text-sm font-semibold hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-colors duration-200 px-4 py-2"
          >
            Baca {surah.namaLatin}
          </Button>
        </form>
      </CardContent>

      {showDescription && (
        <CardFooter>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-3 h-3 text-white" />
              </div>
              <h4 className="text-sm font-semibold text-gray-800">Deskripsi</h4>
            </div>
            <div 
              className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
            />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default SurahCard;