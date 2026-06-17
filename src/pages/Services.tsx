import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, links, Locale, seo, servicesPage } from '../lib/content';
import { localize } from '../lib/routes';
import { pageJsonLd, useMeta } from '../lib/useMeta';
import { useReveal } from '../lib/useReveal';

type ServicesProps = {
  locale: Locale;
  path: string;
};

export function Services({ locale, path }: ServicesProps) {
  const copy = servicesPage[locale];
  const meta = seo[locale].services;
  const base = localize(locale);

  useReveal();
  useMeta({
    locale,
    path,
    title: meta.title,
    description: meta.description,
    image: assets.projectsBg,
    jsonLd: pageJsonLd(locale, path, meta.title, meta.description)
  });

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main>
        <section className="subhero services-subhero">
          <div className="section-inner narrow">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <div className="button-row center">
              <a className="button primary" href={`${base}/contact`}>
                <span>{copy.primaryCta}</span>
                <i className="ri-arrow-right-line" />
              </a>
              <a className="button secondary blue" href={`${base}/projects`}>
                <span>{copy.secondaryCta}</span>
                <i className="ri-folder-chart-line" />
              </a>
            </div>
          </div>
        </section>

        <section className="content-section services-detail-section">
          <div className="section-inner">
            <div className="section-heading left reveal-on-scroll">
              <p className="eyebrow">SoraJPNZ</p>
              <h2>{copy.introTitle}</h2>
              <p>{copy.intro}</p>
            </div>

            <div className="service-detail-grid">
              {copy.packages.map((item) => (
                <article className="service-detail-card reveal-on-scroll" key={item.title}>
                  <span className="service-icon" aria-hidden="true">
                    <i className={item.icon} />
                  </span>
                  <h2>{item.title}</h2>
                  <p>{item.summary}</p>
                  <ul className="check-list service-deliverables">
                    {item.deliverables.map((deliverable) => (
                      <li key={deliverable}>
                        <span aria-hidden="true">
                          <i className="ri-check-line" />
                        </span>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="image-band service-process-band">
          <div className="motion-layer">
            <img className="motion-image animate-projects-drift" src={assets.projectsBg} alt="" loading="lazy" decoding="async" />
            <div className="image-wash stronger" />
          </div>
          <div className="section-inner">
            <div className="section-heading reveal-on-scroll">
              <p className="eyebrow">Process</p>
              <h2>{copy.processTitle}</h2>
            </div>
            <div className="process-grid">
              {copy.process.map((item) => (
                <article className="process-card reveal-on-scroll" key={item.step}>
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section compact">
          <div className="section-inner">
            <div className="brand-note-panel reveal-on-scroll">
              <div>
                <p className="eyebrow">Brand Direction</p>
                <h2>{copy.brandTitle}</h2>
                <p>{copy.brandBody}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section compact">
          <div className="section-inner">
            <div className="contact-panel reveal-on-scroll">
              <div>
                <h2>{copy.ctaTitle}</h2>
                <p>{copy.ctaBody}</p>
              </div>
              <a className="button primary" href={links.email}>
                <span>{copy.ctaButton}</span>
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
