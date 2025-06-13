'use client';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { ReactNode } from 'react';
import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

interface ClientWrapperProps {
  children: ReactNode;
  session?: Session | null;
}

export default function ClientWrapper({ children, session }: ClientWrapperProps) {
  const [queryClient] = useState(()=>new QueryClient())
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <SidebarProvider>
            <Toaster position="top-center" />
            {children}
          </SidebarProvider>
        </NuqsAdapter>
      </QueryClientProvider>
    </SessionProvider>
  );
}