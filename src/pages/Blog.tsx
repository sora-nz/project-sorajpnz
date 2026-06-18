import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, blog, links, Locale, seo } from '../lib/content';
import { localize } from '../lib/routes';
import { pageJsonLd, useMeta } from '../lib/useMeta';
import { useReveal } from '../lib/useReveal';

type BlogProps = {
  locale: Locale;
  path: string;
};

export function Blog({ locale, path }: BlogProps) {
  const b = blog[locale];
  const meta = seo[locale].blog;
  const base = localize(locale);
  const fieldPhotos = [
    { src: assets.blogHero, caption: b.fieldCaptions[0], className: 'wide shore' },
    { src: assets.blogSpearfishing, caption: b.fieldCaptions[1], className: 'tall spearfishing' },
    { src: assets.blogOceanFloat, caption: b.fieldCaptions[2], className: 'small ocean' },
    { src: assets.blogSnapperWharf, caption: b.fieldCaptions[3], className: 'small snapper' },
    { src: assets.blogHobbiton, caption: b.fieldCaptions[4], className: 'small hobbiton' },
    { src: assets.blogTaranaki, caption: b.fieldCaptions[5], className: 'tall taranaki' }
  ];

  useReveal();
  useMeta({
    locale,
    path,
    title: meta.title,
    description: meta.description,
    noIndex: true,
    jsonLd: pageJsonLd(locale, path, meta.title, meta.description)
  });

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main>
        <section className="blog-hero">
          <img
            className="blog-hero-image animate-hero-pan"
            src={assets.blogHero}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
          <div className="blog-hero-overlay" aria-hidden="true" />
          <div className="section-inner blog-hero-inner animate-slide-up">
            <p className="blog-hero-kicker">Notes from Auckland</p>
            <h1>{b.title}</h1>
            <p>{b.subtitle}</p>
            <span className="blog-scroll-cue" aria-hidden="true">
              <span>Scroll</span>
              <i className="ri-arrow-down-line" />
            </span>
          </div>
        </section>
        <section className="content-section blog-hub-section">
          <div className="section-inner blog-hub-inner">
            <section className="blog-field-card" aria-labelledby="blog-field-title">
              <div className="blog-field-copy">
                <span className="legacy-card-index">Field notes</span>
                <h2 id="blog-field-title">{b.fieldTitle}</h2>
                <p>{b.fieldBody}</p>
              </div>
              <div className="blog-photo-strip" aria-label={b.fieldTitle}>
                {fieldPhotos.map((photo) => (
                  <figure className={`blog-photo-tile reveal-on-scroll ${photo.className}`} key={photo.src}>
                    <img src={photo.src} alt={photo.caption} loading="lazy" decoding="async" />
                    <figcaption>{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <div className="blog-intro-card">
              <span className="legacy-card-index">{b.introLabel}</span>
              <h2>{b.introTitle}</h2>
              <p>{b.body}</p>
              <div className="button-row left">
                <a className="button primary small" href={links.youtube} target="_blank" rel="noopener noreferrer">
                  <span>{locale === 'ja' ? 'YouTubeを見る' : 'Watch YouTube'}</span>
                  <i className="ri-youtube-fill" />
                </a>
                <a className="button secondary small" href={`${base}/links`}>
                  <span>{locale === 'ja' ? 'リンク一覧' : 'All Links'}</span>
                  <i className="ri-links-line" />
                </a>
              </div>
            </div>

            <div className="blog-first-note-card reveal-on-scroll">
              <h2>{b.firstNoteTitle}</h2>
              <p>{b.firstNoteBody}</p>
              <div className="blog-idea-list">
                {b.firstNoteItems.map((item) => (
                  <div className="blog-idea-item" key={item}>
                    <i className="ri-arrow-right-circle-line" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="blog-category-intro reveal-on-scroll">
              <h2>{b.categoryTitle}</h2>
              <p>{b.categoryBody}</p>
            </div>

            <div className="blog-category-grid">
              {b.categories.map((category) => (
                <article className="blog-category-card reveal-on-scroll" key={category.title}>
                  <div className="blog-category-top">
                    <span className="blog-track-icon" aria-hidden="true">
                      <i className={category.icon} />
                    </span>
                    <h2>{category.title}</h2>
                  </div>
                  <p>{category.description}</p>
                  <div className="blog-topic-row">
                    {category.themes.map((theme) => (
                      <span key={theme}>{theme}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
