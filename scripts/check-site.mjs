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
assert.ok(home.includes('home-index') && home.includes('assets.aucklandHarbour'), 'Selected Home motif uses the real harbour image');
assert.ok(home.includes('useRecentVideos(homeVideoFallback)') && home.includes('index-video-list'), 'Home supports ongoing channel uploads');
const homeCss = await readFile('src/pages/Home.css', 'utf8');
assert.ok(home.includes("isJapanese ? ' index-hero-copy-japanese' : ''"), 'Selected type treatment is scoped to Japanese Home');
assert.ok(home.includes('index-hero-address">あなたへ。'), 'Personal address stays within the single Home heading');
assert.ok(home.indexOf('<div className="index-feed">') < home.indexOf('<aside className="index-sidebar"'), 'Primary Home content precedes the long sidebar on mobile');
for (const text of ['海外生活に憧れや', '不安を抱えている', 'そんな方たちの、', 'ちょっとした支えになるものを届けたい。', 'NZ生活8年目。実体験をもとに、ニュージーランドの日常をシェアしています。', 'これまでの長い海外生活から、日本人として感じたことを、少し深掘りした視点から。']) {
  assert.ok(home.includes(text), `Japanese hero preserves approved copy: ${text}`);
}
assert.match(homeCss, /\.index-hero-copy-japanese h1[^{}]*\{[^}]*font-family: 'Zen Maru Gothic'/, 'Selected Japanese typeface does not change the site-wide font');
assert.match(homeCss, /\.index-hero-copy-japanese h1 > \.index-hero-address\s*\{[^}]*color: var\(--index-green\)/, 'Personal address has a distinct green hierarchy');
assert.match(homeCss, /\.index-feed,\s*\.index-sidebar\s*\{\s*grid-column: auto; grid-row: auto;/, 'Mobile Home follows the content-first DOM order');
for (const weight of ['medium', 'bold']) {
  const font = await readFile(`public/assets/fonts/zen-maru-gothic/hero-${weight}.woff2`);
  assert.equal(font.subarray(0, 4).toString(), 'wOF2', 'Local hero font is a real WOFF2 asset');
  assert.ok(font.length < 15000, 'Japanese hero font remains a small, dedicated subset');
}
assert.ok((await readFile('public/assets/fonts/zen-maru-gothic/OFL.txt', 'utf8')).includes('SIL OPEN FONT LICENSE'), 'Font license is distributed with the assets');
assert.ok(homeCss.includes('prefers-reduced-motion: reduce') && homeCss.includes('transform: none !important'), 'Home motion can be disabled');
assert.ok(!/opacity:\s*0(?:\D|$)|visibility:\s*hidden/.test(homeCss), 'Essential Home sections are not hidden by animation');
assert.ok(home.includes("observer?.disconnect()") && home.includes("motion.removeEventListener('change', configure)"), 'Home decorative observer cleans up on locale change');
assert.ok(home.includes('links.support'), 'Home has an optional support link');
const videoNote = await readFile('src/pages/VideoFieldNote.tsx', 'utf8');
assert.ok(videoNote.includes('surfcastingVideo') && !videoNote.includes('latestVideo'), 'The companion stays pinned to its original video');
for (const locale of ['ja', 'en']) {
  const html = await readFile(`out/${locale}/index.html`, 'utf8');
  assert.ok(html.includes('rel="preload" as="image" href="/assets/home/auckland-harbour-view.jpg"'), 'Home preloads its actual hero');
  assert.ok(!html.includes('/assets/homepage1.jpg'), 'Home does not preload a retired hero');
}
const content = await readFile('src/lib/content.ts', 'utf8');
assert.ok(content.includes("support: 'https://buymeacoffee.com/sorajpnz'"), 'Only the supplied support URL is used');
const theaProfile = 'https://www.superprof.co.nz/celta-tefl-certified-spent-years-helping-students-ace-the-ielts-band-score-recent-ielts-take-academic-and.html';
assert.ok(content.includes(`theaSuperprof: '${theaProfile}'`), 'Thea uses the supplied public profile URL');
const tutoring = home.match(/<section className="index-tutoring"[\s\S]*?<\/section>/)?.[0];
assert.ok(tutoring, 'Home includes a visible, named Thea lesson section');
assert.ok(tutoring.includes('aria-labelledby="index-thea-heading"') && tutoring.includes('links.theaSuperprof'), 'Tutoring has a heading and centralized external destination');
assert.ok(tutoring.includes('target="_blank" rel="noopener noreferrer"'), 'Tutoring link safely opens the external profile');
assert.ok(tutoring.includes('レッスンは英語です') && tutoring.includes('Lessons are in English'), 'Both locales explain the lesson language');
assert.ok(tutoring.includes('Student Passの利用料は授業料と別') && tutoring.includes('Student Pass fee is separate from lesson fees'), 'Both locales explain separate platform fees');
assert.ok(!/<form\b|<iframe\b|<script\b|localStorage|sessionStorage/.test(tutoring), 'Tutoring adds no booking form, embed, tracking script or input storage');
assert.ok(tutoring.includes('<TheaLessonVisual />'), 'Both Home locales include the lesson illustration');
const lessonVisual = await readFile('src/components/TheaLessonVisual.tsx', 'utf8');
const lessonCss = await readFile('src/components/TheaLessonVisual.css', 'utf8');
assert.ok(lessonVisual.includes('aria-hidden="true"'), 'Lesson illustration is decorative, not an extra reading or tab target');
assert.ok(lessonCss.includes('aspect-ratio: 8 / 5') && lessonCss.includes('width: 100%'), 'Lesson illustration has a stable responsive frame');
assert.ok(lessonCss.includes('.index-tutoring:focus-within') && lessonCss.includes('1100ms ease-in-out 1'), 'Lesson gesture supports keyboard attention and plays once');
assert.ok(lessonCss.includes('prefers-reduced-motion: no-preference') && lessonCss.includes('animation: none !important') && lessonCss.includes('transition: none !important'), 'Lesson motion is optional');
assert.ok(!/infinite|<iframe\b|<script\b|https?:\/\//.test(lessonVisual + lessonCss), 'Lesson illustration has no ambient loop or third-party embed');
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
