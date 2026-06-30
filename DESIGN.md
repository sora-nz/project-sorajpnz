---
design_system: SoraJPNZ
version: 2026-06-30
purpose: Japan x New Zealand practical decision-making media and portfolio
tokens:
  color:
    ink: "#111827"
    muted: "#5f6b7a"
    white: "#ffffff"
    surface: "#f7faff"
    surface_soft: "#f5f7fb"
    line: "rgba(15, 23, 42, 0.10)"
    blue: "#0a84ff"
    blue_strong: "#0066cc"
    blue_soft: "#eaf4ff"
    navy: "#0b1f3f"
    ocean_teal: "#167f8f"
    natural_warm: "#f4a261"
    warning_bg: "#fff7e6"
    warning_border: "rgba(184, 114, 0, 0.24)"
    warning_text: "#684400"
    danger: "#b42318"
    success: "#177245"
  typography:
    family: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', 'Noto Sans JP', sans-serif"
    body_line_height: 1.6
    japanese_body_line_height: 1.72
    h1_desktop: "clamp(42px, 6vw, 76px)"
    h1_mobile: "38px-42px"
    h2: "28px-34px"
    body: "16px-18px"
    note: "13px-15px"
    letter_spacing: "0"
  spacing:
    xs: "6px"
    sm: "10px"
    md: "16px"
    lg: "24px"
    xl: "36px"
    section_mobile: "52px"
    section_desktop: "68px-88px"
    page_width: "min(1120px, calc(100% - 32px))"
    narrow_width: "min(820px, calc(100% - 32px))"
  radius:
    card: "8px"
    input: "8px"
    pill: "999px"
  shadow:
    soft: "0 8px 28px rgba(15, 23, 42, 0.08)"
    card: "0 12px 32px rgba(15, 23, 42, 0.055)"
    elevated: "0 18px 55px rgba(15, 23, 42, 0.10)"
  motion:
    duration: "160ms-220ms"
    easing: "ease"
    reduced_motion: "disable non-essential transitions and animations"
---

# SoraJPNZ Design System

## Design Goal

SoraJPNZ should feel like a calm, practical Japan x New Zealand decision-making media site with a strong portfolio and data-tool backbone.

The design should help readers trust the information, scan practical tools, and understand tradeoffs. It should not feel like a flashy AI startup, luxury travel blog, crypto dashboard, or generic influencer site.

The useful idea from Google Labs-style `design.md` files is the structure: machine-readable tokens first, then human-readable rules. Do not copy Google's sample visual style.

## Brand Feel

Use a visual tone that suggests:

- clear thinking
- public data and practical tools
- New Zealand ocean and daily life
- readable Japanese content
- honest documentation
- calm professional credibility
- a person building in public, not pretending to have every answer already

The site can feel personal, but usefulness should lead the design.

## Color Rules

Use the tokens in the front matter as the default palette.

Primary surfaces should be white, soft off-white, and pale blue. Primary actions should use SoraJPNZ blue. Deep navy is useful for strong contrast and trust. Muted ocean teal and small warm accents can support NZ life and field-note moments.

Avoid:

- heavy purple startup gradients
- loud neon palettes
- beige, brown, or orange dominance
- overly dark dashboards
- decorative gradient blobs or orb backgrounds
- one-note blue-only pages without contrast

Gradients are allowed only when they improve hierarchy or readability.

## Typography Rules

Japanese readability is a priority.

Use:

- the existing system sans-serif stack with `Noto Sans JP`
- generous line-height for Japanese body copy
- strong but not oversized headings
- short paragraphs
- clear hierarchy between headline, summary, body, labels, and caveats

Avoid:

- tiny Japanese body text
- long centered paragraphs
- negative letter spacing
- overly decorative display typography
- hero-scale type inside cards, calculators, sidebars, or compact panels

## Layout Rules

Use a mobile-first layout.

Important layout principles:

- pages should be easy to scan on a phone
- keep reading content within comfortable widths
- make cards simple and purposeful
- do not nest cards inside cards
- avoid decorative sections that do not help comprehension
- use consistent section spacing
- give calculators and tools stable dimensions to prevent layout shift
- keep tool controls large enough for touch input

Desktop layouts can use multi-column structures, but mobile should never feel like a compressed desktop page.

## Cards

Cards should be practical containers, not decoration.

Default card style:

- 8px radius
- subtle border
- white or nearly white background
- soft shadow only when it improves separation
- clear heading, short body, and one obvious action if needed

Avoid:

- cards inside cards
- oversized cards for tiny content
- marketing-style feature grids when the content is informational
- heavy glassmorphism that reduces readability

## Buttons And Links

Primary buttons should be reserved for the main action on a section.

Use:

- pill buttons for primary actions
- subdued secondary buttons for reading or navigation actions
- icons only when they clarify the action
- practical labels such as "Try the tool", "Read the notes", "View project", "Check assumptions", and "Contact"

Avoid:

- high-pressure sales language
- vague labels like "Unlock", "Transform", or "Get started" when a clearer action exists
- multiple competing primary buttons in one small section

## Forms And Inputs

Forms and calculators must feel reliable.

Use:

- visible labels and units
- readable helper text
- stable input height
- strong focus states
- simple controls that sync correctly
- browser-side calculations by default when privacy matters

For numeric tools:

- show weekly/monthly/NZD/JPY/hour units clearly
- avoid leading-zero display in editable numeric fields
- make assumptions visible near the result
- do not hide caveats at the bottom only

## Warning, Disclaimer, And Caveat Blocks

Use disclaimer blocks for:

- immigration, visa, employment, tax, investment, financial, and legal boundaries
- fishing rules, safety rules, size limits, restricted areas, and official-source checks
- calculator assumptions and limitations

Default style:

- soft tinted background
- 8px radius
- visible border
- plain-language copy
- near the relevant result or claim

Do not make disclaimers look like errors unless the user is actually blocked.

## Data Tools

Data tools should feel:

- clear
- trustworthy
- easy to adjust
- transparent about assumptions
- helpful even when results are not optimistic

For calculators and dashboards:

- show inputs clearly
- label units such as weekly, monthly, NZD, JPY, hours, and percentages
- separate required inputs from optional assumptions
- show result categories with plain explanations
- show caveats near the result
- make "what changed this result" easy to understand

Avoid:

- dense enterprise-BI styling for simple public tools
- unexplained scores
- overconfident green/red judgments
- hidden formulas
- large charts that do not answer a real user question

## Imagery

Use real SoraJPNZ photos when they support the story:

- New Zealand life
- ocean and fishing
- outdoor field notes
- dashboard/project screenshots
- practical daily-life context

Images should feel lived-in and honest, not stock-like. Do not overuse photos as decoration. For decision-support pages, text clarity and tool usability come first.

Before publishing new images:

- remove location metadata
- optimize file size
- add natural alt text when the image is meaningful
- use `alt=""` for decorative images
- set dimensions or aspect-ratio where layout shift is likely

## Motion

Motion should be subtle.

Allowed:

- small reveal-on-scroll effects
- light hover lifts
- gentle hero image movement when already established

Avoid:

- heavy parallax
- animated clutter
- motion that competes with reading
- new animation libraries unless explicitly approved

Respect `prefers-reduced-motion`.

## Navigation And CTAs

Primary site flow should support:

1. SNS / YouTube discovery
2. Blog notes
3. Projects and practical tools
4. Contact or lightweight support

Services should remain secondary unless the user intentionally shifts the site toward service sales.

Calls to action should sound practical:

- Read the notes
- Try the tool
- View the project
- Check the assumptions
- Contact SoraJPNZ

Avoid high-pressure sales language.

## Accessibility

Maintain:

- clear color contrast
- keyboard-accessible navigation
- visible focus states
- descriptive link text
- meaningful button labels
- logical heading order
- mobile tap targets that are easy to use
- result states that do not rely on color alone

Data tools should remain understandable for readers who skim text rather than charts.

## Do

- Keep SoraJPNZ calm, useful, and grounded.
- Write Japanese copy naturally.
- Keep assumptions visible.
- Prefer simple reusable patterns over one-off decorative sections.
- Make practical tools easy to operate on mobile.
- Preserve noindex for unfinished or private-ish pages.

## Don't

- Do not copy Google Labs' sample visual style.
- Do not make the site look like a generic AI/SaaS landing page.
- Do not make the site look like a tourism or influencer site.
- Do not turn Services into the main conversion path unless explicitly asked.
- Do not overstate outcomes around migration, jobs, income, investing, tax, or visas.
- Do not add new visual libraries without approval.
