import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ProjectCard } from '../components/ProjectCard';
import { assets, common, Locale, projects } from '../lib/content';
import { localize } from '../lib/routes';
import { pageJsonLd, useMeta } from '../lib/useMeta';
import { useReveal } from '../lib/useReveal';

type ProjectsProps = {
  locale: Locale;
  path: string;
};

export function Projects({ locale, path }: ProjectsProps) {
  const p = projects[locale];
  const c = common[locale];
  const base = localize(locale);

  useReveal();
  useMeta({
    locale,
    path,
    title: `${p.title} - Sora Oya`,
    description: p.subtitle,
    image: assets.dashboard,
    jsonLd: pageJsonLd(locale, path, `${p.title} - Sora Oya`, p.subtitle)
  });

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main>
        <section className="subhero">
          <div className="section-inner narrow">
            <p className="eyebrow">Portfolio</p>
            <h1>{p.title}</h1>
            <p>{p.subtitle}</p>
          </div>
        </section>
        <section className="content-section">
          <div className="section-inner project-grid">
            <ProjectCard
              image={assets.dashboard}
              title={p.relocationTitle}
              description={p.relocationDescription}
              tags={p.tags}
              href={`${base}/projects/nz-japan-relocation`}
              action={c.viewProject}
              featured={p.featured}
            />
            <ProjectCard
              image={assets.rentRadar}
              title={p.rentRadarTitle}
              description={p.rentRadarDescription}
              tags={p.rentTags}
              href={`${base}/projects/rent-radar`}
              action={c.viewProject}
            />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
