import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const siteUrl = 'https://sorajpnz.com';
const outputDirectory = resolve('out');
const sourceHtml = await readFile(resolve(outputDirectory, 'index.html'), 'utf8');

const routes = [
  {
    locale: 'en',
    path: '/en/tools/nz-life-reality-calculator',
    title: 'NZ Life Reality Calculator | SoraJPNZ',
    description:
      'Test how wage, work hours, rent, car costs, savings goals, and an emergency buffer affect the realism of a New Zealand living setup.',
    image: '/assets/nz-life-reality-calculator.png',
    imageAlt: 'NZ Life Reality Calculator preview'
  },
  {
    locale: 'ja',
    path: '/ja/tools/nz-life-reality-calculator',
    title: 'NZ生活リアリティ計算機 | SoraJPNZ',
    description:
      '時給、勤務時間、家賃、車コスト、貯金目標を動かしながら、NZ生活の現実感と脆さを確認するSoraJPNZの試算ツールです。',
    image: '/assets/nz-life-reality-calculator-ja.png',
    imageAlt: 'NZ生活リアリティ計算機のプレビュー'
  }
];

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`Could not find ${label} in the built index.html`);
  }

  return html.replace(pattern, replacement);
}

function replaceMeta(html, attribute, name, content) {
  const pattern = new RegExp(`<meta\\s+(?=[^>]*${attribute}="${name}")[^>]*>`, 'm');
  return replaceRequired(
    html,
    pattern,
    `<meta ${attribute}="${name}" content="${escapeAttribute(content)}" />`,
    `${attribute}=${name}`
  );
}

function replaceLink(html, rel, href, hreflang) {
  const languagePart = hreflang ? ` hreflang="${hreflang}"` : '';
  const languageMatch = hreflang ? `(?=[^>]*hreflang="${hreflang}")` : '';
  const pattern = new RegExp(`<link\\s+(?=[^>]*rel="${rel}")${languageMatch}[^>]*>`, 'm');
  return replaceRequired(
    html,
    pattern,
    `<link rel="${rel}"${languagePart} href="${escapeAttribute(href)}" />`,
    `${rel}${hreflang ? `:${hreflang}` : ''}`
  );
}

function renderRouteHtml(route) {
  const canonicalUrl = `${siteUrl}${route.path}`;
  const alternatePath = route.path.replace(/^\/(en|ja)/, '');
  const imageUrl = `${siteUrl}${route.image}`;
  let html = sourceHtml;

  html = replaceRequired(html, /<html lang="[^"]*">/, `<html lang="${route.locale}">`, 'html language');
  html = replaceMeta(html, 'name', 'description', route.description);
  html = replaceMeta(html, 'name', 'robots', 'noindex, follow');
  html = replaceMeta(html, 'property', 'og:title', route.title);
  html = replaceMeta(html, 'property', 'og:description', route.description);
  html = replaceMeta(html, 'property', 'og:url', canonicalUrl);
  html = replaceMeta(html, 'property', 'og:image', imageUrl);
  html = replaceMeta(html, 'property', 'og:image:alt', route.imageAlt);
  html = replaceMeta(html, 'name', 'twitter:title', route.title);
  html = replaceMeta(html, 'name', 'twitter:description', route.description);
  html = replaceMeta(html, 'name', 'twitter:image', imageUrl);
  html = replaceMeta(html, 'name', 'twitter:image:alt', route.imageAlt);
  html = replaceLink(html, 'canonical', canonicalUrl);
  html = replaceLink(html, 'alternate', `${siteUrl}/en${alternatePath}`, 'en');
  html = replaceLink(html, 'alternate', `${siteUrl}/ja${alternatePath}`, 'ja');
  html = replaceLink(html, 'alternate', `${siteUrl}/en${alternatePath}`, 'x-default');
  html = replaceRequired(
    html,
    /<link rel="preload" as="image" href="[^"]*" fetchpriority="high" \/>/,
    '<link rel="preload" as="image" href="/assets/homepage2.jpg" fetchpriority="high" />',
    'hero preload'
  );
  html = replaceRequired(html, /<title>[^<]*<\/title>/, `<title>${route.title}</title>`, 'document title');

  return html;
}

for (const route of routes) {
  const routeDirectory = resolve(outputDirectory, route.path.slice(1));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(resolve(routeDirectory, 'index.html'), renderRouteHtml(route));
}
