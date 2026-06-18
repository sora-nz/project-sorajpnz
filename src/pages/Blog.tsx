import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { blog, links, Locale, seo } from '../lib/content';
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
        <section className="subhero">
          <div className="section-inner narrow">
            <p className="eyebrow">Notes</p>
            <h1>{b.title}</h1>
            <p>{b.subtitle}</p>
          </div>
        </section>
        <section className="content-section blog-hub-section">
          <div className="section-inner blog-hub-inner">
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
              <span className="legacy-card-index">{b.firstNoteLabel}</span>
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

            <div className="blog-system-card soft reveal-on-scroll">
              <h2>{b.nextTitle}</h2>
              <ol className="blog-step-list">
                {b.nextItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
