import { cacheHeaders, fetchPublicBytes, invalidRequest } from '../lib/youtube-public.mjs';

export default async function youtubeThumbnail(request) {
  if (request.method !== 'GET') return invalidRequest(405, 'GET');
  const params = new URL(request.url).searchParams;
  const id = params.get('id');
  if (params.size !== 1 || !id || !/^[A-Za-z0-9_-]{11}$/.test(id)) return invalidRequest(400);

  try {
    const image = await fetchPublicBytes(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`, ['image/jpeg']);
    if (image[0] !== 0xff || image[1] !== 0xd8 || image[2] !== 0xff) throw new Error('Unexpected thumbnail');
    return new Response(image, { headers: cacheHeaders('image/jpeg', 86400, 'id') });
  } catch {
    return new Response(null, {
      status: 404,
      headers: cacheHeaders('text/plain; charset=utf-8', 300, 'id')
    });
  }
}
