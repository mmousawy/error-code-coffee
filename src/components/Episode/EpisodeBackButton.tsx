'use client';

import React, { useContext } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

// Contexts
import { OverviewContext } from '@/contexts/OverviewContext';

// Styles
import styles from '@/styles/episode-single.module.scss';

import IconArrowBack from '@/assets/svg/arrow-back.svg';

export default function EpisodeBackButton() {
  const overviewContext = useContext(OverviewContext);
  const router = useRouter();

  const backByHistory = (event: any) => {
    if (overviewContext.startedOnOverview) {
      event.preventDefault();
      router.back();
    }
  };

  return (
    <>
      <Link href='/' onClick={ backByHistory } className={ styles.overviewLink }><IconArrowBack /> Back to all episodes</Link>
    </>
  );
}
