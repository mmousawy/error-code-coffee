'use client';

import { useEffect, useState } from 'react';

// Assets
import IconDarkMode from '@/assets/svg/dark-mode.svg';
import IconLightMode from '@/assets/svg/light-mode.svg';

// Styles
import styles from './ThemeSwitcher.module.scss';

export default function EpisodeButton(props: any) {
  const [ theme, setTheme ] = useState<string|null>(null);

  useEffect(() => {
    setTheme(localStorage.getItem('theme'));
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');

    if (theme) {
      document.documentElement.classList.add(theme || '');
      localStorage.setItem('theme', theme);
    }
  }, [ theme ]);

  const switchTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <>
      <button
        className={ [ styles.themeButton, theme === 'light' ? styles.themeButtonLight : styles.themeButtonDark ].join(' ') }
        aria-label={ theme === 'light'
          ? 'Switch theme to dark mode'
          : 'Switch theme to light mode'
        }
        onClick={ switchTheme }
      >
        { (theme === 'dark')
          ? <><IconLightMode /></>
          : <><IconDarkMode /></>
        }
      </button>
    </>
  );
}
function useCallback(arg0: () => void, arg1: (string | null)[]) {
  throw new Error('Function not implemented.');
}
