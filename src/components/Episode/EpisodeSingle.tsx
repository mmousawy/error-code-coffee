
// Styles
import styles from '@/styles/episode-single.module.scss';
import EpisodeButton from '@/components/Episode/EpisodeButton';
import EpisodeBackButton from './EpisodeBackButton';

export default function EpisodeSingle(props: any) {
  const episode = props.episode;

  return (
    <>
      <main className={ styles.main }>
        <div className={ styles.mainContainer }>
          <div className={ styles.section }>
            <div className={ styles.sectionGutter }>
              <div>
                <EpisodeBackButton />
              </div>
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
