import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, Locale, seo } from '../lib/content';
import { localize } from '../lib/routes';
import { servicePilot } from '../lib/servicePilot';
import { pageJsonLd, useMeta } from '../lib/useMeta';

export function Services({ locale, path }: { locale: Locale; path: string }) {
  const s = servicePilot[locale];
  const meta = seo[locale].services;
  const contact = localize(locale, '/contact');
  useMeta({ locale, path, ...meta, image: assets.aucklandHarbour,
    jsonLd: pageJsonLd(locale, path, meta.title, meta.description) });

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main className="service-pilot">
        <section className="service-pilot-intro section-inner">
          <p className="eyebrow">{s.label}</p>
          <h1>{s.title}</h1>
          <p className="service-pilot-lead">{s.lead}</p>
          <a className="button primary" href={contact}>{s.cta}<i className="ri-arrow-right-line" aria-hidden="true" /></a>
          <p className="service-pilot-status">{s.status}</p>
        </section>
        <section className="service-pilot-band">
          <div className="section-inner service-pilot-fit"><h2>{s.fitTitle}</h2><p>{s.fit}</p></div>
        </section>
        <section className="section-inner service-pilot-scope">
          <h2>{s.scopeTitle}</h2>
          <ol className="service-deliverables">
            {s.deliverables.map(([title, body], i) => <li key={title}>
              <span aria-hidden="true">0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div>
            </li>)}
          </ol>
          <div className="service-pilot-budget">
            <div><h3>{s.priceLabel}</h3><p className="service-price">NZ$650</p></div>
            <div><p>{s.priceNote}</p><p>{s.scopeNote}</p></div>
          </div>
          <details className="service-exclusions"><summary>{s.exclusionsTitle}</summary><p>{s.exclusions}</p></details>
        </section>
        <section className="service-pilot-band">
          <div className="section-inner service-pilot-proof">
            <h2>{s.proofTitle}</h2><p>{s.proof}</p>
            <div className="service-proof-links">
              <a href={localize(locale, '/tools/nz-life-reality-calculator')}>
                <img src={locale === 'ja' ? assets.calculatorJa : assets.calculator} alt="" width="1200" height="675" loading="lazy" decoding="async" />
                <span>{s.calculator}<i className="ri-arrow-right-line" aria-hidden="true" /></span>
              </a>
              <a href="/ja/blog">
                <img src={assets.aucklandHarbour} alt="" width="1024" height="768" loading="lazy" decoding="async" />
                <span>{s.notes}<i className="ri-arrow-right-line" aria-hidden="true" /></span>
              </a>
            </div>
            <aside className="service-author">
              <img src={assets.avatar} alt="Sora Oya" width="72" height="72" loading="lazy" decoding="async" />
              <div><h3>{s.authorTitle}</h3><p>{s.author}</p></div>
            </aside>
          </div>
        </section>
        <section className="section-inner service-pilot-faq">
          <h2>{s.faqTitle}</h2>
          {s.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
        </section>
        <section className="section-inner service-pilot-closing">
          <h2>{s.closingTitle}</h2><p>{s.closing}</p>
          <a className="button primary" href={contact}>{s.cta}<i className="ri-mail-line" aria-hidden="true" /></a>
          <p className="service-career">{s.career} <a href={localize(locale, '/projects')}>{s.careerCta}</a></p>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
