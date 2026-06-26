# SoraJPNZ Agent Guide

## Project Overview

SoraJPNZ is a bilingual Japan x New Zealand practical decision-making media and portfolio site.

The site should help Japanese speakers think realistically about New Zealand life, work, money, living costs, career options, and Japan-vs-NZ decisions using:

- lived experience from Auckland and New Zealand life
- public data and transparent assumptions
- practical calculators, dashboards, and comparison tools
- field notes that explain what was learned in real situations
- portfolio-quality Business Analyst / Data Analyst work

SoraJPNZ is not just a short-term blog, travel diary, or side-hustle landing page. Treat it as a long-term owned asset that can compound through articles, tools, videos, projects, and credible decision-support content.

## Strategic Direction

Japanese positioning:

> NZ生活の現実を、データと実体験で判断する。

Japanese short description:

> SoraJPNZは、日本語話者がニュージーランドでの生活・仕事・お金・将来を現実的に考えるための、実体験ベースのデータメディア兼ポートフォリオです。生活費、仕事探し、NZと日本の比較、現地での試行錯誤を、使えるツールと読み物に整理しています。

English positioning:

> Make New Zealand life decisions with data, lived experience, and clear thinking.

English short description:

> SoraJPNZ is a Japan x New Zealand media and portfolio site that turns real-life questions about work, money, living costs, relocation, and future planning into practical tools, field notes, and data projects.

## Target Users

Primary users are Japanese speakers who are:

- already living in New Zealand
- seriously considering coming to New Zealand
- comparing Japan and New Zealand life choices
- trying to understand living costs, work options, money pressure, and long-term risk
- looking for realistic examples rather than generic success stories
- interested in practical dashboards, calculators, notes, and field-tested explanations

## Content Boundaries

Good SoraJPNZ content:

- explains realistic tradeoffs
- shows assumptions clearly
- separates lived experience from official rules
- helps readers estimate, compare, and decide
- documents uncertainty instead of hiding it
- uses data and dashboards where they genuinely improve clarity
- keeps ocean, fishing, and outdoor content as human field notes that add trust and texture

Avoid content that feels like:

- a luxury travel blog
- a generic influencer brand
- fake success-story marketing
- generic AI-generated SEO content
- a migration promise or job guarantee
- a high-pressure service sales funnel

## Legal And Safety Boundaries

SoraJPNZ must not present Sora as a licensed immigration adviser.

Do not:

- give immigration advice
- interpret visa eligibility for a reader
- promise visa, residency, job, income, migration, tax, or investment outcomes
- recommend a final migration decision
- publish official-looking legal, tax, immigration, health, or financial guidance without clear sourcing and limitations

For immigration, visa, employment law, tax, fishing rules, size limits, restricted areas, local notices, and similar regulated topics:

- state that rules can change
- direct readers to official sources or licensed professionals
- avoid exact claims unless they are current, sourced, and dated
- add TODO notes when official verification is still needed

Decision-support language is allowed. Official advice language is not.

Use phrases like:

- "This is a personal field note, not official advice."
- "Use this as a starting point for thinking, then check official sources."
- "The numbers are estimates based on the assumptions shown."

Avoid phrases like:

- "You can get this visa if..."
- "This option is guaranteed."
- "You should move to New Zealand."
- "This salary is enough for everyone."

## Privacy Boundaries

Protect personal privacy, especially around partner, friends, employers, locations, and sensitive life details.

- Do not add private names, contact details, addresses, or identifying details without explicit approval.
- Do not expose precise fishing, diving, or home locations unless the user explicitly asks.
- Remove EXIF or location metadata from new images before publishing.
- Use existing approved site assets unless new media is explicitly provided for web use.
- Calculators should avoid collecting personal data by default.
- If a tool can run client-side, prefer client-side calculations without storing user inputs.
- Do not add tracking beyond the existing analytics approach unless the user explicitly approves it.

## Tone And Writing Style

Tone should be:

- calm
- honest
- practical
- realistic
- grounded
- useful
- transparent about uncertainty

Japanese writing should be natural and readable. Do not make it sound like a direct machine translation from English. Prefer clear Japanese sentences over clever marketing copy.

Sora is still building his own New Zealand career and long-term pathway. The site should not pretend he has already "made it." It should show a person thinking carefully, building useful tools, and documenting the process with evidence.

Avoid:

- excessive hype
- overconfident claims
- emojis as structural design elements
- fake urgency
- exaggerated income or migration narratives
- generic "dream life abroad" framing

## Coding Conventions

This site is a React + Vite + TypeScript app.

Current conventions:

- Routes are handled in `src/App.tsx` and locale helpers in `src/lib/routes.ts`.
- Most copy, links, SEO text, social links, and asset paths live in `src/lib/content.ts`.
- Page metadata is handled through `src/lib/useMeta.ts`.
- Reuse existing components in `src/components` before adding new patterns.
- Reuse existing CSS in `src/styles.css` and keep visual changes scoped.
- Keep social URLs centralized; do not hard-code the same URL across pages.
- Keep bilingual content aligned in English and Japanese.
- Preserve `noindex` behavior for pages that are not ready for search.
- Use `loading="lazy"` and `decoding="async"` for non-critical images.
- Use clear alt text for meaningful images and `alt=""` for decorative images.
- Do not add new libraries unless there is a clear need and the user approves the direction.

Before finishing code changes, run:

```bash
npm run build
```

If adding or editing routes, verify both `/en/...` and `/ja/...` variants where applicable.

## UI And Product Work

Before UI changes:

1. Read `DESIGN.md`.
2. Read any relevant product spec in `docs/products`.
3. Check existing page structure and CSS before inventing new components.
4. Preserve the site direction: practical Japan x New Zealand decision support, not generic portfolio decoration.

For new tools, calculators, dashboards, or article formats:

- write or update a product spec first when the scope is not tiny
- keep assumptions visible
- avoid storing personal inputs unless explicitly required
- include disclaimers where regulated topics are involved

## What Codex Should Not Do

Do not:

- remove Services unless explicitly requested
- turn the site into a hard-selling agency site
- turn ocean/fishing content into the main strategic axis
- publish legal, immigration, tax, investment, or fishing-rule claims without official verification
- add exact visa rules or eligibility statements without sources and dates
- add newsletter, LINE, paid product, or lead-magnet flows without explicit instruction
- expose private personal details or exact sensitive locations
- make large design changes when the request is for strategy, copy, or light iteration
- push to `main` or merge PRs unless the user explicitly asks

