import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, type Locale, siteUrl } from '../lib/content';
import { calculatorProject, calculatorProjectRepositoryUrl } from '../lib/calculatorProject';
import { useMeta } from '../lib/useMeta';

type CalculatorProjectProps = {
  locale: Locale;
  path: string;
};

export function CalculatorProject({ locale, path }: CalculatorProjectProps) {
  const copy = calculatorProject[locale];
  const toolPath = `/${locale}/tools/nz-life-reality-calculator`;
  const image = locale === 'ja' ? assets.calculatorJa : assets.calculator;

  useMeta({
    locale,
    path,
    ...copy.meta,
    image,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: copy.title,
      description: copy.meta.description,
      url: `${siteUrl}${path}`,
      inLanguage: locale,
      image: `${siteUrl}${image}`,
      author: { '@type': 'Person', name: 'Sora Oya', url: siteUrl },
      isPartOf: { '@type': 'WebSite', name: 'SoraJPNZ', url: siteUrl }
    }
  });

  return (
    <div className="page calculator-project-page">
      <Header locale={locale} path={path} />
      <main>
        <section className="project-hero calculator-project-hero">
          <div className="section-inner narrow">
            <a className="back-link" href={`/${locale}/projects`}>
              <i className="ri-arrow-left-line" aria-hidden="true" />
              <span>{copy.back}</span>
            </a>
            <p className="eyebrow">{copy.label}</p>
            <h1>{copy.title}</h1>
            <p className="calculator-project-subtitle">{copy.subtitle}</p>
            <p className="calculator-project-lead">{copy.lead}</p>
            <div className="button-row">
              <a className="button primary" href={toolPath}>
                <span>{copy.openTool}</span>
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </a>
              <a className="button secondary" href={calculatorProjectRepositoryUrl} target="_blank" rel="noopener noreferrer">
                <span>{copy.viewSource}</span>
                <i className="ri-github-line" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="content-section calculator-project-overview" aria-label={copy.summaryLabel}>
          <div className="section-inner narrow">
            <dl className="calculator-project-summary">
              {copy.summary.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <figure className="calculator-project-preview">
              <a href={toolPath} aria-label={copy.openTool}>
                <img src={image} alt={copy.previewAlt} width="1280" height="720" loading="lazy" decoding="async" />
              </a>
              <figcaption>{copy.previewCaption}</figcaption>
            </figure>
          </div>
        </section>

        <section className="content-section">
          <div className="section-inner narrow legacy-text-stack">
            <section className="legacy-copy-block" aria-labelledby="calculator-project-problem">
              <h2 id="calculator-project-problem">{copy.problemTitle}</h2>
              <p>{copy.problemBody}</p>
              <p>{copy.problemSecond}</p>
            </section>

            <section className="legacy-copy-block" aria-labelledby="calculator-project-requirements">
              <h2 id="calculator-project-requirements">{copy.requirementsTitle}</h2>
              <ul className="calculator-project-list">
                {copy.requirements.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section className="legacy-copy-block" aria-labelledby="calculator-project-flow">
              <h2 id="calculator-project-flow">{copy.flowTitle}</h2>
              <p>{copy.flowIntro}</p>
              <ol className="calculator-project-flow">
                {copy.flow.map((step) => (
                  <li key={step.title}>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="legacy-copy-block" aria-labelledby="calculator-project-decisions">
              <h2 id="calculator-project-decisions">{copy.decisionsTitle}</h2>
              <div className="calculator-project-decisions">
                {copy.decisions.map((decision) => (
                  <div key={decision.title}>
                    <h3>{decision.title}</h3>
                    <p>{decision.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="legacy-copy-block" aria-labelledby="calculator-project-checks">
              <h2 id="calculator-project-checks">{copy.checksTitle}</h2>
              <p>{copy.checksIntro}</p>
              <ul className="calculator-project-list">
                {copy.checks.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section className="legacy-copy-block" aria-labelledby="calculator-project-limits">
              <h2 id="calculator-project-limits">{copy.limitsTitle}</h2>
              <ul className="calculator-project-list">
                {copy.limits.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <aside className="calculator-project-note">
                <p>{copy.privacyNote}</p>
                <p>{copy.adviceNote}</p>
              </aside>
            </section>

            <section className="legacy-copy-block" aria-labelledby="calculator-project-code">
              <h2 id="calculator-project-code">{copy.codeTitle}</h2>
              <div className="source-list calculator-project-code-links">
                {copy.codeLinks.map((file) => (
                  <a href={`${calculatorProjectRepositoryUrl}/blob/main/${file.path}`} target="_blank" rel="noopener noreferrer" key={file.path}>
                    <strong>{file.title}<i className="ri-external-link-line" aria-hidden="true" /></strong>
                    <span>{file.note}</span>
                    <code>{file.path}</code>
                  </a>
                ))}
              </div>
            </section>

            <section className="legacy-copy-block" aria-labelledby="calculator-project-next">
              <h2 id="calculator-project-next">{copy.nextTitle}</h2>
              <p>{copy.nextBody}</p>
              <div className="button-row left">
                <a className="button primary" href={toolPath}>
                  <span>{copy.openTool}</span>
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </a>
                <a className="button secondary" href={`/${locale}/contact`}>
                  <span>{copy.contact}</span>
                  <i className="ri-mail-line" aria-hidden="true" />
                </a>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
