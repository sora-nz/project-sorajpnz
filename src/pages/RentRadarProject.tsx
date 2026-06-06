import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ProjectGlance } from '../components/ProjectGlance';
import { assets, common, links, Locale, rentRadar, seo, siteUrl } from '../lib/content';
import { localize } from '../lib/routes';
import { useMeta } from '../lib/useMeta';

type RentRadarProjectProps = {
  locale: Locale;
  path: string;
};

export function RentRadarProject({ locale, path }: RentRadarProjectProps) {
  const r = rentRadar[locale];
  const c = common[locale];
  const meta = seo[locale].rentRadar;
  const base = localize(locale);
  const textBlocks = [
    { title: r.overviewTitle, body: r.overviewContent },
    { title: r.whatIDidTitle, body: r.whatIDidContent },
    { title: r.keyResultsTitle, body: r.keyResultsContent }
  ];

  useMeta({
    locale,
    path,
    title: meta.title,
    description: meta.description,
    image: assets.rentRadar,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: meta.title,
          description: meta.description,
          url: `${siteUrl}${path}`,
          inLanguage: locale,
          author: { '@type': 'Person', name: 'Sora Oya' }
        },
        {
          '@type': 'CreativeWork',
          name: 'Rent Radar (Power BI)',
          description: r.overviewContent,
          url: `${siteUrl}${path}`,
          author: { '@type': 'Person', name: 'Sora Oya', url: siteUrl },
          dateCreated: '2025-08',
          keywords: 'Power BI, BI prototype, dashboard design, data analytics, mock data'
        }
      ]
    }
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
            <span className="meta-text">{r.meta}</span>
          </div>
        </section>

        <ProjectGlance title={r.glanceTitle} items={r.glanceItems} />

        <section className="content-section">
          <div className="section-inner narrow legacy-text-stack">
            {textBlocks.map((block) => (
              <article className="legacy-copy-block" key={block.title}>
                <h2>{block.title}</h2>
                <p>{block.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section dashboard-band">
          <div className="section-inner dashboard-inner">
            <div className="section-heading">
              <h2>{r.dashboardTitle}</h2>
            </div>
            <div className="embed-card">
              <div className="embed-frame powerbi">
                <iframe
                  title="Rent Radar Power BI Dashboard"
                  src={links.powerBiEmbed}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <p className="embed-fallback">
                <a href={links.powerBi} target="_blank" rel="noopener noreferrer">
                  <span>{r.dashboardFallback}</span>
                  <i className="ri-external-link-line" />
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-inner narrow legacy-text-stack">
            <article className="legacy-copy-block">
              <h2>{r.dataNotesTitle}</h2>
              <p>{r.dataNotesContent}</p>
            </article>
            <div className="button-row center">
              <a className="button primary" href={`${base}/projects`}>
                <span>{r.viewAllProjects}</span>
                <i className="ri-arrow-right-line" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
