import AudioPlayer from "@/components/read/AudioPlayer";
import { fetchSuratDetail, fetchTafsirDetail } from "@/lib/alquran";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SurahData } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";
import Ayat from "@/components/read/Ayat";
import { Metadata } from "next";

// Define the props type for the Page component
type PageProps = {
  params: Promise<{ nomor: string }>;
};

// Define the props type for generateMetadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { nomor } = await params; // Resolve the params promise
  const dataSurah = await fetchSuratDetail(nomor);
  return {
    title: `Surah ${dataSurah.namaLatin}`,
    description: dataSurah.deskripsi,
  };
}

const getSurah = async (nomor: string): Promise<SurahData> => {
  const [dataSurah, dataTafsir] = await Promise.all([fetchSuratDetail(nomor), fetchTafsirDetail(nomor)]);

  return {
    surah: dataSurah.data,
    tafsir: dataTafsir.data,
  };
};

const Page = async ({ params }: PageProps) => {
  const { nomor } = await params; // Resolve the params promise
  const { surah, tafsir } = await getSurah(nomor);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <Card className="bg-gradient-to-br from-emerald-700 to-emerald-800 text-white shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 transition-all duration-300">
        <CardHeader className="flex justify-between items-center">
          <Button size={'icon'} variant={'outline'} asChild className="cursor-pointer">
            <Link href={'/read'}>
              <ChevronLeft size={16} />
            </Link>
          </Button>
          <div className="text-center flex-1">
            <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              {surah.namaLatin}
            </CardTitle>
            <span className="block text-3xl font-arabic opacity-90 mt-1">{surah.nama}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Suspense fallback={<span className="text-white opacity-60">Loading...</span>}>
              <AudioPlayer audioUrls={surah.audioFull} />
            </Suspense>
          </div>

          <div className="prose lg:prose-xl prose-invert max-w-none text-white/90">
            <div dangerouslySetInnerHTML={{ __html: surah.deskripsi || "" }} />
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-4">
        {surah.ayat.map((ayat: any, idx: number) => {
          const ayatTafsir = tafsir.tafsir && tafsir.tafsir[idx] ? tafsir.tafsir[idx] : null;
          return (
            <Suspense key={idx} fallback={<div>Loading ayat {idx + 1}...</div>}>
              <Ayat ayat={ayat} tafsir={ayatTafsir} />
            </Suspense>
          );
        })}
      </div>
    </div>
  );
};

export default Page;