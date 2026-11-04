import { useId, useMemo, useRef, useState } from 'react';
import { assets, type Locale } from '../lib/content';
import { buildHomeDetourItems, drawHomeDetour, type DetourBag, type HomeDetourItem } from '../lib/homeDetour';
import { recentVideos } from '../lib/videos';
import type { HomeVideo } from '../lib/youtubeFeed';
import { VideoThumbnail } from './VideoThumbnail';
import './HomeDetour.css';

type HomeDetourProps = {
  locale: Locale;
  videos: readonly HomeVideo[];
  videoStatus: 'loading' | 'live' | 'fallback';
};

export function HomeDetour(props: HomeDetourProps) {
  return <HomeDetourSession key={props.locale} {...props} />;
}

function HomeDetourSession({ locale, videos, videoStatus }: HomeDetourProps) {
  const isJapanese = locale === 'ja';
  const headingId = useId();
  const resultId = useId();
  const items = useMemo(() => buildHomeDetourItems(locale, videos.map((video) => ({
    ...video,
    title: videoStatus === 'live' ? video.title : recentVideos.find((item) => item.id === video.id)?.[locale].title ?? video.title
  }))), [locale, videos, videoStatus]);
  const bag = useRef<DetourBag>({ deck: [], remaining: [], previousId: null });
  const [draw, setDraw] = useState<{ item: HomeDetourItem; revision: number; announcement: string; checkedVideo: boolean } | null>(null);
  const selected = draw?.item;
  const video = selected?.video;
  const checkedVideo = video ? recentVideos.find((item) => item.id === video.id) : undefined;
  const external = selected?.kind === 'video';
  const typeLabel = selected?.kind === 'video' ? 'YouTube' : selected?.kind === 'note' ? (isJapanese ? 'ノート' : 'Note') : (isJapanese ? '作ったもの' : 'Project');

  const choose = () => {
    const next = drawHomeDetour(items.map((item) => item.id), bag.current);
    const item = items.find((entry) => entry.id === next.id);
    if (!item) return;
    bag.current = next.bag;
    setDraw((previous) => ({
      item,
      revision: (previous?.revision ?? 0) + 1,
      announcement: isJapanese ? `今日の寄り道：${item.title}` : `Your detour: ${item.title}`,
      checkedVideo: videoStatus !== 'live'
    }));
  };

  return (
    <section className="index-detour" aria-labelledby={headingId}>
      <div className="index-detour-heading">
        <h2 id={headingId}>{isJapanese ? '今日の寄り道' : 'A small detour'}</h2>
        <button className="index-detour-draw" type="button" onClick={choose} aria-controls={resultId}>
          <i className="ri-camera-line" aria-hidden="true" />
          {isJapanese ? (draw ? 'もう一枚引く' : '一枚引いてみる') : (draw ? 'Pick another' : 'Pick a detour')}
        </button>
      </div>
      <div className="index-detour-layout" id={resultId}>
        <div className={`index-detour-frame${selected ? ` index-detour-frame-${selected.kind}` : ' index-detour-frame-empty'}`}>
          {video ? (
            <VideoThumbnail key={`${video.id}:${video.thumbnail}`} video={{ ...video, thumbnail: checkedVideo?.thumbnail ?? video.thumbnail }} alt={isJapanese ? `${selected.title}の動画サムネイル` : `Video thumbnail: ${selected.title}`} fallbackClassName="index-detour-thumbnail-fallback" />
          ) : (
            <img src={selected?.image ?? assets.aucklandHarbour} alt={selected ? (selected.kind === 'project' ? `${selected.title}${isJapanese ? 'の表示例' : ' preview'}` : (isJapanese ? '海越しに見えるAucklandの街並み' : 'Auckland skyline across the harbour')) : ''} width={1280} height={720} loading="lazy" decoding="async" />
          )}
          {!selected && <i className="ri-camera-line index-detour-camera" aria-hidden="true" />}
          {selected && draw && <span className="index-detour-shutter" key={draw.revision} aria-hidden="true" />}
        </div>
        <div className="index-detour-copy">
          {selected ? (
            <>
              <p className="index-detour-kind">{typeLabel}</p>
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
              <a className="index-detour-open" href={selected.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
                {isJapanese ? (external ? 'YouTubeで見る' : selected.kind === 'note' ? 'ノートを読む' : 'プロジェクトを見る') : (external ? 'Watch on YouTube' : selected.kind === 'note' ? 'Read the note' : 'View the project')}
                <i className={external ? 'ri-external-link-line' : 'ri-arrow-right-line'} aria-hidden="true" />
              </a>
              {external && draw?.checkedVideo && <p className="index-detour-source">{isJapanese ? '確認済みの動画から選んでいます。' : 'From the checked video selection.'}</p>}
            </>
          ) : (
            <>
              <p className="index-detour-invitation">{isJapanese ? '海の日の動画、暮らしのメモ、小さな制作記録。' : 'New Zealand videos and the projects behind this site.'}</p>
            </>
          )}
        </div>
      </div>
      <p className="index-detour-announcement" role="status" aria-live="polite" aria-atomic="true">{draw?.announcement ?? ''}</p>
    </section>
  );
}
