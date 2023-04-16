'use client';

import { useContext } from 'react';

// Contexts
import { PlayerContext } from '@/contexts/PlayerContext';

// Assets
import IconPlay from '@/assets/svg/play.svg';
import IconPlayingAnimation from '@/assets/svg/playing-animation.svg';

// Styles
import styles from './EpisodeButton.module.scss';

export default function EpisodeButton(props: any) {
  const playerContext = useContext(PlayerContext);
  const episode = props.episode;

  const timeToMin = (time: string) => {
    const timeSplit = time.split(':');
    if (timeSplit.length > 2) {
      return `${ parseInt(timeSplit[0]) } hr ${ parseInt(timeSplit[1]) } min`;
    } else {
      return `${ parseInt(timeSplit[0]) } min`;
    }
  };

  return (
    <>
      <button
        className={ [ styles.playButton, props.large ? styles.playButtonLarge : '' ].join(' ') }
        aria-label={ playerContext?.episode?.slug === episode.slug
          ? 'Playing'
          : `Play ${ episode.title }`
        }
        onClick={ () => playerContext?.load(episode) }
        disabled={ (playerContext?.episode?.slug === episode.slug) }
      >
        { (playerContext?.episode?.slug === episode.slug)
          ? <><IconPlayingAnimation className={ styles.playAnimation } aria-hidden='true' /> <span aria-hidden='true'>Playing</span></>
          : <><IconPlay className={ styles.playIcon } aria-hidden='true' /> <span aria-hidden='true'>Listen ({ timeToMin(props.episode.itunes.duration) })</span></>
        }
      </button>
    </>
  );
}
