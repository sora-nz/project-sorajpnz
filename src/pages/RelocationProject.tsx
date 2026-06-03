import { useEffect, useRef } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, common, links, Locale, projects, relocation, rentRadar, siteUrl } from '../lib/content';
import { localize } from '../lib/routes';
import { useMeta } from '../lib/useMeta';

type RelocationProjectProps = {
  locale: Locale;
  path: string;
};

function TableauEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = `
      <div class="tableauPlaceholder" id="nz-japan-relocation-viz" style="position: relative; width: 100%;">
        <noscript>
          <a href="${links.tableau}">
            <img alt="New Zealand Relocation Affordability Dashboard" src="https://public.tableau.com/static/images/NZ/NZ-JapanRelocationAffordabilityDashboard/NZ-JapanRelocationAffordabilityDashboard/1_rss.png" style="border: none" />
          </a>
        </noscript>
        <object class="tableauViz" style="display:none;">
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="site_root" value="" />
          <param name="name" value="NZ-JapanRelocationAffordabilityDashboard/NZ-JapanRelocationAffordabilityDashboard" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param name="static_image" value="https://public.tableau.com/static/images/NZ/NZ-JapanRelocationAffordabilityDashboard/NZ-JapanRelocationAffordabilityDashboard/1.png" />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="en-US" />
        </object>
      </div>
    `;

    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="tableau-shell" />;
}

export function RelocationProject({ locale, path }: RelocationProjectProps) {
  const r = relocation[locale];
  const c = common[locale];
  const p = projects[locale];
  const rr = rentRadar[locale];
  const base = localize(locale);

  useMeta({
    locale,
    path,
    title: `${r.title} - Sora Oya`,
    description: r.subtitle,
    image: assets.dashboard,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: `${r.title} - Sora Oya`,
          description: r.subtitle,
          url: `${siteUrl}${path}`,
          inLanguage: locale,
          author: { '@type': 'Person', name: 'Sora Oya' }
        },
        {
          '@type': 'CreativeWork',
          name: 'New Zealand Relocation Affordability Dashboard',
          description: r.sections[0].body,
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
          <div className="section-inner">
            <div className="media-frame">
              <img src={assets.dashboard} alt="New Zealand Relocation Affordability Dashboard" />
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

        <section className="content-section wide">
          <div className="section-inner wide-inner">
            <div className="section-heading left">
              <p className="eyebrow">Tableau</p>
              <h2>{r.interactiveTitle}</h2>
            </div>
            <TableauEmbed />
          </div>
        </section>

        <section className="content-section">
          <div className="section-inner article-layout">
            <section className="article-block">
              <p className="eyebrow">{locale === 'ja' ? '構築したもの' : 'What I Built'}</p>
              <h2>{locale === 'ja' ? '実装内容' : 'Build Scope'}</h2>
              <ul className="check-list">
                {r.built.map((item) => (
                  <li key={item}>
                    <span><i className="ri-check-line" /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {r.sections.map((section, index) => (
              <section className="article-block" key={section.label}>
                <p className="eyebrow">{String(index + 1).padStart(2, '0')}</p>
                <h2>{section.label}</h2>
                <p>{section.body}</p>
              </section>
            ))}

            <section className="article-block">
              <p className="eyebrow">Sources</p>
              <h2>{r.referencesTitle}</h2>
              <div className="source-list">
                {r.references.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                    <strong>{source.label}</strong>
                    <span>{source.desc}</span>
                  </a>
                ))}
              </div>
            </section>
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
