import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';

// Read the same self-contained content module used by the UI, without a second copy of SEO text.
const contentSource = await readFile(resolve('src/lib/content.ts'), 'utf8');
const contentJs = ts.transpileModule(contentSource, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { seo, assets, legal, aucklandLivingCostMeta } = await import(`data:text/javascript;base64,${Buffer.from(contentJs).toString('base64')}`);
const projectSource = await readFile(resolve('src/lib/calculatorProject.ts'), 'utf8');
const projectJs = ts.transpileModule(projectSource, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { calculatorProject } = await import(`data:text/javascript;base64,${Buffer.from(projectJs).toString('base64')}`);
const videoSource = await readFile(resolve('src/lib/videos.ts'), 'utf8');
const videoJs = ts.transpileModule(videoSource, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { surfcastingVideo, videoNoteMeta } = await import(`data:text/javascript;base64,${Buffer.from(videoJs).toString('base64')}`);

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

routes.forEach((route) => { route.noIndex = true; });
const pagePaths = { home: '', services: '/services', projects: '/projects', relocation: '/projects/nz-japan-relocation', rentRadar: '/projects/rent-radar', blog: '/blog', links: '/links', contact: '/contact' };
for (const locale of ['en', 'ja']) {
  routes.push({ locale, path: `/${locale}/projects/nz-life-reality-calculator`, ...calculatorProject[locale].meta,
    image: locale === 'ja' ? assets.calculatorJa : assets.calculator, imageAlt: calculatorProject[locale].previewAlt });
  for (const [key, suffix] of Object.entries(pagePaths)) {
    const image = key === 'projects' || key === 'relocation' ? assets.dashboard
      : key === 'rentRadar' ? assets.rentRadar
      : key === 'blog' ? assets.westCoastRocks : assets.aucklandHarbour;
    routes.push({ locale, path: `/${locale}${suffix}`, ...seo[locale][key], image,
      imageAlt: seo[locale][key].title,
      noIndex: key === 'links' || (key === 'blog' && locale === 'en'),
      alternates: key !== 'blog',
      preload: key === 'home' ? assets.aucklandHarbour : undefined });
  }
  for (const [kind, translations] of Object.entries(legal)) {
    const copy = translations[locale];
    routes.push({ locale, path: `/${locale}/${kind}`, title: `${copy.title} - SoraJPNZ`,
      description: copy.body, image: assets.logoFull, imageAlt: 'SoraJPNZ' });
  }
}
routes.push({ locale: 'ja', ...aucklandLivingCostMeta, title: `${aucklandLivingCostMeta.title} | SoraJPNZ`,
  image: assets.aucklandHarbour, imageAlt: 'Auckland', alternates: false });
routes.push({ locale: 'ja', ...videoNoteMeta, title: `${videoNoteMeta.title} | SoraJPNZ Notes`,
  image: surfcastingVideo.thumbnail, imageAlt: surfcastingVideo.ja.imageAlt, alternates: false });

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
  html = replaceMeta(html, 'name', 'robots', route.noIndex ? 'noindex, follow' : 'index, follow');
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
  if (route.alternates === false) html = html.replace(/<link\s+rel="alternate"[^>]*>\s*/g, '');
  html = replaceRequired(
    html,
    /<link rel="preload" as="image" href="[^"]*" fetchpriority="high" \/>/,
    route.preload ? `<link rel="preload" as="image" href="${escapeAttribute(route.preload)}" fetchpriority="high" />` : '',
    'hero preload'
  );
  html = replaceRequired(html, /<title>[^<]*<\/title>/, `<title>${escapeAttribute(route.title)}</title>`, 'document title');

  return html;
}

for (const route of routes) {
  const routeDirectory = resolve(outputDirectory, route.path.slice(1));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(resolve(routeDirectory, 'index.html'), renderRouteHtml(route));
}
