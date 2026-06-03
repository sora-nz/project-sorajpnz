import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { blog, Locale } from '../lib/content';
import { pageJsonLd, useMeta } from '../lib/useMeta';

type BlogProps = {
  locale: Locale;
  path: string;
};

export function Blog({ locale, path }: BlogProps) {
  const b = blog[locale];

  useMeta({
    locale,
    path,
    title: `${b.title} - Sora Oya`,
    description: b.subtitle,
    jsonLd: pageJsonLd(locale, path, `${b.title} - Sora Oya`, b.subtitle)
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
        <section className="content-section">
          <div className="section-inner narrow">
            <div className="article-block">
              <p>{b.body}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
