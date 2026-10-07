import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function loadHelper(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}

const {
  calculateNzLifeReality,
  calculateWithOverrides,
  defaultNzLifeInputs,
  monthlyFactor
} = await loadHelper('../src/lib/nzLifeRealityCalculator.ts');
const {
  convertNzdToJpy,
  fallbackNzdJpyRate,
  fetchNzdJpyReferenceRate,
  formatJpy,
  sanitizeNzdJpyRate
} = await loadHelper('../src/lib/fxReference.ts');

function approximatelyEqual(actual, expected, label) {
  assert.ok(Math.abs(actual - expected) < 1e-8, `${label}: expected ${expected}, received ${actual}`);
}

const inputs = { ...defaultNzLifeInputs };
const base = calculateNzLifeReality(inputs);
const higherRent = calculateWithOverrides(inputs, { weeklyRent: inputs.weeklyRent + 50 });
approximatelyEqual(base.monthlyRemaining - higherRent.monthlyRemaining, 50 * monthlyFactor, 'Weekly rent conversion');

const withCar = calculateWithOverrides(inputs, { ownsCar: true });
const withoutCar = calculateWithOverrides(inputs, { ownsCar: false });
approximatelyEqual(
  withoutCar.monthlyRemaining - withCar.monthlyRemaining,
  withCar.carMonthlyCost,
  'Car toggle removes configured car costs'
);
assert.equal(withoutCar.carMonthlyCost, 0);

const manualInputs = { ...inputs, incomeMode: 'manual', manualMonthlyTakeHome: 4200 };
assert.equal(calculateNzLifeReality(manualInputs).monthlyIncomeUsedForCalculation, 4200, 'Manual income takes precedence');
assert.equal(calculateWithOverrides(manualInputs, { weeklyRent: 350 }).monthlyIncomeUsedForCalculation, 4200);
assert.equal(
  calculateWithOverrides(manualInputs, { workHoursPerWeek: 30 }, true).monthlyIncomeUsedForCalculation,
  calculateNzLifeReality({ ...manualInputs, incomeMode: 'rough', workHoursPerWeek: 30 }).monthlyIncomeUsedForCalculation,
  'Wage and work-hours scenarios can force rough income'
);

const noBufferRoom = calculateWithOverrides(inputs, { incomeMode: 'manual', manualMonthlyTakeHome: 1 });
assert.equal(noBufferRoom.emergencyBufferBuildMonths, Infinity, 'A deficit has no buffer-building completion estimate');
const exactlySavingsTarget = calculateWithOverrides(inputs, {
  incomeMode: 'manual',
  manualMonthlyTakeHome: base.monthlyExpenses + inputs.monthlySavingsTarget
});
assert.equal(exactlySavingsTarget.monthlyRemainingAfterSavingsTarget, 0);
assert.equal(exactlySavingsTarget.emergencyBufferBuildMonths, Infinity, 'Meeting savings alone leaves no buffer-building remainder');

const zeroInputs = Object.fromEntries(
  Object.entries(inputs).map(([key, value]) => [key, typeof value === 'number' ? 0 : value])
);
zeroInputs.incomeMode = 'rough';
zeroInputs.ownsCar = false;
const zeroResult = calculateNzLifeReality(zeroInputs);
for (const [key, value] of Object.entries(zeroResult)) {
  if (typeof value === 'number') assert.ok(!Number.isNaN(value), `Zero-input result ${key} is defined`);
}
assert.equal(zeroResult.monthlyRemaining, 0);
assert.equal(zeroResult.emergencyBufferBuildMonths, 0);
approximatelyEqual(
  base.expenseBreakdown.reduce((total, item) => total + item.monthly, 0),
  base.monthlyExpenses,
  'Expense breakdown matches the total'
);
assert.deepEqual(inputs, defaultNzLifeInputs, 'Calculation helpers do not mutate the supplied inputs');
console.log('PASS: calculator period conversion, car costs, income modes, buffer boundaries, zero values, expense totals and input immutability');

assert.equal(convertNzdToJpy(500, 100), 50000, 'Manual rate conversion');
assert.equal(convertNzdToJpy(-50, 100), -5000, 'Negative balances remain negative');
assert.equal(convertNzdToJpy(500, 0), null, 'Invalid conversion rate is rejected');
assert.equal(convertNzdToJpy(NaN, 100), null, 'Invalid NZD value is rejected');
assert.equal(sanitizeNzdJpyRate(NaN), fallbackNzdJpyRate);
assert.equal(formatJpy(50000), '約¥50,000');

// Every fetch is mocked; no live exchange-rate request is made by this check.
const originalFetch = globalThis.fetch;
const endpoint = 'https://example.invalid/reference-rate';
const controller = new AbortController();
try {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, endpoint);
    assert.equal(options.signal, controller.signal);
    assert.equal(options.body, undefined, 'Reference request does not send a budget payload');
    return new Response(JSON.stringify({ date: '2026-10-07', rate: 90.12 }), { status: 200 });
  };
  const rate = await fetchNzdJpyReferenceRate(controller.signal, endpoint);
  assert.equal(rate.rate, 90.12);
  assert.equal(rate.date, '2026-10-07');
  assert.equal(rate.source, 'Frankfurter');

  globalThis.fetch = async () => new Response(JSON.stringify({ rates: { JPY: 91.5 } }), { status: 200 });
  assert.equal((await fetchNzdJpyReferenceRate(undefined, endpoint)).rate, 91.5);

  globalThis.fetch = async () => new Response(JSON.stringify({ rate: 0 }), { status: 200 });
  await assert.rejects(fetchNzdJpyReferenceRate(undefined, endpoint), /usable JPY rate/);

  globalThis.fetch = async () => new Response('', { status: 503 });
  await assert.rejects(fetchNzdJpyReferenceRate(undefined, endpoint), /status 503/);

  globalThis.fetch = async () => { throw new TypeError('Network unavailable'); };
  await assert.rejects(fetchNzdJpyReferenceRate(undefined, endpoint), /Network unavailable/);
} finally {
  globalThis.fetch = originalFetch;
}
assert.equal(globalThis.fetch, originalFetch, 'The original fetch is restored');
console.log('PASS: JPY conversion and mocked rate success, invalid data, HTTP failure and network failure');
