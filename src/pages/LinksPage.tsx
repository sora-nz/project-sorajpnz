import { assets, common, linksPage, Locale, seo, socialLinks } from '../lib/content';
import { localize, swapLocale } from '../lib/routes';
import { pageJsonLd, useMeta } from '../lib/useMeta';

type LinksPageProps = {
  locale: Locale;
  path: string;
};

type SocialId = (typeof socialLinks)[number]['id'];

type LinkItem = {
  key: string;
  label: string;
  href: string;
  icon: string;
  external?: boolean;
  tone?: string;
  featured?: boolean;
  note?: string;
};

function channel(id: SocialId) {
  return socialLinks.find((item) => item.id === id && item.href && item.showOnLinks);
}

export function LinksPage({ locale, path }: LinksPageProps) {
  const l = linksPage[locale];
  const c = common[locale];
  const meta = seo[locale].links;
  const base = localize(locale);

  const youtube = channel('youtube');
  const instagram = channel('instagram');
  const tiktok = channel('tiktok');
  const facebook = channel('facebook');

  const items: LinkItem[] = [
    ...(youtube
      ? [
          {
            key: 'youtube',
            label: l.youtubeCta,
            href: youtube.href,
            icon: youtube.icon,
            external: true,
            tone: youtube.tone,
            featured: true,
            note: youtube.role[locale]
          }
        ]
      : []),
    {
      key: 'blog',
      label: l.blogCta,
      href: `${base}/blog`,
      icon: 'ri-article-line',
      note: l.secondaryNote
    },
    ...(instagram
      ? [
          {
            key: 'instagram',
            label: instagram.label,
            href: instagram.href,
            icon: instagram.icon,
            external: true,
            tone: instagram.tone,
            note: instagram.role[locale]
          }
        ]
      : []),
    ...(tiktok
      ? [
          {
            key: 'tiktok',
            label: tiktok.label,
            href: tiktok.href,
            icon: tiktok.icon,
            external: true,
            tone: tiktok.tone,
            note: tiktok.role[locale]
          }
        ]
      : []),
    {
      key: 'projects',
      label: l.projectsCta,
      href: `${base}/projects`,
      icon: 'ri-folder-chart-line',
      note: c.projects
    },
    {
      key: 'contact',
      label: l.contactCta,
      href: `${base}/contact`,
      icon: 'ri-mail-line',
      note: c.contact
    },
    ...(facebook
      ? [
          {
            key: 'facebook',
            label: facebook.label,
            href: facebook.href,
            icon: facebook.icon,
            external: true,
            tone: facebook.tone,
            note: facebook.role[locale]
          }
        ]
      : []),
    {
      key: 'services',
      label: l.servicesCta,
      href: `${base}/services`,
      icon: 'ri-service-line',
      note: l.servicesNote
    }
  ];

  useMeta({
    locale,
    path,
    title: meta.title,
    description: meta.description,
    image: assets.logoFull,
    noIndex: true,
    jsonLd: pageJsonLd(locale, path, meta.title, meta.description)
  });

  return (
    <div className="links-page">
      <main className="links-shell" aria-label={l.title}>
        <div className="links-topbar">
          <a className="links-home" href={base} aria-label="SoraJPNZ home">
            <img src={assets.logoMark} alt="" />
            <span>SoraJPNZ</span>
          </a>
          <a className="language-pill" href={swapLocale(path, locale === 'en' ? 'ja' : 'en')} aria-label={c.language}>
            <i className="ri-global-line" />
            <span>{locale === 'en' ? 'EN' : 'JA'}</span>
          </a>
        </div>

        <section className="links-profile">
          <img className="links-logo" src={assets.logoMark} alt="" />
          <p className="eyebrow">{l.eyebrow}</p>
          <h1>{l.title}</h1>
          <p>{l.intro}</p>
        </section>

        <div className="links-list">
          {items.map((item) => (
            <a
              className={`links-list-item ${item.featured ? 'featured' : ''} ${item.tone ?? ''}`}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              key={item.key}
            >
              <span className="links-item-icon" aria-hidden="true">
                <i className={item.icon} />
              </span>
              <span className="links-item-copy">
                <strong>{item.label}</strong>
                {item.note && <span>{item.note}</span>}
              </span>
              <i className={item.external ? 'ri-external-link-line' : 'ri-arrow-right-line'} aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="links-footer-note">{l.footer}</p>
      </main>
    </div>
  );
}
