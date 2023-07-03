'use client';

import React from 'react';

// Components
import EpisodeDescription from './EpisodeDescription';
import EpisodeButton from './EpisodeButton';

// Styles
import styles from '@/styles/page.module.scss';
import Link from 'next/link';

export default function EpisodeOverview(props: any) {
  let currentSeason: string;

  const renderEpisodes = () => {
    const renderedEpisodes = props.episodes.items.map((episode: any) => {
      let renderSeasonHeading = false;

      if (process.env.NODE_ENV === 'development') {
        console.log(episode);
      }

      // Check if the current episode season hasn't been passed yet
      if (currentSeason !== episode.itunes.season) {
        currentSeason = episode.itunes.season;

        renderSeasonHeading = true;
      }

      return (
        <React.Fragment key={ episode.guid }>
          { renderSeasonHeading && (
            <div className={ [ styles.section, styles['section--heading'] ].join(' ') }>
              <div className={ styles.sectionGutter }>
                <h2 className={ styles.seasonHeading }>Season { currentSeason }</h2>
              </div>
            </div>
          ) }
          { episode.isoDate && (
            <div className={ styles.section }>
              <div className={ styles.sectionGutter }>
                <div className={ styles.episode }>
                  <div className={ styles.episodeContent }>
                    <time className={ styles.date } dateTime={ episode.isoDate }>{ episode.convertedDate }</time>
                    <h3 className={ styles.episodeHeading }>
                      <Link href={ `/episode/${ episode.slug }` }>
                        { episode.title }
                      </Link>
                    </h3>
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
  };

  return (
    <main className={ styles.main }>
      <div className={ styles.mainContainer }>

        <div className={ styles.section }>
          <div className={ styles.sectionGutter }>
            <h1 className={ styles.mainHeading }>All episodes</h1>
          </div>
        </div>

        { renderEpisodes() }

      </div>
    </main>
  );
}
