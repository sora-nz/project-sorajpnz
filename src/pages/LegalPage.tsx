import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { legal, links, Locale } from '../lib/content';
import { pageJsonLd, useMeta } from '../lib/useMeta';
import './LegalPage.css';

type LegalKind = keyof typeof legal;

type LegalPageProps = {
  locale: Locale;
  path: string;
  kind: LegalKind;
};

export function LegalPage({ locale, path, kind }: LegalPageProps) {
  const page = legal[kind][locale];
  const title = `${page.title} - SoraJPNZ`;
  const sections = 'sections' in page ? page.sections : null;

  useMeta({
    locale,
    path,
    title,
    description: page.body,
    jsonLd: pageJsonLd(locale, path, title, page.body)
  });

  return (
    <div className="page content-pages legal-page">
      <Header locale={locale} path={path} showContact />
      <main>
        <header className="content-page-heading">
          <div className="section-inner">
            <p className="content-page-kicker">SoraJPNZ</p>
            <h1>{page.title}</h1>
          </div>
        </header>
        <section className="section-inner legal-reading">
          <div className="legal-copy">
            {sections ? sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            )) : <p>{page.body}</p>}
            {kind === 'privacy' && <>
              <div className="legal-provider-links">
                <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Netlify Privacy<i className="ri-external-link-line" aria-hidden="true" /></a>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy<i className="ri-external-link-line" aria-hidden="true" /></a>
              </div>
              <section>
                <h2>{locale === 'ja' ? '個人情報についてのお問い合わせ' : 'Privacy enquiries'}</h2>
                <p>{locale === 'ja' ? '情報の扱いについてのご質問や、送信した情報の確認・修正・削除のご相談は、こちらへご連絡ください。' : 'For questions about how information is handled, or requests to review, correct or delete information you sent, contact:'}</p>
                <a className="content-link" href={links.privacyEmail}>{links.privacyEmailText}<i className="ri-mail-line" aria-hidden="true" /></a>
              </section>
            </>}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
