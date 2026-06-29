import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ProjectCard } from '../components/ProjectCard';
import { assets, common, home, links, Locale, projects, seo, socialLinks } from '../lib/content';
import { localize } from '../lib/routes';
import { pageJsonLd, useMeta } from '../lib/useMeta';
import { useReveal } from '../lib/useReveal';

type HomeProps = {
  locale: Locale;
  path: string;
};

export function Home({ locale, path }: HomeProps) {
  const h = home[locale];
  const c = common[locale];
  const p = projects[locale];
  const meta = seo[locale].home;
  const base = localize(locale);
  const visibleSocialChannels = socialLinks.filter((channel) => channel.href && channel.showOnHome);
  const primarySocial = visibleSocialChannels.find((channel) => channel.id === 'youtube');
  const secondarySocial = visibleSocialChannels.filter((channel) => channel.id !== 'youtube');
  const featuredTool = h.featuredTool;

  useReveal();
  useMeta({
    locale,
    path,
    title: meta.title,
    description: meta.description,
    image: assets.hero,
    jsonLd: pageJsonLd(locale, path, meta.title, meta.description)
  });

  return (
    <div className="page">
      <Header locale={locale} path={path} />
      <main>
        <section className="hero-section">
          <div className="motion-layer">
            <img className="motion-image animate-hero-pan" src={assets.hero} alt="" fetchPriority="high" decoding="async" />
            <div className="image-wash" />
          </div>
          <div className="section-inner hero-inner">
            <div className="hero-copy animate-slide-up">
              <p className="eyebrow">Auckland, New Zealand</p>
              <h1>{h.title}</h1>
              <p className="role">{h.role}</p>
              <p className="hero-tagline">{h.tagline}</p>
              <p className="hero-description">{h.description}</p>
              <div className="button-row">
                <a className="button primary" href={links.youtube} target="_blank" rel="noopener noreferrer">
                  <span>{h.primaryCta}</span>
                  <i className="ri-youtube-fill" />
                </a>
                <a className="button secondary" href={`${base}/blog`}>
                  <span>{h.contactCta}</span>
                  <i className="ri-article-line" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section social-channel-section">
          <div className="section-inner social-channel-layout">
            <div className="section-heading social-channel-heading reveal-on-scroll">
              <p className="eyebrow">{h.socialEyebrow}</p>
              <h2>{h.socialTitle}</h2>
              <p>{h.socialSubtitle}</p>
              <a className="button secondary small" href={`${base}/links`}>
                <span>{h.allLinksCta}</span>
                <i className="ri-links-line" />
              </a>
            </div>

            <div className="social-channel-cards">
              {primarySocial && (
                <a
                  className={`social-primary-card ${primarySocial.tone} reveal-on-scroll`}
                  href={primarySocial.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="social-card-label">{h.socialPrimaryLabel}</span>
                  <span className="social-card-icon" aria-hidden="true">
                    <i className={primarySocial.icon} />
                  </span>
                  <strong>{primarySocial.label}</strong>
                  <span>{primarySocial.role[locale]}</span>
                </a>
              )}

              <div className="social-card-grid">
                {secondarySocial.map((channel) => (
                  <a
                    className={`social-mini-card ${channel.tone} reveal-on-scroll`}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={channel.id}
                  >
                    <span className="social-card-icon" aria-hidden="true">
                      <i className={channel.icon} />
                    </span>
                    <strong>{channel.label}</strong>
                    <span>{channel.role[locale]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {featuredTool && (
          <section className="content-section home-tool-section" aria-labelledby="home-featured-tool-title">
            <div className="section-inner">
              <article className="home-tool-card reveal-on-scroll">
                <div className="home-tool-copy">
                  <p className="eyebrow">{featuredTool.eyebrow}</p>
                  <h2 id="home-featured-tool-title">{featuredTool.title}</h2>
                  <p>{featuredTool.body}</p>
                  <p className="home-tool-disclaimer">{featuredTool.disclaimer}</p>
                </div>
                <a className="button primary" href={featuredTool.href}>
                  <span>{featuredTool.cta}</span>
                  <i className="ri-calculator-line" />
                </a>
              </article>
            </div>
          </section>
        )}

        <section className="content-section services-section">
          <div className="section-inner">
            <div className="section-heading reveal-on-scroll">
              <p className="eyebrow">{h.servicesEyebrow}</p>
              <h2>{h.servicesTitle}</h2>
              <p>{h.servicesSubtitle}</p>
            </div>
            <div className="service-grid">
              {h.services.map((service) => (
                <article className="service-card reveal-on-scroll" key={service.title}>
                  <span className="service-icon" aria-hidden="true">
                    <i className={service.icon} />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </article>
              ))}
            </div>
            <div className="button-row soft-link-row">
              <a className="button secondary small" href={`${base}/services`}>
                <span>{h.servicesCta}</span>
                <i className="ri-arrow-right-line" />
              </a>
            </div>
          </div>
        </section>

        <section className="image-band">
          <div className="motion-layer">
            <img className="motion-image animate-projects-drift" src={assets.projectsBg} alt="" loading="lazy" decoding="async" />
            <div className="image-wash stronger" />
          </div>
          <div className="section-inner">
            <div className="section-heading reveal-on-scroll">
              <p className="eyebrow">{locale === 'ja' ? 'Selected Work' : 'Selected Work'}</p>
              <h2>{h.projectsTitle}</h2>
            </div>
            <div className="project-grid">
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
          </div>
        </section>

        <section className="image-band profile-band">
          <div className="motion-layer">
            <img className="motion-image animate-about-drift" src={assets.profileBg} alt="" loading="lazy" decoding="async" />
            <div className="image-wash" />
          </div>
          <div className="section-inner split-grid">
            <div className="info-panel reveal-on-scroll">
              <img className="profile-image" src={assets.avatar} alt={locale === 'ja' ? '大谷 空' : 'Sora Oya'} loading="lazy" decoding="async" />
              <p className="eyebrow">Profile</p>
              <h2>{h.aboutTitle}</h2>
              <p>{h.about}</p>
              <div className="button-row left profile-social-row">
                <a className="icon-button linkedin" href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="ri-linkedin-fill" />
                </a>
                <a className="icon-button github" href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="ri-github-fill" />
                </a>
                <a className="icon-button youtube" href={links.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <i className="ri-youtube-fill" />
                </a>
              </div>
            </div>
            <div className="info-panel reveal-on-scroll">
              <p className="eyebrow">Contact</p>
              <h2>{h.contactTitle}</h2>
              <p>{h.contact}</p>
              <a className="button primary" href={links.email}>
                <span>{c.emailMe}</span>
                <i className="ri-mail-line" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
