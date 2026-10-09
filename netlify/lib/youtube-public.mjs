export const youtubeChannelId = 'UCIDqwDcCJEDbBhgBZW0PDpA';
export const publicResponseLimit = 128 * 1024;
const requestTimeoutMs = 5000;

export function cacheHeaders(contentType, seconds, query) {
  return {
    'Content-Type': contentType,
    'Cache-Control': 'public, max-age=60',
    'Netlify-CDN-Cache-Control': `public, durable, max-age=${seconds}`,
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex, follow',
    'Content-Security-Policy': "default-src 'none'; sandbox",
    ...(query ? { 'Netlify-Vary': `query=${query}` } : {})
  };
}

export function invalidRequest(status, allow) {
  return new Response(JSON.stringify({ available: false }), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...(allow ? { Allow: allow } : {})
    }
  });
}

async function readBoundedBody(response, signal) {
  const declaredLength = Number(response.headers.get('content-length'));
  if (declaredLength > publicResponseLimit || !response.body) throw new Error('Unsupported response size');

  const reader = response.body.getReader();
  const cancel = () => { reader.cancel().catch(() => {}); };
  signal.addEventListener('abort', cancel, { once: true });
  const chunks = [];
  let totalBytes = 0;

  try {
    while (true) {
      signal.throwIfAborted();
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > publicResponseLimit) {
        cancel();
        throw new Error('Response exceeds size limit');
      }
      chunks.push(value);
    }
  } finally {
    signal.removeEventListener('abort', cancel);
    reader.releaseLock();
  }

  if (totalBytes === 0) throw new Error('Empty response');
  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

export async function fetchPublicBytes(url, acceptedTypes, timeoutMs = requestTimeoutMs) {
  const controller = new AbortController();
  const boundedTimeoutMs = Number.isFinite(timeoutMs) ? Math.max(1, Math.min(requestTimeoutMs, timeoutMs)) : requestTimeoutMs;
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new Error('Public source timed out'));
    }, boundedTimeoutMs);
  });

  try {
    return await Promise.race([
      (async () => {
        const response = await fetch(url, {
          method: 'GET',
          headers: { Accept: acceptedTypes.join(', '), 'User-Agent': 'SoraJPNZ/1.0 (+https://sorajpnz.com)' },
          redirect: 'error',
          credentials: 'omit',
          signal: controller.signal
        });
        if (response.status !== 200) throw new Error(`Public source unavailable (${response.status})`);
        const contentType = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
        if (!contentType || !acceptedTypes.includes(contentType)) throw new Error('Unexpected content type');
        return readBoundedBody(response, controller.signal);
      })(),
      timeout
    ]);
  } finally {
    clearTimeout(timer);
    controller.abort();
  }
}
