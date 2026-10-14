import { assets, common, links, linksPage, Locale, seo, socialLinks } from '../lib/content';
import { localize, swapLocale } from '../lib/routes';
import { pageJsonLd, useMeta } from '../lib/useMeta';
import './LinksPage.css';

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
  const items: LinkItem[] = [
    ...(youtube
      ? [
          {
            key: 'youtube',
            label: l.youtubeCta,
            href: youtube.href,
            icon: youtube.icon,
            external: true,
            featured: true,
            note: youtube.role[locale]
          }
        ]
      : []),
    {
      key: 'calculator',
      label: l.calculatorCta,
      href: `${base}/tools/nz-life-reality-calculator`,
      icon: 'ri-calculator-line',
      note: l.calculatorNote
    },
    {
      key: 'blog',
      label: l.blogCta,
      href: `${base}/blog`,
      icon: 'ri-article-line',
      note: l.blogNote
    },
    {
      key: 'projects',
      label: l.projectsCta,
      href: `${base}/projects`,
      icon: 'ri-folder-chart-line',
      note: l.projectsNote
    }
  ];

  const socials: LinkItem[] = socialLinks
    .filter((item) => item.id !== 'youtube' && item.showOnLinks && item.href)
    .map((item) => ({ key: item.id, label: item.label, href: item.href, icon: item.icon, external: true, note: item.role[locale] }));

  function renderLink(item: LinkItem) {
    return (
      <li key={item.key}>
        <a className={`links-list-item${item.featured ? ' featured' : ''}`} href={item.href}
          target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined}>
          <span className="links-item-icon" aria-hidden="true"><i className={item.icon} /></span>
          <span className="links-item-copy"><strong>{item.label}</strong>{item.note && <span>{item.note}</span>}</span>
          <i className={item.external ? 'ri-external-link-line' : 'ri-arrow-right-line'} aria-hidden="true" />
        </a>
      </li>
    );
  }

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
    <div className="links-page content-pages links-refresh">
      <main className="links-shell" aria-label={l.title}>
        <div className="links-topbar">
          <a className="links-home" href={base} aria-label="SoraJPNZ home">
            <img src={assets.logoMark} alt="" />
            <span>SoraJPNZ</span>
          </a>
          <a className="language-pill" href={swapLocale(path, locale === 'en' ? 'ja' : 'en')} aria-label={locale === 'ja' ? 'Switch to English' : '日本語に切り替える'}>
            <i className="ri-global-line" aria-hidden="true" />
            <span>{locale === 'ja' ? 'English' : 'Japanese'}</span>
          </a>
        </div>

        <section className="links-profile">
          <div className="links-identity">
            <img src={assets.blogTaranaki} alt={locale === 'ja' ? 'NZの遊歩道で撮ったSoraとThea' : 'Sora and Thea on a walking track in New Zealand'} width="768" height="1024" decoding="async" />
            <div><p className="eyebrow">{l.eyebrow}</p><h1>{l.title}</h1></div>
          </div>
          <p>{l.intro}</p>
        </section>

        <ul className="links-list">{items.map(renderLink)}</ul>

        <section className="links-social-section" aria-labelledby="links-social-title">
          <h2 id="links-social-title">{l.socialTitle}</h2>
          <ul className="links-list">{socials.map(renderLink)}</ul>
        </section>
        <ul className="links-list links-contact-row">{renderLink({ key: 'contact', label: l.contactCta, href: `${base}/contact`, icon: 'ri-mail-line', note: l.contactNote })}</ul>
        <a className="links-support" href={links.support} target="_blank" rel="noopener noreferrer">
          <i className="ri-cup-line" aria-hidden="true" />
          <span>{locale === 'ja' ? '動画やツール作りを応援する' : 'Support my videos and tools'}<small>Buy Me a Coffee</small></span>
          <i className="ri-external-link-line" aria-hidden="true" />
        </a>
        <footer className="links-bottom">
          <a href={base}>{c.home}<i className="ri-arrow-right-line" aria-hidden="true" /></a>
          <a href={`${base}/privacy`}>{c.privacy}</a>
        </footer>
      </main>
    </div>
  );
}
