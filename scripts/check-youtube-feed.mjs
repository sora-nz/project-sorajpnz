import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import youtubeFeed from '../netlify/functions/youtube-feed.mjs';
import youtubeThumbnail from '../netlify/functions/youtube-thumbnail.mjs';
import { publicResponseLimit, youtubeChannelId } from '../netlify/lib/youtube-public.mjs';

const parserSource = await readFile(new URL('../src/lib/youtubeFeed.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(parserSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
});
const { normalizeYoutubeFeedEntries, parseYoutubeFeed } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const channelId = youtubeChannelId;
const validId = 'abcdefghijk';
const feedEndpoint = 'https://sorajpnz.com/.netlify/functions/youtube-feed';
const thumbnailEndpoint = `https://sorajpnz.com/.netlify/functions/youtube-thumbnail?id=${validId}`;
// YouTube uses the ID without UC at feed level and the full ID on each entry.
const xml = `<feed xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://www.youtube.com/xml/schemas/2015"><yt:channelId>${channelId.slice(2)}</yt:channelId><entry><yt:videoId>${validId}</yt:videoId><yt:channelId>${channelId}</yt:channelId><title>NZ life test video</title><published>2026-10-07T12:00:00Z</published></entry></feed>`;
const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x04, 0xff, 0xd9]);
const privateHeaders = { Cookie: 'private=test', Authorization: 'Bearer private', 'X-Forwarded-For': '192.0.2.1' };
const originalFetch = globalThis.fetch;
let upstreamCalls = 0;

function assertPublicOptions(options) {
  assert.equal(options.method, 'GET');
  assert.equal(options.redirect, 'error');
  assert.equal(options.credentials, 'omit');
  assert.deepEqual(Object.keys(options.headers), ['Accept'], 'Only a server-created Accept header is sent upstream');
  assert.equal(options.body, undefined);
  assert.ok(options.signal instanceof AbortSignal);
}

try {
  globalThis.fetch = async (url, options) => {
    upstreamCalls += 1;
    assert.equal(url, `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
    assertPublicOptions(options);
    return new Response(xml, { headers: { 'Content-Type': 'application/atom+xml', 'Set-Cookie': 'upstream=private', 'X-Visitor': 'private' } });
  };
  const success = await youtubeFeed(new Request(feedEndpoint, { headers: privateHeaders }));
  assert.equal(success.status, 200);
  assert.equal(await success.text(), xml);
  assert.match(success.headers.get('Netlify-CDN-Cache-Control'), /max-age=1800/);
  assert.equal(success.headers.get('Set-Cookie'), null);
  assert.equal(success.headers.get('X-Visitor'), null);
  const beforeInvalid = upstreamCalls;
  assert.equal((await youtubeFeed(new Request(`${feedEndpoint}?url=https://example.invalid/private`))).status, 400);
  const methodFailure = await youtubeFeed(new Request(feedEndpoint, { method: 'POST', body: 'private' }));
  assert.equal(methodFailure.status, 405);
  assert.equal(methodFailure.headers.get('Allow'), 'GET');
  assert.equal(upstreamCalls, beforeInvalid, 'Invalid requests never reach an upstream URL');

  for (const upstream of [
    () => new Response('Unavailable', { status: 503 }),
    () => new Response('<html>Not a feed</html>', { headers: { 'Content-Type': 'text/html' } }),
    () => new Response(xml, { headers: { 'Content-Type': 'application/atom+xml', 'Content-Length': String(publicResponseLimit + 1) } }),
    () => new Response('x'.repeat(publicResponseLimit + 1), { headers: { 'Content-Type': 'application/atom+xml' } }),
    () => new Response(`<!DOCTYPE feed SYSTEM "https://example.invalid/private">${xml}`, { headers: { 'Content-Type': 'application/atom+xml' } }),
    () => new Response(xml.replace(channelId, 'UC-another-channel'), { headers: { 'Content-Type': 'application/atom+xml' } })
  ]) {
    globalThis.fetch = async () => upstream();
    const fallback = await youtubeFeed(new Request(feedEndpoint));
    assert.equal(fallback.status, 200, 'Public-feed failures return a quiet fallback response');
    const failure = await fallback.json();
    assert.equal(failure.available, false);
    assert.ok(['upstream-status', 'timeout', 'unavailable'].includes(failure.reason));
    if (failure.upstreamStatus) assert.equal(failure.upstreamStatus, 503);
    assert.ok(!JSON.stringify(failure).includes('private'), 'Failure details contain no visitor or upstream response data');
    assert.match(fallback.headers.get('Netlify-CDN-Cache-Control'), /max-age=300/);
  }

  globalThis.fetch = async (url, options) => {
    upstreamCalls += 1;
    assert.equal(url, `https://i.ytimg.com/vi/${validId}/hqdefault.jpg`);
    assertPublicOptions(options);
    return new Response(jpeg, { headers: { 'Content-Type': 'image/jpeg', 'Set-Cookie': 'upstream=private' } });
  };
  const thumbnail = await youtubeThumbnail(new Request(thumbnailEndpoint, { headers: privateHeaders }));
  assert.equal(thumbnail.status, 200);
  assert.deepEqual(new Uint8Array(await thumbnail.arrayBuffer()), jpeg);
  assert.equal(thumbnail.headers.get('Content-Type'), 'image/jpeg');
  assert.match(thumbnail.headers.get('Netlify-CDN-Cache-Control'), /max-age=86400/);
  assert.equal(thumbnail.headers.get('Netlify-Vary'), 'query=id');
  assert.equal(thumbnail.headers.get('Set-Cookie'), null);
  const beforeInvalidThumbnail = upstreamCalls;
  for (const query of ['', '?id=../../private', `?id=${validId}&url=https://example.invalid/private`, `?id=${validId}&id=${validId}`]) {
    assert.equal((await youtubeThumbnail(new Request(`https://sorajpnz.com/.netlify/functions/youtube-thumbnail${query}`))).status, 400);
  }
  assert.equal((await youtubeThumbnail(new Request(thumbnailEndpoint, { method: 'POST' }))).status, 405);
  assert.equal(upstreamCalls, beforeInvalidThumbnail);

  for (const upstream of [
    () => new Response('Unavailable', { status: 404 }),
    () => new Response(jpeg, { headers: { 'Content-Type': 'text/html' } }),
    () => new Response('not a jpeg', { headers: { 'Content-Type': 'image/jpeg' } }),
    () => new Response(new Uint8Array(publicResponseLimit + 1), { headers: { 'Content-Type': 'image/jpeg' } })
  ]) {
    globalThis.fetch = async () => upstream();
    const fallback = await youtubeThumbnail(new Request(thumbnailEndpoint));
    assert.equal(fallback.status, 404);
    assert.match(fallback.headers.get('Netlify-CDN-Cache-Control'), /max-age=300/);
  }

  // Use the production five-second limit; both mocks deliberately ignore abort.
  globalThis.fetch = () => new Promise(() => {});
  const started = performance.now();
  const [timedOutFeed, timedOutThumbnail] = await Promise.all([
    youtubeFeed(new Request(feedEndpoint)),
    youtubeThumbnail(new Request(thumbnailEndpoint))
  ]);
  assert.deepEqual(await timedOutFeed.json(), { available: false, reason: 'timeout' });
  assert.equal(timedOutThumbnail.status, 404);
  assert.ok(performance.now() - started < 6500, 'Both requests time out near the five-second limit');
} finally {
  globalThis.fetch = originalFetch;
}
assert.equal(globalThis.fetch, originalFetch);
console.log('PASS: fixed-source feed/thumbnail proxies, caching, methods, query validation, privacy, MIME/signatures, size bounds and timeouts');

const entry = (id, published, title = 'NZ life video') => ({ id, published, title, channelId });
const videos = normalizeYoutubeFeedEntries([
  entry('abcdefghijk', '2026-10-01T12:00:00Z', ' Older  title '),
  entry('12345678901', '2026-10-05T12:00:00Z'),
  entry('abcdefghijk', '2026-10-06T12:00:00Z', 'Newest duplicate'),
  entry('ABCDEFGHIJK', '2026-10-04T12:00:00Z'),
  entry('1234567890_', '2026-10-03T12:00:00Z'),
  entry('1234567890-', '2026-10-02T12:00:00Z'),
  { ...entry('xyzxyzxyzxy', '2026-10-07T12:00:00Z'), channelId: 'another channel' },
  entry('bad/path/id', '2026-10-07T12:00:00Z'),
  entry('xyzxyzxyzxy', 'not a date'),
  entry('xyzxyzxyzxy', '2026-02-30T12:00:00Z'),
  entry('xyzxyzxyzxy', '2026-10-07T99:00:00Z'),
  entry('xyzxyzxyzxy', '2026-10-07T12:00:00Z', '   ')
]);
assert.equal(videos.length, 4);
assert.deepEqual(videos.map((video) => video.id), ['abcdefghijk', '12345678901', 'ABCDEFGHIJK', '1234567890_']);
assert.equal(videos[0].title, 'Newest duplicate');
assert.equal(videos[0].date, '2026-10-06');
assert.equal(videos[0].url, 'https://www.youtube.com/watch?v=abcdefghijk');
assert.equal(videos[0].thumbnail, '/.netlify/functions/youtube-thumbnail?id=abcdefghijk');
assert.deepEqual(parseYoutubeFeed('<!DOCTYPE feed><feed/>'), []);
assert.deepEqual(parseYoutubeFeed('x'.repeat(publicResponseLimit + 1)), []);
assert.ok(!parserSource.includes('innerHTML'), 'XML is parsed as data, never inserted as markup');
console.log('PASS: entry channel/ID/date/title validation, newest sorting/deduplication, four-item bound and safely constructed URLs');
