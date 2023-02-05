// Styles
import styles from '@/styles/page.module.scss';

// Copy
import copy from '@/shared/copy';

export default function Footer() {
  return (
    <footer className={ [ styles.footer, styles['hidden-from-s'] ].join(' ') }>
      <h2 className={ styles['heading-2'] }>About</h2>
      <p className={ styles.headerDescription }>
        { copy.introText }
      </p>
      <p className={ styles.headerAsideText }>
        <span>Hosted by<br className={ styles['hidden-from-s'] } /></span> <a href='https://twitter.com/gideonheilbron' target='_blank' rel='noopener noreferrer'>Gideon Heilbron</a> <span>&amp;</span> <a href='https://twitter.com/mmousawy' target='_blank' rel='noopener noreferrer'>Murtada al Mousawy</a>
      </p>
    </footer>
  );
}
