// Assets
import ImageHeaderBackground from '@/assets/svg/header-background.svg';

import LogoEcc from '@/assets/svg/logo-error-code-coffee.svg';
import LogoCursief from '@/assets/svg/logo-cursief.svg';

import IconSpotify from '@/assets/svg/services/spotify.svg';
import IconApplePodcasts from '@/assets/svg/services/apple-podcasts.svg';
import IconGooglePodcasts from '@/assets/svg/services/google-podcasts.svg';
import IconRSS from '@/assets/svg/services/rss.svg';

// Copy
import copy from '@/shared/copy';

// Styles
import styles from '@/styles/page.module.scss';

export default function Header() {
  return (
    <header className={ styles.header }>
      <aside className={ [ styles.headerAside, styles['hidden-to-s' ] ].join(' ') }>
        <p className={ styles.headerAsideText }>
          <span>Hosted by</span> <a href='https://twitter.com/gideonheilbron' target='_blank' rel='noopener noreferrer'>Gideon Heilbron</a> <span>&amp;</span> <a href='https://twitter.com/mmousawy' target='_blank' rel='noopener noreferrer'>Murtada al Mousawy</a>
        </p>
      </aside>
      <div className={ styles.headerContent }>
        <div className={ styles.headerBackground }>
          <ImageHeaderBackground />
        </div>
        <a href='/' aria-label='Homepage' className={ styles.headerLogo }>
          <LogoEcc />
        </a>
        <p className={ styles.headerSubContent }><span>A podcast by</span> <a href='https://cursief.co'><LogoCursief className={ styles.headerSubContentLogo } /></a></p>

        <p className={ styles['heading-1'] }>Error Code: Coffee</p>

        <p className={ styles.headerIntro }>A geeky podcast about tech, web development and all things life.</p>

        <p className={ [ styles['heading-2'], styles['hidden-to-s' ] ].join(' ') }>About</p>
        <p className={ [ styles.headerDescription, styles['hidden-to-s' ] ].join(' ') }>
          { copy.introText }
        </p>

        <p className={ [ styles['heading-2'], styles['hidden-to-s' ] ].join(' ') }>Listen</p>
        <ul className={ styles.servicesList }>
          <li>
            <a href='https://open.spotify.com/show/3I9fjgZMOJU5dsvtRzfh3L' target='_blank' rel='noopener noreferrer'>
              <span className={ styles.serviceIcon }><IconSpotify /></span><span className={ styles.serviceName }> Spotify</span>
            </a>
          </li>
          <li>
            <a href='https://itunes.apple.com/nl/podcast/error-code-coffee/id1433981170' target='_blank' rel='noopener noreferrer'>
              <span className={ styles.serviceIcon }><IconApplePodcasts /></span><span className={ styles.serviceName }> Apple Podcasts</span>
            </a>
          </li>
          <li>
            <a href='https://www.google.com/podcasts?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy82YTgxMWNjL3BvZGNhc3QvcnNz' target='_blank' rel='noopener noreferrer'>
              <span className={ styles.serviceIcon }><IconGooglePodcasts /></span><span className={ styles.serviceName }> Google Podcasts</span>
            </a>
          </li>
          <li>
            <a href='https://anchor.fm/s/6a811cc/podcast/rss' target='_blank' rel='noopener noreferrer'>
              <span className={ styles.serviceIcon }><IconRSS /></span><span className={ styles.serviceName }> RSS feed</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
