import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

function compile(source) {
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
  });
  return outputText;
}

const toModule = (source) => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;

const contentModule = toModule(compile(await readFile(new URL('../src/lib/content.ts', import.meta.url), 'utf8')));
const routesModule = toModule(compile(await readFile(new URL('../src/lib/routes.ts', import.meta.url), 'utf8')));
const source = await readFile(new URL('../src/lib/homeDetour.ts', import.meta.url), 'utf8');
const { buildHomeDetourItems, drawHomeDetour } = await import(toModule(compile(source)
  .replace("'./content'", JSON.stringify(contentModule))
  .replace("'./routes'", JSON.stringify(routesModule))));

const video = { id: 'abcdefghijk', title: 'A supplied public video', date: '2026-10-07', url: 'https://example.invalid', thumbnail: '/checked-thumbnail.jpg' };
const japanese = buildHomeDetourItems('ja', [video, video, { ...video, id: 'invalid' }]);
const english = buildHomeDetourItems('en', [video]);
assert.equal(japanese.length, 5);
assert.equal(english.length, 4);
assert.equal(japanese.filter((item) => item.kind === 'video').length, 1, 'Video IDs are validated and deduplicated');
assert.equal(japanese.find((item) => item.kind === 'video').href, 'https://www.youtube.com/watch?v=abcdefghijk', 'Video destinations are canonical, not supplied arbitrary URLs');
for (const [locale, items] of [['ja', japanese], ['en', english]]) {
  for (const item of items) {
    assert.ok(item.href.startsWith(`/${locale}/projects/`) || item.href === '/ja/blog/auckland-living-cost-hourly-wage' || item.href.startsWith('https://www.youtube.com/watch?v='));
    assert.ok(!/first-surfcasting|shore-fishing/.test(item.href), 'Unpublished notes are never in the deck');
    if (locale === 'en') assert.ok(!item.href.startsWith('/ja/'), 'English has no Japanese article destinations');
  }
}

for (const random of [() => 0, () => 0.999999, Math.random]) {
  let bag = { deck: [], remaining: [], previousId: null };
  const ids = japanese.map((item) => item.id);
  let previous;
  for (let cycle = 0; cycle < 5; cycle += 1) {
    const seen = new Set();
    for (let index = 0; index < ids.length; index += 1) {
      const result = drawHomeDetour(ids, bag, random);
      assert.ok(ids.includes(result.id));
      assert.notEqual(result.id, previous, 'A draw does not immediately repeat');
      seen.add(result.id);
      previous = result.id;
      bag = result.bag;
    }
    assert.equal(seen.size, ids.length, 'Every item is drawn once before the bag refills');
  }
  const next = drawHomeDetour(['new:one', 'new:two'], bag, random);
  assert.ok(next.id.startsWith('new:'), 'A live deck change does not return retired items');
}
assert.equal(drawHomeDetour([], { deck: [], remaining: [], previousId: null }).id, null);
assert.equal(drawHomeDetour(['one'], { deck: [], remaining: [], previousId: null }).id, 'one');
const component = await readFile(new URL('../src/components/HomeDetour.tsx', import.meta.url), 'utf8');
assert.ok(!/localStorage|sessionStorage|fetch\(|setTimeout|setInterval/.test(source + component), 'No storage, new requests or content timers');
assert.ok(component.includes('key={props.locale}') && component.includes('aria-live="polite"'), 'Locale sessions are isolated and user draws are announced');
console.log('PASS: detour public routes, locale boundary, canonical video URLs, shuffle cycles and no immediate repeat');
