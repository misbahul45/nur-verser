import { QuranApiResponse, SurahTypeList } from "@/types";

const BASE_URL = process.env.ALQURAN_API || 'https://equran.id/api/v2';


export async function fetchSuratList(): Promise<QuranApiResponse<SurahTypeList>>{
  const res = await fetch(`${BASE_URL}/surat`);
  if (!res.ok) throw new Error('Gagal mengambil daftar surat');
  return res.json();
}

export async function fetchSuratDetail(nomor: string | number) {
  const res = await fetch(`${BASE_URL}/surat/${nomor}`);
  if (!res.ok) throw new Error('Gagal mengambil detail surat');
  return res.json();
}

export async function fetchTafsirDetail(nomor: string | number) {
  const res = await fetch(`${BASE_URL}/tafsir/${nomor}`);
  if (!res.ok) throw new Error('Gagal mengambil detail tafsir');
  return res.json();
}