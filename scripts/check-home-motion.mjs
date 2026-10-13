import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/pages/Home.tsx', import.meta.url), 'utf8');
const ast = ts.createSourceFile('Home.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const home = ast.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === 'Home');
const effects = home.body.statements
  .filter(ts.isExpressionStatement)
  .map((node) => node.expression)
  .filter((node) => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'useEffect');
assert.equal(effects.length, 1, 'Extract the one Home decorative-motion effect, not a mock React component');
const effect = effects[0];
assert.equal(effect.arguments[1].getText(ast), '[locale]', 'Locale changes run a fresh decorative lifecycle');
const { outputText } = ts.transpileModule(`const runEffect = ${effect.arguments[0].getText(ast)}; runEffect;`, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None }
});

function section() {
  const attributes = new Map();
  return Object.freeze({
    attributes,
    dataset: new Proxy({}, {
      set(_target, name, value) {
        assert.equal(name, 'ruleDrawn', 'Only the decorative data attribute may change');
        assert.equal(value, 'true');
        attributes.set('data-rule-drawn', value);
        return true;
      }
    }),
    removeAttribute(name) {
      assert.equal(name, 'data-rule-drawn', 'Cleanup cannot change content visibility');
      attributes.delete(name);
    },
    get style() { throw new Error('The effect must never set content visibility styles'); },
    get classList() { throw new Error('The effect must never hide content with a class'); }
  });
}

function environment({ reduced = false, supported = true } = {}) {
  let sections = [section(), section()];
  const observers = [];
  const listeners = new Set();
  const media = {
    matches: reduced,
    addEventListener(type, listener) {
      assert.equal(type, 'change');
      listeners.add(listener);
    },
    removeEventListener(type, listener) {
      assert.equal(type, 'change');
      assert.ok(listeners.delete(listener), 'Cleanup removes its exact media-query listener');
    }
  };
  class Observer {
    constructor(callback, options) {
      this.callback = callback;
      this.targets = new Set();
      this.disconnects = 0;
      assert.equal(options.threshold, 0, 'Tall mobile sections need no visibility ratio');
      assert.equal(options.rootMargin, '0px 0px -8% 0px');
      observers.push(this);
    }
    observe(target) { this.targets.add(target); }
    unobserve(target) { assert.ok(this.targets.delete(target), 'A drawn rule is unobserved'); }
    disconnect() { this.disconnects += 1; this.targets.clear(); }
    enter(target, isIntersecting = true) { this.callback([{ target, isIntersecting }]); }
  }
  const window = {
    matchMedia(query) {
      assert.equal(query, '(prefers-reduced-motion: reduce)');
      return media;
    },
    ...(supported ? { IntersectionObserver: Observer } : {})
  };
  const mainRef = {
    current: {
      querySelectorAll(selector) {
        assert.equal(selector, '[data-index-rule]', 'Only decorative section markers are queried');
        return sections;
      }
    }
  };
  const run = runInNewContext(outputText, { window, mainRef, IntersectionObserver: Observer });
  return {
    run, observers, listeners,
    get sections() { return sections; },
    nextLocale() { sections = [section(), section()]; },
    setReduced(value) {
      media.matches = value;
      [...listeners].forEach((listener) => listener());
    }
  };
}

const normal = environment();
const cleanup = normal.run();
assert.equal(normal.observers.length, 1);
assert.equal(normal.listeners.size, 1);
const observer = normal.observers[0];
assert.equal(observer.targets.size, 2, 'All decorative rules are observed');
observer.enter(normal.sections[0], false);
assert.equal(normal.sections[0].attributes.size, 0, 'Offscreen entries do not draw a rule');
observer.enter(normal.sections[0]);
assert.equal(normal.sections[0].attributes.get('data-rule-drawn'), 'true');
assert.equal(normal.sections[1].attributes.size, 0);
assert.equal(observer.targets.size, 1, 'A visible rule runs once');

normal.setReduced(true);
assert.equal(observer.disconnects, 1);
assert.equal(observer.targets.size, 0);
assert.equal(normal.observers.length, 1, 'Enabling reduced motion does not create an observer');
assert.ok(normal.sections.every((item) => item.attributes.size === 0));
normal.setReduced(false);
assert.equal(normal.observers.length, 2, 'Returning to normal motion reconnects decorative rules');
assert.equal(normal.observers[1].targets.size, 2);
normal.observers[1].enter(normal.sections[1]);
cleanup();
assert.equal(normal.observers[1].disconnects, 1);
assert.equal(normal.listeners.size, 0);
assert.ok(normal.sections.every((item) => item.attributes.size === 0));

const oldSections = normal.sections;
normal.nextLocale();
const nextCleanup = normal.run();
assert.equal(normal.observers.length, 3);
assert.equal(normal.listeners.size, 1, 'A new locale owns only one listener');
assert.deepEqual([...normal.observers[2].targets], normal.sections, 'A new locale observes its current DOM');
normal.observers[2].enter(normal.sections[0]);
assert.ok(oldSections.every((item) => item.attributes.size === 0), 'Previous locale elements stay untouched');
nextCleanup();
assert.equal(normal.listeners.size, 0);
assert.equal(normal.observers[2].disconnects, 1);

const reduced = environment({ reduced: true });
const reducedCleanup = reduced.run();
assert.equal(reduced.observers.length, 0, 'Initial reduced motion has no observer');
assert.ok(reduced.sections.every((item) => item.attributes.size === 0));
reducedCleanup();
assert.equal(reduced.listeners.size, 0);

const unsupported = environment({ supported: false });
assert.equal(unsupported.run(), undefined, 'No IntersectionObserver is a safe no-op');
assert.equal(unsupported.observers.length, 0);
assert.equal(unsupported.listeners.size, 0);
assert.ok(unsupported.sections.every((item) => item.attributes.size === 0));

console.log('PASS: Home decorative-only scroll motion, one-shot rules, reduced-motion initial/change, observer fallback, cleanup and fresh locale lifecycle');

// Static CSS guards supplement the effect checks; they do not emulate browser rendering.
const css = await readFile(new URL('../src/pages/Home.css', import.meta.url), 'utf8');
assert.match(css, /\.index-hero\s*\{[^}]*overflow:\s*clip;/,
  'The oversized photo must not create an inner scroll container when pause gains focus');
assert.match(css, /@media\s*\(prefers-reduced-motion:\s*no-preference\)\s*\{\s*\.index-hero-image\s*\{\s*animation:\s*index-harbour-drift 20s ease-in-out infinite alternate;/,
  'The slow hero loop requires a normal-motion preference');
const heroRules = [...css.matchAll(/\.index-hero-image\s*\{([^{}]*)\}/g)];
assert.equal(heroRules.filter((rule) => /(?:^|;)\s*animation\s*:/.test(rule[1])).length, 1,
  'No second ungated hero animation overrides the preference gate');
assert.match(css, /\.index-hero\[data-motion-paused="true"\]\s+\.index-hero-image\s*\{\s*animation-play-state:\s*paused;/,
  'The visitor can pause the continuously moving photo');
const drift = css.match(/@keyframes\s+index-harbour-drift\s*\{([\s\S]*?)\n\}/)?.[1];
assert.ok(drift, 'Harbour drift keyframes exist');
assert.deepEqual([...drift.matchAll(/([\w-]+)\s*:/g)].map((match) => match[1]), ['transform', 'transform'],
  'Only the photograph transform animates; no blur, opacity or layout changes');
const reducedCss = css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*)\}\s*$/)?.[1];
assert.ok(reducedCss);
assert.match(reducedCss, /animation:\s*none\s*!important;/);
assert.match(reducedCss, /\.home-index\s+\.index-hero-image\s*,[^{}]*\{\s*transform:\s*none\s*!important;/,
  'Reduced motion resets the hero to its untransformed photograph');
assert.match(reducedCss, /\.home-index\s+\.index-motion-toggle\s*\{\s*display:\s*none;/,
  'A disabled animation does not expose a redundant pause control');

const desktopShiftX = Number(drift.match(/--harbour-shift-x,\s*([\d.]+)%/)?.[1]) / 100;
const desktopShiftY = Math.abs(Number(drift.match(/--harbour-shift-y,\s*(-?[\d.]+)%/)?.[1])) / 100;
const desktopScaleStart = Number(drift.match(/--harbour-scale-start,\s*([\d.]+)/)?.[1]);
const desktopScaleEnd = Number(drift.match(/--harbour-scale-end,\s*([\d.]+)/)?.[1]);
const mobileRule = heroRules.find((rule) => rule[1].includes('--harbour-shift-x:'))?.[1];
assert.ok(mobileRule, 'Mobile supplies its smaller drift settings');
const mobileShiftX = Number(mobileRule.match(/--harbour-shift-x:\s*([\d.]+)%/)?.[1]) / 100;
const mobileShiftY = Math.abs(Number(mobileRule.match(/--harbour-shift-y:\s*(-?[\d.]+)%/)?.[1])) / 100;
const mobileScaleStart = Number(mobileRule.match(/--harbour-scale-start:\s*([\d.]+)/)?.[1]);
const mobileScaleEnd = Number(mobileRule.match(/--harbour-scale-end:\s*([\d.]+)/)?.[1]);
for (const [label, x, y, scaleStart, scaleEnd] of [
  ['desktop', desktopShiftX, desktopShiftY, desktopScaleStart, desktopScaleEnd],
  ['mobile', mobileShiftX, mobileShiftY, mobileScaleStart, mobileScaleEnd]
]) {
  assert.ok(scaleStart > 1 && scaleStart < scaleEnd && scaleEnd <= 1.1, `${label} uses a bounded slow zoom`);
  assert.ok(Math.max(x, y) < (scaleStart - 1) / 2, `${label} overscan covers the entire pan and zoom`);
}
assert.ok(mobileShiftX < desktopShiftX && mobileShiftY < desktopShiftY && mobileScaleStart < desktopScaleStart && mobileScaleEnd < desktopScaleEnd,
  'Mobile movement is smaller than desktop movement');
assert.ok(desktopShiftX >= 0.012 && mobileScaleEnd - mobileScaleStart >= 0.02,
  'Photo movement is perceptible without animating the reading surface');

const openingElements = [];
function collectOpeningElements(node) {
  if (ts.isJsxOpeningElement(node)) openingElements.push(node);
  ts.forEachChild(node, collectOpeningElements);
}
collectOpeningElements(home);
const attribute = (node, name) => node.attributes.properties.find((item) => ts.isJsxAttribute(item) && item.name.text === name)?.initializer;
const hero = openingElements.find((node) => attribute(node, 'className')?.text === 'index-hero');
const toggle = openingElements.find((node) => attribute(node, 'className')?.text === 'index-motion-toggle');
assert.equal(toggle?.tagName.getText(ast), 'button', 'Pause uses a keyboard-operable native button');
assert.equal(attribute(toggle, 'type')?.text, 'button');
assert.equal(attribute(hero, 'data-motion-paused')?.expression.getText(ast), 'heroPaused');
assert.equal(attribute(toggle, 'aria-pressed')?.expression.getText(ast), 'heroPaused', 'Accessible pressed state matches the paused photo');
let paused = false;
const { outputText: toggleCode } = ts.transpileModule(`const toggle = ${attribute(toggle, 'onClick').expression.getText(ast)}; toggle;`, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None }
});
const click = runInNewContext(toggleCode, { setHeroPaused(update) { paused = update(paused); } });
click();
assert.equal(paused, true, 'Click pauses the hero');
click();
assert.equal(paused, false, 'A second click resumes the hero');
const labelExpression = attribute(toggle, 'aria-label').expression.getText(ast);
for (const isJapanese of [true, false]) {
  const pauseLabel = runInNewContext(labelExpression, { isJapanese, heroPaused: false });
  const resumeLabel = runInNewContext(labelExpression, { isJapanese, heroPaused: true });
  assert.equal(pauseLabel, isJapanese ? '背景の動きを一時停止' : 'Pause background motion');
  assert.equal(resumeLabel, isJapanese ? '背景の動きを再開' : 'Resume background motion');
}
console.log('PASS: slow transform-only hero loop, CSS preference/pause guards, desktop/mobile overscan and bilingual accessible pause/resume state');
