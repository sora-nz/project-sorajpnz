# Auckland Harbour Home: Design QA

## Japanese Hero Type and Mobile Release Check (2026-10-13)

- Selected the user's third typography direction for Japanese Home: Zen Maru Gothic is locally subsetted for the heading and mission only; the larger green address and approved Japanese copy sit over the existing harbour photograph. English and body type remain unchanged.
- Final local captures were reviewed at 390px and 430px. The heading, mission and body are readable over the static veil; there is no text/image collision or horizontal overflow. Japanese and English route switching retains the Home sections.
- The mobile DOM now places the primary feed before the long profile/IELTS sidebar. The Japanese featured video and English calculator appear just after the three destination links; desktop keeps the sidebar on the left. Loaded images have nonzero natural width.
- Evidence: `/private/tmp/sorajpnz-ja-mobile390-final.png`, `/private/tmp/sorajpnz-ja-mobile390-feed-final.png`, `/private/tmp/sorajpnz-ja-mobile430-feed-final.png`, `/private/tmp/sorajpnz-en-mobile390-feed-final.png`, `/private/tmp/sorajpnz-en-mobile430-feed-final.png`, `/private/tmp/sorajpnz-en-desktop-feed-final.png`.
- TypeScript, production build/static route metadata, site policy, Home motion, calculator/FX and YouTube feed checks pass. No P0/P1 findings remain. The harbour is still a gently moving photograph, not video of independently moving water or leaves; this remains a future visual improvement, not a claim of this release.
- Local design QA result: passed. GitHub Deploy Preview and production remain to be checked after push/merge.

## Thea Lesson Illustration Follow-Up

- Added a small HTML/CSS Writing Task 2 paper, correction line, pencil and feedback mark below Thea's Home heading in both locales. Existing description, English lesson language, Superprof destination and separate Student Pass disclosure remain unchanged.
- Gesture is contextual, runs once for 1.1 seconds, and supports hover/focus-within. It does not control visibility. Reduced-motion rules disable the gesture and correction-line transition. The entire illustration is decorative and adds no tab targets, data collection, dependencies or external requests.
- Browser checks: Japanese and English at 390px/430px, no horizontal overflow, mobile JA -> EN -> JA navigation with all sections retained. Keyboard focus on the profile link activates the gesture; removing attention returns the static state. No OS-level reduced-motion emulation is available here; CSS guardrails and independent review cover that path.
- New screenshot: `/private/tmp/sora-thea-lesson-illustration-mobile.png`. TypeScript, production bundle/metadata, site, Home motion, calculator/FX and YouTube feed checks pass.
- The requested fixed-camera water/leaf video is not complete. The provider rejected generation before returning a job. No clip was integrated; do not mistake the existing still-photo pan/zoom for scene animation. A real short waterfront clip is an alternative source for the next iteration.
- This follow-up remains local. No push, merge or production deployment.

## Findings And Result

final result: passed

No actionable P0/P1/P2 findings remain in the tested states. This is a local implementation review, not a production deployment.

## Visual Truth And Evidence

- Selected direction: the user's Land Solution header/background references, personal Japanese opening copy, and preferred Sora/Thea sidebar beside a large recent video.
- Combined revision mock: `/Users/oyasora/.codex/generated_images/019e8aa8-7381-7800-8be0-8d259980f5d4/exec-3c318cfc-603d-4c9b-b4bb-bdb0451c67c5.png` (972 x 1618 pixels). Approved real photographs were used. Invented video titles/dates in this composition were not copied into the site.
- Implementation: `http://127.0.0.1:5190/ja`, branch `codex/home-open-index-motion`.
- Final Japanese full capture: `/private/tmp/sora-harbour-home-final-ja.png` (1000 x 3940 pixels).
- Final combined comparison, opened and reviewed together: `/private/tmp/sora-harbour-home-comparison-final.png` (2024 x 1701 pixels).
- Focused hero comparison: `/private/tmp/sora-harbour-home-comparison-hero-final.png`.
- Mobile captures: `/private/tmp/sora-harbour-home-mobile-390.png` (390 x 5116 pixels) and `/private/tmp/sora-harbour-home-mobile-430.png` (430 x 5064 pixels).
- Focused mobile opening, opened and reviewed: `/private/tmp/sora-harbour-home-mobile-top.png`.
- English regression capture: `/private/tmp/sora-harbour-home-final-en.png`.
- Desktop comparison viewport: 1000 x 1665 CSS px, devicePixelRatio 1. Source normalized to 1000 x 1665; implementation opening cropped to the same size. Comparison adds a 36px caption and 24px gutter, without browser chrome.
- Mobile viewports: 390 x 844 and 430 x 932 CSS px, devicePixelRatio 1. English viewport: 1440 x 900 CSS px. No separate mobile/English source composition exists; these are responsive/regression checks, not pixel-matching targets.
- State: Japanese Home, light theme, page top, idle, real photographs and checked video fallback loaded. The background is captured at an arbitrary point in its slow cycle.
- Evidence files and the composition are review artifacts, not runtime assets.

## Comparison History

1. P2: the initial destination band was too thick and the profile column too narrow. Shortened hints, tightened band spacing and widened the main inner layout. Initial evidence: `/private/tmp/sora-harbour-home-comparison-v1.png`.
2. P2: hero typography/vertical spacing were larger than the selected direction. Reduced heading line height and used a 40px intermediate breakpoint. Hero minimum height allows longer copy to grow without clipping.
3. P2: language switching and focusing the pause control could expose an image edge. Kept overscan, allowed hero growth and added `overflow: clip` after the `hidden` fallback. Browser verification confirmed hero scrollTop remains zero and image coverage is complete at desktop/mobile sizes.
4. P2: mobile crop emphasized pavement. Increased image height to 120% and aligned toward the top, showing harbour water behind a static reading veil. Mobile movement is smaller than desktop.
5. Recaptured desktop/mobile and reopened the combined comparison and focused mobile opening. Earlier proportion, coverage, crop and readability findings are resolved. No visual fixes followed this final comparison.
6. After interruption, one unloaded lazy image was traced to the stopped local preview, not a broken asset. Restarted preview and verified all 11 Home images have nonzero natural width before final capture.
7. Sora reported that the harbour looked static. The loop was running, but its former 28-second, 0.8%-total horizontal travel and fixed scale were too small to notice. Changed only the photo to a 20-second pan with a small zoom; desktop and mobile use separate bounded settings. Browser reads confirmed the photo transform changed while the reading surface stayed exactly stationary, with no exposed image edges. Updated desktop evidence: `/private/tmp/sora-hero-motion-updated.png`.

## Required Fidelity Surfaces

- **Fonts and typography:** Existing Japanese-capable system sans-serif retained. Personal three-line heading replaces the rejected portfolio tagline. Desktop 44px, intermediate 40px and mobile 30px use explicit breakpoints, not viewport-scaled type. Zero letter spacing, readable body line height and naturally wrapping real video titles. No new font dependency.
- **Spacing and layout:** Inset translucent header, unframed photo hero, full-width destination strip, then open sidebar/main column. Thin rules, minimal corners and no repeated floating cards. Japanese leads with video; English with the calculator. Mobile stacks compact profile information and content without overflow. Hero min-height accommodates both languages.
- **Colors and tokens:** Charcoal, deep green actions, white reading surfaces, muted support copy and real harbour blues. Static white veil separates text from photograph detail. Green strip and restrained YouTube red provide contrast without a generic gradient/card theme. Contact and focus states remain distinct.
- **Image quality and asset fidelity:** Approved harbour and Sora/Thea photos, real video thumbnails and actual calculator/dashboard screens. All 11 images loaded after preview restart. No generated replacement of a person, place, product or published thumbnail. Frames are stable. Photo moves slightly behind stationary text. Existing library icons replace no custom brand art.
- **Copy and content:** User's audience context and NZ eighth-year experience retained with light readability edits. Japanese remains supportive/personal; English keeps life/work context. Real video titles, dates, descriptions and update logic preserved. Calculator assumptions/sample label remain clear. Optional coffee support is quiet.

## Interaction And Regression Checks

- JA and EN direct loads passed. Desktop JA -> EN -> JA and EN -> JA -> EN passed; essential sections stayed visible at opacity 1.
- Mobile language switching passed at 390px; menu Escape/focus return passed at 430px.
- 390px, 430px, 1000px and 1440px: scroll width equals client width, with no horizontal overflow or hidden essential content.
- Native pause/resume updates pressed state and localized label. Space pauses, Enter resumes. Paused transforms stayed exactly unchanged across successive reads; running transforms changed subtly. Text and veil remain stationary.
- Pause-button focus no longer scrolls the hero internally. Image frame coverage checked at desktop/mobile.
- Keyboard focus outlines and destination underline/arrow feedback remain visible. Hover shares the scoped treatment; image scale is bounded to 1.02. No pointer-hover visual capture is claimed; this browser backend has no documented hover API.
- Motion tests execute the actual decorative effect lifecycle: one-shot rules, initial/changed reduced motion, observer fallback, cleanup and fresh locale. Additional tests cover the single 20s transform-only pan/zoom loop, CSS preference/pause rules, overscan bounds throughout the zoom, native button state/labels and hero clip guard.
- Animation is assigned only inside `prefers-reduced-motion: no-preference`. Reduced motion disables animation/transitions/transforms and hides the redundant pause button. OS-level reduced-motion visual checking remains a manual follow-up; the backend has no documented media-emulation capability.
- Calculator, Notes and Projects links opened their intended routes. Manual rate 100 JPY updated weekly rent reference to JPY 30,000. Calculator logic was not edited.
- Shared Header contact is opt-in/Home-only and absent on Notes and other unchanged pages.
- Browser warning/error log was empty in the tested run.
- TypeScript, production bundle/static metadata, site guards, calculator/FX, YouTube feed and motion checks passed.
- Local static preview cannot serve Netlify Functions, so Home uses checked fallback uploads. Feed/proxy/fallback code is unchanged and tests pass; live channel updates need a spot check on the eventual Netlify Preview.
- Articles, routes, calculator helpers, public headers and sitemap are unchanged. Calculators remain `noindex, follow` and sitemap-excluded. Existing published article policy was not reverted. PR #1 / shore fishing draft files unchanged.

## Intentional Differences And Follow-Up

- Real photos/current content replace idealized crop and illustrative video data. Published titles are not shortened merely to match the mock.
- Existing navigation labels and English work-first ordering retained. Smaller line icons use the existing library.
- Slow harbour loop is an explicit user-requested exception to contextual/one-shot motion. Native pause, reduced-motion support and smaller mobile displacement limit distraction. No floating content, scroll hijacking or visibility-gated content.
- Before production, review a shared Netlify Preview including live YouTube updates and OS-level reduced motion. No push, merge or production deploy performed in this task.

## Implementation Checklist

- [x] Review combined source/final comparison and focused mobile opening.
- [x] Resolve proportions, image coverage and mobile crop; recapture.
- [x] Verify languages, overflow, controls, links and image loading.
- [x] Test decorative lifecycle, pause and reduced-motion guards.
- [x] Preserve publishing/privacy/calculator/video-update policies.
- [x] Run TypeScript, production build and regression checks.
- [ ] Review shared Netlify Preview before production approval.
