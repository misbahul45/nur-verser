import { QuranApiResponse, SurahTypeList } from "@/types";
import { sleep } from "./utils";

const BASE_URL = process.env.ALQURAN_API || 'https://equran.id/api/v2';

function apiUrl(path: string) {
  return new URL(path.replace(/^\/+/, ''), BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/').toString();
}


export async function fetchSuratList(): Promise<QuranApiResponse<SurahTypeList[]>> {
  await sleep()
  const res = await fetch(apiUrl('/surat'));
  if (!res.ok) throw new Error('Gagal mengambil daftar surat');
  return res.json();
}

export async function fetchSuratDetail(nomor: string | number) {
  const res = await fetch(apiUrl(`/surat/${nomor}`));
  if (!res.ok) throw new Error('Gagal mengambil detail surat');
  return res.json();
}

export async function fetchTafsirDetail(nomor: string | number) {
  const res = await fetch(apiUrl(`/tafsir/${nomor}`));
  if (!res.ok) throw new Error('Gagal mengambil detail tafsir');
  return res.json();
}
