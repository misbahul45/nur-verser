'use client';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { ReactNode } from 'react';

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <NuqsAdapter>
      <SidebarProvider>
        <Toaster position="top-center" />
        {children}
      </SidebarProvider>
    </NuqsAdapter>
  );
}