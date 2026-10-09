import { cacheHeaders, fetchPublicBytes, invalidRequest } from '../lib/youtube-public.mjs';

export default async function youtubeThumbnail(request) {
  if (request.method !== 'GET') return invalidRequest(405, 'GET');
  const params = new URL(request.url).searchParams;
  const id = params.get('id');
  if (params.size !== 1 || !id || !/^[A-Za-z0-9_-]{11}$/.test(id)) return invalidRequest(400);

  const deadline = performance.now() + 5000;
  for (const variant of ['maxresdefault', 'hqdefault']) {
    const remainingMs = Math.floor(deadline - performance.now());
    if (remainingMs <= 0) break;
    // Reserve time for the smaller image within one shared five-second budget.
    const timeoutMs = variant === 'maxresdefault' ? Math.min(2500, remainingMs) : remainingMs;
    try {
      const image = await fetchPublicBytes(`https://i.ytimg.com/vi/${id}/${variant}.jpg`, ['image/jpeg'], timeoutMs);
      if (image[0] !== 0xff || image[1] !== 0xd8 || image[2] !== 0xff) throw new Error('Unexpected thumbnail');
      return new Response(image, { headers: cacheHeaders('image/jpeg', 1800, 'id') });
    } catch {
      // A missing, oversized, or invalid max-resolution image can use HQ instead.
    }
  }

  return new Response(null, {
    status: 404,
    headers: cacheHeaders('text/plain; charset=utf-8', 300, 'id')
  });
}
