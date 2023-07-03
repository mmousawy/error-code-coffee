'use client';

import { useEffect, useRef, useState } from 'react';

import styles from '@/styles/page.module.scss';

export default function LogButton(props: any) {
  const [ showMore, setShowMore ] = useState(false);
  const [ isTooBig, setIsTooBig ] = useState(true);
  const [ containerHeight, setContainerHeight ] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const resizeHandler = () => {
    if (!containerRef.current || !descriptionRef.current) {
      return;
    }

    if (80 < descriptionRef.current.clientHeight) {
      setIsTooBig(true);
      containerRef.current.setAttribute('style', `max-height: ${ descriptionRef.current.clientHeight }px`);

    } else if (!showMore) {
      setIsTooBig(false);
    }
  };

  useEffect(() => {
    if (!containerRef.current || !descriptionRef.current) {
      return;
    }

    resizeHandler();
    addEventListener('resize', resizeHandler);

    return () => {
      removeEventListener('resize', resizeHandler);
    };
  }, [ containerRef, descriptionRef ]);

  return (
    <>
      <div ref={ containerRef } className={ [
        styles.episodeDescriptionHolder,
        showMore ? styles.episodeDescriptionHolderOpen : styles.episodeDescriptionHolderClosed,
        isTooBig && !showMore ? styles.episodeDescriptionHolderTooBig : '',
      ].join(' ') }
      >
        <div ref={ descriptionRef } className={ styles.episodeDescription } dangerouslySetInnerHTML={
          { __html: props.content }
        } />

      </div>
      { isTooBig && (
        <button className={ styles.showMoreButton } onClick={ () => setShowMore(!showMore) }>
          { !showMore ? '+ Show more' : '- Show less'}
        </button>
      ) }
    </>
  );
}
