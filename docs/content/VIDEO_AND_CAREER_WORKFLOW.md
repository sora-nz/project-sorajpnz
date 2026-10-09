# Videos, Notes, and Proof of Work

For the next three months, SoraJPNZ supports two priorities: growing YouTube and leaving clear evidence of Sora's analytical and implementation work. Employment remains the priority; the site should be manageable alongside a job.

## Page Roles

- Japanese Home: the latest video, everyday NZ context, and clear routes to Notes, the calculator, and Projects.
- English Home and Projects: working tools and concise case studies for recruitment conversations. Videos give personal context without replacing the work.
- Notes: short companions to selected videos, plus useful living-cost notes. Not every upload needs an article.
- Links: the existing lightweight social-profile entry. Services remain paused.

## After a Video Upload

1. Home reads the public YouTube channel feed on page load and shows up to four recent uploads, including Shorts. A new public upload does not require a Home edit or a redeploy. Live titles and thumbnails come from YouTube rather than the checked fallback copy. The feed and 30-minute site cache mean updates are not instantaneous: revisit or reload Home after the cache refreshes; an already-open page does not poll for changes. Private or unlisted videos are not expected in the public channel feed.
2. Occasionally refresh the checked fallback list in `src/lib/videos.ts`, with real IDs, dates, localized copy and local thumbnails in `public/assets/videos/`. This list also supplies the selected video on Notes Hub. Do not fetch viewer statistics or embed a tracking player by default.
3. If a note adds something useful, write a short companion. Use the video or Sora's own notes as evidence. Automatic captions can help find a scene, but are not enough to establish fish species, measurements, safety advice, or legal rules.
4. Ask Sora to review personal reflections, gear names, and any potentially sensitive locations. Do not invent them or publish exact fishing spots by inference.
5. Link the reviewed note from the video description when Sora is ready. Creating the website entry does not edit YouTube automatically.

The first surfcasting companion is a review version: `noindex, follow`, excluded from sitemap, with an English-toggle fallback to `/en/blog`. Its small on-site link supports review; it is not an access restriction. Publishing it for search requires a separate explicit decision.

`surfcastingVideo` pins that companion's video, date, image and scene links. Do not replace it when updating Home's fallback list. New feed entries do not automatically get companion notes or translations. English Home shows original YouTube titles in live mode; its checked fallback has reviewed English titles. Notes Hub remains curated rather than an automatically generated article list.

## Automatic Feed Boundaries

- Fixed channel: `UCIDqwDcCJEDbBhgBZW0PDpA`; no arbitrary source URLs accepted.
- Small Netlify functions fetch the public Atom feed and new thumbnails. Visitors contact this site's endpoints, not a YouTube player. Cookies, authorization, visitor IP headers and calculator inputs are not forwarded upstream.
- The upstream request identifies itself as SoraJPNZ with a fixed public User-Agent; it does not impersonate a visitor's browser.
- No API key, database, analytics, browser storage, new package, payment embed or background polling is used.
- Feed request times out after five seconds on the server and eight seconds in the browser. Invalid or unavailable data leaves checked uploads visible, with a link to the channel.
- The public feed can be delayed or temporarily unavailable. Site CDN caches successful feeds and thumbnails for 30 minutes, failures for five minutes. Provider usage limits and function costs still apply; caching reduces repeated requests but is not a promise of zero cost.
- Thumbnails try the maximum-resolution JPEG, then HQ if it is missing, too large, invalid or slow. Images have a separate 512KiB ceiling; the feed retains its 128KiB limit. Both image attempts share a five-second server deadline. If the proxy still fails, Home uses a known local thumbnail when available, then the logo. Existing image dimensions keep the layout stable.
- Failure responses expose only a small status category and, when relevant, the fixed public source's HTTP status. No visitor details, upstream body or raw error message is returned.
- Test with `node scripts/check-youtube-feed.mjs`; production UI verification must also exercise the real browser parser and same-origin endpoints. Plain Vite previews do not run Netlify functions and intentionally fall back.

On 2026-10-10 (NZ), the deployed preview feed and Home live state succeeded. The earlier upstream HTTP 404 was no longer reproduced; this is not a claim that upstream outages have been permanently fixed. Keep the fallback, and reconsider a server-side YouTube Data API only if persistent failures justify that extra setup. No API key is needed for the current public-feed approach.

## Optional Support

Home and Links point to Sora's supplied Buy Me a Coffee profile. Support is optional, not a service sale or a promise of benefits. Payments take place on the external platform, not on SoraJPNZ. No payment form or third-party support widget is loaded on this site.

## For Career Conversations

The calculator case study is at `/en/projects/nz-life-reality-calculator`, with a Japanese counterpart. It explains the problem, requirements, assumptions, implementation, validation, and limitations. The working calculator remains a separate `noindex` route.

Use the case study for explaining the work; use the calculator URL when someone should try the tool. Do not claim measured impact, demand, or independent authorship of every line. AI-assisted implementation is part of the workflow; Sora's contribution is framing, decisions, review, and iteration.

## Small, Sustainable Review

After a few uploads, look at the questions people actually ask. Add the next note or tool improvement from those questions, not from a need to fill all five categories. No analytics, paid product, or client-service commitment is introduced by this refresh.
