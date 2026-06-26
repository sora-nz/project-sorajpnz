# SoraJPNZ Design Direction

## Design Goal

SoraJPNZ should feel like a calm, practical Japan x New Zealand decision-making media site with a strong portfolio backbone.

The visual system should help readers trust the information, scan practical tools, and understand tradeoffs. It should not feel like a flashy AI startup, luxury travel blog, crypto dashboard, or generic influencer site.

## Brand Feel

Use a visual tone that suggests:

- clear thinking
- public data and practical tools
- New Zealand ocean and daily life
- Japanese-language readability
- honest documentation
- calm professional credibility

The site can still feel personal, but the design should support usefulness first.

## Color Direction

Preferred color families:

- clean white and soft off-white backgrounds
- deep navy for trust and text emphasis
- practical SoraJPNZ blue for actions and links
- muted ocean teal for secondary accents
- pale sky blue for light surfaces
- small warm natural accents when useful

Avoid:

- heavy purple startup gradients
- loud neon palettes
- beige or brown dominance
- overly dark dashboards
- decorative gradient blobs or orb backgrounds
- one-note blue-only pages without contrast

Gradients are allowed only when subtle and functional.

## Typography

Japanese readability is a priority.

Use:

- system sans-serif stacks that render Japanese cleanly
- generous line-height for Japanese body text
- strong but not oversized headings
- short paragraphs
- clear hierarchy between headline, summary, body, and notes

Avoid:

- tiny Japanese body text
- long centered paragraphs
- negative letter spacing
- overly decorative display typography
- hero-scale type inside compact cards

## Layout

Use a mobile-first layout.

Important layout principles:

- make pages easy to scan on a phone
- keep content width readable
- make cards simple and purposeful
- avoid nested cards
- avoid decorative sections that do not help comprehension
- use clear spacing between decision-support blocks
- give calculators and tools stable dimensions to prevent layout shift

Desktop layouts can use multi-column structures, but mobile should never feel like an afterthought.

## Cards, Tools, And Data UI

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
- show caveats near the result, not hidden at the bottom
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
3. Projects and tools
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

Do not rely on color alone to communicate risk or result categories.

