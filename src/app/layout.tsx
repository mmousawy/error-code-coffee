import { Analytics } from '@vercel/analytics/react';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: [ 'latin' ] });

import Header from '@/components/Global/Header';
import Footer from '@/components/Global/Footer';

import Player from '@/components/Player/Player';
import PlayerContextProvider from '@/contexts/PlayerContext';

import '@/styles/globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang='en' className={ inter.className }>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <PlayerContextProvider>
          <Header />
          { children }
          <Footer />
          <Player />
        </PlayerContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
