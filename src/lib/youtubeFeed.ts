export const youtubeChannelId = 'UCIDqwDcCJEDbBhgBZW0PDpA';
export const youtubeFeedEndpoint = '/.netlify/functions/youtube-feed';
export const youtubeFeedByteLimit = 128 * 1024;
const atomNamespace = 'http://www.w3.org/2005/Atom';
const youtubeNamespace = 'http://www.youtube.com/xml/schemas/2015';
const maximumEntries = 64;
const maximumVideos = 4;

export type HomeVideo = {
  id: string;
  title: string;
  date: string;
  url: string;
  thumbnail: string;
};

export type YoutubeFeedEntry = {
  id: string;
  channelId: string;
  title: string;
  published: string;
};

function parsePublished(value: string) {
  const parts = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/);
  if (!parts) return null;
  const [, year, month, day, hour, minute, second, offset] = parts;
  const daysInMonth = new Date(Date.UTC(Number(year), Number(month), 0)).getUTCDate();
  if (Number(month) < 1 || Number(month) > 12 || Number(day) < 1 || Number(day) > daysInMonth || Number(hour) > 23 || Number(minute) > 59 || Number(second) > 59) return null;
  if (offset !== 'Z' && (Number(offset.slice(1, 3)) > 23 || Number(offset.slice(4, 6)) > 59)) return null;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : null;
}

export function normalizeYoutubeFeedEntries(entries: readonly YoutubeFeedEntry[]): HomeVideo[] {
  const valid = entries.slice(0, maximumEntries).flatMap((entry) => {
    if (entry.channelId !== youtubeChannelId || typeof entry.id !== 'string' || !/^[A-Za-z0-9_-]{11}$/.test(entry.id)) return [];
    if (typeof entry.title !== 'string' || typeof entry.published !== 'string') return [];
    const title = entry.title.replace(/\s+/g, ' ').trim();
    const timestamp = parsePublished(entry.published);
    if (!title || title.length > 500 || timestamp === null) return [];
    const video: HomeVideo = {
      id: entry.id,
      title,
      date: entry.published.slice(0, 10),
      url: `https://www.youtube.com/watch?v=${entry.id}`,
      thumbnail: `/.netlify/functions/youtube-thumbnail?id=${entry.id}`
    };
    return [{ video, timestamp }];
  }).sort((left, right) => right.timestamp - left.timestamp);

  const seen = new Set<string>();
  return valid.filter(({ video }) => {
    if (seen.has(video.id)) return false;
    seen.add(video.id);
    return true;
  }).slice(0, maximumVideos).map(({ video }) => video);
}

function childText(parent: Element, namespace: string, localName: string) {
  return Array.from(parent.children).find((element) => element.namespaceURI === namespace && element.localName === localName)?.textContent?.trim() ?? '';
}

export function parseYoutubeFeed(xml: string): HomeVideo[] {
  if (xml.length > youtubeFeedByteLimit || new TextEncoder().encode(xml).byteLength > youtubeFeedByteLimit || /<\s*!(?:DOCTYPE|ENTITY)\b/i.test(xml)) return [];
  const document = new DOMParser().parseFromString(xml, 'application/xml');
  if (document.getElementsByTagNameNS('*', 'parsererror').length > 0) return [];
  const feed = document.documentElement;
  const channelId = childText(feed, youtubeNamespace, 'channelId');
  if (feed.localName !== 'feed' || feed.namespaceURI !== atomNamespace || (channelId !== youtubeChannelId && channelId !== youtubeChannelId.slice(2))) return [];

  const entries = Array.from(feed.children)
    .filter((element) => element.namespaceURI === atomNamespace && element.localName === 'entry')
    .slice(0, maximumEntries)
    .map((entry) => ({
      id: childText(entry, youtubeNamespace, 'videoId'),
      channelId: childText(entry, youtubeNamespace, 'channelId'),
      title: childText(entry, atomNamespace, 'title'),
      published: childText(entry, atomNamespace, 'published')
    }));
  return normalizeYoutubeFeedEntries(entries);
}
