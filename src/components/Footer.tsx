import { assets, common, links, Locale } from '../lib/content';
import { localize } from '../lib/routes';
import { SocialLinks } from './SocialLinks';

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const t = common[locale];
  const nav = [
    { label: t.home, href: localize(locale) },
    { label: t.services, href: localize(locale, '/services') },
    { label: t.projects, href: localize(locale, '/projects') },
    { label: t.blog, href: localize(locale, '/blog') }
  ];
  const legal = [
    { label: t.privacy, href: localize(locale, '/privacy') },
    { label: t.terms, href: localize(locale, '/terms') },
    { label: t.disclaimer, href: localize(locale, '/disclaimer') },
    { label: t.contact, href: localize(locale, '/contact') }
  ];

  return (
    <footer className="site-footer">
      <div className="section-inner footer-grid">
        <div>
          <div className="footer-brand">
            <img className="footer-mark" src={assets.logoMark} alt="" loading="lazy" decoding="async" />
            <span>{t.name}</span>
          </div>
          <p>{t.siteTagline}</p>
        </div>
        <div>
          <h2>{t.navigation}</h2>
          <nav>
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h2>{t.legal}</h2>
          <nav>
            {legal.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="privacy-contact" href={links.privacyEmail}>
            {t.footerPrivacyOfficer}
          </a>
        </div>
        <div>
          <h2>{t.connect}</h2>
          <SocialLinks dark />
        </div>
      </div>
      <div className="section-inner footer-bottom">
        <p>© 2026 SoraJPNZ. All rights reserved.</p>
      </div>
    </footer>
  );
}
