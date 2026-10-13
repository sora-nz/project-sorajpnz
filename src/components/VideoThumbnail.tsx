import { useState } from 'react';
import { assets } from '../lib/content';

type VideoThumbnailProps = {
  video: { id: string; thumbnail: string };
  alt: string;
  fallbackClassName?: string;
};

export function VideoThumbnail({ video, alt, fallbackClassName }: VideoThumbnailProps) {
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const liveThumbnail = /^[A-Za-z0-9_-]{11}$/.test(video.id)
    ? `/.netlify/functions/youtube-thumbnail?id=${video.id}` : undefined;
  const sources = [liveThumbnail, video.thumbnail, assets.logoMark];
  const src = sources.find((source) => source && !failedSources.includes(source)) ?? assets.logoMark;
  const isLogo = src === assets.logoMark;

  return (
    <img className={isLogo ? fallbackClassName : undefined}
      src={src} alt={isLogo ? 'SoraJPNZ' : alt}
      width={1280} height={720} loading="lazy" decoding="async"
      onError={() => {
        if (!isLogo) setFailedSources((failed) => failed.includes(src) ? failed : [...failed, src]);
      }} />
  );
}
