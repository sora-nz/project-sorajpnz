import { useEffect } from 'react';
import { Locale, siteUrl, socialLinks } from './content';

type MetaConfig = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  alternates?: boolean;
  jsonLd?: unknown;
};

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let node = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attr, name);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
}

function setLink(rel: string, href: string, extra?: Record<string, string>) {
  const selector = extra?.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]`;
  let node = document.querySelector<HTMLLinkElement>(selector);
  if (!node) {
    node = document.createElement('link');
    node.setAttribute('rel', rel);
    document.head.appendChild(node);
  }
  node.setAttribute('href', href);
  Object.entries(extra ?? {}).forEach(([key, value]) => node?.setAttribute(key, value));
}

export function canonicalizePath(path: string) {
  const clean = path.replace(/\/$/, '') || '/';
  if (clean === '/') return '/en';
  if (/^\/(en|ja)\/project$/.test(clean)) {
    return clean.replace('/project', '/projects/rent-radar');
  }
  if (/^\/(en|ja)\/project-relocation$/.test(clean)) {
    return clean.replace('/project-relocation', '/projects/nz-japan-relocation');
  }
  if (!clean.startsWith('/en') && !clean.startsWith('/ja')) return `/en${clean}`;
  return clean;
}

function clearAlternateLinks() {
  document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
}

export function useMeta({ locale, path, title, description, image, noIndex = false, alternates = true, jsonLd }: MetaConfig) {
  useEffect(() => {
    const canonicalPath = canonicalizePath(path);
    const canonicalUrl = `${siteUrl}${canonicalPath}`;
    const alternatePath = canonicalPath.replace(/^\/(en|ja)/, '');
    const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/assets/homepage1.jpg`;

    document.documentElement.lang = locale;
    document.title = title;
    setMeta('description', description);
    setMeta('robots', noIndex ? 'noindex, follow' : 'index, follow');
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:locale', locale === 'ja' ? 'ja_JP' : 'en_NZ', true);
    setMeta('og:image', imageUrl, true);
    setMeta('og:image:alt', `${title} preview`, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', imageUrl);
    setMeta('twitter:image:alt', `${title} preview`);
    setLink('canonical', canonicalUrl);
    clearAlternateLinks();
    if (alternates) {
      setLink('alternate', `${siteUrl}/en${alternatePath}`, { hreflang: 'en' });
      setLink('alternate', `${siteUrl}/ja${alternatePath}`, { hreflang: 'ja' });
      setLink('alternate', `${siteUrl}/en${alternatePath}`, { hreflang: 'x-default' });
    }

    document.querySelectorAll('script[data-managed-jsonld="true"]').forEach((node) => node.remove());
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.managedJsonld = 'true';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [alternates, description, image, jsonLd, locale, noIndex, path, title]);
}

export function pageJsonLd(locale: Locale, path: string, title: string, description: string) {
  const canonicalUrl = `${siteUrl}${canonicalizePath(path)}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'SoraJPNZ',
        url: siteUrl,
        description,
        inLanguage: locale,
        author: { '@type': 'Person', name: 'Sora Oya' }
      },
      {
        '@type': 'Person',
        name: 'Sora Oya',
        jobTitle: 'Data & Business Analyst',
        description,
        url: siteUrl,
        email: 'contact@sorajpnz.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Auckland',
          addressCountry: 'NZ'
        },
        sameAs: [
          'https://www.linkedin.com/in/soraoya/',
          'https://github.com/sora-nz',
          ...socialLinks.filter((item) => item.href).map((item) => item.href)
        ]
      },
      {
        '@type': 'WebPage',
        name: title,
        url: canonicalUrl,
        description,
        inLanguage: locale,
        isPartOf: { '@type': 'WebSite', name: 'SoraJPNZ', url: siteUrl }
      }
    ]
  };
}
