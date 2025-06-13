import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare, Calendar, Bookmark, ArrowRight } from "lucide-react"

interface RecentQueriesProps {
  type: "history" | "saved"
}

export default function RecentQueries({ type }: RecentQueriesProps) {
  // Mock data - would be fetched from your database
  const queries = [
    {
      id: "1",
      question: "Apa makna sabar dalam Al-Quran?",
      preview: "Berdasarkan tafsir Ibn Kathir, konsep sabar dalam Al-Quran...",
      timestamp: new Date(2023, 5, 15, 14, 30),
      saved: true,
    },
    {
      id: "2",
      question: "Bagaimana cara memahami ayat-ayat mutasyabihat?",
      preview: "Ayat-ayat mutasyabihat adalah ayat-ayat yang memiliki makna...",
      timestamp: new Date(2023, 5, 14, 9, 45),
      saved: false,
    },
    {
      id: "3",
      question: "Penjelasan tentang Surah Al-Ikhlas",
      preview: "Surah Al-Ikhlas adalah surah ke-112 dalam Al-Quran yang...",
      timestamp: new Date(2023, 5, 12, 16, 20),
      saved: true,
    },
    {
      id: "4",
      question: "Apa itu Asbabun Nuzul?",
      preview: "Asbabun Nuzul adalah istilah dalam ilmu tafsir yang merujuk pada...",
      timestamp: new Date(2023, 5, 10, 11, 15),
      saved: false,
    },
  ]

  const filteredQueries = type === "saved" ? queries.filter((q) => q.saved) : queries

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`Cari ${type === "saved" ? "pertanyaan tersimpan" : "riwayat pertanyaan"}...`}
          className="pl-10"
        />
      </div>

      {filteredQueries.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex justify-center mb-4">
            {type === "saved" ? (
              <Bookmark className="h-12 w-12 text-muted-foreground" />
            ) : (
              <MessageSquare className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
          <h3 className="text-lg font-medium mb-2">
            {type === "saved" ? "Belum ada pertanyaan tersimpan" : "Belum ada riwayat pertanyaan"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {type === "saved"
              ? "Simpan pertanyaan dan jawaban yang ingin Anda akses kembali nanti"
              : "Riwayat pertanyaan Anda akan muncul di sini"}
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Mulai Bertanya</Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredQueries.map((query) => (
            <Card key={query.id} className="p-4 hover:border-emerald-300 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium text-emerald-800">{query.question}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{query.preview}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(query.timestamp)}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="mt-1">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
