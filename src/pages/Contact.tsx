import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { common, home, links, Locale } from '../lib/content';
import { pageJsonLd, useMeta } from '../lib/useMeta';

type ContactProps = {
  locale: Locale;
  path: string;
};

export function Contact({ locale, path }: ContactProps) {
  const c = common[locale];
  const h = home[locale];
  const title = `${c.contact} - Sora Oya`;

  useMeta({
    locale,
    path,
    title,
    description: h.contact,
    jsonLd: pageJsonLd(locale, path, title, h.contact)
  });

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main>
        <section className="subhero">
          <div className="section-inner narrow">
            <p className="eyebrow">Contact</p>
            <h1>{c.contact}</h1>
            <p>{h.contact}</p>
          </div>
        </section>
        <section className="content-section">
          <div className="section-inner narrow">
            <div className="contact-panel">
              <div>
                <p className="eyebrow">Email</p>
                <h2>{links.emailText}</h2>
              </div>
              <a className="button primary" href={links.email}>
                <span>{c.emailMe}</span>
                <i className="ri-mail-line" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
