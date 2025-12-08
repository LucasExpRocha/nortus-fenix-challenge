import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../styles/globals.css';

import { Toaster } from 'sonner';

import Providers from './providers';

export const metadata: Metadata = {
  title: 'Nortus/Fenix Challenge',
  description: 'Created by Lucas E. Rocha',
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter.variable}>
      <body className="bg-[#0B1125]">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
