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

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [queryClient] = useState(new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <SidebarProvider>
          <Toaster position="top-center" />
          {children}
        </SidebarProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}