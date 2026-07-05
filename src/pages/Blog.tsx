import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, blog, Locale, seo } from '../lib/content';
import { pageJsonLd, useMeta } from '../lib/useMeta';

type BlogProps = {
  locale: Locale;
  path: string;
};

export function Blog({ locale, path }: BlogProps) {
  const b = blog[locale];
  const meta = seo[locale].blog;

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
                  src={assets.blogOceanFloat}
                  alt={locale === 'ja' ? 'Aucklandの海に浮かぶフロート' : 'A float on the Auckland ocean'}
                  loading="eager"
                  decoding="async"
                />
                <figcaption>{locale === 'ja' ? 'Auckland ocean notes' : 'Auckland field notes'}</figcaption>
              </figure>
              <div className="notes-hero-scrap">
                <span>{locale === 'ja' ? '生活費' : 'Living costs'}</span>
                <span>{locale === 'ja' ? '仕事とお金' : 'Work / money'}</span>
                <span>{locale === 'ja' ? '海の記録' : 'Ocean days'}</span>
              </div>
            </div>
          </div>
        </section>
        <section className="content-section notes-hub-section">
          <div className="section-inner notes-hub-inner">
            {b.featuredTool ? (
              <a className="notes-featured-tool" href={b.featuredTool.href}>
                <span className="notes-featured-label">{b.featuredTool.title}</span>
                <strong>{b.featuredTool.body}</strong>
                <span className="notes-featured-cta">
                  {b.featuredTool.cta}
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </span>
              </a>
            ) : (
              <div className="notes-featured-tool muted">
                <span className="notes-featured-label">{b.introTitle}</span>
                <strong>{b.body}</strong>
              </div>
            )}

            <div className="blog-category-intro">
              <h2>{b.categoryTitle}</h2>
              <p>{b.categoryBody}</p>
            </div>

            <div className="notes-category-grid">
              {b.categories.map((category, index) => {
                const isFieldNote = category.title.includes('Field Notes');
                return (
                  <article className={`notes-category-card${isFieldNote ? ' field-note' : ''}`} key={category.title}>
                    {isFieldNote ? (
                      <figure className="notes-category-image">
                        <img
                          src={assets.blogSpearfishing}
                          alt={locale === 'ja' ? 'Auckland近郊の海でのスピアフィッシング記録' : 'Spearfishing field notes near Auckland'}
                          loading="lazy"
                          decoding="async"
                        />
                      </figure>
                    ) : null}
                    <span className="notes-category-number">{String(index + 1).padStart(2, '0')}</span>
                    <div className="notes-category-top">
                      <span className="notes-category-icon" aria-hidden="true">
                        <i className={category.icon} />
                      </span>
                      <h2>{category.title}</h2>
                    </div>
                    <p>{category.description}</p>
                    <span className="notes-category-tags">
                      {category.themes.join(' / ')}
                    </span>
                  </article>
                );
              })}
            </div>

            <section className="notes-coming-soon" aria-labelledby="notes-coming-soon-title">
              <div>
                <p className="eyebrow">{locale === 'ja' ? 'Next notes' : 'Coming next'}</p>
                <h2 id="notes-coming-soon-title">{b.comingSoonTitle}</h2>
                <p>{b.comingSoonBody}</p>
              </div>
              <ul>
                {b.comingSoonItems.map((item) => (
                  <li key={item}>
                    <i className="ri-checkbox-blank-circle-line" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
