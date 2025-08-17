'use client';
import "./globals.css";

import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

const queryClient = new QueryClient()

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
  );
}

export default RootLayout;