import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Run after the production build. Browser rendering is checked separately.
const paths = [];
for (const locale of ['ja', 'en']) {
  for (const suffix of ['', '/blog', '/links', '/projects', '/projects/nz-japan-relocation', '/projects/rent-radar', '/services', '/contact', '/privacy', '/terms', '/disclaimer', '/tools/nz-life-reality-calculator']) {
    paths.push(`/${locale}${suffix}`);
  }
}
paths.push('/ja/blog/auckland-living-cost-hourly-wage');
const titles = new Set();
for (const path of paths) {
  const html = await readFile(`out${path}/index.html`, 'utf8');
  const noIndex = path.endsWith('/links') || path.includes('/tools/') || path === '/en/blog';
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
const headers = await readFile('public/_headers', 'utf8');
for (const locale of ['en', 'ja']) {
  assert.ok(headers.includes(`/${locale}/tools/nz-life-reality-calculator\n  X-Robots-Tag: noindex, follow`));
}
const css = await readFile('src/styles.css', 'utf8');
assert.match(css, /\.reveal-on-scroll\s*\{[^}]*opacity:\s*1;/, 'Observer cannot hide essential content');
assert.ok(css.includes('prefers-reduced-motion: reduce'));
console.log(`PASS: ${paths.length} static routes, page-specific SEO, index policy and visibility guardrails`);
