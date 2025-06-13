import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppSidebar from '@/components/layout/AppSidebar';
import AppNavbar from '@/components/layout/AppNavbar';
import Footer from '@/components/layout/Footer';
import { fetchSession } from '@/actions';
import ClientWrapper from '@/components/layout/ClientWrapper';
import ButtonToTop from '@/components/layout/ButtonToTop';
import { Suspense } from 'react';
// Remove this import since we're now using SessionProvider in ClientWrapper

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nur Quran',
  metadataBase: new URL('https://nur-quran.vercel.app'),
  description: 'Aplikasi pembelajaran Al-Qur\'an interaktif dengan fitur membaca, menghafal, dan keterlibatan komunitas.',
  keywords: ['Al-Qur\'an', 'pembelajaran', 'hafalan', 'tafsir', 'Islam', 'komunitas'],
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: 'Nur Quran',
    description: 'Tingkatkan pengalaman belajar Al-Qur\'an Anda dengan Nur Quran.',
    url: 'https://nur-quran.vercel.app/',
    siteName: 'Nur Quran',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Logo Nur Quran',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await fetchSession();

  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
        <ClientWrapper session={session}>
              <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/20">
                <Suspense fallback={null}>
                  <AppSidebar user={session?.user} />
                </Suspense>
                <div className="flex-1 flex flex-col w-full">
                  <Suspense fallback={null}>
                    <AppNavbar />
                  </Suspense>
                  <main className="flex-1 w-full overflow-y-auto">
                    <div className="w-full px-2 pt-4 space-y-6">{children}</div>
                  </main>
                  <Footer />
                </div>
              </div>
              <ButtonToTop />
          </ClientWrapper>
      </body>
    </html>
  );
}