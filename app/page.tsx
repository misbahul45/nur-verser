import FeaturesSection from "@/components/home/FeaturesSection";
import ProgressSection from "@/components/home/ProgresSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AyatOfTheDaySection from "@/components/home/AyatOfTheDaySection";
import CallToActionSection from "@/components/home/CallToActionSection";
import { fetchSuratDetail, fetchTafsirDetail } from "@/lib/alquran";

async function getRandomAyatWithTafsir() {
  const randomSurahNumber = Math.ceil(Math.random() * 114);
  const surahDetailResponse = await fetchSuratDetail(randomSurahNumber);
  const ayats = surahDetailResponse.data.ayat;
  const randomAyatIndex = Math.floor(Math.random() * ayats.length);

  const selectedAyat = ayats[randomAyatIndex];
  const surahName = surahDetailResponse.data.namaLatin;
  const surahNumber = surahDetailResponse.data.nomor;

  const tafsirResponse = await fetchTafsirDetail(randomSurahNumber);
  const tafsirText = tafsirResponse.data.tafsir[randomAyatIndex].teks;

  return {
    ayat: selectedAyat,
    surahName,
    surahNumber,
    textTafsir: tafsirText,
  };
}

export default async function Home() {
  const { ayat, surahName, surahNumber, textTafsir } = await getRandomAyatWithTafsir();

  return (
    <>
      <AyatOfTheDaySection
        ayat={ayat}
        surahName={surahName}
        surahNumber={surahNumber}
        textTafsir={textTafsir}
      />
      <StatsSection />
      <FeaturesSection />
      <ProgressSection />
      <TestimonialsSection />
      <CallToActionSection />
    </>
  );
}
