import { useState } from 'react';
import { assets, common, Locale } from '../lib/content';
import { localize, routeKey, swapLocale } from '../lib/routes';
import { SocialLinks } from './SocialLinks';

type HeaderProps = {
  locale: Locale;
  path: string;
};

export function Header({ locale, path }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const t = common[locale];
  const base = routeKey(path);
  const nav = [
    { label: t.home, href: localize(locale), match: '/' },
    { label: t.projects, href: localize(locale, '/projects'), match: '/projects' },
    { label: t.blog, href: localize(locale, '/blog'), match: '/blog' }
  ];

  return (
    <header className="site-header">
      <div className="header-shell">
        <a href={localize(locale)} className="brand" aria-label="SoraJPNZ home">
          <img src={assets.logoMark} alt="" />
          <span>{t.name}</span>
        </a>

        <nav className="desktop-nav" aria-label={t.navigation}>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={base === item.match || (item.match !== '/' && base.startsWith(item.match)) ? 'active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <SocialLinks compact />
          <a className="language-pill" href={swapLocale(path, locale === 'en' ? 'ja' : 'en')} aria-label={t.language}>
            <i className="ri-global-line" />
            <span>{locale === 'en' ? 'EN' : 'JA'}</span>
          </a>
        </div>

        <button className="menu-button" type="button" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          <i className={open ? 'ri-close-line' : 'ri-menu-line'} />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <div className="mobile-menu-bottom">
            <SocialLinks compact />
            <a className="language-pill" href={swapLocale(path, locale === 'en' ? 'ja' : 'en')}>
              <i className="ri-global-line" />
              <span>{locale === 'en' ? 'EN' : 'JA'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
