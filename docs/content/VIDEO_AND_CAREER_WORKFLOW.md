# Videos, Notes, and Proof of Work

For the next three months, SoraJPNZ supports two priorities: growing YouTube and leaving clear evidence of Sora's analytical and implementation work. Employment remains the priority; the site should be manageable alongside a job.

## Page Roles

- Japanese Home: the latest video, everyday NZ context, and clear routes to Notes, the calculator, and Projects.
- English Home and Projects: working tools and concise case studies for recruitment conversations. Videos give personal context without replacing the work.
- Notes: short companions to selected videos, plus useful living-cost notes. Not every upload needs an article.
- Links: the existing lightweight social-profile entry. Services remain paused.

## After a Video Upload

1. Update `src/lib/videos.ts`: real video ID, visible title, publication date, short description, local thumbnail, and related-video link.
2. Save the owner's published thumbnail in `public/assets/videos/`, with its dimensions and readable alt text. Do not fetch viewer statistics or embed a tracking player by default.
3. If a note adds something useful, write a short companion. Use the video or Sora's own notes as evidence. Automatic captions can help find a scene, but are not enough to establish fish species, measurements, safety advice, or legal rules.
4. Ask Sora to review personal reflections, gear names, and any potentially sensitive locations. Do not invent them or publish exact fishing spots by inference.
5. Link the reviewed note from the video description when Sora is ready. Creating the website entry does not edit YouTube automatically.

The first surfcasting companion is a review version: `noindex, follow`, excluded from sitemap, with an English-toggle fallback to `/en/blog`. Its small on-site link supports review; it is not an access restriction. Publishing it for search requires a separate explicit decision.

## For Career Conversations

The calculator case study is at `/en/projects/nz-life-reality-calculator`, with a Japanese counterpart. It explains the problem, requirements, assumptions, implementation, validation, and limitations. The working calculator remains a separate `noindex` route.

Use the case study for explaining the work; use the calculator URL when someone should try the tool. Do not claim measured impact, demand, or independent authorship of every line. AI-assisted implementation is part of the workflow; Sora's contribution is framing, decisions, review, and iteration.

## Small, Sustainable Review

After a few uploads, look at the questions people actually ask. Add the next note or tool improvement from those questions, not from a need to fill all five categories. No analytics, paid product, or client-service commitment is introduced by this refresh.
