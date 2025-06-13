"use client"

import { Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
  return (
    <div className="w-full bg-[#f5f9f7] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-green-700 border-b-4 border-green-500 pb-2 inline-block mb-8">
          Ayat-ayat
        </h1>

        {/* Verse Skeleton 1 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-8 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
          <div className="flex flex-col items-end mb-4">
            <Skeleton className="h-12 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <Skeleton className="h-6 w-full" />
        </div>

        {/* Verse Skeleton 2 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-8 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
          <div className="flex flex-col items-end mb-4">
            <Skeleton className="h-12 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <Skeleton className="h-6 w-full" />
        </div>

        {/* Loading Indicator */}
        <div className="flex justify-center items-center mt-8">
          <Loader2 className="h-8 w-8 text-green-500 animate-spin" />
          <span className="ml-2 text-green-700">Loading verses...</span>
        </div>
      </div>
    </div>
  )
}
