import { BarChart3, BookMarked, BookOpen, Home, MessageSquareText, Settings, Users, TrendingUp, Brain, MessageCircle, Calendar } from "lucide-react";

export const menuItems = [
    { title: "Dashboard", icon: Home, path: "/dashboard" },
    { title: "Read Quran", icon: BookOpen, path: "/read" },
    { title: "Memorization", icon: BookMarked, path: "/memorize" },
    { title: "Tafsir & AI", icon: MessageSquareText, path: "/tafsir" },
    { title: "Community", icon: Users, path: "/community" },
    { title: "Progress", icon: BarChart3, path: "/progress" },
    { title: "Settings", icon: Settings, path: "/settings" },
]
export const navigation =[
    { path: "/read", label: "Baca", icon: BookOpen },
    { path: "/memorize", label: "Hafal", icon: Brain },
    { path: "/ai-chat", label: "Tanya AI", icon: MessageCircle },
    { path: "/community", label: "Komunitas", icon: Users }
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
      icon: Calendar,
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
