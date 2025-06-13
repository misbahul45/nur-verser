"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Loader2, BookOpen } from "lucide-react"
import ChatMessage from "./ChatMessage"
import { toast } from "sonner"
import { Skeleton } from "../ui/skeleton"

async function submitQuestion(question: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    answer:
      'Berdasarkan tafsir Ibn Kathir, ayat tersebut menjelaskan tentang pentingnya kesabaran dalam menghadapi ujian. Allah SWT berfirman dalam Surah Al-Baqarah ayat 155-157 bahwa Dia akan menguji manusia dengan ketakutan, kelaparan, kekurangan harta, jiwa, dan buah-buahan. Kabar gembira diberikan kepada orang-orang yang sabar, yang ketika ditimpa musibah, mereka mengucapkan: "Innaa lillaahi wa innaa ilaihi raaji\'uun" (Sesungguhnya kami milik Allah dan kepada-Nya kami kembali).',
    references: [
      {
        surah: 2,
        ayah: 155,
        text: "Dan Kami pasti akan menguji kamu dengan sedikit ketakutan, kelaparan, kekurangan harta, jiwa, dan buah-buahan. Dan sampaikanlah kabar gembira kepada orang-orang yang sabar.",
      },
      {
        surah: 2,
        ayah: 156,
        text: '(yaitu) orang-orang yang apabila ditimpa musibah, mereka berkata, "Innā lillāhi wa innā ilaihi rāji\'ūn" (Sesungguhnya kami milik Allah dan kepada-Nya kami kembali).',
      },
    ],
    sources: ["Tafsir Ibn Kathir", "Tafsir Al-Qurthubi"],
  }
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<
    Array<{
      id: string
      role: "user" | "assistant"
      content: string
      references?: Array<{ surah: number; ayah: number; text: string }>
      sources?: string[]
      timestamp: Date
    }>
  >([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Assalamu'alaikum. Saya adalah asisten AI Nur Quran. Silakan ajukan pertanyaan tentang Al-Quran, tafsir, atau topik keislaman lainnya.",
      timestamp: new Date(),
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await submitQuestion(input)

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: response.answer,
          references: response.references,
          sources: response.sources,
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      toast.error("Terjadi kesalahan saat memproses pertanyaan Anda.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] md:h-[600px]">
      <Card className="flex-1 overflow-hidden border-emerald-100 mb-4">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <Skeleton className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                <span className="ml-2 text-sm text-muted-foreground">Mencari jawaban...</span>
              </Skeleton>
            )}
          </div>
        </ScrollArea>
      </Card>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <Textarea
          placeholder="Ajukan pertanyaan tentang Al-Quran..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[80px] resize-none"
          disabled={isLoading}
        />
        <div className="flex justify-between items-center">
          <Button type="button" variant="outline" size="sm" className="text-xs">
            <BookOpen className="h-3 w-3 mr-1" />
            Lihat Contoh
          </Button>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses
              </>
            ) : (
              <>
                Kirim
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
