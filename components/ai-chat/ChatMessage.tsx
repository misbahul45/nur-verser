"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Bookmark, Copy, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface ChatMessageProps {
  message: {
    id: string
    role: "user" | "assistant"
    content: string
    references?: Array<{ surah: number; ayah: number; text: string }>
    sources?: string[]
    timestamp: Date
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [isReferencesOpen, setIsReferencesOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    toast("Teks berhasil disalin ke clipboard")
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast(isSaved ? "Dihapus dari tersimpan" : "Berhasil disimpan")
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("id", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className={`flex flex-col ${message.role === "assistant" ? "items-start" : "items-end"}`}>
      <div className="flex items-center mb-1 text-xs text-muted-foreground">
        <span>{message.role === "assistant" ? "AI Assistant" : "Anda"}</span>
        <span className="mx-1">•</span>
        <span>{formatTime(message.timestamp)}</span>
      </div>

      <Card
        className={`p-4 max-w-[85%] ${
          message.role === "assistant"
            ? "bg-white border-emerald-100"
            : "bg-emerald-50 border-emerald-100 text-emerald-900"
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>

        {message.role === "assistant" && message.references && message.references.length > 0 && (
          <Collapsible
            open={isReferencesOpen}
            onOpenChange={setIsReferencesOpen}
            className="mt-4 pt-3 border-t border-emerald-100"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full flex justify-between items-center text-xs text-emerald-700"
              >
                <span>Referensi & Sumber</span>
                {isReferencesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-3">
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Ayat Al-Quran:</h4>
                {message.references.map((ref, index) => (
                  <div key={index} className="p-3 bg-emerald-50 rounded-md text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-emerald-800">
                        Surah {ref.surah}:{ref.ayah}
                      </span>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-emerald-900">{ref.text}</p>
                  </div>
                ))}
              </div>

              {message.sources && message.sources.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Sumber Tafsir:</h4>
                  <div className="flex flex-wrap gap-2">
                    {message.sources.map((source, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-emerald-50 text-emerald-800 border-emerald-200"
                      >
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        )}

        {message.role === "assistant" && (
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-emerald-100">
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 ${isSaved ? "text-amber-500" : ""}`}
                onClick={handleSave}
              >
                <Bookmark className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
