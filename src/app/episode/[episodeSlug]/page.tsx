import { notFound } from 'next/navigation';

// Data
import getEpisodes, { getEpisodeBySlug } from '@/shared/episodeData';

// Components
import EpisodeSingle from '@/components/Episode/EpisodeSingle';

export async function generateMetadata({ params }: { params: any }) {
  const episodes = await getEpisodes();
  const episode = getEpisodeBySlug(episodes, params.episodeSlug);

  if (!episode?.title) {
    notFound();
  }

  return {
    title: `${ episode.title } - Error Code: Coffee`,
    description: episode.description,
  };
}

export default async function EpisodeSlug({ params }: { params: any }) {
  const episodes = await getEpisodes();
  const episode = getEpisodeBySlug(episodes, params.episodeSlug);

  if (!episode?.title) {
    notFound();
  }

  const title = `${ episode.title } - Error Code: Coffee`;

  return (
    <>
      <EpisodeSingle episode={ episode } />
    </>
  );
}
