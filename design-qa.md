# Home Design QA: Auckland Wayfinding

Checked: 2026-10-09. Scope: the Home update on PR #18, not a production release.

## Evidence

- Source visual truth: `~/.codex/generated_images/019e8aa8-7381-7800-8be0-8d259980f5d4/exec-7704f196-8c44-4659-ad33-53f2675dcd81.png`.
- Implementation: `http://127.0.0.1:4188/ja` and `/en`, browser rendered.
- Japanese full capture: `/private/tmp/sorajpnz-wayfinding-ja-full.png`.
- Matching top region: `/private/tmp/sorajpnz-wayfinding-ja-desktop.png`.
- Same-input comparison: `/private/tmp/sorajpnz-wayfinding-compare-final.jpg`.
- Focused tool comparison: `/private/tmp/sorajpnz-wayfinding-compare-tool.jpg`.
- Earlier full/detail comparisons: `/private/tmp/sorajpnz-wayfinding-compare-first.jpg`, `/private/tmp/sorajpnz-wayfinding-compare-detail.jpg`.
- English capture: `/private/tmp/sorajpnz-wayfinding-en-desktop.png`.
- Mobile captures: `/private/tmp/sorajpnz-wayfinding-ja-mobile390.png`, `/private/tmp/sorajpnz-wayfinding-ja-mobile430.png`.

The source is 1070 x 1470 pixels. Browser override was 1085 x 1594 CSS pixels, with a 15px scrollbar and a 1070px content region. Full capture is 1070px wide at 1:1 density; the top 1470px was cropped without scaling. The comparison places both 1070 x 1470 regions next to each other. State: Japanese Home, scroll top, loaded images. The source's Notes-hover underline is assessed separately through keyboard focus rather than mistaken for an always-active navigation item.

## Comparison History

1. Initial combined comparison: [P2] the harbour crop placed too much water behind the hero copy and omitted the pavement, unlike the selected source. Changed image position from 57% to 86% and reduced the bottom wash from 0.78 to 0.65. The final paired capture shows the copy against the shaded path, with the skyline still visible.
2. Product close-up: [P2] an initial 1.25x screenshot crop cut the left edges of calculator labels on mobile and English desktop. Replaced scale with a vertical-only crop in a stable 16:7 window. The final tool comparison and English render show intact labels. Added a visible example-screen label so static screenshot figures are not mistaken for live results.
3. Rechecked both full and focused pairs after fixes. No actionable P0/P1/P2 visual differences remain. Real assets, honest copy, and existing navigation labels intentionally differ from generated mock content as described below.

## Required Surfaces

- Typography: existing Japanese-capable system sans serif, 54px desktop brand and 40px mobile brand, 30px/22px subtitle, 15px body with 1.85 line height. No negative tracking or viewport-scaled text. Header and compact directory use smaller weights/sizes appropriate to their roles. Japanese/English headings and paragraph wrapping checked at narrow widths.
- Spacing/layout: 56px plain header; moderate full-width harbour; three sign-like destinations; narrow personal column plus wider content column; ruled product/work rows. No floating section cards or decorative shadows. Mobile stacks destinations and puts the latest feature first. Slight sidebar width differences from the generated mock are accepted to keep real bilingual copy readable.
- Colors/tokens: route green, white, graphite, restrained YouTube red. Green/white and button/white contrast checked; hero copy sits on a shaded photograph. Localized wash is for readability, not a decorative page gradient. Header/footer styling is Home-scoped.
- Image quality: approved actual harbour and Sora/Thea photos, published video thumbnail, existing real tool screenshots. No generated people, fake catches, CSS artwork, or illustrated stand-ins. The real portrait differs from the mock's altered crop; both people remain visible. Calculator screenshot crops vertically only and is labelled as an example. Existing 1024px harbour source can be replaced with a higher-resolution original in a future asset-only improvement.
- Copy/content: actual video date and verified description; personal Japanese copy and practical English work context. No invented catch measurements, precise locations, job results, or financial outcomes. The mock's altered phrases and screenshot numbers were not copied as live claims. Shared navigation labels remain consistent with the rest of the site.
- Icons: existing Remix icon font, named by adjacent text, decorative icons hidden from assistive technology. Standard play/article/tools icons replace the mock's pictorial icon variants intentionally. No handcrafted illustration substitutions.

## Interactions And Regression Checks

- Japanese and English direct loads; mobile JA -> EN -> JA; desktop EN -> JA -> EN: all five main content sections remain visible, with no reveal/observer classes on Home.
- 390px, 430px and 1440px: document scroll width equals content viewport width; no horizontal overflow. Mobile menu and language toggle work.
- Native links tested: Japanese calculator, Japanese Notes, English calculator case study. Correct locale paths; no Japanese article links on English Home.
- Every Home image loads and has stable dimensions/aspect ratio. Hero preload updated to the actual harbour image, not the retired illustration.
- Keyboard focus is visible. Video/tool cue animation names and single iteration verified in the browser; Notes underline reaches its complete focus state. No image has an animation.
- Reduced-motion override verified in the loaded browser stylesheet: animation/transition disabled for all Home descendants and pseudo-elements. The available browser controls do not offer reduced-motion emulation; this override was inspected, not reported as an emulated-media test.
- Console errors/warnings: none observed in local verification.
- TypeScript, production build, 28 static route/meta/index checks, calculator/FX helper tests, and diff whitespace check: pass.
- Calculator logic, existing article bodies, noindex/header rules, sitemap and PR #1 shore-fishing draft are unchanged by this Home refinement.

## Follow-up Polish

- Optional: supply the full-resolution harbour original if a sharper wide-desktop crop is desired.
- Review the new video companion voice independently before changing its noindex policy.

## Ongoing Video And Support Update

- Revised reference within the selected Auckland Wayfinding motif: `/Users/oyasora/.codex/generated_images/01a11ab7-9327-77f0-99a0-6c6e01734a84/exec-893ddd1f-9c87-4d8b-af3d-da38aaca33a1.png` (921 x 1708).
- Loaded Japanese render: `/private/tmp/sorajpnz-recents-ja-final.png` (1070 x 3058).
- Combined reference/render: `/private/tmp/sorajpnz-recents-compare.jpg`. Reference scaled uniformly to 1070 x 1984; actual top 1984px preserved at 1:1. Both appear side by side with labels, Japanese Home at scroll top and loaded content.
- English render: `/private/tmp/sorajpnz-recents-en-final.png`. Mobile evidence: `/private/tmp/sorajpnz-recents-ja-mobile390.png` and `/private/tmp/sorajpnz-recents-ja-mobile430.png`.

Inspected the combined image: the harbour, green destination band, personal sidebar and ruled content rows preserve the chosen motif. The latest-video block is followed by three compact thumbnails, not another row of large floating cards. Optional support is a small sidebar link and a ruled row below the social links. No actionable P0/P1/P2 visual differences remain.

Intentional content differences: the reference has two explicitly marked mock video entries; implementation instead uses four verified public uploads from SoraJPNZ. Actual video titles are longer, wrap naturally, and are not replaced with fabricated captions. The original portrait and calculator screenshot remain real assets. Japanese Home remains video-first; English Home keeps the calculator and work evidence first. No unrelated redesign or new perpetual movement was added.

Additional checks:

- Live public feed renders the latest upload plus three recent uploads/Shorts. Forced feed failure preserves the checked-in fallback list and channel link.
- Browser-native XML parser: 10 tests pass, including actual YouTube root channel-ID format, a new upload with no old-note link, invalid XML/channel/date rejection and inert escaped titles.
- JA -> EN -> JA at 390px and desktop: sections remain visible. At 390px/430px, document width equals viewport width. Recent thumbnails become compact rows rather than horizontally scrolling tiles.
- Japanese calculator and Notes links work; calculator still displays JPY reference conversion and `noindex, follow`. JA/EN Links pages show the supplied support URL, retaining `noindex, follow`.
- Local console warnings/errors: none observed. Independent read-only code review found no P1/P2 issues.
- Upstream requests use fixed URLs, no visitor cookies/auth forwarding, bounded bodies, timeouts and shared cache. No iframe, payment widget, user-input storage or new package was added.

Remaining operational check: confirm the two new functions on the actual Netlify Deploy Preview after this commit is pushed. Feed refresh is cached and not promised to be instantaneous. Hosting-provider usage should be monitored; this implementation does not promise zero hosting cost.

final result: passed
