import Parser from 'rss-parser';

import { slugify } from '@/utils';

// Init external modules
const parser = new Parser();

function convertToHyperlinks(text: string) {
  const regex = /(?!<a[^>]*>[^<])(((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?))(?![^<]*<\/a>)/gi;
  return text.replace(regex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}

function cleanEpisodeDescription(snippet: string, options: { compact?: boolean } = {}) {
  snippet = convertToHyperlinks(snippet);

  snippet = snippet
    .replace('--------------------', '<hr>')
    .replace('---', '<hr>')
    .replace(/\v+/g, ' ')
    .replace(/<p><\/p>/g, '')
    .trim();

  if (options.compact) {
    snippet = snippet.split('<hr>')[0];
  }

  return snippet;
}

export default async function getEpisodes() {
  const response = await fetch('https://anchor.fm/s/6a811cc/podcast/rss', { next: { revalidate: 600 } });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const data: any = await parser.parseString(await response.text());

  data.items.forEach((episode: any) => {
    episode.slug = slugify(episode.title);

    episode.itunes.duration = episode.itunes.duration.replace(/^00:/, '');
    episode.content = cleanEpisodeDescription(episode.content || 'No description available.');
    episode.contentCompact = cleanEpisodeDescription(episode.content || 'No description available.', {
      compact: true,
    });

    episode.url = episode.enclosure.url;
    delete episode.enclosure;

    const convertedDate = new Date(episode.isoDate as string);
    episode.convertedDate = convertedDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  return data;
}

export function getEpisodeBySlug(episodes: any, slug: string) {
  return episodes.items.find((ep: any) => slugify(ep.title) === slug);
}
