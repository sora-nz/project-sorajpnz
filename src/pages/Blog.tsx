import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { blog, Locale, seo } from '../lib/content';
import { pageJsonLd, useMeta } from '../lib/useMeta';
import { useReveal } from '../lib/useReveal';

type BlogProps = {
  locale: Locale;
  path: string;
};

export function Blog({ locale, path }: BlogProps) {
  const b = blog[locale];
  const meta = seo[locale].blog;

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
        <section className="notes-hub-hero">
          <div className="section-inner notes-hub-hero-inner">
            <div className="notes-hub-heading animate-slide-up">
              <p className="eyebrow">{b.eyebrow}</p>
              <h1>{b.title}</h1>
              <p>{b.subtitle}</p>
            </div>
            {b.featuredTool ? (
              <a className="notes-featured-tool reveal-on-scroll" href={b.featuredTool.href}>
                <span className="notes-featured-label">{b.featuredTool.title}</span>
                <strong>{b.featuredTool.body}</strong>
                <span className="notes-featured-cta">
                  {b.featuredTool.cta}
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </span>
              </a>
            ) : (
              <div className="notes-featured-tool muted reveal-on-scroll">
                <span className="notes-featured-label">{b.introTitle}</span>
                <strong>{b.body}</strong>
              </div>
            )}
          </div>
        </section>
        <section className="content-section notes-hub-section">
          <div className="section-inner notes-hub-inner">
            <div className="blog-category-intro reveal-on-scroll">
              <h2>{b.categoryTitle}</h2>
              <p>{b.categoryBody}</p>
            </div>

            <div className="notes-category-grid">
              {b.categories.map((category) => (
                <article className="notes-category-card reveal-on-scroll" key={category.title}>
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

            <section className="notes-coming-soon reveal-on-scroll" aria-labelledby="notes-coming-soon-title">
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
