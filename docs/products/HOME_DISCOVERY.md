# Home Discovery And Media Shelves

Date: 2026-11-04
Status: Draft PR review; not production.

## Purpose

Give a first-time visitor a concrete view of SoraJPNZ: real videos from NZ life,
readable notes and working projects. Add a small playful discovery action without
turning Home into an agency landing page or hiding its practical tools.

## Today's Detour

- A native camera command draws one existing item. It never navigates automatically.
- The result has a real image, title, short context and an explicit destination link.
- Use a shuffle bag: cover the eligible items before refill; avoid immediate repeats.
- Eligible items: current checked/live channel videos, real project case studies,
  and the published Auckland living-cost note on Japanese Home only.
- Never add private/unpublished notes, the shore-fishing draft, nonexistent English
  article routes, generated titles/dates or fabricated outcomes.
- A selected item is snapshotted so a late feed update does not replace it silently.
- Reset only the discovery session on locale changes. No storage, account, tracker,
  new fetch, payment flow or automatic content timer.
- Keep the band compact, keyboard accessible and announced only after user action.
- The small shutter gesture is optional and does not flash. Reduced motion is static.

## Video And Project Shelves

- Use Embla Carousel React 8.6.0 for swipe/loop layout; keep native buttons and links.
- Video shelf consumes the existing channel hook and thumbnail fallback; do not
  replace or alter the feed, scraper, thumbnail function or calculator logic.
- Project shelf includes calculator case study, relocation dashboard and Rent Radar.
- Keep the current localized priority: Japanese videos first, English calculator first.
- Show a neighboring preview, real images and stable card dimensions. Titles may
  wrap/clamp visually, but full accessible text and real destinations remain.
- Advance at a reading pace: 6.5 seconds for videos, 7.8 seconds for projects.
- Auto-advance only while in view and the document is visible; resume when visible
  again unless the visitor has paused. Focus, pointer attention, dragging and manual
  selection stop rotation until explicit Play.
- Pause/Play is first in DOM keyboard order, with previous/next and slide selectors.
  Controls may sit below the shelf visually. Visible neighboring cards remain usable;
  only offscreen slide links are inert.
- Reduced-motion users receive static manual shelves, including live preference changes.
- No generated social proof, extra analytics, route/index changes or draft promotion.

## Visual Continuity

Preserve the selected Harbour Field Journal: white canvas, real photography,
green/ink type and restrained coral accents. Use repeated-item cards only for real
videos/projects, not floating section cards. Replace the old process slogan with
small `Watch / Read / Make` captions; retain the original line illustration.

## Validation

TypeScript/build, site/publication checks, detour shuffle/eligibility checks,
manual/autoplay/pause/keyboard/swipe browser checks, desktop/mobile widths,
JA/EN round trips, image loading and unchanged tool routes. Do not merge until Sora
has reviewed the working preview.

Primary implementation references:
- https://www.embla-carousel.com/docs/v8/get-started/react
- https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
