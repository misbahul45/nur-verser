import ListSurat from "@/components/read/ListSurat";
import { fetchSuratList } from "@/lib/alquran";
import { BookOpen } from "lucide-react";
import { Suspense } from "react"; 

const page = async () => {
  const res = await fetchSuratList();
  const allSurat = Array.isArray(res.data) ? res.data : Object.values(res.data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                  Al-Qur'an
                </h1>
                <p className="text-emerald-600 font-medium text-lg">
                  114 Surah of the Quran
                </p>
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Jelajahi koleksi lengkap surah dalam Al-Qur'an dengan lantunan audio,
              deskripsi mendalam, dan teks Arab yang indah.
            </p>
          </div>

          <Suspense fallback={<div>Loading surah list...</div>}>
            <ListSurat allSurat={allSurat} />
          </Suspense>

          <div className="text-center mt-12 p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Total {Array.isArray(allSurat) ? allSurat.length : Object.keys(allSurat).length} Surah | 
              {Array.isArray(allSurat) ? allSurat.filter(s => s.tempatTurun === 'Mekah').length : Object.values(allSurat).filter((s: any) => s.tempatTurun === 'Mekah').length} Makkiyah | 
              {Array.isArray(allSurat) ? allSurat.filter(s => s.tempatTurun === 'Madinah').length : Object.values(allSurat).filter((s: any) => s.tempatTurun === 'Madinah').length} Madaniyah
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;