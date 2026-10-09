import { useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, links, Locale, projects, seo, socialLinks } from '../lib/content';
import { localize } from '../lib/routes';
import { pageJsonLd, useMeta } from '../lib/useMeta';
import { homeVideoFallback, recentVideos } from '../lib/videos';
import { useRecentVideos } from '../lib/useRecentVideos';
import type { HomeVideo } from '../lib/youtubeFeed';

type HomeProps = {
  locale: Locale;
  path: string;
};

function VideoThumbnail({ video, locale }: { video: HomeVideo; locale: Locale }) {
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const known = recentVideos.find((item) => item.id === video.id);
  const sources = [video.thumbnail, known?.thumbnail, assets.logoMark];
  const src = sources.find((source) => source && !failedSources.includes(source)) ?? assets.logoMark;
  const isLogo = src === assets.logoMark;
  const alt = isLogo ? 'SoraJPNZ' : src === known?.thumbnail ? known[locale].imageAlt
    : locale === 'ja' ? `${video.title}の動画サムネイル` : `Video thumbnail: ${video.title}`;
  return (
    <img className={isLogo ? 'way-thumbnail-fallback' : undefined}
      src={src} alt={alt}
      width={1280} height={720} loading="lazy" decoding="async"
      onError={() => {
        if (!isLogo) setFailedSources((failed) => failed.includes(src) ? failed : [...failed, src]);
      }} />
  );
}

export function Home({ locale, path }: HomeProps) {
  const isJapanese = locale === 'ja';
  const p = projects[locale];
  const meta = seo[locale].home;
  const base = localize(locale);
  const { videos, status: videoStatus } = useRecentVideos(homeVideoFallback);
  const featuredVideo = videos[0];
  const knownVideo = recentVideos.find((item) => item.id === featuredVideo.id);
  const video = {
    title: videoStatus === 'live' ? featuredVideo.title : knownVideo?.[locale].title ?? featuredVideo.title,
    description: knownVideo?.[locale].description ?? (isJapanese ? 'SoraとTheaのNZでの日々を、YouTubeに残しています。' : 'A recent upload from SoraJPNZ. The original YouTube title is shown.')
  };
  const formatVideoDate = (date: string) => new Intl.DateTimeFormat(isJapanese ? 'ja-JP' : 'en-NZ', {
    year: 'numeric',
    month: isJapanese ? '2-digit' : 'short',
    day: '2-digit',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`));
  const channels = socialLinks.filter((channel) => channel.href && channel.showOnHome);
  const destinations = [
    {
      id: 'video',
      href: links.youtube,
      external: true,
      icon: 'ri-play-fill',
      label: isJapanese ? '動画を見る' : 'Watch the videos',
      hint: isJapanese ? 'NZでの暮らしや海の動画' : 'Everyday life and ocean days in NZ'
    },
    {
      id: 'notes',
      href: `${base}/blog`,
      external: false,
      icon: 'ri-article-line',
      label: isJapanese ? 'Notesを読む' : 'Read the Notes',
      hint: isJapanese ? '生活のこと、仕事のこと' : 'Living costs, work, and field notes'
    },
    {
      id: 'projects',
      href: `${base}/projects`,
      external: false,
      icon: 'ri-tools-fill',
      label: isJapanese ? '作ったものを見る' : 'Explore my work',
      hint: isJapanese ? '使えるツールとプロジェクト' : 'Working tools and data projects'
    }
  ];
  const selectedWork = [
    {
      path: 'nz-japan-relocation',
      image: assets.dashboard,
      width: 1399,
      height: 949,
      title: p.relocationTitle,
      body: isJapanese ? '家賃、食費、為替を公開データから見るダッシュボード。' : 'A public-data dashboard connecting rent, food prices, and exchange rates.'
    },
    {
      path: 'rent-radar',
      image: assets.rentRadar,
      width: 1106,
      height: 616,
      title: p.rentRadarTitle,
      body: isJapanese ? 'エリアごとの家賃を比べ、変化を追う小さなデータプロジェクト。' : 'A small data project for comparing local rents and tracking changes.'
    }
  ];

  useMeta({
    locale,
    path,
    title: meta.title,
    description: meta.description,
    image: assets.aucklandHarbour,
    jsonLd: pageJsonLd(locale, path, meta.title, meta.description)
  });

  const renderVideo = (className: string) => (
    <section className={className} aria-labelledby="way-video-heading">
      <div className="way-section-heading">
        <h2 id="way-video-heading">{isJapanese ? '最近の動画' : 'Life behind the projects'}</h2>
        <a className="way-link" href={links.youtube} target="_blank" rel="noopener noreferrer">
          {isJapanese ? 'すべての動画を見る' : 'All videos'}
          <i className="ri-arrow-right-line" aria-hidden="true" />
        </a>
      </div>
      <p className="way-video-intro">{isJapanese ? 'Theaとの日常、海に出かけた日、短いひとこま。新しい動画も、ここから見られます。' : 'Life with Thea, ocean days, and shorter moments from New Zealand.'}</p>
      <div className="way-video" data-video-source={videoStatus}>
        <a className="way-video-image" href={featuredVideo.url} target="_blank" rel="noopener noreferrer" aria-label={isJapanese ? `${video.title}をYouTubeで見る` : `Watch ${video.title} on YouTube`}>
          <VideoThumbnail video={featuredVideo} locale={locale} key={`${featuredVideo.id}:${featuredVideo.thumbnail}`} />
          <span className="way-play" aria-hidden="true"><i className="ri-play-fill" /></span>
        </a>
        <div className="way-video-copy">
          <h3>
            <a href={featuredVideo.url} target="_blank" rel="noopener noreferrer">{video.title}</a>
          </h3>
          <time dateTime={featuredVideo.date}>{formatVideoDate(featuredVideo.date)}</time>
          <p>{video.description}</p>
          <div className="way-actions">
            <a className="way-button way-button-youtube" href={featuredVideo.url} target="_blank" rel="noopener noreferrer">
              <i className="ri-youtube-fill" aria-hidden="true" />
              {isJapanese ? 'YouTubeで見る' : 'Watch on YouTube'}
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </a>
            {isJapanese && knownVideo?.notePath && (
              <a className="way-link way-note-link" href={knownVideo.notePath}>
                <i className="ri-article-line" aria-hidden="true" />
                動画の補足ノート
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
      {videos.length > 1 && (
        <div className="way-recent-videos">
          <h3>{isJapanese ? 'ほかの動画・ショート' : 'More videos and short moments'}</h3>
          <ul className="way-video-list">
            {videos.slice(1).map((item) => {
              const title = videoStatus === 'live' ? item.title : recentVideos.find((entry) => entry.id === item.id)?.[locale].title ?? item.title;
              return (
                <li key={item.id}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <VideoThumbnail video={item} locale={locale} key={`${item.id}:${item.thumbnail}`} />
                    <h4>{title}</h4>
                    <time dateTime={item.date}>{formatVideoDate(item.date)}</time>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {videoStatus === 'fallback' && (
        <p className="way-video-status">{isJapanese ? '確認済みの動画を表示しています。最新の投稿はYouTubeからどうぞ。' : 'Showing checked uploads. Visit YouTube for the latest posts.'}</p>
      )}
    </section>
  );

  const renderCalculator = (className: string) => (
    <section className={className} aria-labelledby="way-tool-heading">
      <div className="way-project-layout">
        <a className="way-project-image" href={`${base}/tools/nz-life-reality-calculator`} aria-label={isJapanese ? 'NZ生活リアリティ計算機を開く' : 'Open the NZ Life Reality Calculator'}>
        <img src={isJapanese ? assets.calculatorJa : assets.calculator} alt={isJapanese ? 'NZ生活リアリティ計算機の入力画面と試算結果の表示例' : 'NZ Life Reality Calculator input controls and example results'} width={1280} height={720} loading="lazy" decoding="async" />
        <span className="way-preview-label">{isJapanese ? '表示例' : 'Example screen'}</span>
        </a>
        <div className="way-project-copy">
          <p className="way-kicker">{isJapanese ? '作ったもの' : 'Featured project'}</p>
          <h2 id="way-tool-heading">{isJapanese ? 'NZ生活リアリティ計算機' : 'NZ Life Reality Calculator'}</h2>
          <p>{isJapanese ? '家賃や勤務時間を変えて、月の余白を試す。NZでの生活を考えるときの、シンプルな計算ツールです。' : 'A browser tool for testing how wages, rent, transport, and savings goals affect monthly room in a New Zealand budget.'}</p>
          <p className="way-tool-note">{isJapanese ? 'NZDと日本円の参考表示に対応。入力内容は保存しません。概算ツールです。' : 'Client-side calculations, adjustable assumptions, and optional JPY reference amounts. Inputs are not stored; results are estimates.'}</p>
          <div className="way-actions">
            <a className="way-button way-button-tool" href={`${base}/tools/nz-life-reality-calculator`}>
              <i className="ri-calculator-line" aria-hidden="true" />
              {isJapanese ? '計算機を使う' : 'Try the calculator'}
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </a>
            <a className="way-link" href={`${base}/projects/nz-life-reality-calculator`}>
              <i className="ri-file-text-line" aria-hidden="true" />
              {isJapanese ? '制作メモ' : 'Read the case study'}
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="page wayfinding-home">
      <Header locale={locale} path={path} />
      <main>
        <section className="way-hero">
          <img className="way-hero-image" src={assets.aucklandHarbour} alt={isJapanese ? '木陰の遊歩道から、海越しに見えるAucklandの街並み' : 'Auckland skyline across the harbour, viewed from a tree-lined waterfront path'} width={1024} height={768} loading="eager" fetchPriority="high" decoding="async" />
          <div className="way-inner way-hero-copy">
            <h1>SoraJPNZ</h1>
            <p className="way-hero-subtitle">{isJapanese ? 'NZの日常と、作ったもの。' : 'New Zealand life, and things I build.'}</p>
            <p className="way-hero-description">{isJapanese ? 'SoraとTheaの日々、海の動画、生活の疑問から作ったツール。' : 'Practical tools and data projects, with videos and notes from life in Auckland.'}</p>
          </div>
        </section>

        <nav className="way-destinations" aria-label={isJapanese ? 'SoraJPNZの主な入口' : 'Explore SoraJPNZ'}>
          <div className="way-inner way-destination-grid">
            {destinations.map((destination) => (
              <a className={`way-destination way-destination-${destination.id}`} href={destination.href} target={destination.external ? '_blank' : undefined} rel={destination.external ? 'noopener noreferrer' : undefined} key={destination.id}>
                <span className="way-destination-icon" aria-hidden="true"><i className={destination.icon} /></span>
                <span className="way-destination-text">
                  <span className="way-destination-label">{destination.label}<i className="ri-arrow-right-line" aria-hidden="true" /></span>
                  <span className="way-destination-hint">{destination.hint}</span>
                </span>
              </a>
            ))}
          </div>
        </nav>

        <div className="way-inner way-content">
          <aside className="way-about" aria-labelledby="way-about-heading">
            <h2 id="way-about-heading">{isJapanese ? 'SoraとThea' : 'Sora in Auckland'}</h2>
            <img className="way-about-image" src={assets.blogTaranaki} alt={isJapanese ? 'NZの山道で撮ったSoraとTheaの写真' : 'Sora and Thea on a New Zealand walking track'} width={1152} height={1536} loading="lazy" decoding="async" />
            <p>{isJapanese ? 'Aucklandで暮らすSoraです。Theaとの日常や海での記録を動画に。生活していて気になったことは、ノートや計算機にも残しています。' : 'I am Sora, an Auckland-based analyst building practical tools and data projects. This site brings together my work and the New Zealand life behind it.'}</p>
            <nav className="way-directory" aria-label={isJapanese ? '主なコンテンツ' : 'Tools and professional work'}>
              <h3>{isJapanese ? '主なコンテンツ' : 'Tools and work'}</h3>
              <a className="way-directory-link" href={`${base}/tools/nz-life-reality-calculator`}>
                <i className="ri-calculator-line" aria-hidden="true" />
                <span><strong>{isJapanese ? 'NZ生活リアリティ計算機' : 'NZ Life Reality Calculator'}</strong><small>{isJapanese ? '家賃や勤務時間から月の余白を試す' : 'Test a monthly budget with your assumptions'}</small></span>
                <i className="ri-arrow-right-s-line" aria-hidden="true" />
              </a>
              <a className="way-directory-link" href={`${base}/projects`}>
                <i className="ri-macbook-line" aria-hidden="true" />
                <span><strong>{isJapanese ? 'これまでのプロジェクト' : 'Selected projects'}</strong><small>{isJapanese ? '計算機、データ分析、個人開発' : 'Calculators, dashboards, and documented work'}</small></span>
                <i className="ri-arrow-right-s-line" aria-hidden="true" />
              </a>
              {!isJapanese && (
                <a className="way-directory-link" href={links.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="ri-linkedin-box-line" aria-hidden="true" />
                  <span><strong>LinkedIn</strong><small>Background and professional profile</small></span>
                  <i className="ri-external-link-line" aria-hidden="true" />
                </a>
              )}
            </nav>
            <div className="way-about-support">
              <a className="way-link" href={links.support} target="_blank" rel="noopener noreferrer">
                <i className="ri-cup-line" aria-hidden="true" />
                {isJapanese ? '活動を応援する' : 'Support the work'}
                <i className="ri-external-link-line" aria-hidden="true" />
              </a>
              <p>{isJapanese ? '動画やツールが役に立ったら、コーヒー1杯分の応援をいただけるとうれしいです。' : 'Enjoyed a video or found a tool useful? You can support the next one with a coffee.'}</p>
            </div>
          </aside>
          <div className="way-feature">
            {isJapanese ? renderVideo('way-video-feature-main') : renderCalculator('way-project-feature way-project-feature-main')}
          </div>
        </div>

        {isJapanese ? renderCalculator('way-inner way-project-feature') : renderVideo('way-inner way-video-feature way-video-feature-secondary')}

        <section className="way-inner way-work-list" aria-labelledby="way-work-heading">
          <div className="way-section-heading">
            <h2 id="way-work-heading">{isJapanese ? 'ほかに作ったもの' : 'More selected work'}</h2>
            <a className="way-link" href={`${base}/projects`}>{isJapanese ? 'プロジェクト一覧' : 'All projects'}<i className="ri-arrow-right-line" aria-hidden="true" /></a>
          </div>
          {selectedWork.map((work) => (
            <a className="way-work-row" href={`${base}/projects/${work.path}`} key={work.path}>
              <img src={work.image} alt="" width={work.width} height={work.height} loading="lazy" decoding="async" />
              <div><h3>{work.title}</h3><p>{work.body}</p></div>
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </a>
          ))}
        </section>

        <section className="way-inner way-footer-links" aria-labelledby="way-connect-heading">
          <h2 id="way-connect-heading">{isJapanese ? '動画・SNSと連絡先' : 'Videos, social, and contact'}</h2>
          <p>{isJapanese ? '短い更新はSNSに、あとから読み返したいことはNotesに。採用やコラボレーションのご連絡もこちらからどうぞ。' : 'Follow the videos and short updates, or get in touch about analyst roles, projects, and collaboration.'}</p>
          <nav className="way-social-links" aria-label={isJapanese ? 'SNSと連絡先' : 'Social and contact links'}>
            {channels.map((channel) => (
              <a href={channel.href} target="_blank" rel="noopener noreferrer" key={channel.id}><i className={channel.icon} aria-hidden="true" />{channel.label}</a>
            ))}
            <a href={links.github} target="_blank" rel="noopener noreferrer"><i className="ri-github-line" aria-hidden="true" />GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-box-line" aria-hidden="true" />LinkedIn</a>
            <a href={`${base}/contact`}><i className="ri-mail-line" aria-hidden="true" />{isJapanese ? 'お問い合わせ' : 'Contact'}</a>
          </nav>
          <div className="way-support">
            <div>
              <h3>{isJapanese ? '動画やツール作りを応援する' : 'Support my videos and tools'}</h3>
              <p>{isJapanese ? '見てもらえるだけでもうれしいです。応援したいと思ったときは、こちらから。' : 'Watching and using the tools already means a lot. For anyone who would like to help with the next one.'}</p>
            </div>
            <a className="way-link" href={links.support} target="_blank" rel="noopener noreferrer"><i className="ri-cup-line" aria-hidden="true" />Buy Me a Coffee<i className="ri-external-link-line" aria-hidden="true" /></a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
