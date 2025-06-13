"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search, BookOpen, Target } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type React from "react"
import { useMemo, useState } from "react"
import { toast } from "sonner"

// Updated schema to match the new structure
const memorizationProgressCreateSchema = z
  .object({
    surahNumber: z.number().int().positive(),
    totalsAyahs: z.number().int().positive(),
    startDate: z.date(),
    endDate: z.date().optional(),
    currentAyah: z.number().int().positive(),
  })
  .refine((data) => data.currentAyah <= data.totalsAyahs, {
    message: "Current ayah cannot exceed total ayahs",
    path: ["currentAyah"],
  })

type MemorizationProgressCreate = z.infer<typeof memorizationProgressCreateSchema>

interface CreateFormMemorizeProps {
  allSurah: {
    surahNumber: number
    surahName: string
    totalAyat: number
    indo: string
    translation: string
  }[]
}

const CreateFormMemorize: React.FC<CreateFormMemorizeProps> = ({ allSurah }) => {
  const [searchSurah, setSearchSurah] = useState("")
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null)

  const allSurahView = useMemo(() => {
    if (!searchSurah.trim()) {
      return allSurah
    }

    const searchRegex = new RegExp(searchSurah.trim(), "i")

    return allSurah.filter(
      (surah) =>
        searchRegex.test(surah.surahName) ||
        searchRegex.test(surah.indo) ||
        searchRegex.test(surah.translation) ||
        searchRegex.test(surah.surahNumber.toString()),
    )
  }, [searchSurah, allSurah])

  const form = useForm<MemorizationProgressCreate>({
    resolver: zodResolver(memorizationProgressCreateSchema),
    defaultValues: {
      startDate: new Date(),
      currentAyah: 1,
    },
  })

  const handleSurahSelect = (surah: (typeof allSurah)[0]) => {
    setSelectedSurah(surah.surahNumber)
    form.setValue("surahNumber", surah.surahNumber)
    form.setValue("totalsAyahs", surah.totalAyat)
    form.setValue("currentAyah", 1)
    form.clearErrors()
  }

  const onSubmit = async (data: MemorizationProgressCreate) => {
    const surah = allSurah.find((surah) => surah.surahNumber === data.surahNumber)
    if (!surah) {
      toast.error("Selected surah not found.")
      return
    }else if(data.currentAyah > data.totalsAyahs || data.currentAyah < 1){
      toast.error('Current ayah cannot exceed total ayahs')
    }

    try {
      // Simulate API call - replace with your actual action
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success(`Memorization progress saved for Surah ${surah.surahName}!`)
      form.reset({
        startDate: new Date(),
        currentAyah: 1,
      })
      setSelectedSurah(null)
    } catch (error) {
      toast.error("Failed to save memorization progress. Please try again.")
      console.error("Error saving memorization progress:", error)
    }
  }

  const selectedSurahData = allSurah.find((s) => s.surahNumber === selectedSurah)
  const watchedValues = form.watch()

  const progressPercentage =useMemo(()=>{
    return selectedSurahData && watchedValues.currentAyah && watchedValues.totalsAyahs
      ? Math.round((watchedValues.currentAyah / watchedValues.totalsAyahs) * 100)
      : 0
  },[selectedSurahData, watchedValues.currentAyah, watchedValues.totalsAyahs])

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <BookOpen className="mx-auto h-12 w-12 text-emerald-600 mb-4" />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Memorization Progress</h1>
        <p className="text-gray-600 mt-2">Track your Quran memorization journey</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Search className="h-5 w-5" />
          Select a Surah
        </h2>

        <div className="mb-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search surah by name, Indonesian name, translation, or number..."
              value={searchSurah}
              onChange={(e) => setSearchSurah(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {allSurahView.length > 0 ? (
            allSurahView.map((surah) => (
              <Card
                key={surah.surahNumber}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedSurah === surah.surahNumber
                    ? "ring-2 ring-emerald-500 bg-emerald-50 border-emerald-200"
                    : "hover:bg-gray-50 bg-white"
                }`}
                onClick={() => handleSurahSelect(surah)}
              >
                <CardContent className="p-3 text-center">
                  <div
                    className={`font-bold text-lg ${
                      selectedSurah === surah.surahNumber ? "text-emerald-600" : "text-gray-700"
                    }`}
                  >
                    {surah.surahNumber}
                  </div>
                  <div className="text-sm font-medium truncate" title={`${surah.surahName} | ${surah.indo}`}>
                    {surah.surahName}
                  </div>
                  <div className="text-xs text-gray-500 truncate" title={surah.indo}>
                    {surah.indo}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{surah.totalAyat} ayat</div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              <Search className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>No surahs found matching "{searchSurah}"</p>
            </div>
          )}
        </div>
      </div>

      {selectedSurahData && (
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">{selectedSurahData.surahNumber}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-emerald-800 mb-1">Surah {selectedSurahData.surahName}</h3>
                  <p className="text-emerald-700 text-sm mb-2">{selectedSurahData.indo}</p>
                  <p className="text-emerald-600 text-sm mb-3">{selectedSurahData.translation}</p>
                  <div className="flex items-center gap-4 text-sm text-emerald-700">
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      Total: {selectedSurahData.totalAyat} ayat
                    </span>
                    {progressPercentage > 0 && <span className="font-medium">Progress: {progressPercentage}%</span>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentAyah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Ayah Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={watchedValues.totalsAyahs || selectedSurahData.totalAyat}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                    <div className="text-xs text-gray-500">
                      Range: 1 - {watchedValues.totalsAyahs || selectedSurahData.totalAyat}
                    </div>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Target End Date (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < (watchedValues.startDate || new Date())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {progressPercentage > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {watchedValues.currentAyah} of {watchedValues.totalsAyahs} ayahs completed
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving Progress...
                  </div>
                ) : (
                  "Save Progress"
                )}
              </Button>
            </form>
          </Form>
        </div>
      )}

      {!selectedSurah && (
        <div className="text-center text-gray-500 mt-12">
          <BookOpen className="mx-auto h-16 w-16 opacity-30 mb-4" />
          <p className="text-lg">Please select a surah from above to continue</p>
          <p className="text-sm mt-1">Start your memorization journey today</p>
        </div>
      )}
    </div>
  )
}

export default CreateFormMemorize