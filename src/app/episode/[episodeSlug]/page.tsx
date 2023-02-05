// Data
import getEpisodes, { getEpisodeBySlug } from '@/shared/episodeData';

// Components
import Footer from '@/components/Global/Footer';
import Header from '@/components/Global/Header';
import EpisodeSingle from '@/components/Episode/EpisodeSingle';

export default async function EpisodeSlug({ params }: { params: any }) {
  const episodes = await getEpisodes();
  const episode = getEpisodeBySlug(episodes, params.episodeSlug);

  return (
    <>
      <EpisodeSingle episode={ episode } />
    </>
  );
}
