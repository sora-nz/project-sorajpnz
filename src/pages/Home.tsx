import { useEffect, useRef, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { TheaLessonVisual } from '../components/TheaLessonVisual';
import { assets, links, Locale, projects, seo, socialLinks } from '../lib/content';
import { localize } from '../lib/routes';
import { pageJsonLd, useMeta } from '../lib/useMeta';
import { homeVideoFallback, recentVideos } from '../lib/videos';
import { useRecentVideos } from '../lib/useRecentVideos';
import type { HomeVideo } from '../lib/youtubeFeed';
import './Home.css';

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
    <img className={isLogo ? 'index-thumbnail-fallback' : undefined}
      src={src} alt={alt}
      width={1280} height={720} loading="lazy" decoding="async"
      onError={() => {
        if (!isLogo) setFailedSources((failed) => failed.includes(src) ? failed : [...failed, src]);
      }} />
  );
}

export function Home({ locale, path }: HomeProps) {
  const mainRef = useRef<HTMLElement>(null);
  const [heroPaused, setHeroPaused] = useState(false);
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
      icon: 'ri-play-circle-line',
      label: isJapanese ? '動画を見る' : 'Watch the videos',
      hint: isJapanese ? 'NZでの暮らしや海の動画' : 'Everyday NZ life, with Thea.'
    },
    {
      id: 'notes',
      href: `${base}/blog`,
      external: false,
      icon: 'ri-book-open-line',
      label: isJapanese ? 'Notesを読む' : 'Read the Notes',
      hint: isJapanese ? '生活のこと、仕事のこと' : 'Life, work, and money.'
    },
    {
      id: 'projects',
      href: `${base}/projects`,
      external: false,
      icon: 'ri-tools-line',
      label: isJapanese ? '作ったものを見る' : 'Explore my work',
      hint: isJapanese ? '使えるツールとプロジェクト' : 'Practical tools and data projects.'
    }
  ];
  const orderedDestinations = isJapanese ? destinations : [destinations[2], destinations[1], destinations[0]];
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

  useEffect(() => {
    const root = mainRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sections = [...root.querySelectorAll<HTMLElement>('[data-index-rule]')];
    let observer: IntersectionObserver | undefined;
    const configure = () => {
      observer?.disconnect();
      sections.forEach((section) => section.removeAttribute('data-rule-drawn'));
      if (motion.matches) return;
      // Only the decorative rule reacts to scroll. Content never waits for an observer.
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.ruleDrawn = 'true';
            observer?.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
      sections.forEach((section) => observer?.observe(section));
    };
    configure();
    motion.addEventListener('change', configure);
    return () => {
      observer?.disconnect();
      motion.removeEventListener('change', configure);
      sections.forEach((section) => section.removeAttribute('data-rule-drawn'));
    };
  }, [locale]);

  const renderVideo = (className: string) => (
    <section id="home-videos" className={className} aria-labelledby="index-video-heading" data-index-rule>
      <div className="index-section-heading">
        <h2 id="index-video-heading">{isJapanese ? '最近の動画' : 'Life behind the projects'}</h2>
        <a className="index-link" href={links.youtube} target="_blank" rel="noopener noreferrer">
          {isJapanese ? 'すべての動画を見る' : 'All videos'}
          <i className="ri-arrow-right-line" aria-hidden="true" />
        </a>
      </div>
      <p className="index-video-intro">{isJapanese ? 'Theaとの日常、海に出かけた日、短いひとこま。新しい動画も、ここから見られます。' : 'Life with Thea, ocean days, and shorter moments from New Zealand.'}</p>
      <div className="index-video" data-video-source={videoStatus}>
        <a className="index-video-image" href={featuredVideo.url} target="_blank" rel="noopener noreferrer" aria-label={isJapanese ? `${video.title}をYouTubeで見る` : `Watch ${video.title} on YouTube`}>
          <span className="index-image-frame"><VideoThumbnail video={featuredVideo} locale={locale} key={`${featuredVideo.id}:${featuredVideo.thumbnail}`} /></span>
          <span className="index-play" aria-hidden="true"><i className="ri-play-fill" /></span>
        </a>
        <div className="index-video-copy">
          <h3>
            <a href={featuredVideo.url} target="_blank" rel="noopener noreferrer">{video.title}</a>
          </h3>
          <time dateTime={featuredVideo.date}>{formatVideoDate(featuredVideo.date)}</time>
          <p>{video.description}</p>
          <div className="index-actions">
            <a className="index-button index-button-youtube" href={featuredVideo.url} target="_blank" rel="noopener noreferrer">
              <i className="ri-youtube-fill" aria-hidden="true" />
              {isJapanese ? 'YouTubeで見る' : 'Watch on YouTube'}
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </a>
            {isJapanese && knownVideo?.notePath && (
              <a className="index-link index-note-link" href={knownVideo.notePath}>
                <i className="ri-article-line" aria-hidden="true" />
                動画の補足ノート
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
      {videos.length > 1 && (
        <div className="index-recent-videos">
          <h3>{isJapanese ? 'ほかの動画・ショート' : 'More videos and short moments'}</h3>
          <ul className="index-video-list">
            {videos.slice(1).map((item) => {
              const title = videoStatus === 'live' ? item.title : recentVideos.find((entry) => entry.id === item.id)?.[locale].title ?? item.title;
              return (
                <li key={item.id}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <span className="index-image-frame"><VideoThumbnail video={item} locale={locale} key={`${item.id}:${item.thumbnail}`} /></span>
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
        <p className="index-video-status">{isJapanese ? '確認済みの動画を表示しています。最新の投稿はYouTubeからどうぞ。' : 'Showing checked uploads. Visit YouTube for the latest posts.'}</p>
      )}
    </section>
  );

  const renderCalculator = (className: string) => (
    <section className={className} aria-labelledby="index-tool-heading" data-index-rule>
      <div className="index-project-layout">
        <a className="index-project-image" href={`${base}/tools/nz-life-reality-calculator`} aria-label={isJapanese ? 'NZ生活リアリティ計算機を開く' : 'Open the NZ Life Reality Calculator'}>
        <img src={isJapanese ? assets.calculatorJa : assets.calculator} alt={isJapanese ? 'NZ生活リアリティ計算機の入力画面と試算結果の表示例' : 'NZ Life Reality Calculator input controls and example results'} width={1280} height={720} loading="lazy" decoding="async" />
        <span className="index-preview-label">{isJapanese ? '表示例' : 'Example screen'}</span>
        </a>
        <div className="index-project-copy">
          <p className="index-kicker">{isJapanese ? '暮らしの数字を、試してみる' : 'Featured project'}</p>
          <h2 id="index-tool-heading">{isJapanese ? 'NZ生活リアリティ計算機' : 'NZ Life Reality Calculator'}</h2>
          <p>{isJapanese ? '時給・勤務時間・家賃・車・貯金目標を入れて、月にどれくらい残るかを試せます。' : 'A browser tool for testing how wages, rent, transport, and savings goals affect monthly room in a New Zealand budget.'}</p>
          <p className="index-tool-note">{isJapanese ? 'NZDと日本円の参考表示に対応。入力内容は保存しません。概算ツールです。' : 'Client-side calculations, adjustable assumptions, and optional JPY reference amounts. Inputs are not stored; results are estimates.'}</p>
          <div className="index-actions">
            <a className="index-button index-button-tool" href={`${base}/tools/nz-life-reality-calculator`}>
              <i className="ri-calculator-line" aria-hidden="true" />
              {isJapanese ? '月の余白を試してみる' : 'Try the calculator'}
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </a>
            <a className="index-link" href={`${base}/projects/nz-life-reality-calculator`}>
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
    <div className="page home-index">
      <Header locale={locale} path={path} showContact />
      <main ref={mainRef}>
        <section className="index-hero" data-motion-paused={heroPaused} aria-labelledby="index-home-heading">
          <img className="index-hero-image" src={assets.aucklandHarbour} alt={isJapanese ? '木陰の遊歩道から、海越しに見えるAucklandの街並み' : 'Auckland skyline across the harbour, viewed from a tree-lined waterfront path'} width={1024} height={768} loading="eager" fetchPriority="high" decoding="async" />
          <div className={`index-inner index-hero-copy${isJapanese ? ' index-hero-copy-japanese' : ''}`}>
            <p className="index-hero-name">SoraJPNZ</p>
            <h1 id="index-home-heading">{isJapanese ? <><span>海外生活に憧れや</span><span>不安を抱えている</span><span className="index-hero-address">あなたへ。</span></> : <><span>Life in New Zealand,</span><span>and the tools I build.</span></>}</h1>
            <div className="index-hero-description">
              <p className="index-hero-mission">{isJapanese ? <><span>そんな方たちの、</span><span>ちょっとした支えになるものを届けたい。</span></> : 'Practical work, with real life behind it.'}</p>
              <p>{isJapanese ? 'NZ生活8年目。実体験をもとに、ニュージーランドの日常をシェアしています。' : 'I’m Sora, an Auckland-based analyst in my eighth year in New Zealand. I build practical calculators and data projects, and share everyday life with Thea through videos and notes.'}</p>
              <p>{isJapanese ? 'これまでの長い海外生活から、日本人として感じたことを、少し深掘りした視点から。' : 'Start with the calculator and its case study for my project work, or follow the videos for everyday New Zealand life.'}</p>
            </div>
          </div>
          <button className="index-motion-toggle" type="button" aria-pressed={heroPaused}
            aria-label={isJapanese ? heroPaused ? '背景の動きを再開' : '背景の動きを一時停止' : heroPaused ? 'Resume background motion' : 'Pause background motion'}
            title={isJapanese ? heroPaused ? '背景の動きを再開' : '背景の動きを一時停止' : heroPaused ? 'Resume background motion' : 'Pause background motion'}
            onClick={() => setHeroPaused((paused) => !paused)}>
            <i className={heroPaused ? 'ri-play-line' : 'ri-pause-line'} aria-hidden="true" />
          </button>
        </section>

        <nav className="index-destinations" aria-label={isJapanese ? 'SoraJPNZの主な入口' : 'Explore SoraJPNZ'}>
          <div className="index-inner index-destination-grid">
            {orderedDestinations.map((destination) => (
              <a className={`index-destination index-destination-${destination.id}`} href={destination.href} target={destination.external ? '_blank' : undefined} rel={destination.external ? 'noopener noreferrer' : undefined} key={destination.id}>
                <span className="index-destination-icon" aria-hidden="true"><i className={destination.icon} /></span>
                <span className="index-destination-text">
                  <span className="index-destination-label">{destination.label}<i className="ri-arrow-right-line" aria-hidden="true" /></span>
                  <span className="index-destination-hint">{destination.hint}</span>
                </span>
              </a>
            ))}
          </div>
        </nav>

        <div className="index-inner index-content">
          <div className="index-feed">
            {isJapanese ? <>{renderVideo('index-video-feature')}<div className="index-tool-band">{renderCalculator('index-project-feature')}</div></> : <><div className="index-tool-band">{renderCalculator('index-project-feature')}</div>{renderVideo('index-video-feature')}</>}
          </div>
          <aside className="index-sidebar" aria-labelledby="index-about-heading">
            <h2 id="index-about-heading">{isJapanese ? 'SoraとThea' : 'Sora & Thea'}</h2>
            <img className="index-about-image" src={assets.blogTaranaki} alt={isJapanese ? 'NZの山道で撮ったSoraとTheaの写真' : 'Sora and Thea on a New Zealand walking track'} width={1152} height={1536} loading="lazy" decoding="async" />
            <p>{isJapanese ? 'Aucklandで暮らすSoraです。Theaとの日常や海での記録を動画に。生活していて気になったことは、ノートや計算機にも残しています。' : 'I live in Auckland with Thea. The videos follow our everyday life and ocean days; the tools and notes explore the questions that come up along the way.'}</p>
            <nav className="index-directory" aria-label={isJapanese ? '主なコンテンツ' : 'Tools and background'}>
              <h3>{isJapanese ? '主なコンテンツ' : 'Tools and background'}</h3>
              <a href={`${base}/tools/nz-life-reality-calculator`}><i className="ri-calculator-line" aria-hidden="true" /><span>{isJapanese ? 'NZ生活リアリティ計算機' : 'NZ Life Reality Calculator'}<small>{isJapanese ? '家賃や勤務時間から、月の余白を試す' : 'Test the assumptions behind a budget'}</small></span><i className="ri-arrow-right-s-line" aria-hidden="true" /></a>
              <a href={`${base}/projects`}><i className="ri-computer-line" aria-hidden="true" /><span>{isJapanese ? 'これまでのプロジェクト' : 'Projects'}<small>{isJapanese ? '計算機、データ分析、個人開発' : 'Calculators, dashboards, and data work'}</small></span><i className="ri-arrow-right-s-line" aria-hidden="true" /></a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-box-line" aria-hidden="true" /><span>{isJapanese ? '仕事のプロフィール' : 'Professional profile'}<small>{isJapanese ? '経歴や制作の背景はLinkedInへ' : 'Background and experience on LinkedIn'}</small></span><i className="ri-arrow-right-up-line" aria-hidden="true" /></a>
            </nav>
            <section className="index-tutoring" aria-labelledby="index-thea-heading">
              <h3 id="index-thea-heading">{isJapanese ? 'TheaのIELTSレッスン' : 'IELTS lessons with Thea'}</h3>
              <TheaLessonVisual />
              <p>{isJapanese ? 'TheaはIELTSのAcademic・Generalを指導しています。Writing Task 2や試験対策を、目標に合わせて練習できます。' : 'Thea teaches Academic and General IELTS, with a focus on Writing Task 2 and test strategies.'}</p>
              <p>{isJapanese ? 'レッスンは英語です。オンライン、またはAucklandでの対面に対応しています。' : 'Lessons are in English, online or in person in Auckland.'}</p>
              <a className="index-link" href={links.theaSuperprof} target="_blank" rel="noopener noreferrer">
                <span>{isJapanese ? 'プロフィール・料金を見る' : 'View profile & rates'}</span>
                <i className="ri-external-link-line" aria-hidden="true" />
              </a>
              <p className="index-tutoring-note">{isJapanese ? 'Superprofへ移動します。Student Passの利用料は授業料と別です。料金・空き枠・利用条件はリンク先でご確認ください。' : "Opens Superprof. Its Student Pass fee is separate from lesson fees. Check current rates, availability and terms there."}</p>
            </section>
            <div className="index-sidebar-support">
              <a className="index-link" href={links.support} target="_blank" rel="noopener noreferrer"><i className="ri-cup-line" aria-hidden="true" />{isJapanese ? '活動を応援する' : 'Buy Me a Coffee'}<i className="ri-external-link-line" aria-hidden="true" /></a>
              <p>{isJapanese ? '動画やツールが役に立ったら、コーヒー一杯分の応援も。見てもらえるだけでもうれしいです。' : 'Watching and using the tools already means a lot. A coffee can help with the next one.'}</p>
            </div>
          </aside>
        </div>

        <section className="index-inner index-work-list" aria-labelledby="index-work-heading" data-index-rule>
          <div className="index-section-heading">
            <h2 id="index-work-heading">{isJapanese ? 'ほかに作ったもの' : 'More selected work'}</h2>
            <a className="index-link" href={`${base}/projects`}>{isJapanese ? 'プロジェクト一覧' : 'All projects'}<i className="ri-arrow-right-line" aria-hidden="true" /></a>
          </div>
          {selectedWork.map((work) => (
            <a className="index-work-row" href={`${base}/projects/${work.path}`} key={work.path}>
              <span className="index-work-image"><img src={work.image} alt="" width={work.width} height={work.height} loading="lazy" decoding="async" /></span>
              <div><h3>{work.title}</h3><p>{work.body}</p></div>
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </a>
          ))}
        </section>

        <section className="index-inner index-footer-links" aria-labelledby="index-connect-heading" data-index-rule>
          <h2 id="index-connect-heading">{isJapanese ? '動画・SNSと連絡先' : 'Videos, social, and contact'}</h2>
          <p>{isJapanese ? '短い更新はSNSに、あとから読み返したいことはNotesに。採用やコラボレーションのご連絡もこちらからどうぞ。' : 'Follow the videos and short updates, or get in touch about analyst roles, projects, and collaboration.'}</p>
          <nav className="index-social-links" aria-label={isJapanese ? 'SNSと連絡先' : 'Social and contact links'}>
            {channels.map((channel) => (
              <a href={channel.href} target="_blank" rel="noopener noreferrer" key={channel.id}><i className={channel.icon} aria-hidden="true" />{channel.label}</a>
            ))}
            <a href={links.github} target="_blank" rel="noopener noreferrer"><i className="ri-github-line" aria-hidden="true" />GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-box-line" aria-hidden="true" />LinkedIn</a>
            <a href={`${base}/contact`}><i className="ri-mail-line" aria-hidden="true" />{isJapanese ? 'お問い合わせ' : 'Contact'}</a>
          </nav>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
