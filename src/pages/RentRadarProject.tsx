import { useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, common, links, Locale, rentRadar, seo, siteUrl } from '../lib/content';
import { rentRadarStory } from '../lib/projectStories';
import { localize } from '../lib/routes';
import { useMeta } from '../lib/useMeta';
import './ProjectPages.css';

type RentRadarProjectProps = {
  locale: Locale;
  path: string;
};

export function RentRadarProject({ locale, path }: RentRadarProjectProps) {
  const r = rentRadar[locale];
  const copy = rentRadarStory[locale];
  const c = common[locale];
  const meta = seo[locale].rentRadar;
  const base = localize(locale);
  const [showDashboard, setShowDashboard] = useState(false);

  useMeta({
    locale, path, title: meta.title, description: meta.description, image: assets.rentRadar,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage', name: meta.title, description: meta.description,
          url: `${siteUrl}${path}`, inLanguage: locale,
          author: { '@type': 'Person', name: 'Sora Oya' }
        },
        {
          '@type': 'CreativeWork', name: 'Rent Radar (Power BI)',
          description: r.overviewContent, url: `${siteUrl}${path}`,
          author: { '@type': 'Person', name: 'Sora Oya', url: siteUrl },
          dateCreated: '2025-08',
          keywords: 'Power BI, BI prototype, dashboard design, data analytics, mock data'
        }
      ]
    }
  });

  return (
    <div className="page content-pages project-story-page rent-story-page">
      <Header locale={locale} path={path} />
      <main>
        <header className="section-inner project-story-intro">
          <a className="back-link" href={`${base}/projects`}><i className="ri-arrow-left-line" aria-hidden="true" /><span>{c.backToProjects}</span></a>
          <p className="eyebrow">Power BI / {locale === 'ja' ? '架空データのプロトタイプ' : 'Mock-data prototype'}</p>
          <h1>{copy.title}</h1>
          <p className="project-page-lead">{copy.lead}</p>
          <dl className="project-facts">
            {copy.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
          </dl>
        </header>

        <section className="section-inner project-dashboard-section" aria-labelledby="rent-radar-preview">
          <div className="project-preview-heading">
            <h2 id="rent-radar-preview">{copy.previewTitle}</h2>
            <a className="project-action-link" href={links.powerBi} target="_blank" rel="noopener noreferrer">{copy.openDashboard}<i className="ri-external-link-line" aria-hidden="true" /></a>
          </div>
          <figure className="project-dashboard-preview">
            <a href={links.powerBi} target="_blank" rel="noopener noreferrer" aria-label={copy.openDashboard}>
              <img src={assets.rentRadar} alt="Rent Radar Power BI dashboard using mock data" width="1106" height="616" loading="eager" decoding="async" />
            </a>
            <figcaption>{copy.previewCaption}</figcaption>
          </figure>
          <div className="project-dashboard-actions">
            <button className="project-inline-control" type="button" aria-expanded={showDashboard} aria-controls="rent-radar-interactive" onClick={() => setShowDashboard((visible) => !visible)}>
              <i className={showDashboard ? 'ri-close-line' : 'ri-dashboard-line'} aria-hidden="true" />{showDashboard ? copy.embedClose : copy.embedAction}
            </button>
          </div>
          <p className="project-mobile-dashboard-note">{copy.mobileNote}</p>
          {showDashboard && <div className="project-inline-dashboard project-powerbi-shell" id="rent-radar-interactive"><iframe title="Rent Radar Power BI Dashboard" src={links.powerBiEmbed} allowFullScreen /></div>}
        </section>

        <div className="section-inner project-rent-body">
          <section className="project-story-section">
            <h2>{copy.scopeTitle}</h2>
            <p>{copy.scopeBody}</p>
          </section>
          <section className="project-story-section">
            <h2>{copy.decisionsTitle}</h2>
            <div className="project-decision-list">
              {copy.decisions.map((decision) => <div key={decision.title}><h3>{decision.title}</h3><p>{decision.body}</p></div>)}
            </div>
          </section>
          <section className="project-story-section">
            <h2>{copy.limitsTitle}</h2>
            <p>{copy.limitsBody}</p>
          </section>
        </div>

        <section className="section-inner project-related-row">
          <p className="eyebrow">{copy.nextLabel}</p>
          <h2><a href={`${base}/projects/nz-japan-relocation`}>{copy.nextTitle}<i className="ri-arrow-right-line" aria-hidden="true" /></a></h2>
          <p>{copy.nextBody}</p>
          <a className="project-action-link" href={`${base}/projects/nz-japan-relocation`}>{copy.nextAction}<i className="ri-arrow-right-line" aria-hidden="true" /></a>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
