import Parser from 'rss-parser';

import { slugify } from '@/utils';

// Init external modules
const parser = new Parser();

function convertToHyperlinks(text: string) {
  const regex = /(https?:\/\/[^\s]+)/g;
  return text.replace(regex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}

function cleanEpisodeDescription(snippet: string) {
  snippet = convertToHyperlinks(snippet);

  return snippet
    .replace('\n', '\n\n')
    .split('---')[0]
    .replace(/\v+/g, ' ')
    .trim();
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
    episode.contentSnippet = cleanEpisodeDescription(episode.contentSnippet || 'No description available.');

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
