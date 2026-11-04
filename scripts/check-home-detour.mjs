import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
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

const attribute = (opening, name) => opening.attributes.properties.find((item) => ts.isJsxAttribute(item) && item.name.text === name)?.initializer;
const expression = (opening, name, ast) => attribute(opening, name)?.expression?.getText(ast);
function jsxElements(ast) {
  const elements = [];
  function visit(node) {
    if (ts.isJsxElement(node)) elements.push({ node, opening: node.openingElement });
    if (ts.isJsxSelfClosingElement(node)) elements.push({ node, opening: node });
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return elements;
}
function isWithin(node, ancestor) {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (parent === ancestor) return true;
  }
  return false;
}

const componentAst = ts.createSourceFile('HomeDetour.tsx', component, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
assert.equal(componentAst.parseDiagnostics.length, 0, 'Camera markup parses as TSX');
const elements = jsxElements(componentAst);
const byClass = (name) => elements.filter(({ opening }) => attribute(opening, 'className')?.text === name);
const shells = byClass('index-detour-shell');
assert.equal(shells.length, 1, 'One actual bitmap supplies the camera illustration');
const shell = shells[0].opening;
assert.equal(shell.tagName.getText(componentAst), 'img');
assert.equal(attribute(shell, 'alt')?.text, '', 'The camera shell is decorative');
assert.equal(attribute(shell, 'aria-hidden')?.text, 'true');
const shellPath = attribute(shell, 'src')?.text;
assert.match(shellPath, /^\/assets\/home\/[a-z0-9-]+\.webp$/, 'The camera is a local WebP, not a CSS drawing');
const shellImage = await readFile(new URL(`../public${shellPath}`, import.meta.url));
assert.equal(shellImage.toString('ascii', 0, 4), 'RIFF');
assert.equal(shellImage.toString('ascii', 8, 12), 'WEBP', 'The shell file contains real WebP data');
const encoding = shellImage.toString('ascii', 12, 16);
let imageDimensions;
if (encoding === 'VP8X') imageDimensions = [shellImage.readUIntLE(24, 3) + 1, shellImage.readUIntLE(27, 3) + 1];
if (encoding === 'VP8L') {
  const bits = shellImage.readUInt32LE(21);
  imageDimensions = [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1];
}
if (encoding === 'VP8 ') imageDimensions = [shellImage.readUInt16LE(26) & 0x3fff, shellImage.readUInt16LE(28) & 0x3fff];
assert.ok(imageDimensions, 'A recognized WebP frame exposes the native dimensions');
assert.deepEqual(['width', 'height'].map((name) => Number(expression(shell, name, componentAst))), imageDimensions,
  'The decorative image reserves its native aspect ratio');

const shutters = byClass('index-detour-draw');
const results = byClass('index-detour-layout');
const announcements = byClass('index-detour-announcement');
assert.equal(shutters.length, 1);
assert.equal(results.length, 1);
assert.equal(announcements.length, 1);
const shutter = shutters[0].opening;
const result = results[0];
const announcement = announcements[0];
assert.equal(shutter.tagName.getText(componentAst), 'button', 'The illustrated shutter remains keyboard-operable');
assert.equal(attribute(shutter, 'type')?.text, 'button');
assert.equal(expression(shutter, 'onClick', componentAst), 'choose', 'Only a user shutter action draws a result');
assert.equal(expression(shutter, 'aria-controls', componentAst), expression(result.opening, 'id', componentAst));
assert.equal(expression(result.opening, 'id', componentAst), 'resultId', 'Shutter controls identify the actual result');
const label = expression(shutter, 'aria-label', componentAst);
assert.ok(label, 'An illustrated shutter has an accessible name');
for (const isJapanese of [true, false]) {
  for (const drawn of [false, true]) {
    assert.equal(runInNewContext(label, { isJapanese, draw: drawn ? {} : null }), isJapanese
      ? drawn ? 'シャッターを押してもう一枚見る' : 'シャッターを押して一枚見る'
      : drawn ? 'Press the shutter for another detour' : 'Explore a detour with the shutter');
  }
}
assert.equal(attribute(announcement.opening, 'role')?.text, 'status');
assert.equal(attribute(announcement.opening, 'aria-live')?.text, 'polite');
assert.equal(attribute(announcement.opening, 'aria-atomic')?.text, 'true');
assert.ok(!isWithin(announcement.node, result.node), 'A separate status announces the draw without rereading result links');
assert.ok(!elements.some(({ node, opening }) => (node === result.node || isWithin(node, result.node)) && attribute(opening, 'aria-live')),
  'The interactive result is not itself a live region');
assert.ok(!elements.some(({ node, opening }) => isWithin(result.node, node) && attribute(opening, 'aria-hidden')?.text === 'true'),
  'Decorative shell semantics do not hide the real result');
const open = byClass('index-detour-open')[0]?.opening;
assert.ok(open, 'Each drawn result retains its explicit destination link');
assert.equal(open.tagName.getText(componentAst), 'a');
assert.equal(expression(open, 'href', componentAst), 'selected.href');
assert.equal(expression(open, 'target', componentAst), "external ? '_blank' : undefined");
assert.equal(expression(open, 'rel', componentAst), "external ? 'noopener noreferrer' : undefined");

const home = await readFile(new URL('../src/pages/Home.tsx', import.meta.url), 'utf8');
const homeAst = ts.createSourceFile('Home.tsx', home, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const homeElements = jsxElements(homeAst);
const detours = homeElements.filter(({ opening }) => opening.tagName.getText(homeAst) === 'HomeDetour');
const heroes = homeElements.filter(({ opening }) => opening.tagName.getText(homeAst) === 'section' && attribute(opening, 'className')?.text === 'index-hero');
assert.equal(detours.length, 1, 'Home renders one discovery camera, not a duplicate below the hero');
assert.equal(heroes.length, 1);
assert.ok(isWithin(detours[0].node, heroes[0].node), 'The discovery camera belongs inside the hero');
console.log('PASS: detour public routes, locale boundary, canonical video URLs, shuffle cycles and no immediate repeat');
console.log('PASS: hero camera placement, real decorative bitmap dimensions, localized native shutter and separate polite result status');
