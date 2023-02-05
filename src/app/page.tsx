import React from 'react';

// Components
import EpisodeOverview from '@/components/Episode/EpisodeOverview';

import getEpisodes from '@/shared/episodeData';

export default async function Home() {
  const episodes = await getEpisodes();

  return (
    <>
      <EpisodeOverview episodes={ episodes } />
    </>
  );
}
