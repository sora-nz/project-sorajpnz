import { useEffect, useMemo, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, links, Locale } from '../lib/content';
import {
  convertNzdToJpy,
  fallbackNzdJpyRate,
  fetchNzdJpyReferenceRate,
  formatJpy,
  formatNzdJpyRate,
  sanitizeNzdJpyRate,
  type ReferenceRateResult
} from '../lib/fxReference';
import {
  calculateNzLifeReality,
  calculateWithOverrides,
  CalculatorInputs,
  defaultNzLifeInputs,
  impactEstimates,
  referenceWages,
  roughTakeHomeRate
} from '../lib/nzLifeRealityCalculator';
import { useMeta } from '../lib/useMeta';
import { useReveal } from '../lib/useReveal';

type NzLifeRealityCalculatorProps = {
  locale: Locale;
  path: string;
};

type RangeControlProps = {
  testId?: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  helper?: string;
  onChange: (value: number) => void;
};

const sampleCarCosts = {
  weeklyFuel: 60,
  weeklyParking: 20,
  monthlyCarInsurance: 80,
  monthlyCarMaintenance: 120
};

type RateStatus = 'loading' | 'success' | 'fallback' | 'manual';

const statusLabels = {
  ja: {
    hard: 'かなり厳しい',
    fragile: '生活は可能だが脆い',
    realistic: '現実的',
    comfortable: '余裕あり'
  },
  en: {
    hard: 'Very tight',
    fragile: 'Possible, but fragile',
    realistic: 'Realistic',
    comfortable: 'Some room'
  }
} as const;

const expenseLabels = {
  ja: {
    rent: '家賃',
    food: '食費',
    transport: '移動',
    car: '車',
    phone: '通信',
    insurance: '保険',
    subscriptions: 'サブスク',
    other: 'その他固定費'
  },
  en: {
    rent: 'Rent',
    food: 'Food',
    transport: 'Transport',
    car: 'Car',
    phone: 'Phone and internet',
    insurance: 'Insurance',
    subscriptions: 'Subscriptions',
    other: 'Other fixed costs'
  }
} as const;

const englishNotesByJapanese: Record<string, string> = {
  'この前提では毎月の収支が赤字です。家賃、勤務時間、車コスト、固定費のどこかを見直す必要があります。':
    'These assumptions produce a monthly deficit. Rent, work hours, car costs, or other fixed costs need another look.',
  '緊急資金を作るまでにかなり時間がかかるため、仕事時間や家賃が少し変わるだけでも生活が崩れやすい前提です。':
    'Building the target emergency buffer would take a long time, so a small change in work hours or rent could make this setup fragile.',
  '毎月の貯金目標を達成した後の余力が残らないため、緊急資金を積み上げる見通しが立ちにくい状態です。':
    'There is no room left after the monthly savings target, so the emergency buffer does not have a clear path to grow.',
  '車関連コストが大きめです。車なし生活、相乗り、公共交通、駐車場代を含めて比較すると差が見えやすくなります。':
    'Car costs are relatively high. Compare them with a car-free setup, shared trips, public transport, and parking costs.',
  '家賃が収入に対してかなり重い前提です。フラット、地域、通勤コストとのバランス確認が重要です。':
    'Rent is taking a large share of the income used here. Compare flatting, location, and commuting costs together.',
  '家賃比率は低くありません。家賃を少し下げるだけでも毎月の余力に効きやすいです。':
    'The rent share is not low. Even a modest rent reduction could noticeably improve the monthly result.',
  'この前提では収支に一定の余力があります。ただし税、勤務時間、家賃、車、ビザ条件などは必ず別途確認してください。':
    'These assumptions leave some room, but tax, work hours, rent, car costs, and visa conditions still need separate checks.'
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatCurrency(value: number) {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? '-' : '';
  return `${sign}$${Math.abs(rounded).toLocaleString('en-NZ')}`;
}

function formatPercent(value: number, locale: Locale) {
  if (!Number.isFinite(value)) return locale === 'ja' ? '十分' : 'No fixed limit';
  return `${Math.round(value * 100)}%`;
}

function formatMonths(value: number, locale: Locale) {
  if (!Number.isFinite(value)) return locale === 'ja' ? '見通しにくい' : 'No clear path';
  if (value <= 0) return locale === 'ja' ? '0か月' : '0 months';
  if (value < 1) return locale === 'ja' ? '1か月未満' : 'Under 1 month';
  return locale === 'ja' ? `約${Math.ceil(value)}か月` : `About ${Math.ceil(value)} months`;
}

function updateInput(setInputs: Dispatch<SetStateAction<CalculatorInputs>>, patch: Partial<CalculatorInputs>) {
  setInputs((current) => ({ ...current, ...patch }));
}

function formatNumberForInput(value: number, step: number) {
  if (step < 1) {
    return value.toFixed(2);
  }

  return String(Math.round(value));
}

function normalizeIntegerDraft(rawValue: string) {
  const digits = rawValue.replace(/\D/g, '');
  if (!digits) return '';
  return digits.replace(/^0+(?=\d)/, '') || '0';
}

function normalizeDecimalDraft(rawValue: string) {
  const decimalIndex = rawValue.indexOf('.');
  const hasDecimal = decimalIndex >= 0;
  const integerPart = (hasDecimal ? rawValue.slice(0, decimalIndex) : rawValue).replace(/\D/g, '');
  const decimalPart = hasDecimal ? rawValue.slice(decimalIndex + 1).replace(/\D/g, '') : '';
  const normalizedInteger = integerPart.replace(/^0+(?=\d)/, '') || (hasDecimal ? '0' : integerPart ? '0' : '');

  return hasDecimal ? `${normalizedInteger}.${decimalPart}` : normalizedInteger;
}

function parseDraftValue(value: string) {
  if (!value || value === '.') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeCommittedValue(value: string, min: number, max: number, step: number) {
  const parsed = parseDraftValue(value);
  const nextValue = parsed ?? min;
  const rounded = step < 1 ? nextValue : Math.round(nextValue);
  return clamp(rounded, min, max);
}

function CalculatorNumberInput({
  testId,
  label,
  value,
  min,
  max,
  step,
  onChange
}: {
  testId?: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  const allowsDecimal = step < 1;
  const [isEditing, setIsEditing] = useState(false);
  const [displayValue, setDisplayValue] = useState(() => formatNumberForInput(value, step));

  useEffect(() => {
    if (!isEditing) {
      setDisplayValue(formatNumberForInput(value, step));
    }
  }, [isEditing, step, value]);

  const handleChange = (rawValue: string) => {
    const nextDisplayValue = allowsDecimal ? normalizeDecimalDraft(rawValue) : normalizeIntegerDraft(rawValue);
    setDisplayValue(nextDisplayValue);

    const parsed = parseDraftValue(nextDisplayValue);
    if (parsed !== null) {
      const nextValue = allowsDecimal ? parsed : Math.round(parsed);
      onChange(clamp(nextValue, min, max));
    }
  };

  const handleBlur = () => {
    const normalizedValue = normalizeCommittedValue(displayValue, min, max, step);
    setIsEditing(false);
    setDisplayValue(formatNumberForInput(normalizedValue, step));
    onChange(normalizedValue);
  };

  return (
    <input
      className="calculator-number-input"
      type="text"
      inputMode={allowsDecimal ? 'decimal' : 'numeric'}
      pattern={allowsDecimal ? '[0-9]*[.]?[0-9]*' : '[0-9]*'}
      min={min}
      max={max}
      value={displayValue}
      onFocus={(event) => {
        setIsEditing(true);
        event.currentTarget.select();
      }}
      onChange={(event) => handleChange(event.currentTarget.value)}
      onBlur={handleBlur}
      aria-label={label}
      data-testid={testId ? `${testId}-number` : undefined}
    />
  );
}

function RangeControl({ testId, label, value, min, max, step, suffix, helper, onChange }: RangeControlProps) {
  const handleChange = (nextValue: number) => onChange(clamp(nextValue, min, max));

  return (
    <label className="calculator-control">
      <span className="calculator-label-row">
        <span>{label}</span>
        <strong>
          {value.toLocaleString('en-NZ', {
            maximumFractionDigits: step < 1 ? 2 : 0,
            minimumFractionDigits: step < 1 ? 2 : 0
          })}
          {suffix}
        </strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => handleChange(Number(event.currentTarget.value))}
        data-testid={testId ? `${testId}-range` : undefined}
      />
      <CalculatorNumberInput
        testId={testId}
        label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
      {helper && <span className="calculator-helper">{helper}</span>}
    </label>
  );
}

function ToggleButton({
  active,
  children,
  onClick
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button className={active ? 'calculator-toggle active' : 'calculator-toggle'} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function MetricCard({ label, value, helper, referenceValue }: { label: string; value: string; helper?: string; referenceValue?: string }) {
  return (
    <article className="calculator-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      {referenceValue && <small className="calculator-reference-value">{referenceValue}</small>}
      {helper && <p>{helper}</p>}
    </article>
  );
}

function SimpleBar({ label, value, max, tone }: { label: string; value: number; max: number; tone?: string }) {
  const width = max > 0 ? clamp((value / max) * 100, 0, 100) : 0;

  return (
    <div className="calculator-bar-row">
      <span>{label}</span>
      <div className="calculator-bar-track" aria-hidden="true">
        <span className={`calculator-bar-fill ${tone ?? ''}`} style={{ width: `${width}%` }} />
      </div>
      <strong>{formatCurrency(value)}</strong>
    </div>
  );
}

function uniqueNumbers(values: number[]) {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = value.toFixed(2);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function NzLifeRealityCalculator({ locale, path }: NzLifeRealityCalculatorProps) {
  const isJa = locale === 'ja';
  const t = (ja: string, en: string) => (isJa ? ja : en);
  const getExpenseLabel = (id: string, fallback: string) =>
    expenseLabels[locale][id as keyof typeof expenseLabels.ja] ?? fallback;
  const getResultNote = (note: string) => (isJa ? note : englishNotesByJapanese[note] ?? note);
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultNzLifeInputs);
  const [referenceRate, setReferenceRate] = useState(fallbackNzdJpyRate);
  const [rateStatus, setRateStatus] = useState<RateStatus>('loading');
  const [rateSource, setRateSource] = useState<ReferenceRateResult | null>(null);
  const manualRateOverrideRef = useRef(false);
  const result = useMemo(() => calculateNzLifeReality(inputs), [inputs]);
  const impacts = useMemo(() => impactEstimates(inputs), [inputs]);
  const monthlyRemainingMax = Math.max(result.monthlyIncomeUsedForCalculation, result.monthlyExpenses, 1);
  const expenseTotal = Math.max(result.monthlyExpenses, 1);
  const formatReferenceJpy = (value: number) => formatJpy(convertNzdToJpy(value, referenceRate));
  const wagePresets = [
    {
      label: t('最低賃金（2026年4月〜）', 'Adult minimum wage (from April 2026)'),
      value: referenceWages.adultMinimum
    },
    { label: 'Living Wage 2025/26', value: referenceWages.livingWage },
    { label: t('30ドル', '$30'), value: 30 },
    { label: t('35ドル', '$35'), value: 35 }
  ];
  const wageScenarios = uniqueNumbers([
    referenceWages.adultMinimum,
    referenceWages.livingWage,
    30,
    35,
    inputs.hourlyWage
  ]).map((wage) => ({
    label: `$${wage.toFixed(wage % 1 === 0 ? 0 : 2)}`,
    value: calculateWithOverrides(inputs, { hourlyWage: wage }, true).monthlyRemaining
  }));
  const hourScenarios = uniqueNumbers([20, 30, 40, inputs.workHoursPerWeek]).map((hours) => ({
    label: `${hours}h`,
    value: calculateWithOverrides(inputs, { workHoursPerWeek: hours }, true).monthlyRemaining
  }));
  const carScenarios = inputs.ownsCar
    ? [
        { label: t('現在: 車あり', 'Current: with a car'), value: result.monthlyRemaining },
        {
          label: t('車なしにした場合', 'Without a car'),
          value: calculateWithOverrides(inputs, { ownsCar: false }).monthlyRemaining
        }
      ]
    : [
        { label: t('現在: 車なし', 'Current: without a car'), value: result.monthlyRemaining },
        {
          label: t('車ありサンプル', 'Sample car costs'),
          value: calculateWithOverrides(inputs, { ownsCar: true, ...sampleCarCosts }).monthlyRemaining
        }
      ];
  const savingsProgress = Math.min(Math.max(result.savingsAchievementRate, 0), 2);

  useEffect(() => {
    const controller = new AbortController();
    setRateStatus('loading');

    fetchNzdJpyReferenceRate(controller.signal)
      .then((rateResult) => {
        setRateSource(rateResult);

        if (!manualRateOverrideRef.current) {
          setReferenceRate(rateResult.rate);
          setRateStatus('success');
        }
      })
      .catch(() => {
        if (controller.signal.aborted) return;

        setRateSource(null);
        if (!manualRateOverrideRef.current) {
          setRateStatus('fallback');
        }
      });

    return () => controller.abort();
  }, []);

  const handleReferenceRateChange = (value: number) => {
    manualRateOverrideRef.current = true;
    setReferenceRate(sanitizeNzdJpyRate(value));
    setRateStatus('manual');
  };

  useReveal(`${locale}:${path}`);
  useMeta({
    locale,
    path,
    title: t('NZ生活リアリティ計算機 | SoraJPNZ', 'NZ Life Reality Calculator | SoraJPNZ'),
    description: t(
      '時給、勤務時間、家賃、車コスト、貯金目標を動かしながら、NZ生活の現実感と脆さを確認するSoraJPNZの試算ツールです。',
      'Test how wage, work hours, rent, car costs, savings goals, and an emergency buffer affect the realism of a New Zealand living setup.'
    ),
    image: assets.projectsBg,
    noIndex: true
  });

  return (
    <div className="page calculator-page">
      <Header locale={locale} path={path} />
      <main>
        <section className="calculator-hero">
          <div className="motion-layer">
            <img className="motion-image" src={assets.projectsBg} alt="" fetchPriority="high" decoding="async" />
            <div className="calculator-hero-wash" />
          </div>
          <div className="section-inner calculator-hero-inner animate-slide-up">
            <p className="eyebrow">SoraJPNZ Tools</p>
            <h1>{t('NZ生活リアリティ計算機', 'NZ Life Reality Calculator')}</h1>
            <p>{t(
              '時給、勤務時間、家賃、車コスト、貯金目標を動かしながら、ニュージーランド生活がどれくらい現実的か、どこが脆くなりやすいかを見るための試算ツールです。',
              'Adjust hourly wage, work hours, rent, car costs, and savings goals to see how realistic or fragile a New Zealand living setup may be.'
            )}</p>
            <div className="calculator-notice">
              {t(
                'これは個人の判断を助ける概算メモです。税務、移民、雇用、法律、投資、金融の助言ではありません。',
                'This is a rough decision-support estimate, not tax, immigration, employment, legal, investment, or financial advice.'
              )}
            </div>
          </div>
        </section>

        <section className="calculator-section">
          <div className="section-inner calculator-layout">
            <form className="calculator-input-panel reveal-on-scroll" onSubmit={(event) => event.preventDefault()}>
              <div className="calculator-panel-heading">
                <p className="eyebrow">Inputs</p>
                <h2>{t('前提を動かす', 'Test your assumptions')}</h2>
                <p>{t(
                  '数字はこのブラウザ上で試算するだけで、保存されません。最低賃金など制度上の数字は変わるため、必ず公式情報で確認してください。',
                  'The numbers are calculated in this browser and are not stored. Wage rules and other official figures can change, so always check current official sources.'
                )}</p>
              </div>

              <fieldset className="calculator-fieldset">
                <legend>{t('収入', 'Income')}</legend>
                <div className="calculator-preset-row" aria-label={t('時給プリセット', 'Hourly wage presets')}>
                  {wagePresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      className={Math.abs(inputs.hourlyWage - preset.value) < 0.01 ? 'calculator-preset active' : 'calculator-preset'}
                      onClick={() => updateInput(setInputs, { hourlyWage: preset.value })}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <RangeControl
                  testId="hourly-wage"
                  label={t('時給', 'Hourly wage')}
                  value={inputs.hourlyWage}
                  min={referenceWages.adultMinimum}
                  max={60}
                  step={0.05}
                  suffix="/h"
                  helper={t(
                    '最低賃金・Living Wageなどは時期によって変わるため、必ず最新の公式情報で確認してください。',
                    'Minimum wage and Living Wage figures change over time. Always confirm the latest official information.'
                  )}
                  onChange={(value) => updateInput(setInputs, { hourlyWage: value })}
                />
                <RangeControl
                  testId="weekly-work-hours"
                  label={t('週の勤務時間', 'Work hours per week')}
                  value={inputs.workHoursPerWeek}
                  min={10}
                  max={50}
                  step={1}
                  suffix="h"
                  onChange={(value) => updateInput(setInputs, { workHoursPerWeek: value })}
                />

                <div className="calculator-toggle-row" role="group" aria-label={t('収入の計算モード', 'Income calculation mode')}>
                  <ToggleButton active={inputs.incomeMode === 'rough'} onClick={() => updateInput(setInputs, { incomeMode: 'rough' })}>
                    {t('概算モード', 'Rough estimate')}
                  </ToggleButton>
                  <ToggleButton active={inputs.incomeMode === 'manual'} onClick={() => updateInput(setInputs, { incomeMode: 'manual' })}>
                    {t('手取りを直接入力', 'Enter take-home pay')}
                  </ToggleButton>
                </div>
                <p className="calculator-helper">
                  {t(
                    `概算モードは、税引き前月収の約${Math.round(roughTakeHomeRate * 100)}%を手取り目安として使います。正確なPAYE、税コード、KiwiSaver、Student Loan、ACC、控除はIRDまたは専門家で確認してください。`,
                    `Rough mode uses about ${Math.round(roughTakeHomeRate * 100)}% of gross monthly income as an indicative take-home amount. Check PAYE, tax code, KiwiSaver, student loan, ACC, and deductions with Inland Revenue or a qualified professional.`
                  )}
                </p>
                {inputs.incomeMode === 'manual' && (
                  <RangeControl
                    testId="manual-monthly-take-home"
                    label={t('月の手取り収入', 'Monthly take-home income')}
                    value={inputs.manualMonthlyTakeHome}
                    min={0}
                    max={9000}
                    step={50}
                    suffix={t('/月', '/mo')}
                    helper={t(
                      '給与明細やIRDの情報を見て、自分の手取りに近い数字を入れてください。',
                      'Use a recent payslip or Inland Revenue information to enter a figure close to your actual take-home pay.'
                    )}
                    onChange={(value) => updateInput(setInputs, { manualMonthlyTakeHome: value })}
                  />
                )}
              </fieldset>

              <fieldset className="calculator-fieldset">
                <legend>{t('毎週かかる生活費', 'Weekly living costs')}</legend>
                <RangeControl
                  testId="weekly-rent"
                  label={t('家賃', 'Weekly rent')}
                  value={inputs.weeklyRent}
                  min={150}
                  max={700}
                  step={10}
                  suffix={t('/週', '/wk')}
                  onChange={(value) => updateInput(setInputs, { weeklyRent: value })}
                />
                <RangeControl
                  testId="weekly-food"
                  label={t('食費', 'Weekly food')}
                  value={inputs.weeklyFood}
                  min={50}
                  max={300}
                  step={10}
                  suffix={t('/週', '/wk')}
                  onChange={(value) => updateInput(setInputs, { weeklyFood: value })}
                />
                <RangeControl
                  testId="weekly-transport"
                  label={t('交通費', 'Weekly transport')}
                  value={inputs.weeklyTransport}
                  min={0}
                  max={250}
                  step={10}
                  suffix={t('/週', '/wk')}
                  onChange={(value) => updateInput(setInputs, { weeklyTransport: value })}
                />
              </fieldset>

              <fieldset className="calculator-fieldset">
                <legend>{t('車の有無', 'Car')}</legend>
                <div className="calculator-toggle-row" role="group" aria-label={t('車所有の有無', 'Car ownership')}>
                  <ToggleButton active={!inputs.ownsCar} onClick={() => updateInput(setInputs, { ownsCar: false })}>
                    {t('車なし', 'No car')}
                  </ToggleButton>
                  <ToggleButton active={inputs.ownsCar} onClick={() => updateInput(setInputs, { ownsCar: true })}>
                    {t('車あり', 'Own a car')}
                  </ToggleButton>
                </div>
                {inputs.ownsCar && (
                  <div className="calculator-nested-grid">
                    <RangeControl
                      testId="weekly-fuel"
                      label={t('燃料', 'Fuel')}
                      value={inputs.weeklyFuel}
                      min={0}
                      max={250}
                      step={10}
                      suffix={t('/週', '/wk')}
                      onChange={(value) => updateInput(setInputs, { weeklyFuel: value })}
                    />
                    <RangeControl
                      testId="weekly-parking"
                      label={t('駐車場', 'Parking')}
                      value={inputs.weeklyParking}
                      min={0}
                      max={250}
                      step={10}
                      suffix={t('/週', '/wk')}
                      onChange={(value) => updateInput(setInputs, { weeklyParking: value })}
                    />
                    <RangeControl
                      testId="monthly-car-insurance"
                      label={t('車の保険', 'Car insurance')}
                      value={inputs.monthlyCarInsurance}
                      min={0}
                      max={300}
                      step={10}
                      suffix={t('/月', '/mo')}
                      onChange={(value) => updateInput(setInputs, { monthlyCarInsurance: value })}
                    />
                    <RangeControl
                      testId="monthly-car-maintenance"
                      label={t('整備・WOF・rego積立', 'Maintenance, WOF and rego allowance')}
                      value={inputs.monthlyCarMaintenance}
                      min={0}
                      max={400}
                      step={10}
                      suffix={t('/月', '/mo')}
                      onChange={(value) => updateInput(setInputs, { monthlyCarMaintenance: value })}
                    />
                  </div>
                )}
              </fieldset>

              <fieldset className="calculator-fieldset">
                <legend>{t('毎月かかる固定費', 'Monthly fixed costs')}</legend>
                <div className="calculator-nested-grid">
                  <RangeControl
                    testId="monthly-phone-internet"
                    label={t('電話・インターネット', 'Phone and internet')}
                    value={inputs.monthlyPhoneInternet}
                    min={0}
                    max={250}
                    step={10}
                    suffix={t('/月', '/mo')}
                    onChange={(value) => updateInput(setInputs, { monthlyPhoneInternet: value })}
                  />
                  <RangeControl
                    testId="monthly-insurance"
                    label={t('保険', 'Insurance')}
                    value={inputs.monthlyInsurance}
                    min={0}
                    max={300}
                    step={10}
                    suffix={t('/月', '/mo')}
                    onChange={(value) => updateInput(setInputs, { monthlyInsurance: value })}
                  />
                  <RangeControl
                    testId="monthly-subscriptions"
                    label={t('サブスク', 'Subscriptions')}
                    value={inputs.monthlySubscriptions}
                    min={0}
                    max={250}
                    step={10}
                    suffix={t('/月', '/mo')}
                    onChange={(value) => updateInput(setInputs, { monthlySubscriptions: value })}
                  />
                  <RangeControl
                    testId="monthly-other-fixed"
                    label={t('その他固定費', 'Other fixed costs')}
                    value={inputs.monthlyOtherFixed}
                    min={0}
                    max={600}
                    step={10}
                    suffix={t('/月', '/mo')}
                    onChange={(value) => updateInput(setInputs, { monthlyOtherFixed: value })}
                  />
                </div>
              </fieldset>

              <fieldset className="calculator-fieldset">
                <legend>{t('貯金と緊急資金', 'Savings and emergency buffer')}</legend>
                <RangeControl
                  testId="monthly-savings-target"
                  label={t('月の貯金目標', 'Monthly savings target')}
                  value={inputs.monthlySavingsTarget}
                  min={0}
                  max={3000}
                  step={50}
                  suffix={t('/月', '/mo')}
                  onChange={(value) => updateInput(setInputs, { monthlySavingsTarget: value })}
                />
                <RangeControl
                  testId="emergency-buffer-months"
                  label={t('緊急資金の目標', 'Emergency buffer target')}
                  value={inputs.emergencyBufferMonths}
                  min={1}
                  max={12}
                  step={1}
                  suffix={t('か月分', ' months')}
                  helper={t(
                    '生活必需費を何か月分持っておきたいか。現在の貯金額は0として積み上げ期間を見ます。',
                    'Choose how many months of essential costs you want to hold. Build time is estimated from zero current savings.'
                  )}
                  onChange={(value) => updateInput(setInputs, { emergencyBufferMonths: value })}
                />
              </fieldset>
            </form>

            <aside className="calculator-results-panel reveal-on-scroll" aria-live="polite">
              <div className={`calculator-status ${result.status}`}>
                <span>{t('判定', 'Status')}</span>
                <strong>{statusLabels[locale][result.status]}</strong>
                <p>
                  {t(
                    `月の残りは ${formatCurrency(result.monthlyRemaining)} / ${formatReferenceJpy(result.monthlyRemaining)}。これは完成された判断ではなく、前提を動かすためのスタート地点です。`,
                    `The estimated amount left per month is ${formatCurrency(result.monthlyRemaining)} / ${formatReferenceJpy(result.monthlyRemaining)}. This is a starting point for testing assumptions, not a final answer.`
                  )}
                </p>
              </div>

              <div className="calculator-fx-panel">
                <div className="calculator-fx-heading">
                  <h2>{t('日本円参考換算', 'JPY reference conversion')}</h2>
                  <p>{t(
                    'NZDの金額を日本円でも感覚的に見たい場合の参考表示です。税務・会計・送金・投資判断には使わないでください。',
                    'Use this only to understand the scale of NZD amounts in Japanese yen. Do not use it for tax, accounting, remittance, or investment decisions.'
                  )}</p>
                </div>
                <div className="calculator-fx-rate-card">
                  <span>
                    {rateStatus === 'loading'
                      ? t('参考レートを取得中', 'Loading reference rate')
                      : rateStatus === 'success'
                        ? t('取得した参考レート', 'Fetched reference rate')
                        : rateStatus === 'manual'
                          ? t('手入力の参考レート', 'Manual reference rate')
                          : t('取得できなかったため手入力に切り替え', 'Rate unavailable: using manual fallback')}
                  </span>
                  <strong>1 NZD ≒ {formatNzdJpyRate(referenceRate)}</strong>
                  {rateSource && rateStatus === 'success' && (
                    <p>
                      Source:{' '}
                      <a href={rateSource.sourceUrl} target="_blank" rel="noopener noreferrer">
                        {rateSource.source}
                      </a>
                      {rateSource.date ? ` / Updated: ${rateSource.date}` : ''}
                    </p>
                  )}
                  {rateSource && rateStatus === 'manual' && (
                    <p>
                      {t('取得参考', 'Fetched reference')}: 1 NZD ≒ {formatNzdJpyRate(rateSource.rate)} / Source:{' '}
                      <a href={rateSource.sourceUrl} target="_blank" rel="noopener noreferrer">
                        {rateSource.source}
                      </a>
                      {rateSource.date ? ` / Updated: ${rateSource.date}` : ''}
                    </p>
                  )}
                </div>
                <label className="calculator-fx-input">
                  <span>{t('手動で参考レートを上書き', 'Override the reference rate manually')}</span>
                  <span className="calculator-fx-input-row">
                    <span>1 NZD =</span>
                    <CalculatorNumberInput
                      testId="nzd-jpy-rate"
                      label={t('NZD JPY 参考レート', 'NZD to JPY reference rate')}
                      value={referenceRate}
                      min={1}
                      max={300}
                      step={0.01}
                      onChange={handleReferenceRateChange}
                    />
                    <span>{t('円', 'JPY')}</span>
                  </span>
                </label>
                <p className="calculator-helper">
                  {t(
                    '日本円換算は生活感をつかむための参考です。為替レートは変動します。税務・会計・送金・投資判断には使用しないでください。',
                    'The JPY conversion is a lifestyle reference only. Exchange rates change, so do not use it for tax, accounting, remittance, or investment decisions.'
                  )}
                </p>
                <dl className="calculator-fx-summary-list">
                  <div>
                    <dt>{t('家賃', 'Weekly rent')}</dt>
                    <dd>
                      {formatCurrency(inputs.weeklyRent)}{t('/週', '/wk')} / {formatReferenceJpy(inputs.weeklyRent)}
                    </dd>
                  </div>
                  <div>
                    <dt>{t('月の貯金目標', 'Monthly savings target')}</dt>
                    <dd>
                      {formatCurrency(inputs.monthlySavingsTarget)}{t('/月', '/mo')} / {formatReferenceJpy(inputs.monthlySavingsTarget)}
                    </dd>
                  </div>
                  <div>
                    <dt>{t('緊急資金目標', 'Emergency buffer target')}</dt>
                    <dd>
                      {formatCurrency(result.emergencyBufferTargetAmount)} / {formatReferenceJpy(result.emergencyBufferTargetAmount)}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="calculator-metric-grid">
                <MetricCard label={t('税引き前 週収', 'Gross weekly income')} value={formatCurrency(result.weeklyGrossIncome)} />
                <MetricCard label={t('税引き前 月収', 'Gross monthly income')} value={formatCurrency(result.monthlyGrossIncome)} />
                <MetricCard
                  label={t('計算に使う月収', 'Monthly income used')}
                  value={formatCurrency(result.monthlyIncomeUsedForCalculation)}
                  referenceValue={formatReferenceJpy(result.monthlyIncomeUsedForCalculation)}
                  helper={inputs.incomeMode === 'manual' ? t('手取り入力を使用', 'Manual take-home used') : t('概算手取りを使用', 'Rough take-home used')}
                />
                <MetricCard label={t('月の生活費', 'Monthly living costs')} value={formatCurrency(result.monthlyExpenses)} referenceValue={formatReferenceJpy(result.monthlyExpenses)} />
                <MetricCard label={t('月の残り', 'Amount left per month')} value={formatCurrency(result.monthlyRemaining)} referenceValue={formatReferenceJpy(result.monthlyRemaining)} />
              </div>

              <div className="calculator-visual-panel">
                <h2>{t('収入と支出', 'Income and expenses')}</h2>
                <SimpleBar label={t('計算用月収', 'Monthly income used')} value={result.monthlyIncomeUsedForCalculation} max={monthlyRemainingMax} tone="income" />
                <SimpleBar label={t('月の生活費', 'Monthly living costs')} value={result.monthlyExpenses} max={monthlyRemainingMax} tone="expense" />
                <SimpleBar label={t('月の残り', 'Amount left per month')} value={Math.max(0, result.monthlyRemaining)} max={monthlyRemainingMax} tone="remaining" />
              </div>

              <div className="calculator-visual-panel">
                <h2>{t('支出の内訳', 'Expense breakdown')}</h2>
                <div className="calculator-breakdown-bar" aria-label={t('支出内訳', 'Expense breakdown')}>
                  {result.expenseBreakdown.map((item) => (
                    <span
                      key={item.id}
                      className={`breakdown-segment ${item.id}`}
                      style={{ width: `${(item.monthly / expenseTotal) * 100}%` }}
                      title={`${getExpenseLabel(item.id, item.label)}: ${formatCurrency(item.monthly)}`}
                    />
                  ))}
                </div>
                <div className="calculator-breakdown-list">
                  {result.expenseBreakdown.map((item) => (
                    <span key={item.id}>
                      <i className={`breakdown-dot ${item.id}`} />
                      {getExpenseLabel(item.id, item.label)}: {formatCurrency(item.monthly)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="calculator-visual-panel two-column">
                <div>
                  <h2>{t('貯金目標', 'Savings target')}</h2>
                  <div className="calculator-bar-track tall" aria-hidden="true">
                    <span className="calculator-bar-fill savings" style={{ width: `${clamp((savingsProgress / 1) * 100, 0, 100)}%` }} />
                  </div>
                  <p>{t(`${formatPercent(result.savingsAchievementRate, locale)} 達成`, `${formatPercent(result.savingsAchievementRate, locale)} achieved`)}</p>
                </div>
                <div>
                  <h2>{t('緊急資金', 'Emergency buffer')}</h2>
                  <strong className="calculator-big-number">{formatMonths(result.emergencyBufferBuildMonths, locale)}</strong>
                  <p>
                    {t('目標額', 'Target')} {formatCurrency(result.emergencyBufferTargetAmount)} / {formatReferenceJpy(result.emergencyBufferTargetAmount)}
                  </p>
                </div>
              </div>

              <div className="calculator-notes">
                <h2>{t('この前提で気になる点', 'Points to review under these assumptions')}</h2>
                <ul>
                  {result.notes.map((note) => (
                    <li key={note}>{getResultNote(note)}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="calculator-section soft">
          <div className="section-inner calculator-scenario-layout">
            <div className="section-heading left reveal-on-scroll">
              <p className="eyebrow">Scenarios</p>
              <h2>{t('前提を変えるとどうなるか', 'What changes when the assumptions change?')}</h2>
              <p>{t(
                'ここでは「どの数字が効くか」を見るために、同じ生活費のまま時給、勤務時間、車コストだけを動かしています。手取り入力モードでも、時給・時間比較は概算手取り率で表示します。',
                'These comparisons keep other living costs the same and change only wage, work hours, or car costs. Wage and hours scenarios use the rough take-home rate even when manual income mode is selected.'
              )}</p>
            </div>

            <div className="calculator-scenario-grid">
              <ScenarioCard title={t('時給の比較', 'Wage comparison')} items={wageScenarios} />
              <ScenarioCard title={t('勤務時間の比較', 'Work-hours comparison')} items={hourScenarios} />
              <ScenarioCard title={t('車コストの比較', 'Car-cost comparison')} items={carScenarios} />
            </div>
          </div>
        </section>

        <section className="calculator-section">
          <div className="section-inner calculator-insight-grid">
            <div className="calculator-insight-card reveal-on-scroll">
              <p className="eyebrow">Levers</p>
              <h2>{t('どこを変えると効くか', 'What moves the result?')}</h2>
              <ul className="calculator-impact-list">
                <li>
                  <strong>{t('時給 +$1', 'Hourly wage +$1')}</strong>
                  <span>{t(
                    `月の手取り目安が約 ${formatCurrency(impacts.hourlyWageImpact)} 増える想定`,
                    `Indicative monthly take-home increases by about ${formatCurrency(impacts.hourlyWageImpact)}`
                  )}</span>
                </li>
                <li>
                  <strong>{t('週 +5時間', '+5 hours per week')}</strong>
                  <span>{t(
                    `月の手取り目安が約 ${formatCurrency(impacts.fiveHoursImpact)} 増える想定`,
                    `Indicative monthly take-home increases by about ${formatCurrency(impacts.fiveHoursImpact)}`
                  )}</span>
                </li>
                <li>
                  <strong>{t('家賃 -$50/週', 'Rent -$50/week')}</strong>
                  <span>{t(
                    `月の余力が約 ${formatCurrency(impacts.rentFiftyImpact)} 変わる想定`,
                    `The amount left per month changes by about ${formatCurrency(impacts.rentFiftyImpact)}`
                  )}</span>
                </li>
                <li>
                  <strong>{t('車コスト', 'Car costs')}</strong>
                  <span>{t(
                    `サンプルでは月に約 ${formatCurrency(impacts.carImpact)} の差になりやすい`,
                    `The sample car setup changes the monthly result by about ${formatCurrency(impacts.carImpact)}`
                  )}</span>
                </li>
              </ul>
            </div>

            <div className="calculator-disclaimer reveal-on-scroll">
              <p className="eyebrow">Important</p>
              <h2>{t('注意事項', 'Things to keep in mind')}</h2>
              <p>{t(
                'この計算機は概算です。税務、移民、雇用、法律、金融、投資の助言ではありません。正確なPAYE、税コード、KiwiSaver、Student Loan、ACC、控除はIRDまたは資格のある専門家で確認してください。',
                'This calculator is an estimate, not tax, immigration, employment, legal, investment, or financial advice. Confirm PAYE, tax code, KiwiSaver, student loan, ACC, and deductions with Inland Revenue or a qualified professional.'
              )}</p>
              <p>{t(
                'ビザ、滞在資格、就労条件、永住権に関する判断は、必ずNew Zealand政府の公式情報またはLicensed Immigration Adviserに確認してください。SoraJPNZは移民アドバイスを提供しません。',
                'For visa, immigration status, work conditions, or residence decisions, check New Zealand government sources or a Licensed Immigration Adviser. SoraJPNZ does not provide immigration advice.'
              )}</p>
              <p>{t(
                '入力した数字はサーバーに送信・保存されません。ブラウザ上で表示するためだけに使われます。',
                'Your inputs are not sent to a server or stored. They are used only for calculations in this browser.'
              )}</p>
            </div>
          </div>
        </section>

        <section className="next-section calculator-next">
          <div className="section-inner next-inner">
            <h2>{t('次に準備しているもの', 'What is next')}</h2>
            <p>{t(
              '次は、NZ生活費テンプレートと仕事探し管理シートを準備中です。',
              'A New Zealand living-cost template and job-search tracker are planned next.'
            )}</p>
            <div className="button-row left">
              <a className="button primary" href={links.youtube} target="_blank" rel="noopener noreferrer">
                <span>{t('YouTubeを見る', 'Watch YouTube')}</span>
                <i className="ri-youtube-fill" />
              </a>
              <a className="button secondary" href={`/${locale}/contact`}>
                <span>{t('問い合わせる', 'Contact')}</span>
                <i className="ri-mail-line" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}

function ScenarioCard({ title, items }: { title: string; items: Array<{ label: string; value: number }> }) {
  const values = items.map((item) => item.value);
  const max = Math.max(...values.map((value) => Math.abs(value)), 1);

  return (
    <article className="calculator-scenario-card reveal-on-scroll">
      <h3>{title}</h3>
      <div className="calculator-scenario-list">
        {items.map((item) => {
          const width = clamp((Math.abs(item.value) / max) * 100, 4, 100);
          return (
            <div className="calculator-scenario-item" key={`${title}-${item.label}`}>
              <span>{item.label}</span>
              <div className="calculator-scenario-track" aria-hidden="true">
                <span className={item.value < 0 ? 'negative' : ''} style={{ width: `${width}%` }} />
              </div>
              <strong>{formatCurrency(item.value)}</strong>
            </div>
          );
        })}
      </div>
    </article>
  );
}
