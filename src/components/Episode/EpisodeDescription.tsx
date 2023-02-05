'use client';

import { useEffect, useRef, useState } from 'react';

import styles from '@/styles/page.module.scss';

export default function LogButton(props: any) {
  const [ showMore, setShowMore ] = useState(false);
  const [ isTooBig, setIsTooBig ] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const resizeHandler = () => {
    if (!containerRef.current || !descriptionRef.current) {
      return;
    }

    if (containerRef.current?.clientHeight < descriptionRef.current.clientHeight) {
      setIsTooBig(true);
      containerRef.current.setAttribute('style', `max-height: ${ descriptionRef.current.clientHeight }px`);

    } else {
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
        <p ref={ descriptionRef } className={ styles.episodeDescription } dangerouslySetInnerHTML={
          { __html: props.contentSnippet }
        } />

      </div>
      { isTooBig && (
        <button className={ styles.showMoreButton } onClick={ () => setShowMore(!showMore) }>
          { !showMore ? 'Show more' : 'Show less'}
        </button>
      ) }
    </>
  );
}
