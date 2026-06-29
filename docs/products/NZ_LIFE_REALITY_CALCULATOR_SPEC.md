# NZ生活リアリティ計算機 / NZ Life Reality Calculator Spec

## Product Summary

Japanese name: NZ生活リアリティ計算機

English name: NZ Life Reality Calculator

Purpose:

Help Japanese speakers estimate whether living in New Zealand is financially realistic based on wage, work hours, rent, transport, car costs, food, phone, insurance, savings target, and emergency buffer.

The key value is not only calculating living costs. The tool should show how fragile or realistic a user's New Zealand life setup may be under different assumptions.

This should be a decision-support tool, not financial, immigration, tax, or employment advice.

## Target Users

Primary users:

- Japanese speakers already living in New Zealand
- Japanese speakers seriously considering New Zealand life
- students, working holiday makers, post-study workers, early-career workers, and career changers who want realistic cost estimates
- people comparing Japan and New Zealand life choices
- people who need to test whether a plan survives rent, work-hour, or car-cost shocks

Secondary users:

- family members helping someone think through a New Zealand plan
- future collaborators, schools, or community groups that need practical planning content

## User Problems

Users often ask:

- Is this wage enough to live in Auckland?
- How much rent can I realistically afford?
- What happens if my weekly hours drop?
- Can I save anything after rent, food, transport, and phone costs?
- Do I need a car, and how much does it change the budget?
- How much emergency buffer should I have?
- Am I making a plan that only works if everything goes perfectly?

The calculator should help users see the pressure points quickly.

## MVP Product Principle

The MVP should be simple, transparent, and privacy-safe.

It should:

- run client-side
- avoid storing user inputs
- show formulas and assumptions plainly
- use ranges and scenarios instead of pretending to be exact
- avoid complex tax, visa, or employment-law logic in the first version

If a calculation requires official or frequently changing rules, the MVP should either avoid it or mark it as a future improvement.

## Required Inputs

### Income

- hourly wage in NZD
- expected work hours per week
- pay frequency, optional
- estimated take-home income, optional override

MVP recommendation:

Use user-entered after-tax take-home income if available. If the user only enters gross wage and hours, show that this is a rough estimate and should be checked with official tax/payroll tools.

### Rent And Housing

- rent per week
- number of people sharing, optional
- utilities per week or month
- internet per month
- bond or setup cost, optional for future

### Transport

- public transport per week or month
- fuel per week or month
- parking per week or month
- car insurance per month
- car maintenance allowance per month
- car loan or finance payment per month
- WOF/rego allowance per month, optional

MVP can let users choose:

- public transport only
- car owner
- mixed transport

### Food And Daily Costs

- groceries per week
- eating out / coffee / small spending per week or month
- phone plan per month
- subscriptions per month
- insurance or health-related allowance per month
- other fixed costs per month

### Savings And Buffer

- target savings per month
- current emergency savings
- desired emergency buffer months
- expected one-off setup costs, optional

### Scenario Inputs

The calculator should allow or predefine stress scenarios:

- work hours drop by 10%
- work hours drop by 20%
- rent increases by NZD 50 per week
- groceries increase by 15%
- unexpected car cost of NZD 1,000
- two weeks without paid work

## Calculation Logic

### Time Conversion

Convert weekly values to monthly estimates using:

```text
monthly = weekly * 52 / 12
```

Convert monthly values to weekly estimates using:

```text
weekly = monthly * 12 / 52
```

Show the conversion assumption somewhere in the UI.

### Income

For MVP:

```text
gross_weekly_income = hourly_wage * hours_per_week
gross_monthly_income = gross_weekly_income * 52 / 12
```

If after-tax income is provided:

```text
monthly_income = user_entered_after_tax_income
```

If after-tax income is not provided:

```text
monthly_income = rough_income_estimate
```

The first version should avoid pretending to calculate exact tax. It can provide a rough estimate or ask the user to enter take-home pay.

### Expenses

Group expenses:

- housing
- transport
- food
- communication
- insurance and health
- other fixed costs
- lifestyle allowance
- savings target

```text
monthly_expenses = housing + transport + food + communication + insurance + other + lifestyle + savings_target
```

### Surplus

```text
monthly_surplus = monthly_income - monthly_expenses
weekly_surplus = monthly_surplus * 12 / 52
```

### Rent Burden

```text
rent_burden = monthly_rent / monthly_income
```

If income is zero or missing, show that rent burden cannot be calculated.

### Savings Reality

```text
actual_savings_capacity = monthly_income - essential_expenses
savings_gap = target_savings - actual_savings_capacity
```

Essential expenses should exclude optional lifestyle spending but include housing, food, transport, phone, insurance, and minimum fixed costs.

### Emergency Buffer

```text
required_emergency_buffer = essential_monthly_expenses * desired_buffer_months
buffer_gap = required_emergency_buffer - current_emergency_savings
```

### Fragility Checks

Run scenario calculations:

1. Base case
2. 10% fewer work hours
3. 20% fewer work hours
4. Rent + NZD 50/week
5. Groceries + 15%
6. One-off NZD 1,000 car or emergency cost
7. Two weeks without paid work

For each scenario:

```text
scenario_surplus = scenario_income - scenario_expenses
```

Count how many scenarios produce a negative monthly surplus.

## Result Categories

Use categories that are clear but not judgmental.

### 1. 現実的 / Realistic

Suggested conditions:

- base monthly surplus is positive
- rent burden is not extreme
- most stress scenarios remain manageable
- emergency buffer gap is not severe

Japanese explanation:

> 現在の入力では、毎月の収支にある程度の余裕があります。ただし、仕事時間、家賃、車の修理費などで状況は変わるため、公式情報と実際の見積もりで確認してください。

### 2. かなりタイト / Tight

Suggested conditions:

- base monthly surplus is small
- savings target is difficult
- one or two stress scenarios become negative

Japanese explanation:

> 生活はできる可能性がありますが、余裕は大きくありません。仕事時間が少し減る、家賃が上がる、車の出費が出るだけで赤字になりやすい状態です。

### 3. 不安定 / Fragile

Suggested conditions:

- base surplus is near zero or negative
- several stress scenarios fail
- emergency buffer is far below target

Japanese explanation:

> この条件だと、生活設計はかなり不安定です。家賃、交通費、仕事時間、貯金目標のどれかを見直さないと、想定外の出費に弱い可能性があります。

### 4. 高リスク / High Risk

Suggested conditions:

- base case is clearly negative
- rent burden is very high
- most stress scenarios fail
- no emergency buffer

Japanese explanation:

> この入力では、NZ生活を続けるにはリスクが高い可能性があります。収入、家賃、仕事時間、初期費用、緊急資金をもう一度確認し、必要に応じて公式情報や専門家にも相談してください。

## Result Output

The result page should show:

- monthly income
- monthly expenses
- monthly surplus or deficit
- weekly surplus or deficit
- rent burden
- essential monthly expenses
- emergency buffer target
- emergency buffer gap
- scenario results
- result category
- explanation in Japanese and English where applicable

Use visual emphasis, but avoid overconfident green/red judgments. Results should invite careful thinking.

## Assumptions And Limitations

Always show assumptions:

- Weekly values are converted to monthly using 52 / 12.
- Results are estimates, not guarantees.
- Tax, visa, employment, and benefit rules are not fully modeled.
- Costs vary by region, household, lifestyle, and timing.
- User inputs may be incomplete or inaccurate.
- Unexpected expenses can change the result quickly.

Limitations:

- The MVP should not claim exact take-home pay.
- The MVP should not judge visa eligibility.
- The MVP should not recommend whether someone should move.
- The MVP should not replace professional advice.

## Privacy Notes

Default privacy approach:

- calculate in the browser
- do not store personal inputs
- do not require login
- do not ask for name, visa status, employer, exact address, or contact details
- avoid collecting sensitive financial details unless explicitly needed in a future version

If analytics are added:

- track only anonymous usage events such as calculator started, completed, result category, and CTA clicks
- do not send raw income, rent, savings, or personal financial inputs to analytics

## Disclaimers

Japanese disclaimer:

> このツールは、NZ生活を考えるための概算・シミュレーション用です。移民、ビザ、税金、雇用、投資、金融に関する助言ではありません。実際の判断には、必ず公式情報や必要に応じて資格を持つ専門家の情報を確認してください。

English disclaimer:

> This tool is an estimate for thinking through New Zealand living costs. It is not immigration, visa, tax, employment, investment, or financial advice. Always check official sources and qualified professionals where needed before making decisions.

## CTA Ideas

Soft CTAs:

- Read related NZ living-cost notes
- Compare with the relocation dashboard
- Save your assumptions manually
- Watch the related YouTube explanation
- Contact SoraJPNZ with a general project or feedback question

Avoid CTAs that imply guaranteed outcomes.

## Future Improvements

Possible later versions:

- region presets such as Auckland, Wellington, Christchurch, Queenstown
- rent presets from public or user-entered ranges
- Japan-vs-NZ comparison mode
- JPY/NZD exchange-rate sensitivity
- student / working holiday / early-career scenario templates
- household mode for couples or flatmates
- CSV export
- PDF summary
- anonymous benchmark data if privacy can be protected
- link to official calculators or official information pages
- content recommendations based on result category

## What Not To Include Yet

Do not include in MVP:

- visa eligibility checks
- immigration pathway recommendations
- job matching
- exact tax calculations presented as official
- investment recommendations
- debt advice
- benefit eligibility
- personal data storage
- account creation
- paid consultation flow
- newsletter or LINE registration
- AI-generated personalized advice

## First Implementation Recommendation

Build the MVP as a standalone bilingual page after the spec is approved.

Suggested first route:

- `/ja/tools/nz-life-reality-calculator`
- `/en/tools/nz-life-reality-calculator`

Suggested first implementation:

- static form state in React
- centralized bilingual copy in `src/lib/content.ts`
- client-side calculations only
- no backend
- no saved inputs
- no sitemap entry until the copy, disclaimer, and assumptions are reviewed

