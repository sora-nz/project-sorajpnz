import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { VideoFeature } from '../components/VideoFeature';
import { assets, blog, links, Locale, seo } from '../lib/content';
import { homeVideoFallback, recentVideos, type Video } from '../lib/videos';
import { useRecentVideos } from '../lib/useRecentVideos';
import { blogJsonLd, useMeta } from '../lib/useMeta';
import './NotesHub.css';

type BlogProps = { locale: Locale; path: string };

export function Blog({ locale, path }: BlogProps) {
  const b = blog[locale];
  const meta = seo[locale].blog;
  const isJapanese = locale === 'ja';
  const note = b.latestNote;
  const { videos, status } = useRecentVideos(homeVideoFallback);
  const newest = videos[0];
  const known = recentVideos.find((video) => video.id === newest.id);
  const video: Video = {
    ...newest,
    thumbnail: known?.thumbnail ?? newest.thumbnail,
    ja: {
      title: status === 'live' ? newest.title : known?.ja.title ?? newest.title,
      description: known?.ja.description ?? 'SoraとTheaのNZでの日々を、YouTubeに残しています。',
      imageAlt: known?.ja.imageAlt ?? `${newest.title}の動画サムネイル`
    },
    en: {
      title: status === 'live' ? newest.title : known?.en.title ?? newest.title,
      description: known?.en.description ?? 'A recent video from our life in New Zealand.',
      imageAlt: known?.en.imageAlt ?? `Video thumbnail: ${newest.title}`
    },
    notePath: known?.notePath
  };

  useMeta({
    locale, path, title: meta.title, description: meta.description,
    image: assets.westCoastRocks, noIndex: !isJapanese, alternates: false,
    jsonLd: blogJsonLd(locale, path, meta.title, meta.description, assets.westCoastRocks,
      note ? { path: note.href, title: note.title, description: note.excerpt,
        image: note.image, datePublished: note.date, dateModified: note.updated } : undefined)
  });

  return (
    <div className="page content-pages notes-page">
      <Header locale={locale} path={path} showContact />
      <main>
        <header className="content-page-heading">
          <div className="section-inner">
            <p className="content-page-kicker">Notes from Auckland</p>
            <h1>{b.title}</h1>
            <p>{b.subtitle}</p>
          </div>
        </header>

        {isJapanese && note ? (
          <>
            <section className="notes-reading section-inner" aria-labelledby="notes-reading-heading">
              <div className="notes-current">
                <h2 id="notes-reading-heading">いま読めるノート</h2>
                <a className="notes-article" href={note.href} aria-label={`${note.title} - ${note.cta}`}>
                  <div className="notes-article-meta">
                    <span>{note.category}</span>
                    <time dateTime={note.updated}>{note.dateLabel}</time>
                  </div>
                  <h3>{note.title}</h3>
                  <figure><img src={note.image} alt={note.imageAlt} width="1024" height="768" decoding="async" /></figure>
                  <p>{note.excerpt}</p>
                  <span className="content-link">{note.cta}<i className="ri-arrow-right-line" aria-hidden="true" /></span>
                </a>
              </div>
              <aside className="notes-margin" aria-label="Soraと計算機について">
                <div className="notes-author">
                  <img src={assets.avatar} alt="SoraJPNZ" width="56" height="56" decoding="async" />
                  <div><strong>Sora</strong><span>Auckland, New Zealand</span></div>
                </div>
                <p>Aucklandで暮らすSoraです。動画では二人の日常を、ここではあとから読み返したいことを書いています。</p>
                <div className="notes-tool">
                  <i className="ri-calculator-line" aria-hidden="true" />
                  <h2>自分の生活費も、試してみる</h2>
                  <p>時給、勤務時間、家賃、車、貯金目標。自分の数字に変えると、月に残る金額をNZDと日本円で見られます。</p>
                  <a className="content-link" href="/ja/tools/nz-life-reality-calculator">計算機を使う<i className="ri-arrow-right-line" aria-hidden="true" /></a>
                </div>
              </aside>
            </section>

            <section className="notes-video-section" aria-labelledby="notes-video-heading">
              <div className="section-inner">
                <div className="notes-section-label">
                  <h2 id="notes-video-heading">動画に残したNZの日々</h2>
                  <a className="content-link" href={links.youtube} target="_blank" rel="noopener noreferrer">すべての動画<i className="ri-external-link-line" aria-hidden="true" /></a>
                </div>
                <div data-video-source={status}><VideoFeature locale={locale} video={video} headingLevel={3} showNote /></div>
              </div>
            </section>

            <section className="notes-topics section-inner" aria-labelledby="notes-topics-heading">
              <h2 id="notes-topics-heading">ノートの話題</h2>
              <p>生活費から、仕事や海で気づいたことまで。書けたものから少しずつ載せています。</p>
              <ul>{b.categories.map((category) => <li key={category.title}>{category.title}</li>)}</ul>
            </section>
          </>
        ) : (
          <section className="notes-english section-inner" aria-labelledby="notes-language-heading">
            <div className="notes-english-intro">
              <h2 id="notes-language-heading">{b.introTitle}</h2>
              <p>{b.body}</p>
              <a className="content-link" href="/ja/blog">Read the Japanese notes<i className="ri-arrow-right-line" aria-hidden="true" /></a>
            </div>
            <div className="notes-english-links">
              <a href="/en/tools/nz-life-reality-calculator">
                <i className="ri-calculator-line" aria-hidden="true" />
                <div><h2>NZ Life Reality Calculator</h2><p>Change wages, hours, rent and car costs to see what could remain each month.</p></div>
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </a>
              <a href="/en/projects">
                <i className="ri-tools-line" aria-hidden="true" />
                <div><h2>Projects &amp; write-ups</h2><p>What I built, the choices I made, and what still needs work.</p></div>
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </a>
            </div>
            <div className="notes-life">
              <img src={assets.blogTaranaki} alt="Sora and Thea on a walking track in New Zealand" width="768" height="1024" loading="lazy" decoding="async" />
              <div><h2>A little of life here, too.</h2><p>Thea and I share everyday life, fishing trips and ocean days on YouTube.</p><a className="content-link" href={links.youtube} target="_blank" rel="noopener noreferrer">Watch the videos<i className="ri-external-link-line" aria-hidden="true" /></a></div>
            </div>
          </section>
        )}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
