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
                    <Link href={ `/episode/${ episode.slug }` }>
                      <h3 className={ styles.episodeHeading }>{ episode.title }</h3>
                    </Link>
                    <div className={ [ styles.episodeDescriptionHolder, styles.episodeDescriptionHolderOpened ].join(' ') }></div>
                    <EpisodeDescription contentSnippet={ episode.contentSnippet } />
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
