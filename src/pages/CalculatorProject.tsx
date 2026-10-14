import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, type Locale, siteUrl } from '../lib/content';
import { calculatorProject, calculatorProjectRepositoryUrl } from '../lib/calculatorProject';
import { useMeta } from '../lib/useMeta';
import './ProjectPages.css';
import './CalculatorProject.css';

type CalculatorProjectProps = {
  locale: Locale;
  path: string;
};

const storyCopy = {
  ja: {
    lead: '時給・勤務時間・家賃・車の費用から、生活費を払ったあとに残る金額を試算し、貯金目標と比べられます。生活費の疑問を、日英で使える計算機にしました。',
    problemTitle: '生活費の疑問を、試せる形に',
    requirementsLabel: '最初の版で決めた要件',
    decisionsTitle: '設計と実装で選んだこと',
    flowTitle: '計算の前提',
    checksTitle: '検証と、計算できないこと',
    checksLabel: '計算関数で確認した条件を見る',
    codeTitle: 'コードを確かめる',
    navLabel: '制作記録の目次'
  },
  en: {
    lead: 'A bilingual calculator for estimating what remains each month after living costs. Change wages, rent and car costs, then compare the result with your savings goal. Includes an optional JPY reference.',
    problemTitle: 'Turning a living-cost question into a tool',
    requirementsLabel: 'Requirements for the first version',
    decisionsTitle: 'Design and implementation decisions',
    flowTitle: 'Calculation assumptions',
    checksTitle: 'Checks and limitations',
    checksLabel: 'See the calculation cases I checked',
    codeTitle: 'Inspect the code',
    navLabel: 'On this page'
  }
} as const;

export function CalculatorProject({ locale, path }: CalculatorProjectProps) {
  const copy = calculatorProject[locale];
  const story = storyCopy[locale];
  const toolPath = `/${locale}/tools/nz-life-reality-calculator`;
  const image = locale === 'ja' ? assets.calculatorJa : assets.calculator;
  const summaryItems = [copy.summary[1], copy.summary[2], copy.summary[0], copy.summary[3]];

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
    <div className="page content-pages project-story-page calculator-story-page">
      <Header locale={locale} path={path} />
      <main>
        <header className="section-inner project-story-intro">
          <a className="back-link" href={`/${locale}/projects`}><i className="ri-arrow-left-line" aria-hidden="true" /><span>{copy.back}</span></a>
          <div className="calculator-case-opening">
            <div>
              <p className="eyebrow">{copy.label}</p>
              <h1>{copy.title}</h1>
              <p className="project-page-lead">{story.lead}</p>
              <div className="content-page-actions">
                <a className="content-button" href={toolPath}>{copy.openTool}<i className="ri-arrow-right-line" aria-hidden="true" /></a>
                <a className="project-secondary-link" href={calculatorProjectRepositoryUrl} target="_blank" rel="noopener noreferrer">{copy.viewSource}<i className="ri-github-line" aria-hidden="true" /></a>
              </div>
            </div>
            <figure className="project-dashboard-preview calculator-case-preview">
              <a href={toolPath} aria-label={copy.openTool}>
                <img src={image} alt={copy.previewAlt} width="1280" height="720" loading="eager" decoding="async" />
              </a>
              <figcaption>{copy.previewCaption}</figcaption>
            </figure>
          </div>
          <dl className="project-facts calculator-case-facts" aria-label={copy.summaryLabel}>
            {summaryItems.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
          </dl>
        </header>

        <div className="section-inner project-story-layout">
          <nav className="project-story-nav" aria-label={story.navLabel}>
            <a href="#calculator-project-problem">{story.problemTitle}</a>
            <a href="#calculator-project-decisions">{story.decisionsTitle}</a>
            <a href="#calculator-project-flow">{story.flowTitle}</a>
            <a href="#calculator-project-checks">{story.checksTitle}</a>
            <a href="#calculator-project-code">{story.codeTitle}</a>
          </nav>
          <div className="project-story-body">
            <section className="project-story-section" id="calculator-project-problem">
              <h2>{story.problemTitle}</h2>
              <p>{copy.problemBody}</p>
              <p>{copy.problemSecond}</p>
              <details className="calculator-case-disclosure">
                <summary>{story.requirementsLabel}<i className="ri-add-line" aria-hidden="true" /></summary>
                <ul className="project-simple-list">{copy.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
              </details>
            </section>

            <section className="project-story-section" id="calculator-project-decisions">
              <h2>{story.decisionsTitle}</h2>
              <div className="project-decision-list">
                {copy.decisions.map((decision) => <div key={decision.title}><h3>{decision.title}</h3><p>{decision.body}</p></div>)}
              </div>
            </section>

            <section className="project-story-section" id="calculator-project-flow">
              <h2>{story.flowTitle}</h2>
              <p>{copy.flowIntro}</p>
              <ol className="project-build-steps">
                {copy.flow.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.body}</p></li>)}
              </ol>
            </section>

            <section className="project-story-section" id="calculator-project-checks">
              <h2>{story.checksTitle}</h2>
              <p>{copy.checksIntro}</p>
              <details className="calculator-case-disclosure">
                <summary>{story.checksLabel}<i className="ri-add-line" aria-hidden="true" /></summary>
                <ul className="project-simple-list">{copy.checks.map((item) => <li key={item}>{item}</li>)}</ul>
              </details>
              <h3>{copy.limitsTitle}</h3>
              <ul className="project-simple-list">{copy.limits.map((item) => <li key={item}>{item}</li>)}</ul>
              <aside className="calculator-case-note">
                <p>{copy.privacyNote}</p>
                <p>{copy.adviceNote}</p>
              </aside>
            </section>

            <section className="project-story-section" id="calculator-project-code">
              <h2>{story.codeTitle}</h2>
              <ul className="project-source-list calculator-case-code">
                {copy.codeLinks.map((file) => (
                  <li key={file.path}>
                    <a href={`${calculatorProjectRepositoryUrl}/blob/main/${file.path}`} target="_blank" rel="noopener noreferrer">{file.title}<i className="ri-external-link-line" aria-hidden="true" /></a>
                    <p>{file.note}</p>
                    <code>{file.path}</code>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <section className="section-inner project-related-row calculator-case-next">
          <h2>{copy.nextTitle}</h2>
          <p>{copy.nextBody}</p>
          <div className="project-work-actions">
            <a className="project-action-link" href={toolPath}>{copy.openTool}<i className="ri-arrow-right-line" aria-hidden="true" /></a>
            <a className="project-secondary-link" href={`/${locale}/contact`}>{copy.contact}<i className="ri-mail-line" aria-hidden="true" /></a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
