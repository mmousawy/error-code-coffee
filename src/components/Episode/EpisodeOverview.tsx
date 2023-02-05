'use client';

import React from 'react';

// Components
import EpisodeDescription from './EpisodeDescription';
import EpisodeButton from './EpisodeButton';

// Styles
import styles from '@/styles/page.module.scss';
import Link from 'next/link';

export default function EpisodeOverview(props: any) {
  return (
    <main className={ styles.main }>
      <div className={ styles.mainContainer }>

        <div className={ styles.section }>
          <div className={ styles.sectionGutter }>
            <h1 className={ styles.mainHeading }>All episodes</h1>
          </div>
        </div>

        { props.episodes.items.map((episode: any) => (
          <React.Fragment key={ episode.guid }>
            { episode.isoDate && (
              <div className={ styles.section }>
                <div className={ styles.sectionGutter }>
                  <div className={ styles.episode }>
                    <div className={ styles.episodeContent }>
                      <time className={ styles.date } dateTime={ episode.isoDate }>{ episode.convertedDate }</time>
                      <Link href={ `/episode/${ episode.slug }` }><h2 className={ styles.episodeHeading }>{ episode.title }</h2></Link>
                      <div className={ [ styles.episodeDescriptionHolder, styles.episodeDescriptionHolderOpened ].join(' ') }></div>
                      <EpisodeDescription contentSnippet={ episode.contentSnippet } />
                      <EpisodeButton episode={ episode } />
                    </div>
                  </div>
                </div>
              </div>
            ) }
          </React.Fragment>
        )) }

      </div>
    </main>
  );
}
