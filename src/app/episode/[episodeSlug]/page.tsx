import { notFound } from 'next/navigation';

// Data
import getEpisodes, { getEpisodeBySlug } from '@/shared/episodeData';

// Components
import EpisodeSingle from '@/components/Episode/EpisodeSingle';

export default async function EpisodeSlug({ params }: { params: any }) {
  const episodes = await getEpisodes();
  const episode = getEpisodeBySlug(episodes, params.episodeSlug);

  if (!episode?.title) {
    notFound();
  }

  return (
    <>
      <EpisodeSingle episode={ episode } />
    </>
  );
}
