import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ProjectCard } from '../components/ProjectCard';
import { assets, common, home, links, Locale, projects, seo, socialLinks } from '../lib/content';
import { localize } from '../lib/routes';
import { getDefaultLivingWageReference } from '../lib/nzLifeRealityCalculator';
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
  const primaryRel = h.primaryExternal ? 'noopener noreferrer' : undefined;
  const defaultLivingWageReference = getDefaultLivingWageReference();
  const defaultLivingWage = `$${defaultLivingWageReference.value.toFixed(2)}`;

  useReveal(`${locale}:${path}`);
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
          <div className="motion-layer" aria-hidden="true">
            <img className="motion-image animate-hero-pan" src={assets.hero} alt="" fetchPriority="high" decoding="async" />
            <div className="image-wash" />
          </div>
          <div className="section-inner hero-inner">
            <div className="hero-copy animate-slide-up">
              <p className="eyebrow">AUCKLAND, NEW ZEALAND</p>
              <h1>{h.title}</h1>
              {h.role && <p className="role">{h.role}</p>}
              <p className="hero-tagline">{h.tagline}</p>
              <p className="hero-description">{h.description}</p>
              <div className="button-row">
                <a className="button primary" href={h.primaryHref} target={h.primaryExternal ? '_blank' : undefined} rel={primaryRel}>
                  <span>{h.primaryCta}</span>
                  <i className={h.primaryIcon} />
                </a>
                <a className="button secondary" href={h.contactHref}>
                  <span>{h.contactCta}</span>
                  <i className={h.contactIcon} />
                </a>
              </div>
            </div>
            <div className="hero-proof-panel" aria-label={locale === 'ja' ? 'SoraJPNZで使える入口' : 'SoraJPNZ entry points'}>
              <article className="hero-proof-card calculator-proof-card">
                <span className="proof-label">{locale === 'ja' ? '表示例' : 'Example'}</span>
                <strong>{locale === 'ja' ? '月の余白を見る' : 'Check monthly room'}</strong>
                <div className="proof-metrics" aria-hidden="true">
                  <span>
                    <small>{locale === 'ja' ? '時給例' : 'Example wage'}</small>
                    <b>{defaultLivingWage}</b>
                  </span>
                  <span>
                    <small>{locale === 'ja' ? '家賃' : 'Rent'}</small>
                    <b>$320/w</b>
                  </span>
                  <span>
                    <small>{locale === 'ja' ? '月の残り' : 'Left monthly'}</small>
                    <b>$1,440</b>
                  </span>
                </div>
                <p>{locale === 'ja' ? 'NZD / 約¥参考表示つき' : 'NZD / approximate JPY reference'}</p>
              </article>

              <a className="hero-proof-card notes-proof-card" href={`${base}/blog`}>
                <span className="proof-label">Notes</span>
                <strong>{locale === 'ja' ? '生活費・仕事・お金のメモ' : 'Life, work, and money notes'}</strong>
                <p>{locale === 'ja' ? '読んで考え直せる形に整理。' : 'Organized so the ideas can be revisited.'}</p>
              </a>

              <figure className="hero-proof-photo">
                <img src={assets.blogOceanFloat} alt="" loading="lazy" decoding="async" />
                <figcaption>{locale === 'ja' ? 'Aucklandの海も、生活の文脈として。' : 'Auckland ocean life as lived context.'}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="content-section services-section home-entry-section">
          <div className="section-inner">
            <div className="section-heading reveal-on-scroll">
              <p className="eyebrow">{h.servicesEyebrow}</p>
              <h2>{h.servicesTitle}</h2>
              <p>{h.servicesSubtitle}</p>
            </div>
            <div className="service-grid">
              {h.services.map((service) => (
                <a
                  className={`service-card home-entry-card reveal-on-scroll ${'image' in service ? 'has-image' : ''}`}
                  href={service.href}
                  key={service.title}
                >
                  {'image' in service && (
                    <span className="service-card-media" aria-hidden="true">
                      <img src={service.image} alt="" loading="lazy" decoding="async" />
                    </span>
                  )}
                  <span className="service-icon" aria-hidden="true">
                    <i className={service.icon} />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  <span className="service-card-action">
                    {service.cta}
                    <i className="ri-arrow-right-line" />
                  </span>
                </a>
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

        {featuredTool && (
          <section className="content-section home-tool-section" aria-labelledby="home-featured-tool-title">
            <div className="section-inner">
              <article className="home-tool-card">
                <div className="home-tool-copy">
                  <p className="eyebrow">{featuredTool.eyebrow}</p>
                  <h2 id="home-featured-tool-title">{featuredTool.title}</h2>
                  <p>{featuredTool.body}</p>
                  <p className="home-tool-disclaimer">{featuredTool.disclaimer}</p>
                  <a className="button primary" href={featuredTool.href}>
                    <span>{featuredTool.cta}</span>
                    <i className="ri-calculator-line" />
                  </a>
                </div>
                <div className="calculator-preview-card" aria-hidden="true">
                  <div className="calculator-preview-top">
                    <span className="calculator-preview-sample-label">{locale === 'ja' ? '表示例' : 'Example'}</span>
                    <span>NZD / JPY ref.</span>
                  </div>
                  <div className="calculator-preview-row">
                    <small>{locale === 'ja' ? '時給例' : 'Example wage'}</small>
                    <strong>{defaultLivingWage}</strong>
                  </div>
                  <div className="calculator-preview-row">
                    <small>{locale === 'ja' ? '家賃' : 'Rent'}</small>
                    <strong>$320/w</strong>
                  </div>
                  <div className="calculator-preview-row">
                    <small>{locale === 'ja' ? '車コスト' : 'Car costs'}</small>
                    <strong>$420/mo</strong>
                  </div>
                  <div className="calculator-preview-result">
                    <small>{locale === 'ja' ? '月の残り' : 'Monthly room'}</small>
                    <strong>$1,440</strong>
                    <span>{locale === 'ja' ? '約¥129,600' : 'approx. ¥129,600'}</span>
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}

        <section className="content-section trust-section">
          <div className="section-inner">
            <div className="section-heading reveal-on-scroll">
              <p className="eyebrow">{h.trustEyebrow}</p>
              <h2>{h.trustTitle}</h2>
            </div>
            <div className="trust-grid">
              {h.trustItems.map((item) => (
                <article className="trust-card reveal-on-scroll" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section projects-proof-section">
          <div className="section-inner">
            <div className="section-heading reveal-on-scroll">
              <p className="eyebrow">{h.projectsEyebrow}</p>
              <h2>{h.projectsTitle}</h2>
              <p>{h.projectsIntro}</p>
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
            <div className="button-row soft-link-row">
              <a className="button secondary small" href={`${base}/projects`}>
                <span>{h.projectsCta}</span>
                <i className="ri-arrow-right-line" />
              </a>
            </div>
          </div>
        </section>

        <section className="content-section field-notes-section">
          <div className="section-inner field-notes-inner">
            <figure className="field-notes-photo reveal-on-scroll">
              <img src={assets.blogOceanFloat} alt="" loading="lazy" decoding="async" />
            </figure>
            <div className="field-notes-copy reveal-on-scroll">
              <p className="eyebrow">{h.fieldNotesEyebrow}</p>
              <h2>{h.fieldNotesTitle}</h2>
              <p>{h.fieldNotesBody}</p>
              <a className="button secondary small" href={`${base}/blog`}>
                <span>{h.fieldNotesCta}</span>
                <i className="ri-arrow-right-line" />
              </a>
            </div>
          </div>
        </section>

        <section className="content-section social-channel-section home-social-section">
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

        <section className="content-section profile-band home-about-section">
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
