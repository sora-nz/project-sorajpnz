# NZ Life Reality Calculator Case Study

## Purpose

Give a hiring reviewer or collaborator a short, inspectable account of the calculator: the user question, requirements, implementation decisions, validation, and limits. Link the English and Japanese project pages to the corresponding live calculator.

Planned routes:

- `/en/projects/nz-life-reality-calculator`
- `/ja/projects/nz-life-reality-calculator`

The case-study page can be indexed as a portfolio item. The live calculator keeps its existing `noindex, follow` and sitemap exclusion. The case study does not modify its calculation model.

## Evidence Used

Content is based on the existing product spec and current code:

- `docs/products/NZ_LIFE_REALITY_CALCULATOR_SPEC.md`
- `src/lib/nzLifeRealityCalculator.ts`
- `src/lib/fxReference.ts`
- `src/pages/NzLifeRealityCalculator.tsx`
- Existing approved 1280 x 720 calculator screenshots in `public/assets`.

No usage metrics, customer outcomes, tax accuracy, or tested commercial demand are claimed.

## Model Facts To Preserve

- Weekly values become monthly through `52 / 12`; this is a comparison period, not payday cash-flow modelling.
- Rough take-home uses the fixed `0.82` assumption. It is not a PAYE calculation.
- Positive manual monthly income overrides rough income in the main result.
- Wage and work-hours scenario comparisons intentionally force rough-income mode.
- Car ownership gates configured fuel, parking, insurance, and maintenance amounts.
- Result categories compare remaining income with the entered savings target. They are not affordability guarantees.
- The emergency-buffer target uses the MVP's essential expense classification and starts from zero. Current savings and debt are not inputs.
- FX conversion is separate from the NZD budget calculation; Frankfurter requests do not contain the budget inputs.
- Inputs remain in React state. There is no account, server submission, or persisted budget state.

## Verification For This Update

Direct helper checks cover rent-period conversion, toggling car costs, manual income precedence, no positive buffer-building remainder, zero-income/zero-cost results, and expense-breakdown totals. Mocked Frankfurter responses cover a valid rate/date, an invalid zero rate, and an unavailable response. Manual NZD-to-JPY conversion is also checked. Full route, metadata, browser, and production-build validation belongs to the integrated PR.

## Follow-Up

Ask a few people to try the tool and record unclear inputs, missing cost categories, and confusion around monthly versus weekly/fortnightly periods. Use those findings before expanding the calculation model. Do not imply that feedback or outcome measurements have already happened.
