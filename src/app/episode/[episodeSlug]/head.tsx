// Data
import getEpisodes, { getEpisodeBySlug } from '@/shared/episodeData';

export default async function Head({ params }: { params: any }) {
  const episodes = await getEpisodes();
  const episode = getEpisodeBySlug(episodes, params.episodeSlug);

  return (
    <>
      <title>{ episode.title } - Error Code: Coffee</title>
    </>
  );
}
