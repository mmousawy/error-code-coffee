import { Inter } from '@next/font/google';

const inter = Inter({ subsets: [ 'latin' ] });

import Header from '@/components/Global/Header';
import Footer from '@/components/Global/Footer';

import Player from '@/components/Player/Player';
import PlayerContextProvider from '@/contexts/PlayerContext';
import AnalyticsWrapper from '@/components/Global/AnalyticsWrapper';

import '@/styles/globals.scss';

export const metadata = {
  title: 'Error Code: Coffee - A geeky podcast about tech, web dev and all things life',
  description: 'A weekly podcast about tech, web development and all things life! Hosted by Gideon Heilbron & Murtada al Mousawy.',
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
          { children }
          <Footer />
          <Player />
        </PlayerContextProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
