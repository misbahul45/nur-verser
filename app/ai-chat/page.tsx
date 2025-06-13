import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, History, Bookmark, Settings } from "lucide-react"
import ChatInterface from "@/components/ai-chat/ChatInterface"
import RecentQueries from "@/components/ai-chat/RecentQueries"

export default function TafsirAIPage() {
  return (
    <div className="container mx-auto pt-4 pb-2">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-emerald-800">Tafsir & AI</h1>
        <p className="text-muted-foreground">
          Ajukan pertanyaan tentang Al-Quran dan dapatkan jawaban berdasarkan tafsir terpercaya
        </p>

        <Separator />

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="chat" className="flex items-center gap-2 cursor-pointer">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 cursor-pointer">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Riwayat</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2 cursor-pointer">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Tersimpan</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <RecentQueries type="history" />
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <RecentQueries type="saved" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
