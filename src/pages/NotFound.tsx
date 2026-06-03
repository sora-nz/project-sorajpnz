import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { common, Locale } from '../lib/content';
import { localize } from '../lib/routes';

type NotFoundProps = {
  locale: Locale;
  path: string;
};

export function NotFound({ locale, path }: NotFoundProps) {
  const c = common[locale];

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main>
        <section className="subhero">
          <div className="section-inner narrow">
            <p className="eyebrow">404</p>
            <h1>{locale === 'ja' ? 'ページが見つかりません' : 'Page not found'}</h1>
            <p>{locale === 'ja' ? 'URLを確認するか、ホームへ戻ってください。' : 'Check the URL or return home.'}</p>
            <a className="button primary" href={localize(locale)}>
              <span>{c.home}</span>
              <i className="ri-arrow-right-line" />
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
