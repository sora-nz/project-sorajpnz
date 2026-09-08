import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { common, Locale, seo } from '../lib/content';
import { localize } from '../lib/routes';
import { pageJsonLd, useMeta } from '../lib/useMeta';

export function Services({ locale, path }: { locale: Locale; path: string }) {
  const meta = seo[locale].services;
  const copy = common[locale];
  useMeta({ locale, path, ...meta,
    jsonLd: pageJsonLd(locale, path, meta.title, meta.description) });

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main>
        <section className="content-section">
          <div className="section-inner">
            <h1>{copy.services}</h1>
            <p>{meta.description}</p>
            <a className="button secondary small" href={localize(locale, '/projects')}>
              {copy.viewProjects}<i className="ri-arrow-right-line" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
