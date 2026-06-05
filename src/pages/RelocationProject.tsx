import { useEffect, useRef, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, common, links, Locale, projects, relocation, rentRadar, seo, siteUrl } from '../lib/content';
import { localize } from '../lib/routes';
import { useMeta } from '../lib/useMeta';

type RelocationProjectProps = {
  locale: Locale;
  path: string;
};

type DetailSection = {
  label: string;
  body: string;
};

const TABLEAU_BASE_WIDTH = 1400;
const TABLEAU_BASE_HEIGHT = 977;

function ResponsiveTableauEmbed() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const updateScale = () => {
      const nextScale = Math.min(1, shell.clientWidth / TABLEAU_BASE_WIDTH);
      setScale(Number(nextScale.toFixed(4)));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(shell);
    window.addEventListener('resize', updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <div
      ref={shellRef}
      className="scaled-embed-shell"
      style={{ height: Math.ceil(TABLEAU_BASE_HEIGHT * scale) }}
    >
      <iframe
        title="New Zealand Relocation Affordability Tableau Dashboard"
        src={links.tableauEmbed}
        loading="lazy"
        allowFullScreen
        className="scaled-tableau-frame"
        style={{
          width: TABLEAU_BASE_WIDTH,
          height: TABLEAU_BASE_HEIGHT,
          transform: `scale(${scale})`
        }}
      />
    </div>
  );
}

function DetailCard({
  section,
  index,
  variant = 'soft'
}: {
  section: DetailSection;
  index: number;
  variant?: 'soft' | 'white';
}) {
  return (
    <article className={`legacy-card ${variant}`}>
      <span className="legacy-card-index">
        {index}. {section.label}
      </span>
      <h2>{section.label}</h2>
      <p>{section.body}</p>
    </article>
  );
}

export function RelocationProject({ locale, path }: RelocationProjectProps) {
  const r = relocation[locale];
  const c = common[locale];
  const p = projects[locale];
  const rr = rentRadar[locale];
  const meta = seo[locale].relocation;
  const base = localize(locale);
  const [summary, businessProblem, targetUsers, dataSources, dashboardSections, metricNotes, keyInsights, limitations, tools, future, dataNotes] =
    r.sections;

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
          '@type': 'WebPage',
          name: meta.title,
          description: meta.description,
          url: `${siteUrl}${path}`,
          inLanguage: locale,
          author: { '@type': 'Person', name: 'Sora Oya' }
        },
        {
          '@type': 'CreativeWork',
          name: 'New Zealand Relocation Affordability Dashboard',
          description: summary.body,
          url: `${siteUrl}${path}`,
          author: { '@type': 'Person', name: 'Sora Oya', url: siteUrl },
          dateCreated: '2026',
          keywords:
            'Tableau, Python, SQL, public data, New Zealand, Japan, relocation, rent, exchange rate, data analytics'
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
            <div className="tag-row centered">
              {p.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section compact">
          <div className="section-inner project-preview-inner">
            <div className="section-heading">
              <h2>{r.previewTitle}</h2>
            </div>
            <div className="media-frame">
              <img src={assets.dashboard} alt="New Zealand Relocation Affordability Dashboard" loading="lazy" decoding="async" />
            </div>
            <div className="button-row center">
              <a className="button primary" href={links.tableau} target="_blank" rel="noopener noreferrer">
                <i className="ri-external-link-line" />
                <span>{r.viewTableau}</span>
              </a>
              <a className="button secondary blue" href={links.relocationGithub} target="_blank" rel="noopener noreferrer">
                <i className="ri-github-fill" />
                <span>{r.viewGithub}</span>
              </a>
            </div>
          </div>
        </section>

        <section className="content-section wide dashboard-band">
          <div className="section-inner wide-inner">
            <div className="section-heading left">
              <h2>{r.interactiveTitle}</h2>
            </div>
            <div className="embed-card">
              <ResponsiveTableauEmbed />
            </div>
            <div className="button-row center">
              <a className="button primary small" href={links.tableau} target="_blank" rel="noopener noreferrer">
                <i className="ri-external-link-line" />
                <span>{r.viewTableau}</span>
              </a>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-inner legacy-detail-layout">
            <DetailCard section={summary} index={1} />

            <div className="legacy-grid two">
              <DetailCard section={businessProblem} index={2} />
              <DetailCard section={targetUsers} index={3} />
            </div>

            <article className="legacy-card soft">
              <span className="legacy-card-index">
                4. {locale === 'ja' ? '構築したもの' : 'What I Built'}
              </span>
              <h2>{locale === 'ja' ? '構築したもの' : 'What I Built'}</h2>
              <ol className="number-list">
                {r.built.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>

            <DetailCard section={dataSources} index={5} />
            <DetailCard section={dashboardSections} index={6} />
            <DetailCard section={metricNotes} index={7} />
            <DetailCard section={keyInsights} index={8} />

            <div className="legacy-grid two">
              <DetailCard section={limitations} index={9} variant="white" />
              <DetailCard section={dataNotes} index={10} variant="white" />
            </div>

            <div className="legacy-grid two">
              <DetailCard section={tools} index={11} />
              <DetailCard section={future} index={12} />
            </div>

            <article className="legacy-card soft">
              <span className="legacy-card-index">13. {r.referencesTitle}</span>
              <h2>{r.referencesTitle}</h2>
              <div className="source-list">
                {r.references.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                    <strong>{source.label}</strong>
                    <span>{source.desc}</span>
                  </a>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="next-section">
          <div className="section-inner next-inner">
            <p className="eyebrow">{r.nextLabel}</p>
            <h2>{rr.title}</h2>
            <p>{rr.subtitle}</p>
            <a className="button primary small" href={`${base}/projects/rent-radar`}>
              <span>{c.viewProject}</span>
              <i className="ri-arrow-right-line" />
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
