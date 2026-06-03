import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, common, Locale, rentRadar } from '../lib/content';
import { localize } from '../lib/routes';
import { pageJsonLd, useMeta } from '../lib/useMeta';

type RentRadarProjectProps = {
  locale: Locale;
  path: string;
};

export function RentRadarProject({ locale, path }: RentRadarProjectProps) {
  const r = rentRadar[locale];
  const c = common[locale];
  const base = localize(locale);

  useMeta({
    locale,
    path,
    title: `${r.title} - Sora Oya`,
    description: r.subtitle,
    image: assets.rentRadar,
    jsonLd: pageJsonLd(locale, path, `${r.title} - Sora Oya`, r.subtitle)
  });

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main>
        <section className="project-hero">
          <div className="section-inner narrow">
            <a className="back-link" href={`${base}/projects`}>
              <i className="ri-arrow-left-line" />
              <span>{c.backToProjects}</span>
            </a>
            <h1>{r.title}</h1>
            <p>{r.subtitle}</p>
          </div>
        </section>
        <section className="content-section">
          <div className="section-inner article-layout">
            <div className="media-frame">
              <img src={assets.rentRadar} alt="Rent Radar dashboard preview" />
            </div>
            <section className="article-block">
              <p className="eyebrow">Power BI</p>
              <h2>{r.title}</h2>
              <p>{r.body}</p>
            </section>
            <section className="article-block subtle">
              <p>{r.note}</p>
            </section>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
