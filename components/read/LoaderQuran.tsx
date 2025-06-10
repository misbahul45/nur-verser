import { Search, ChevronDown } from "lucide-react"

export default function LoaderQuran() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
            <Search className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="h-7 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
        </div>

        {/* Search Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
            <div className="relative">
              <div className="h-12 bg-white border border-gray-200 rounded-lg animate-pulse"></div>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
            </div>
          </div>
          <div className="md:w-48">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
            <div className="relative">
              <div className="h-12 bg-white border border-gray-200 rounded-lg animate-pulse flex items-center justify-between px-3">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <ChevronDown className="w-5 h-5 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Surah Cards Grid */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* First Surah Card Skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-emerald-400 rounded animate-pulse"></div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-5 bg-orange-200 rounded-full w-16 animate-pulse"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-8 animate-pulse"></div>
            </div>
          </div>

          {/* Audio Controls Skeleton */}
          <div className="mb-4">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-purple-200 rounded animate-pulse"></div>
                <div className="h-4 bg-purple-200 rounded w-32 animate-pulse"></div>
              </div>
              <ChevronDown className="w-5 h-5 text-purple-300" />
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 border border-emerald-200 rounded-lg">
              <div className="w-4 h-4 bg-emerald-200 rounded animate-pulse"></div>
              <div className="h-4 bg-emerald-200 rounded w-8 animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded-lg">
              <div className="w-4 h-4 bg-blue-200 rounded animate-pulse"></div>
              <div className="h-4 bg-blue-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>

          {/* Read Section Skeleton */}
          <div className="border-t pt-4">
            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>

        {/* Second Surah Card Skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-emerald-400 rounded animate-pulse"></div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 bg-gray-200 rounded w-28 animate-pulse"></div>
                  <div className="h-5 bg-blue-200 rounded-full w-18 animate-pulse"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-12 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-10 animate-pulse"></div>
            </div>
          </div>

          {/* Audio Controls Skeleton */}
          <div className="mb-4">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-purple-200 rounded animate-pulse"></div>
                <div className="h-4 bg-purple-200 rounded w-32 animate-pulse"></div>
              </div>
              <ChevronDown className="w-5 h-5 text-purple-300" />
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 border border-emerald-200 rounded-lg">
              <div className="w-4 h-4 bg-emerald-200 rounded animate-pulse"></div>
              <div className="h-4 bg-emerald-200 rounded w-8 animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded-lg">
              <div className="w-4 h-4 bg-blue-200 rounded animate-pulse"></div>
              <div className="h-4 bg-blue-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>

          {/* Read Section Skeleton */}
          <div className="border-t pt-4">
            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Additional Loading Cards */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mt-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div>
                  <div className="h-6 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded w-14 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-18 animate-pulse"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-8 animate-pulse"></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>

            <div className="flex gap-3 mb-4">
              <div className="h-9 bg-gray-100 rounded-lg w-20 animate-pulse"></div>
              <div className="h-9 bg-gray-100 rounded-lg w-32 animate-pulse"></div>
            </div>

            <div className="border-t pt-4">
              <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
