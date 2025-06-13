import CreateFormMemorize from '@/components/memorize/CreateFormMemorize';
import { fetchSuratList } from '@/lib/alquran'
import React from 'react'

const page = async() => {
  const res=await fetchSuratList();
  const allSurah=res.data
  return (
    <div className='w-full pt-10 px-8'>
      <>
        <CreateFormMemorize allSurah={
          allSurah.map((surah) => ({
            surahNumber: surah.nomor,
            surahName: surah.nama,
            indo:surah.namaLatin,
            totalAyat: surah.jumlahAyat,
            translation: surah.arti
          }))
        } />
      </>
    </div>
  )
}

export default page
