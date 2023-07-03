'use client';

import React, { useCallback } from 'react';

// Components
import EpisodeDescription from './EpisodeDescription';
import EpisodeButton from './EpisodeButton';

// Styles
import styles from '@/styles/page.module.scss';
import Link from 'next/link';

export default function EpisodeOverview(props: any) {
  const episodesPerPage = 10;
  const [ page, setPage ] = React.useState(1);
  const episodesCount = props.episodes.items.length;

  if (process.env.NODE_ENV === 'development') {
    console.log(props.episodes.items);
  }

  const renderEpisodes = useCallback(() => {
    const renderedEpisodes = props.episodes.items.map((episode: any, episodeIndex: number) => {

      if (episodeIndex >= episodesPerPage * page) {
        return;
      }

      return (
        <React.Fragment key={ episode.guid }>
          { episode.isoDate && (
            <div className={ styles.section }>
              <div className={ styles.sectionGutter }>
                <div className={ styles.episode }>
                  <div className={ styles.episodeContent }>
                    <time className={ styles.date } dateTime={ episode.isoDate }>{ episode.convertedDate }</time>
                    <h2 className={ styles.episodeHeading }>
                      <Link href={ `/episode/${ episode.slug }` }>
                        { episode.title }
                      </Link>
                    </h2>
                    <div className={ [ styles.episodeDescriptionHolder, styles.episodeDescriptionHolderOpened ].join(' ') }></div>
                    <EpisodeDescription content={ episode.contentCompact } />
                    <EpisodeButton episode={ episode } />
                  </div>
                </div>
              </div>
            </div>
          ) }
        </React.Fragment>
      );
    });

    return renderedEpisodes;
  }, [ props.episodes, page ]);

  return (
    <main className={ styles.main }>
      <div className={ styles.mainContainer }>

        <div className={ styles.section }>
          <div className={ styles.sectionGutter }>
            <h1 className={ styles.mainHeading }>All episodes</h1>
          </div>
        </div>

        { renderEpisodes() }

        { episodesCount > episodesPerPage * page && (
          <button className={ styles.loadMoreButton } onClick={ () => setPage(page + 1) }>More episodes</button>
        ) }

      </div>
    </main>
  );
}
