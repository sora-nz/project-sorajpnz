# Auckland Wayfinding: Home

Selected by Sora on 2026-10-08 from the second of three visual directions.
The metaphor is a familiar place with clear destinations, not a travel brochure or a SaaS sales page.

## Constants

- Actual harbour photograph, approved Sora/Thea photo, real video thumbnail, and real product screenshots.
- Route green `#075348`, white, ink `#17221f`, muted text `#58615e`, and rules `#dce3df`.
- YouTube action red `#c52219`; do not spread this accent across unrelated elements.
- Existing system Japanese-capable sans-serif stack, zero letter spacing.
- Plain header, moderate full-width photo, three destination links, personal sidebar, content-led main column.
- White unframed sections, thin rules, 2px image corners, 5px command corners, no decorative shadows.
- Japanese Home leads with the latest real video. English Home leads with the calculator and case study for recruiters.
- On small screens the main feature precedes the personal sidebar. Links remain native links with clear destinations.

## Motion Has A Job

Motion belongs to a user's action, never to the photo or to whether content becomes visible.

- Video play mark: one 4px forward-and-back cue over 320ms, suggesting playback.
- Notes: underline draws left to right over 260ms, suggesting a written line.
- Made-things tool mark: one small tightening gesture over 440ms, suggesting making or adjusting.
- Fine-pointer hover and keyboard focus can trigger these cues. Touch uses a static pressed surface instead.
- `prefers-reduced-motion: reduce` disables Home animation and transitions. Focus outlines and link affordances remain.
- Do not add looping movement, parallax, face zoom, ambient photo drift, generic floating, or observer-dependent visibility.
- Do not make essential UI wait for motion to finish.

## Flexible Parts

Update the real latest video, concise descriptions, related notes, and selected work without freezing a particular release into Home.
Keep pictures honest: do not use a generated person, fake video cover, or mock calculator result as a substitute for approved content.
Preserve privacy, sourcing, noindex policies, and calculation behavior when changing presentation.

## Ongoing Videos And Support

Home shows one recent upload and up to three smaller thumbnail/title/date links, including Shorts.
The public channel feed updates this group on page load; it is not a carousel or a live player.
Keep the actual thumbnails and titles, rather than generating replacement covers or adding sample uploads.
Mobile uses compact thumbnail-and-title rows with no horizontal scrolling.

Japanese Home remains video-first. English Home keeps the calculator and case study first, with the video group below.
Buy Me a Coffee is an optional, quiet link below the personal introduction and near social/contact.
Do not replace the main destinations with a donation prompt or load a payment widget automatically.

## Verification

Check Japanese and English direct loads, JA/EN/JA switching, narrow mobile widths, keyboard focus, image loading, and reduced-motion rules.
Keep the hero preload aligned with the actual image. Compare implementation screenshots with the selected visual direction before handoff.
