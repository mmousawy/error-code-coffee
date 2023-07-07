import { Inter } from '@next/font/google';

const inter = Inter({ subsets: [ 'latin' ] });

import Header from '@/components/Global/Header';
import Footer from '@/components/Global/Footer';

import Player from '@/components/Player/Player';
import PlayerContextProvider from '@/contexts/PlayerContext';
import OverviewContextProvider from '@/contexts/OverviewContext';
import AnalyticsWrapper from '@/components/Global/AnalyticsWrapper';

import '@/styles/globals.scss';
import { Metadata } from 'next';

const meta = {
  title: 'Error Code: Coffee - A geeky podcast about tech, web dev and all things life',
  description: 'A weekly podcast about tech, web development and all things life! Hosted by Gideon Heilbron & Murtada al Mousawy.',
  image: '/og-image.png',
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  themeColor: '#ffffff',
  manifest: '/site.webmanifest',
  openGraph: {
    title: meta.title,
    description: meta.description,
    images: [ meta.image ],
  },
};

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
          <OverviewContextProvider>
            { children }
          </OverviewContextProvider>
          <Footer />
          <Player />
        </PlayerContextProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
