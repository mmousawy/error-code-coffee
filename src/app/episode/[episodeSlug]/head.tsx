import { notFound } from 'next/navigation';

// Data
import getEpisodes, { getEpisodeBySlug } from '@/shared/episodeData';

export default async function Head({ params }: { params: any }) {
  const episodes = await getEpisodes();
  const episode = getEpisodeBySlug(episodes, params.episodeSlug);

  if (!episode?.title || typeof episode.title !== 'string') {
    notFound();
  }

  const title = `${ episode.title } - Error Code: Coffee`;

  return (
    <>
      <title>{ title }</title>
    </>
  );
}
