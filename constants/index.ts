import { Home, BookOpen, BookMarked, MessageSquareText, Users, BarChart3, Settings, Brain, MessageCircle, Heart, StickyNote, History, Target, Trophy, TrendingUp, CalendarDays } from 'lucide-react'

export const menuItems = [
    { title: "Dashboard", icon: Home, path: "/dashboard" },
    { 
        title: "Baca Quran", 
        icon: BookOpen, 
        path: "/read",
        children: [
            { title: "Al-Quran", icon: BookOpen, path: "/read", description: "Baca dan jelajahi teks lengkap Al-Quran" },
            { title: "Favorit", icon: Heart, path: "/read/favorites", description: "Lihat ayat-ayat yang Anda tandai sebagai favorit" },
            { title: "Catatan Saya", icon: StickyNote, path: "/read/notes", description: "Akses catatan pribadi Anda pada ayat-ayat" },
            { title: "Riwayat Baca", icon: History, path: "/read/history", description: "Lacak progres dan riwayat bacaan Anda" }
        ]
    },
    { 
        title: "Hafalan", 
        icon: BookMarked, 
        path: "/memorize",
        children: [
            { title: "Hafal", icon: BookMarked, path: "/memorize", description: "Latihan menghafal ayat-ayat Al-Quran" },
            { title: "Ulangi", icon: Brain, path: "/memorize/review", description: "Ulangi ayat-ayat yang sudah dihafal" },
            { title: "Kuis", icon: Trophy, path: "/memorize/quiz", description: "Uji hafalan Anda dengan kuis" },
            { title: "Target", icon: Target, path: "/memorize/targets", description: "Tetapkan dan lacak tujuan hafalan" }
        ]
    },
    { title: "Tafsir & AI", icon: MessageSquareText, path: "/ai-chat" },
    { title: "Komunitas", icon: Users, path: "/community" },
    { 
        title: "Progres", 
        icon: BarChart3, 
        path: "/progress",
        children: [
            { title: "Ikhtisar", icon: BarChart3, path: "/progress", description: "Lihat progres pembelajaran Anda secara keseluruhan" },
            { title: "Statistik", icon: TrendingUp, path: "/progress/stats", description: "Analisis statistik pembelajaran secara rinci" },
            { title: "Riwayat Belajar", icon: History, path: "/progress/history", description: "Tinjau perjalanan pembelajaran Anda" }
        ]
    },
]


export  const features = [
    {
      icon: BookOpen,
      title: "Baca Al-Qur'an",
      description: "Nikmati pengalaman membaca yang sempurna dengan teks Arab yang elegan, transliterasi, dan terjemahan yang akurat.",
      highlights: ["Font Amiri yang autentik", "Audio bacaan berkualitas", "Favorit & tafsir mendalam"],
      color: "text-emerald-600"
    },
    {
      icon: Brain,
      title: "Hafalan Pintar",
      description: "Sistem hafalan cerdas dengan visualisasi progres, latihan interaktif, dan kuis yang memperkuat ingatan.",
      highlights: ["Pelacakan progres visual", "Latihan interaktif", "Statistik akurasi detail"],
      color: "text-amber-600"
    },
    {
      icon: MessageCircle,
      title: "Tanya AI",
      description: "Asisten AI cerdas untuk menjawab pertanyaan tentang tafsir, makna ayat, dan pengetahuan Islam lainnya.",
      highlights: ["Respons berbasis AI", "Wawasan mendalam", "Interface ramah pengguna"],
      color: "text-emerald-600"
    },
    {
      icon: Users,
      title: "Komunitas",
      description: "Bergabunglah dengan komunitas pembelajar Al-Qur'an, ikuti tantangan hafalan, dan grup belajar bersama.",
      highlights: ["Tantangan hafalan grup", "Diskusi topik Islami", "Progres komunitas"],
      color: "text-amber-600"
    },
    {
      icon: CalendarDays,
      title: "Ayat Harian",
      description: "Mulai hari Anda dengan ayat Al-Qur'an pilihan, lengkap dengan refleksi dan makna yang menginspirasi.",
      highlights: ["Ayat pilihan setiap hari", "Refleksi mendalam", "Notifikasi pengingat"],
      color: "text-emerald-600"
    },
    {
      icon: BarChart3,
      title: "Progres Tracking",
      description: "Pantau perkembangan belajar dan hafalan Anda dengan visualisasi yang menarik dan statistik detail.",
      highlights: ["Grafik progres visual", "Statistik pembelajaran", "Target personal"],
      color: "text-amber-600"
    }
  ];
