'use client';
import React, { useState, useMemo } from 'react';
import SurahCard from './Surahcard';
import SearchForm from './FormSearch';
import { SurahTypeList } from '@/types';
import { cn } from '@/lib/utils';

interface ListSuratProps {
  allSurat: SurahTypeList[];
}

export default function ListSurat({ allSurat }: ListSuratProps) {
  const [filteredSurahs, setFilteredSurahs] = useState<SurahTypeList[]>(allSurat);

  const surahsToRender = useMemo(() => filteredSurahs, [filteredSurahs]);

  return (
    <div className="space-y-6">
      <SearchForm surahs={allSurat} onSearch={setFilteredSurahs} />
      <div
        className={cn(
          'grid gap-6',
          'grid-cols-1 lg:grid-cols-2'
        )}
      >
        {surahsToRender.length > 0 ? (
          surahsToRender.map((surah) => (
            <SurahCard key={surah.nomor} surah={surah} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-sm">
              Tidak ada surah yang ditemukan. Coba ubah pencarian atau filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}