import type { Locale } from '../lib/content';
import type { Video } from '../lib/videos';

type VideoFeatureProps = {
  locale: Locale;
  video: Video;
  headingLevel?: 2 | 3;
  showNote?: boolean;
  showDescription?: boolean;
};

export function VideoFeature({ locale, video, headingLevel = 2, showNote = false, showDescription = true }: VideoFeatureProps) {
  const copy = video[locale];
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const watch = locale === 'ja' ? 'YouTubeで見る' : 'Watch on YouTube';
  const dateLabel = new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-NZ', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  }).format(new Date(`${video.date}T00:00:00Z`));

  return (
    <div className="video-feature">
      <a className="video-feature-image" href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`${copy.title} - ${watch}`}>
        <img src={video.thumbnail} alt={copy.imageAlt} width="1280" height="720" loading="lazy" decoding="async" />
        <span className="video-play" aria-hidden="true"><i className="ri-play-fill" /></span>
      </a>
      <div className="video-feature-copy">
        <div className="video-feature-meta">
          <span>{locale === 'ja' ? '最近の動画' : 'Latest video'}</span>
          <time dateTime={video.date}>{dateLabel}</time>
        </div>
        <Heading><a href={video.url} target="_blank" rel="noopener noreferrer">{copy.title}</a></Heading>
        {showDescription && <p>{copy.description}</p>}
        <div className="video-feature-actions">
          <a className="button primary small" href={video.url} target="_blank" rel="noopener noreferrer">
            <i className="ri-youtube-line" aria-hidden="true" /><span>{watch}</span><i className="ri-external-link-line" aria-hidden="true" />
          </a>
          {showNote && locale === 'ja' && video.notePath && <a className="text-link" href={video.notePath}>動画の補足ノート<i className="ri-arrow-right-line" aria-hidden="true" /></a>}
        </div>
      </div>
    </div>
  );
}
