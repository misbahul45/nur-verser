'use client'
import { useEffect } from 'react';
import { useQueryState, parseAsString, parseAsStringEnum } from 'nuqs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SurahTypeList } from '@/types';

interface SearchFormProps {
  surahs: SurahTypeList[];
  onSearch: (filteredSurahs: SurahTypeList[]) => void;
}

export default function SearchForm({ surahs, onSearch }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString.withDefault(''));
  const [tempatTurunFilter, setTempatTurunFilter] = useQueryState(
    'tempat',
    parseAsStringEnum(['all', 'Mekah', 'Madinah']).withDefault('all')
  );

  useEffect(() => {
    handleSearch();
  }, [searchQuery, tempatTurunFilter]);

  const handleSearch = () => {
    const cleanQuery = searchQuery.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const filteredSurahs = surahs.filter((surah) => {
      const cleanNamaLatin = surah.namaLatin.toLowerCase().replace(/[^a-z0-9\s]/g, '');
      const cleanNama = surah.nama.toLowerCase().replace(/[^a-z0-9\s]/g, '');
      const matchesQuery =
        cleanNamaLatin.includes(cleanQuery) ||
        cleanNama.includes(cleanQuery) ||
        surah.nomor.toString().includes(cleanQuery);
      const matchesTempatTurun = tempatTurunFilter === 'all' || surah.tempatTurun === tempatTurunFilter;
      return matchesQuery && matchesTempatTurun;
    });
    onSearch(filteredSurahs);
  };

  const handleReset = async () => {
    await Promise.all([setSearchQuery(''), setTempatTurunFilter('all')]);
  };

  const hasActiveFilters = searchQuery !== '' || tempatTurunFilter !== 'all';

  return (
    <div className="w-full p-6 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 rounded-2xl border border-emerald-200/50 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500">
            <Search className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Cari Surah</h3>
            <p className="text-sm text-gray-600">Temukan surah dengan mudah</p>
          </div>
        </div>
        {hasActiveFilters && (
          <Button
            onClick={handleReset}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg"
          >
            <X className="h-4 w-4 mr-1" />
            Hapus Filter
          </Button>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-6">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Nama atau Nomor Surah
          </label>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
            <Input
              id="search"
              type="text"
              placeholder="Cari nama surah atau nomor (misal: Al-Fatihah, 1)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl border-gray-300 bg-white/80 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-200 hover:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div className="md:col-span-3">
          <label htmlFor="tempatTurun" className="block text-sm font-medium text-gray-700 mb-2">
            Tempat Turun
          </label>
          <Select value={tempatTurunFilter} onValueChange={(value) => setTempatTurunFilter(value as 'all' | 'Mekah' | 'Madinah')}>
            <SelectTrigger
              id="tempatTurun"
              className={cn(
                'h-11 rounded-xl border-gray-300 bg-white/80 focus:ring-emerald-500/20 transition-all duration-200 hover:bg-white',
                tempatTurunFilter !== 'all' && 'border-emerald-500 bg-emerald-50'
              )}
            >
              <SelectValue placeholder="Pilih tempat turun" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 rounded-xl shadow-xl">
              <SelectItem value="all" className="rounded-lg">Semua Tempat</SelectItem>
              <SelectItem value="Mekah" className="rounded-lg">🕋 Mekah</SelectItem>
              <SelectItem value="Madinah" className="rounded-lg">🕌 Madinah</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/50">
          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filter aktif:</span>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs">
                  "{searchQuery}"
                </span>
              )}
              {tempatTurunFilter !== 'all' && (
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs">
                  {tempatTurunFilter === 'Mekah' ? '🕋' : '🕌'} {tempatTurunFilter}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}