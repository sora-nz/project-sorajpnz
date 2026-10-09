import { cacheHeaders, fetchPublicBytes, invalidRequest, youtubeChannelId } from '../lib/youtube-public.mjs';

const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeChannelId}`;

export default async function youtubeFeed(request) {
  if (request.method !== 'GET') return invalidRequest(405, 'GET');
  if (new URL(request.url).search) return invalidRequest(400);

  try {
    const bytes = await fetchPublicBytes(feedUrl, ['application/atom+xml', 'application/xml', 'text/xml']);
    const xml = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    if (/<\s*!(?:DOCTYPE|ENTITY)\b/i.test(xml) || !xml.includes(youtubeChannelId) || !/<(?:\w+:)?feed[\s>]/.test(xml)) {
      throw new Error('Unexpected public feed');
    }
    return new Response(xml, { headers: cacheHeaders('application/atom+xml; charset=utf-8', 1800) });
  } catch (error) {
    const status = error instanceof Error ? error.message.match(/^Public source unavailable \((\d{3})\)$/) : null;
    const reason = status ? 'upstream-status' : error instanceof Error && error.message === 'Public source timed out' ? 'timeout' : 'unavailable';
    return new Response(JSON.stringify({ available: false, reason, ...(status ? { upstreamStatus: Number(status[1]) } : {}) }), {
      headers: cacheHeaders('application/json; charset=utf-8', 300)
    });
  }
}
