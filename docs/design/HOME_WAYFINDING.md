# Auckland Harbour: Home

Revised by Sora in October 2026 after the second visual concept and a further review of the header, personal introduction, and content layout.
This replaces the standalone white title and large destination rows from Auckland Open Index, while restoring the profile-sidebar and main-feature composition. The filename remains stable for existing links.
The page is a personal index of life, videos, notes, and working tools, not a corporate sales page or a travel brochure.

## Constants

- Actual harbour photograph, approved Sora/Thea photo, real video thumbnail, and real product screenshots.
- White reading surfaces, near-black primary text, green `#075348` for the destination strip and commands, muted text `#58615e`, and light rules `#dce3df`.
- YouTube action red `#c52219`; do not spread this accent across unrelated elements.
- Existing system Japanese-capable sans-serif stack, zero letter spacing. Japanese hero heading and mission alone use the selected "A Warm Address" treatment: locally hosted Zen Maru Gothic, two lighter introductory lines, then a larger green "あなたへ。". Body copy and English retain the system stack. Keep the approved wording and let paragraphs wrap naturally.
- Inset translucent plain header over the harbour image, with the existing navigation, language switch, and a clear contact command. Keep this treatment scoped to Home.
- The real harbour photograph sits behind a stationary white reading veil. Personal audience copy and the SoraJPNZ name remain still and readable; do not replace them with a dark dramatic photo overlay.
- Japanese copy addresses readers with hopes or worries about overseas life. Sora's user-confirmed eighth year in NZ is personal context, not a claim of professional advice or guaranteed outcomes. English keeps practical tools and career work easy to find.
- A green three-link strip leads to YouTube, Notes, and Projects. Japanese leads with YouTube; English leads with Projects. Stack the strip naturally on mobile.
- Profile and approved couple photo sit in a sidebar beside the main feature. Japanese shows recent videos before the calculator; English shows the calculator and case study before videos.
- White unframed content, thin rules, small image corners, compact commands, and no decorative card shadows. The inset header and its rounded contact command are intentional Home exceptions to general component defaults.
- Stack the sidebar and main content on small screens, keeping the profile concise and links large enough for touch. Links remain native links with clear destinations.
- Use existing styles and icons; add no animation or component library.

## Motion Has A Job

Motion helps a user understand a link or a section boundary. It never decides whether content becomes visible. Sora explicitly requested the narrow harbour-background exception below.

Sora subsequently clarified that the desired harbour effect is movement *inside* the scene: water ripples and gently swaying leaves with a fixed camera, not photo pan/zoom. The existing transform is only an interim treatment, not completion of that request. A single six-second image-to-video prototype was authorized; no clip has been produced or integrated yet. Do not amplify the transform as a substitute or add an unverified video asset.

- Harbour only: a slow 20-second `ease-in-out` alternating transform pan and small zoom is permitted under `prefers-reduced-motion: no-preference`. Sora found the previous 28-second, 0.8%-total pan effectively static. Desktop now pans from -1.6% to +1.6%, with scale 1.06 to 1.09; mobile pans from -0.65% to +0.65%, with scale 1.04 to 1.065. Keep the white veil, header, copy, and controls stationary; animate no filter, opacity, layout dimension, or background position.
- Mobile harbour movement must be smaller than desktop. Keep enough image overscan to avoid exposing edges.
- A native button pauses and resumes the harbour animation. Keep it keyboard-operable, with an accessible label and pressed state. Pausing must not disable navigation or affect other content.
- Destination text and arrows may move a few pixels on fine-pointer hover or keyboard focus. Use a brief underline or green surface accent, not a bouncing or looping effect.
- Image hover may use a slight scale within a stable, clipped image frame. Do not shift surrounding text or hide captions.
- Touch uses a static pressed surface instead of requiring hover.
- A single decorative section rule may respond to scroll. Keep this optional and confined to the rule: no text or image opacity changes, section resizing, layout shifts, or scroll blocking.
- The decorative rule is fully drawn by default when IntersectionObserver is unavailable. If observer support is used, disconnect on cleanup and do not carry hidden states across locale changes.
- `prefers-reduced-motion: reduce` disables Home animation and transitions. Focus outlines and link affordances remain.
- Reduced-motion users see the harbour photograph and decorative rule in complete, static states. Do not leave the photograph transformed or show an unnecessary motion toggle when movement is disabled.
- The harbour is the only authorized ambient loop. Do not add loops elsewhere, scroll-linked parallax, face zoom, generic floating, or observer-dependent visibility. Essential content must never start at `opacity: 0` or require JavaScript animation to appear.
- Do not make essential UI wait for motion to finish.
- Thea's lesson introduction uses a small, decorative Writing Task 2 illustration. On hover or keyboard focus within the introduction, the pencil makes one 1.1-second editing gesture and a correction line extends. No scores, outcome promises, personal data, third-party embeds, or constant looping. Keep the illustration static under reduced motion.

## Flexible Parts

Update the real latest video, concise descriptions, related notes, and selected work without freezing a particular release into Home.
Keep pictures honest: do not use a generated person, fake video cover, or mock calculator result as a substitute for approved content.
Preserve privacy, sourcing, noindex policies, and calculation behavior when changing presentation.

## Ongoing Videos And Support

Home shows one recent upload and up to three smaller thumbnail/title/date links, including Shorts.
The public channel feed updates this group on page load; it is not a carousel or a live player.
Keep the actual thumbnails and titles, rather than generating replacement covers or adding sample uploads.
Mobile uses compact thumbnail-and-title rows with no horizontal scrolling.

Japanese remains video-first in the main column; English remains calculator-and-case-study-first. Both keep the latest video and recent uploads available without changing the underlying feed.
Buy Me a Coffee is an optional, quiet link below the personal introduction in the sidebar.
Do not replace the main destinations with a donation prompt or load a payment widget automatically.

## Verification

Check Japanese and English direct loads, JA/EN/JA switching, narrow mobile widths, keyboard focus, image loading, and reduced-motion rules.
Check harbour pause/resume by pointer and keyboard, reduced-motion both on initial load and when changed, smaller mobile drift, stationary readable copy, and no exposed photo edges.
Check all essential sections with IntersectionObserver unavailable and verify that the optional rule remains visible and static without it.
Keep the hero preload aligned with the actual image. Compare implementation screenshots with the selected visual direction before handoff.
