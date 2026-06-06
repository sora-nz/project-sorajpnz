import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { blog, Locale, seo } from '../lib/content';
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
        <section className="subhero">
          <div className="section-inner narrow">
            <p className="eyebrow">Notes</p>
            <h1>{b.title}</h1>
            <p>{b.subtitle}</p>
          </div>
        </section>
        <section className="content-section blog-hub-section">
          <div className="section-inner narrow blog-hub-inner">
            <div className="blog-intro-card">
              <span className="legacy-card-index">{b.introLabel}</span>
              <h2>{b.introTitle}</h2>
              <p>{b.body}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
