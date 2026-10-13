import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, links, Locale, seo } from '../lib/content';
import { projectIndexCopy } from '../lib/projectStories';
import { localize } from '../lib/routes';
import { pageJsonLd, useMeta } from '../lib/useMeta';
import './ProjectPages.css';

type ProjectsProps = {
  locale: Locale;
  path: string;
};

export function Projects({ locale, path }: ProjectsProps) {
  const copy = projectIndexCopy[locale];
  const meta = seo[locale].projects;
  const base = localize(locale);

  const rows = [
    {
      ...copy.calculator,
      image: locale === 'ja' ? assets.calculatorJa : assets.calculator,
      width: 1280, height: 720,
      href: `${base}/tools/nz-life-reality-calculator`,
      storyHref: `${base}/projects/nz-life-reality-calculator`,
      storyAction: copy.calculator.story
    },
    {
      ...copy.relocation,
      image: assets.dashboard, width: 1399, height: 949,
      href: `${base}/projects/nz-japan-relocation`,
      storyHref: undefined, storyAction: undefined
    },
    {
      ...copy.rent,
      image: assets.rentRadar, width: 1106, height: 616,
      href: `${base}/projects/rent-radar`,
      storyHref: undefined, storyAction: undefined
    }
  ];

  useMeta({
    locale,
    path,
    title: meta.title,
    description: meta.description,
    image: assets.dashboard,
    jsonLd: pageJsonLd(locale, path, meta.title, meta.description)
  });

  return (
    <div className="page content-pages projects-page">
      <Header locale={locale} path={path} />
      <main>
        <header className="project-page-intro section-inner">
          <p className="eyebrow">Projects</p>
          <h1>{copy.title}</h1>
          <p className="project-page-lead">{copy.intro}</p>
        </header>
        <section className="section-inner project-collection" aria-label={copy.title}>
          {rows.map((project, index) => (
            <article className="project-work-row" key={project.href}>
              <a className="project-work-image" href={project.href} aria-label={project.action}>
                <img src={project.image} alt={project.title} width={project.width} height={project.height} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
              </a>
              <div className="project-work-copy">
                <p className="project-work-label"><span>{String(index + 1).padStart(2, '0')}</span>{project.label}</p>
                <h2><a href={project.href}>{project.title}</a></h2>
                <p>{project.body}</p>
                <p className="project-work-tools">{project.tools}</p>
                <div className="project-work-actions">
                  <a className="project-action-link" href={project.href}>{project.action}<i className="ri-arrow-right-line" aria-hidden="true" /></a>
                  {project.storyHref && <a className="project-secondary-link" href={project.storyHref}>{project.storyAction}<i className="ri-arrow-right-line" aria-hidden="true" /></a>}
                </div>
              </div>
            </article>
          ))}
        </section>
        <section className="section-inner project-contact-row">
          <div>
            <h2>{copy.contactTitle}</h2>
            <p>{copy.contactBody}</p>
          </div>
          <div className="project-work-actions">
            <a className="project-action-link" href={`${base}/contact`}>{copy.contact}<i className="ri-arrow-right-line" aria-hidden="true" /></a>
            <a className="project-secondary-link" href={links.github} target="_blank" rel="noopener noreferrer">{copy.github}<i className="ri-external-link-line" aria-hidden="true" /></a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
