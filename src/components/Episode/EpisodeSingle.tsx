import Link from 'next/link';

// Styles
import styles from '@/styles/episode-single.module.scss';
import EpisodeButton from '@/components/Episode/EpisodeButton';

import IconArrowBack from '@/assets/svg/arrow-back.svg';

export default function EpisodeSingle(props: any) {
  const episode = props.episode;

  return (
    <>
      <main className={ styles.main }>
        <div className={ styles.mainContainer }>
          <div className={ styles.section }>
            <div className={ styles.sectionGutter }>
              <div><Link href='/' className={ styles.overviewLink }><IconArrowBack /> Back to all episodes</Link></div>
            </div>
          </div>
          <div className={ styles.section }>
            <div className={ styles.sectionGutter }>
              <div className={ styles.episode }>
                <div className={ styles.episodeContent }>
                  <time className={ styles.date } dateTime={ episode.isoDate }>{ episode.convertedDate }</time>
                  <h1 className={ styles.episodeHeading }>{ episode.title }</h1>
                  <div className={ styles.episodeDescription } dangerouslySetInnerHTML={ { __html: episode.content } } />
                  <EpisodeButton episode={ episode } large={ true } />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
