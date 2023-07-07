'use client';

import { useContext, useRef, useState } from 'react';
import Select from 'react-select';

// Contexts
import { PlayerContext } from '@/contexts/PlayerContext';

// Assets
import IconPlay from '@/assets/svg/player/play.svg';
import IconPause from '@/assets/svg/player/pause.svg';
import IconLoading from '@/assets/svg/player/loading.svg';

import styles from './Player.module.scss';

function formatTime(seconds: number) {
  let minutesConverted: number|string = Math.floor(seconds / 60);
  minutesConverted = (minutesConverted >= 10) ? minutesConverted : '0' + minutesConverted;

  let secondsConverted: number|string = Math.floor(seconds % 60);
  secondsConverted = (secondsConverted >= 10) ? secondsConverted : '0' + secondsConverted;
  return minutesConverted + ':' + secondsConverted;
}

export default function Player() {
  const [ hover, setHover ] = useState(false);
  const playerContext = useContext(PlayerContext);

  const seekBarRef = useRef<HTMLDivElement>(null);

  const playOrPause = () => {
    if (playerContext.paused) {
      playerContext.audio.play();
    } else {
      playerContext.audio.pause();
    }
  };

  const startDrag = (event: React.TouchEvent|React.MouseEvent) => {
    playerContext.updateProgressVisual(event, seekBarRef.current);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);

    function onMouseMove(event: MouseEvent|TouchEvent) {
      playerContext.updateProgressVisual(event, seekBarRef.current);
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onMouseUp);
      playerContext.setRequestUpdateProgress(true);
    }
  };

  const progressPercentage = (playerContext.newProgress !== -1)
    ? (playerContext.newProgress / playerContext.duration) * 100
    : (playerContext.progress / playerContext.duration) * 100;

  function renderPlaybackSpeedOptions() {
    const min = 0.5;
    const max = 2;

    const options = [];

    for (let i = min; i <= max; i += 0.1) {
      // Round to 1 decimal place (fixes JS rounding errors)
      i = Math.round(i * 10) / 10;
      options.push({
        value: i,
        label: `${ i }×`,
      });
    }

    return options;
  }

  return (
    <>
      <div
        className={ [
          styles.player,
          playerContext.loading ? styles.playerLoading : '',
          playerContext.episode ? styles.playerVisible : '',
          // styles.playerVisible
        ].join(' ') }
      >
        <div className={ styles.playerGutter }>
          <div className={ styles.playerInside }>
            <button
              onClick={ playOrPause }
              aria-label={ playerContext.paused ? 'Play' : 'Pause' }
              className={ styles.playButton }
            >
              { playerContext.loading
                ? <IconLoading aria-hidden />
                : ( playerContext.paused
                  ? <IconPlay aria-hidden />
                  : <IconPause aria-hidden style={ { width: '20px', height: '20px' } } />
                )
              }
            </button>
            <div className={ styles.playerContent }>
              <p className={ styles.playerTitle }>{ playerContext.episode?.title || '' }</p>
              <div className={ styles.playerControls }>
                <div ref={ seekBarRef } className={ styles.playerSeekbar } onTouchStart={ startDrag } onMouseDown={ startDrag } onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
                  <div className={ styles.playerSeekbarBackground }>
                    <div className={ styles.playerSeekbarProgress } style={ { width: `calc(${ progressPercentage }% - ${ hover ? '.375rem' : '.3125rem' } )` } }></div>
                  </div>
                  <div className={ styles.playerSeekbarPosition } style={ { left: `${ progressPercentage }%` } }>
                    <div className={ styles.playerSeekbarThumb } data-seekbar-thumb />
                  </div>
                </div>
                <div className={ styles.playerTime }>
                  <span>{ formatTime(playerContext.newProgress !== -1 ? playerContext.newProgress : playerContext.progress) }</span> / <span>{ formatTime(playerContext.duration) }</span>
                </div>
                <div className={ styles.playerPlaybackSpeed }>
                  <Select
                    options={ renderPlaybackSpeedOptions() }
                    value={ { value: playerContext.playbackSpeed, label: `${ playerContext.playbackSpeed }x` } }
                    onChange={ (e) => { playerContext.setPlaybackSpeed(e?.value); } }
                    menuPlacement='top'
                    isSearchable={ false }
                    styles={ {
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        fontSize: '.875rem',
                        color: 'inherit',
                        opacity: .8,
                        fontFamily: 'var(--font-mono)',
                        minHeight: 'unset',
                        borderRadius: '.25rem',
                        padding: '.25rem .4rem .25rem .5rem',
                        '&:hover': {
                          backgroundColor: 'rgba(var(--color-foreground-rgb), .1)',
                        },
                        cursor: 'pointer',
                      }),
                      indicatorsContainer: (baseStyles, state) => ({
                        ...baseStyles,
                        marginLeft: '.25rem',
                        'svg': {
                          width: '1rem',
                          height: '1rem',
                        },
                      }),
                      menu: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: 'var(--color-background)',
                        borderRadius: '.25rem',
                        overflow: 'hidden',
                        width: 'auto',
                        boxShadow: '1px 2px 10px 1px rgba(0, 0, 0, .1)',
                        border: '1px solid var(--color-border)',
                        scrollbarWidth: 'thin',
                      }),
                      menuList: (baseStyles, state) => ({
                        ...baseStyles,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '.875rem',
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: '.2rem .4rem',
                        color: state.isSelected
                          ? 'var(--color-background)'
                          : 'var(--color-foreground)',
                        backgroundColor: state.isSelected
                          ? 'rgba(var(--color-foreground-rgb), .6)'
                          : 'var(--color-background)',
                        '&:hover': {
                          backgroundColor: !state.isSelected && 'rgba(var(--color-foreground-rgb), .1)' || '',
                        },
                      }),
                    } }
                    unstyled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
