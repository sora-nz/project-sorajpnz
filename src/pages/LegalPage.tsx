import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { legal, Locale } from '../lib/content';
import { pageJsonLd, useMeta } from '../lib/useMeta';

type LegalKind = keyof typeof legal;

type LegalPageProps = {
  locale: Locale;
  path: string;
  kind: LegalKind;
};

export function LegalPage({ locale, path, kind }: LegalPageProps) {
  const page = legal[kind][locale];
  const title = `${page.title} - Sora Oya`;

  useMeta({
    locale,
    path,
    title,
    description: page.body,
    jsonLd: pageJsonLd(locale, path, title, page.body)
  });

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main>
        <section className="subhero">
          <div className="section-inner narrow">
            <p className="eyebrow">Legal</p>
            <h1>{page.title}</h1>
          </div>
        </section>
        <section className="content-section">
          <div className="section-inner narrow">
            <div className="article-block">
              <p>{page.body}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
