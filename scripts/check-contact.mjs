import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const helper = await readFile('src/lib/contactForm.ts', 'utf8');
const { outputText } = ts.transpileModule(helper, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
});
const { submitContactMessage } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const originalFetch = globalThis.fetch;
const body = new URLSearchParams({ 'form-name': 'contact', name: 'Example', email: 'example@example.invalid', message: 'Local mock only.' }).toString();

// No requests or test messages are sent to Netlify by this check.
try {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, '/__forms.html');
    assert.equal(options.method, 'POST');
    assert.equal(options.headers['Content-Type'], 'application/x-www-form-urlencoded');
    assert.equal(options.body, body);
    assert.ok(options.signal instanceof AbortSignal);
    return new Response('', { status: 200 });
  };
  await submitContactMessage(body);

  globalThis.fetch = async () => new Response('', { status: 503 });
  await assert.rejects(submitContactMessage(body), /could not be confirmed/);

  globalThis.fetch = async () => { throw new TypeError('Network unavailable'); };
  await assert.rejects(submitContactMessage(body), /Network unavailable/);

  globalThis.fetch = async (_url, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener('abort', () => reject(new DOMException('Timed out', 'AbortError')), { once: true });
  });
  await assert.rejects(submitContactMessage(body, 5), { name: 'AbortError' });
} finally {
  globalThis.fetch = originalFetch;
}

const page = await readFile('src/pages/Contact.tsx', 'utf8');
const skeleton = await readFile('public/__forms.html', 'utf8');
for (const name of ['form-name', 'subject', 'name', 'email', 'message', 'bot-field']) {
  assert.ok(page.includes(`name="${name}"`) && skeleton.includes(`name="${name}"`), `Registered form field: ${name}`);
}
assert.ok(page.indexOf('new FormData(form)') < page.indexOf("setStatus('sending')"), 'Capture values before disabling fields');
assert.ok(page.includes('disabled={status === \'sending\'} aria-label={copy.formTitle}'), 'Fields cannot discard edits typed during submission');
assert.ok(page.includes('if (pending.current) return'), 'Guard duplicate submissions');
assert.ok(page.includes('aria-busy=') && page.includes('aria-live="polite"'), 'Pending and response states are accessible');
assert.ok(page.includes('className="contact-error"') && page.includes('href={links.email}'), 'Email fallback remains available');
console.log('PASS: contact POST payload, HTTP/network failure, timeout, form registration and UI guardrails (all requests mocked)');
