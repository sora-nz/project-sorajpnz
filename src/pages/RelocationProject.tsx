import { useEffect, useRef, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, common, links, Locale, relocation, seo, siteUrl } from '../lib/content';
import { relocationStory } from '../lib/projectStories';
import { localize } from '../lib/routes';
import { useMeta } from '../lib/useMeta';
import './ProjectPages.css';

type RelocationProjectProps = {
  locale: Locale;
  path: string;
};

const TABLEAU_BASE_WIDTH = 1400;
const TABLEAU_BASE_HEIGHT = 977;

function ResponsiveTableauEmbed() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const updateScale = () => setScale(Math.min(1, shell.clientWidth / TABLEAU_BASE_WIDTH));
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={shellRef} className="project-tableau-shell" style={{ height: Math.ceil(TABLEAU_BASE_HEIGHT * scale) }}>
      <iframe
        title="New Zealand Relocation Affordability Tableau Dashboard"
        src={links.tableauEmbed}
        allowFullScreen
        style={{ width: TABLEAU_BASE_WIDTH, height: TABLEAU_BASE_HEIGHT, transform: `scale(${scale})` }}
      />
    </div>
  );
}

export function RelocationProject({ locale, path }: RelocationProjectProps) {
  const r = relocation[locale];
  const copy = relocationStory[locale];
  const c = common[locale];
  const meta = seo[locale].relocation;
  const base = localize(locale);
  const [showDashboard, setShowDashboard] = useState(false);

  useMeta({
    locale,
    path,
    title: meta.title,
    description: meta.description,
    image: assets.dashboard,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage', name: meta.title, description: meta.description,
          url: `${siteUrl}${path}`, inLanguage: locale,
          author: { '@type': 'Person', name: 'Sora Oya' }
        },
        {
          '@type': 'CreativeWork', name: 'New Zealand Relocation Affordability Dashboard',
          description: r.sections[0].body, url: `${siteUrl}${path}`,
          author: { '@type': 'Person', name: 'Sora Oya', url: siteUrl },
          dateCreated: '2026',
          keywords: 'Tableau, Python, SQL, public data, New Zealand, Japan, relocation, rent, exchange rate, data analytics'
        }
      ]
    }
  });

  return (
    <div className="page content-pages project-story-page">
      <Header locale={locale} path={path} />
      <main>
        <header className="section-inner project-story-intro">
          <a className="back-link" href={`${base}/projects`}><i className="ri-arrow-left-line" aria-hidden="true" /><span>{c.backToProjects}</span></a>
          <p className="eyebrow">Tableau / Public data</p>
          <h1>{copy.title}</h1>
          <p className="project-page-lead">{copy.lead}</p>
          <dl className="project-facts" aria-label={copy.summaryLabel}>
            {copy.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
          </dl>
        </header>

        <section className="section-inner project-dashboard-section" aria-labelledby="relocation-preview">
          <div className="project-preview-heading">
            <h2 id="relocation-preview">{copy.previewTitle}</h2>
            <a className="project-action-link" href={links.tableau} target="_blank" rel="noopener noreferrer">{copy.openDashboard}<i className="ri-external-link-line" aria-hidden="true" /></a>
          </div>
          <figure className="project-dashboard-preview">
            <a href={links.tableau} target="_blank" rel="noopener noreferrer" aria-label={copy.openDashboard}>
              <img src={assets.dashboard} alt="New Zealand Relocation Affordability Dashboard" width="1399" height="949" loading="eager" decoding="async" />
            </a>
            <figcaption>{copy.previewCaption}</figcaption>
          </figure>
          <div className="project-dashboard-actions">
            <a className="project-secondary-link" href={links.relocationGithub} target="_blank" rel="noopener noreferrer">{copy.openSource}<i className="ri-github-line" aria-hidden="true" /></a>
            <button className="project-inline-control" type="button" aria-expanded={showDashboard} aria-controls="relocation-interactive" onClick={() => setShowDashboard((visible) => !visible)}>
              <i className={showDashboard ? 'ri-close-line' : 'ri-dashboard-line'} aria-hidden="true" />{showDashboard ? copy.embedClose : copy.embedAction}
            </button>
          </div>
          <p className="project-mobile-dashboard-note">{copy.mobileNote}</p>
          {showDashboard && <div className="project-inline-dashboard" id="relocation-interactive"><ResponsiveTableauEmbed /></div>}
        </section>

        <div className="section-inner project-story-layout">
          <nav className="project-story-nav" aria-label={locale === 'ja' ? '制作記録の目次' : 'On this page'}>
            <a href="#relocation-problem">{copy.problemTitle}</a>
            <a href="#relocation-workflow">{copy.workflowTitle}</a>
            <a href="#relocation-decisions">{copy.decisionsTitle}</a>
            <a href="#relocation-metrics">{copy.metricsTitle}</a>
            <a href="#relocation-sources">{copy.sourcesTitle}</a>
          </nav>
          <div className="project-story-body">
            <section className="project-story-section" id="relocation-problem">
              <h2>{copy.problemTitle}</h2>
              <p>{copy.problem}</p>
              <p>{copy.audience}</p>
            </section>
            <section className="project-story-section" id="relocation-workflow">
              <h2>{copy.workflowTitle}</h2>
              <ol className="project-build-steps">
                {copy.workflow.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.body}</p></li>)}
              </ol>
              <p className="project-story-note">{copy.aiNote}</p>
            </section>
            <section className="project-story-section" id="relocation-decisions">
              <h2>{copy.decisionsTitle}</h2>
              <div className="project-decision-list">
                {copy.decisions.map((decision) => <div key={decision.title}><h3>{decision.title}</h3><p>{decision.body}</p></div>)}
              </div>
              <h3>{copy.viewsTitle}</h3>
              <ul className="project-simple-list">{copy.views.map((view) => <li key={view}>{view}</li>)}</ul>
            </section>
            <section className="project-story-section" id="relocation-metrics">
              <h2>{copy.metricsTitle}</h2>
              <dl className="project-metric-list">{copy.metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.body}</dd></div>)}</dl>
              <h3>{copy.limitsTitle}</h3>
              <ul className="project-simple-list">{copy.limits.map((limit) => <li key={limit}>{limit}</li>)}</ul>
              <h3>{copy.nextTitle}</h3>
              <p>{copy.nextBody}</p>
            </section>
            <section className="project-story-section" id="relocation-sources">
              <h2>{copy.sourcesTitle}</h2>
              <ul className="project-source-list">
                {r.references.map((source, index) => (
                  <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<i className="ri-external-link-line" aria-hidden="true" /></a><p>{copy.sources[index]}</p></li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <section className="section-inner project-related-row">
          <p className="eyebrow">{copy.nextProjectLabel}</p>
          <h2><a href={`${base}/projects/rent-radar`}>{copy.nextProjectTitle}<i className="ri-arrow-right-line" aria-hidden="true" /></a></h2>
          <p>{copy.nextProjectBody}</p>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
