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

  if (process.env.NODE_ENV === 'development') {
    console.log(episode);
  }

  const meta = {
    title: `${ episode.title } - Error Code: Coffee`,
    description: episode.excerpt,
    image: `/og?title=${ encodeURIComponent(episode.title) }`,
  };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [ meta.image ],
    },
  };
}

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
