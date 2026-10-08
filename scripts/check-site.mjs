import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Run after the production build. Browser rendering is checked separately.
const paths = [];
for (const locale of ['ja', 'en']) {
  for (const suffix of ['', '/blog', '/links', '/projects', '/projects/nz-life-reality-calculator', '/projects/nz-japan-relocation', '/projects/rent-radar', '/services', '/contact', '/privacy', '/terms', '/disclaimer', '/tools/nz-life-reality-calculator']) {
    paths.push(`/${locale}${suffix}`);
  }
}
paths.push('/ja/blog/auckland-living-cost-hourly-wage');
paths.push('/ja/blog/first-surfcasting-nz');
const titles = new Set();
for (const path of paths) {
  const html = await readFile(`out${path}/index.html`, 'utf8');
  const noIndex = path.endsWith('/links') || path.includes('/tools/') || path === '/en/blog' || path === '/ja/blog/first-surfcasting-nz';
  assert.ok(html.includes(`content="${noIndex ? 'noindex' : 'index'}, follow"`), `${path}: robots`);
  assert.ok(html.includes(`<link rel="canonical" href="https://sorajpnz.com${path}"`), `${path}: canonical`);
  assert.ok(html.includes(`<meta property="og:url" content="https://sorajpnz.com${path}"`), `${path}: social URL`);
  assert.ok(html.includes(`<html lang="${path.slice(1, 3)}">`), `${path}: language`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title, `${path}: title`);
  titles.add(title);
  if (path.includes('/blog')) assert.ok(!html.includes('hreflang='), `${path}: no nonexistent translated article`);
  if (path !== '/ja' && path !== '/en') assert.ok(!html.includes('rel="preload" as="image"'), `${path}: no unnecessary hero preload`);
  assert.ok(html.includes('type="module"'), `${path}: application bundle preserved`);
}
assert.ok(titles.size >= 23, 'Expected page-specific titles, not duplicated home metadata');
const sitemap = await readFile('public/sitemap.xml', 'utf8');
assert.ok(!sitemap.includes('/tools/nz-life-reality-calculator'), 'Calculator stays out of sitemap');
assert.ok(!sitemap.includes('auckland-shore-fishing'), 'Private draft stays out of sitemap');
assert.ok(sitemap.includes('/ja/blog/auckland-living-cost-hourly-wage'), 'Existing published note stays included');
assert.ok(!sitemap.includes('/blog/first-surfcasting-nz'), 'New video note waits for review before indexing');
for (const locale of ['ja', 'en']) assert.ok(sitemap.includes(`/${locale}/projects/nz-life-reality-calculator`));
const headers = await readFile('public/_headers', 'utf8');
assert.ok(headers.includes('/ja/blog/first-surfcasting-nz\n  X-Robots-Tag: noindex, follow'));
for (const locale of ['en', 'ja']) {
  assert.ok(headers.includes(`/${locale}/tools/nz-life-reality-calculator\n  X-Robots-Tag: noindex, follow`));
}
const css = await readFile('src/styles.css', 'utf8');
assert.match(css, /\.reveal-on-scroll\s*\{[^}]*opacity:\s*1;/, 'Observer cannot hide essential content');
assert.ok(css.includes('prefers-reduced-motion: reduce'));
const home = await readFile('src/pages/Home.tsx', 'utf8');
assert.ok(!home.includes('reveal-on-scroll') && !home.includes('useReveal'), 'Home is visible independently of observer state');
assert.ok(home.includes('wayfinding-home') && home.includes('assets.aucklandHarbour'), 'Selected Home motif uses the real harbour image');
for (const locale of ['ja', 'en']) {
  const html = await readFile(`out/${locale}/index.html`, 'utf8');
  assert.ok(html.includes('rel="preload" as="image" href="/assets/home/auckland-harbour-view.jpg"'), 'Home preloads its actual hero');
  assert.ok(!html.includes('/assets/homepage1.jpg'), 'Home does not preload a retired hero');
}
const content = await readFile('src/lib/content.ts', 'utf8');
for (const match of content.matchAll(/footerPrivacyOfficer: '([^']+)'/g)) {
  assert.ok(match[1].includes('privacy@sorajpnz.com'), 'Privacy email remains available');
  assert.ok(!match[1].includes('Sora Oya'), 'Privacy contact does not display a personal name');
}
assert.ok(content.includes('NZで暮らす国際カップルの日常、釣り、スピアフィッシング'));
assert.ok(content.includes('Everyday life as an international couple in New Zealand'));
for (const file of ['src/pages/Home.tsx', 'src/pages/Projects.tsx', 'src/components/Footer.tsx']) {
  const source = await readFile(file, 'utf8');
  assert.ok(!source.includes('/services'), `${file}: no service promotion`);
}
const services = await readFile('src/pages/Services.tsx', 'utf8');
assert.ok(!services.includes('servicePilot') && !services.includes('NZ$650'), 'Service offer removed');
assert.ok(content.includes('現在、個別の制作サービスは募集していません。'));
console.log(`PASS: ${paths.length} static routes, page-specific SEO, index policy and visibility guardrails`);
console.log('PASS: privacy contact, bilingual YouTube copy and deferred-service guardrails');
