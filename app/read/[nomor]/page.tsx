import AudioPlayer from "@/components/read/AudioPlayer";
import { fetchSuratDetail, fetchTafsirDetail } from "@/lib/alquran";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SurahData } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home, BookOpen } from "lucide-react";
import { Suspense } from "react";
import Ayat from "@/components/read/Ayat";
import { Metadata } from "next";
import ReadProvider from "@/components/read/ReadContext";
import { fetchSession } from "@/actions";
import { getFavoriteAyatAction } from "@/actions/read.action";
import SuratDescription from "@/components/read/SuratDescription";

type PageProps = {
  params: Promise<{ nomor: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { nomor } = await params;
  const dataSurah = await fetchSuratDetail(nomor);
  return {
    title: `Surah ${dataSurah.data.namaLatin}`,
    description: dataSurah.data.deskripsi,
  };
}

const getSurah = async (nomor: string): Promise<SurahData> => {
  const [dataSurah, dataTafsir, session] = await Promise.all([
    fetchSuratDetail(nomor),
    fetchTafsirDetail(nomor),
    fetchSession()
  ]);

  return {
    surah: dataSurah.data,
    tafsir: dataTafsir.data,
    userId: session?.user?.id
  };
};

const Page = async ({ params }: PageProps) => {
  const { nomor } = await params; 
  const { surah, tafsir, userId } = await getSurah(nomor);

  return (
   <ReadProvider>
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100">
      <div className="sticky top-0 z-30 backdrop-blur-md bg-white/80 border-b border-emerald-100 px-2 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost" asChild className="hover:bg-emerald-100">
              <Link href="/read">
                <ChevronLeft size={18} />
                <span className="hidden sm:inline ml-1">Back</span>
              </Link>
            </Button>
            <Button size="sm" variant="ghost" asChild className="hover:bg-emerald-100">
              <Link href="/">
                <Home size={18} />
                <span className="hidden sm:inline ml-1">Home</span>
              </Link>
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold text-emerald-800">{surah.namaLatin}</h1>
            <span className="text-sm text-emerald-600 font-arabic">{surah.nama}</span>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="px-2.5 md:px-4 md:py-8 py-5">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white shadow-2xl rounded-3xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <CardHeader className="relative z-10 text-center md:py-10 sm:py-8 py-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <BookOpen size={32} className="text-white" />
                </div>
              </div>
              <CardTitle className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                {surah.namaLatin}
              </CardTitle>
              <span className="block text-xl sm:text-3xl md:text-4xl font-arabic opacity-90 mb-4">{surah.nama}</span>
              <div className="flex items-center justify-center gap-4 text-sm opacity-80">
                <span className="px-3 py-1 bg-white/20 rounded-full">{surah.tempatTurun}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full">{surah.jumlahAyat} Ayat</span>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 md:pb-12 sm:pb-8 pb-6">
              <div className="flex justify-center mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Suspense fallback={
                    <div className="flex items-center justify-center p-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span className="ml-2 text-white/80">Loading audio...</span>
                    </div>
                  }>
                    <AudioPlayer audioUrls={surah.audioFull} />
                  </Suspense>
                </div>
              </div>

              <SuratDescription deskripsi={surah.deskripsi} />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-emerald-800 mb-2">Ayat-ayat</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {surah.ayat.map(async(ayat, idx: number) => {
                const ayatTafsir = tafsir.tafsir && tafsir.tafsir[idx] ? tafsir.tafsir[idx] : null;
                let isFavorite = false;
                if (userId) {
                  const res = await getFavoriteAyatAction({
                    userId,
                    ayatKey: ayat.nomorAyat,
                    surah_number:surah.nomor
                  });
                  isFavorite=res.success
                }
                return (
                  <Suspense key={idx} fallback={
                    <Card className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </CardContent>
                    </Card>
                  }>
                    <Ayat isFavorite={isFavorite} surat_number={parseInt(nomor)} ayat={ayat} tafsir={ayatTafsir} userId={userId ?? ""} />
                  </Suspense>
                );
              })}
            </div>
          </div>

          <Card className="mt-12 bg-gradient-to-r from-emerald-50 to-slate-50 border-emerald-200">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex-1">
                  {surah.suratSebelumnya ? (
                    <Button variant="outline" asChild className="w-full sm:w-auto border-emerald-300 hover:bg-emerald-50 group">
                      <Link href={`/read/${surah.suratSebelumnya.nomor}`} className="flex items-center gap-2">
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <div className="text-left">
                          <div className="text-xs text-gray-500">Previous</div>
                          <div className="font-semibold text-emerald-700">{surah.suratSebelumnya.namaLatin}</div>
                        </div>
                      </Link>
                    </Button>
                  ) : (
                    <div></div>
                  )}
                </div>

                <div className="flex-shrink-0">
                  <Button variant="ghost" asChild className="hover:bg-emerald-100">
                    <Link href="/read" className="flex items-center gap-2">
                      <BookOpen size={18} />
                      <span>All Surahs</span>
                    </Link>
                  </Button>
                </div>

                <div className="flex-1 flex justify-end">
                  {surah.suratSelanjutnya && (
                    <Button variant="outline" asChild className="w-full sm:w-auto border-emerald-300 hover:bg-emerald-50 group">
                      <Link href={`/read/${surah.suratSelanjutnya.nomor}`} className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Next</div>
                          <div className="font-semibold text-emerald-700">{surah.suratSelanjutnya.namaLatin}</div>
                        </div>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
   </ReadProvider>
  );
};

export default Page;