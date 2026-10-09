import { useEffect, useState } from 'react';
import { parseYoutubeFeed, youtubeFeedEndpoint, type HomeVideo } from './youtubeFeed';

type RecentVideoStatus = 'loading' | 'live' | 'fallback';

export function useRecentVideos(fallbackVideos: readonly HomeVideo[]) {
  const [videos, setVideos] = useState<readonly HomeVideo[]>(fallbackVideos);
  const [status, setStatus] = useState<RecentVideoStatus>('loading');

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timer = setTimeout(() => controller.abort(), 8000);
    setVideos(fallbackVideos);
    setStatus('loading');

    (async () => {
      try {
        const response = await fetch(youtubeFeedEndpoint, {
          signal: controller.signal,
          credentials: 'omit',
          mode: 'same-origin',
          headers: { Accept: 'application/atom+xml' }
        });
        const contentType = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
        if (!response.ok || contentType !== 'application/atom+xml') throw new Error('Feed unavailable');
        const recent = parseYoutubeFeed(await response.text());
        if (recent.length === 0) throw new Error('No usable feed entries');
        if (active) {
          setVideos(recent);
          setStatus('live');
        }
      } catch {
        if (active) {
          setVideos(fallbackVideos);
          setStatus('fallback');
        }
      } finally {
        clearTimeout(timer);
      }
    })();

    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [fallbackVideos]);

  return { videos, status };
}
