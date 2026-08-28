import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, blog, Locale, seo } from '../lib/content';
import { blogJsonLd, useMeta } from '../lib/useMeta';

type BlogProps = {
  locale: Locale;
  path: string;
};

export function Blog({ locale, path }: BlogProps) {
  const b = blog[locale];
  const meta = seo[locale].blog;
  const latestPostJsonLd = b.latestNote
    ? {
        path: b.latestNote.href,
        title: b.latestNote.title,
        description: b.latestNote.excerpt,
        image: b.latestNote.image,
        datePublished: b.latestNote.date,
        dateModified: b.latestNote.date
      }
    : undefined;

  useMeta({
    locale,
    path,
    title: meta.title,
    description: meta.description,
    image: assets.westCoastRocks,
    noIndex: locale === 'en',
    alternates: false,
    jsonLd: blogJsonLd(
      locale,
      path,
      meta.title,
      meta.description,
      assets.westCoastRocks,
      latestPostJsonLd
    )
  });

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main>
        <section className="notes-hub-hero">
          <div className="section-inner notes-hub-hero-inner">
            <div className="notes-hub-heading">
              <p className="eyebrow">{b.eyebrow}</p>
              <h1>{b.title}</h1>
              <p>{b.subtitle}</p>
            </div>
            <div className="notes-hero-side">
              <figure className="notes-hero-photo">
                <img
                  src={assets.westCoastRocks}
                  alt={locale === 'ja' ? 'Auckland西海岸の岩場と海' : 'Rocky shoreline on Auckland\'s west coast'}
                  width="864"
                  height="1152"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <figcaption>{locale === 'ja' ? 'Auckland西海岸での一日' : 'A day on Auckland\'s west coast'}</figcaption>
              </figure>
              <p className="notes-hero-margin-note">
                {locale === 'ja'
                  ? 'Living costs / Work / Money / Field notes'
                  : 'Living costs / Work / Money / Field notes'}
              </p>
            </div>
          </div>
        </section>
        <section className="content-section notes-hub-section">
          <div className="section-inner notes-hub-inner">
            <div className="notes-editorial-lead">
              {b.latestNote ? (
                <a
                  className="notes-latest-feature"
                  href={b.latestNote.href}
                  aria-label={`${b.latestNote.title} - ${b.latestNote.cta}`}
                >
                  <figure className="notes-latest-media">
                    <img
                      src={b.latestNote.image}
                      alt={b.latestNote.imageAlt}
                      width="1024"
                      height="768"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <div className="notes-latest-copy">
                    <div className="notes-meta-row">
                      <span>{b.latestNote.label}</span>
                      <span>{b.latestNote.category}</span>
                      <time dateTime={b.latestNote.date}>{b.latestNote.dateLabel}</time>
                    </div>
                    <h2>{b.latestNote.title}</h2>
                    <p>{b.latestNote.excerpt}</p>
                    <span className="notes-read-link">
                      {b.latestNote.cta}
                      <i className="ri-arrow-right-line" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              ) : (
                <div className="notes-language-note">
                  <p className="eyebrow">In progress</p>
                  <h2>{b.introTitle}</h2>
                  <p>{b.body}</p>
                </div>
              )}

              {b.featuredTool ? (
                <a className="notes-tool-note" href={b.featuredTool.href}>
                  <span className="notes-tool-icon" aria-hidden="true">
                    <i className="ri-calculator-line" />
                  </span>
                  <span className="notes-featured-label">{b.featuredTool.title}</span>
                  <strong>{b.featuredTool.body}</strong>
                  <span className="notes-tool-link">
                    {b.featuredTool.cta}
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </span>
                </a>
              ) : null}
            </div>

            <section className="notes-topics-section" aria-labelledby="notes-topics-title">
              <div className="blog-category-intro">
                <h2 id="notes-topics-title">{b.categoryTitle}</h2>
                <p>{b.categoryBody}</p>
              </div>

              <ol className="notes-topic-list">
                {b.categories.map((category, index) => {
                  const isFieldNote = category.title.includes('Field Notes');
                  return (
                    <li className={`notes-topic-item${isFieldNote ? ' field-note' : ''}`} key={category.title}>
                      <span className="notes-category-number">{String(index + 1).padStart(2, '0')}</span>
                      <div className="notes-topic-copy">
                        <h3>{category.title}</h3>
                        <p>{category.description}</p>
                      </div>
                      <div className="notes-topic-side">
                        {isFieldNote ? (
                          <figure className="notes-topic-image">
                            <img
                              src={assets.blogHero}
                              alt={
                                locale === 'ja'
                                  ? 'Auckland近郊での岸釣りの記録'
                                  : 'Shore fishing field notes near Auckland'
                              }
                              width="1536"
                              height="1152"
                              loading="lazy"
                              decoding="async"
                            />
                          </figure>
                        ) : null}
                        <span>{category.themes.join(' / ')}</span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className="notes-coming-soon" aria-labelledby="notes-coming-soon-title">
              <div>
                <p className="eyebrow">{locale === 'ja' ? 'Next notes' : 'Coming next'}</p>
                <h2 id="notes-coming-soon-title">{b.comingSoonTitle}</h2>
                <p>{b.comingSoonBody}</p>
              </div>
              <ul>
                {b.comingSoonItems.map((item, index) => (
                  <li key={item}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="notes-editor-note">
              <img
                src={assets.avatar}
                alt={locale === 'ja' ? 'Sora Oya' : 'Sora Oya'}
                width="72"
                height="72"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="eyebrow">{b.editorNote.label}</p>
                <h2>{b.editorNote.title}</h2>
                <p>{b.editorNote.body}</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
