import { useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { assets, links, Locale } from '../lib/content';
import {
  calculateNzLifeReality,
  calculateWithOverrides,
  CalculatorInputs,
  defaultNzLifeInputs,
  impactEstimates,
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

const wagePresets = [
  { label: '最低賃金', value: 23.95 },
  { label: 'Living Wage', value: 29.9 },
  { label: '30ドル', value: 30 },
  { label: 'Median Wage', value: 35 }
];

const sampleCarCosts = {
  weeklyFuel: 60,
  weeklyParking: 20,
  monthlyCarInsurance: 80,
  monthlyCarMaintenance: 120
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatCurrency(value: number) {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? '-' : '';
  return `${sign}$${Math.abs(rounded).toLocaleString('en-NZ')}`;
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return '十分';
  return `${Math.round(value * 100)}%`;
}

function formatMonths(value: number) {
  if (!Number.isFinite(value)) return '見通しにくい';
  if (value <= 0) return '0か月';
  if (value < 1) return '1か月未満';
  return `約${Math.ceil(value)}か月`;
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
      aria-label={`${label} の数値入力`}
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

function MetricCard({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <article className="calculator-metric">
      <span>{label}</span>
      <strong>{value}</strong>
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
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultNzLifeInputs);
  const result = useMemo(() => calculateNzLifeReality(inputs), [inputs]);
  const impacts = useMemo(() => impactEstimates(inputs), [inputs]);
  const monthlyRemainingMax = Math.max(result.monthlyIncomeUsedForCalculation, result.monthlyExpenses, 1);
  const expenseTotal = Math.max(result.monthlyExpenses, 1);
  const wageScenarios = uniqueNumbers([23.95, 29.9, 30, 35, inputs.hourlyWage]).map((wage) => ({
    label: `$${wage.toFixed(wage % 1 === 0 ? 0 : 2)}`,
    value: calculateWithOverrides(inputs, { hourlyWage: wage }, true).monthlyRemaining
  }));
  const hourScenarios = uniqueNumbers([20, 30, 40, inputs.workHoursPerWeek]).map((hours) => ({
    label: `${hours}h`,
    value: calculateWithOverrides(inputs, { workHoursPerWeek: hours }, true).monthlyRemaining
  }));
  const carScenarios = inputs.ownsCar
    ? [
        { label: '現在: 車あり', value: result.monthlyRemaining },
        { label: '車なしにした場合', value: calculateWithOverrides(inputs, { ownsCar: false }).monthlyRemaining }
      ]
    : [
        { label: '現在: 車なし', value: result.monthlyRemaining },
        { label: '車ありサンプル', value: calculateWithOverrides(inputs, { ownsCar: true, ...sampleCarCosts }).monthlyRemaining }
      ];
  const savingsProgress = Math.min(Math.max(result.savingsAchievementRate, 0), 2);

  useReveal();
  useMeta({
    locale,
    path,
    title: 'NZ生活リアリティ計算機 | SoraJPNZ',
    description:
      '時給、勤務時間、家賃、車コスト、貯金目標を動かしながら、NZ生活の現実感と脆さを確認するSoraJPNZの試算ツールです。',
    image: assets.projectsBg,
    noIndex: true,
    alternates: false
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
            <h1>NZ生活リアリティ計算機</h1>
            <p>
              時給、勤務時間、家賃、車コスト、貯金目標を動かしながら、ニュージーランド生活がどれくらい現実的か、どこが脆くなりやすいかを見るための試算ツールです。
            </p>
            <div className="calculator-notice">
              これは個人の判断を助ける概算メモです。税務、移民、雇用、法律、投資、金融の助言ではありません。
            </div>
          </div>
        </section>

        <section className="calculator-section">
          <div className="section-inner calculator-layout">
            <form className="calculator-input-panel reveal-on-scroll" onSubmit={(event) => event.preventDefault()}>
              <div className="calculator-panel-heading">
                <p className="eyebrow">Inputs</p>
                <h2>前提を動かす</h2>
                <p>
                  数字はこのブラウザ上で試算するだけで、保存されません。最低賃金など制度上の数字は変わるため、必ず公式情報で確認してください。
                </p>
              </div>

              <fieldset className="calculator-fieldset">
                <legend>収入</legend>
                <div className="calculator-preset-row" aria-label="時給プリセット">
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
                  label="時給"
                  value={inputs.hourlyWage}
                  min={23.95}
                  max={60}
                  step={0.05}
                  suffix="/h"
                  helper="最低賃金・Living Wage・Median Wageなどは必ず最新情報で確認してください。"
                  onChange={(value) => updateInput(setInputs, { hourlyWage: value })}
                />
                <RangeControl
                  testId="weekly-work-hours"
                  label="週の勤務時間"
                  value={inputs.workHoursPerWeek}
                  min={10}
                  max={50}
                  step={1}
                  suffix="h"
                  onChange={(value) => updateInput(setInputs, { workHoursPerWeek: value })}
                />

                <div className="calculator-toggle-row" role="group" aria-label="収入の計算モード">
                  <ToggleButton active={inputs.incomeMode === 'rough'} onClick={() => updateInput(setInputs, { incomeMode: 'rough' })}>
                    概算モード
                  </ToggleButton>
                  <ToggleButton active={inputs.incomeMode === 'manual'} onClick={() => updateInput(setInputs, { incomeMode: 'manual' })}>
                    手取りを直接入力
                  </ToggleButton>
                </div>
                <p className="calculator-helper">
                  概算モードは、税引き前月収の約{Math.round(roughTakeHomeRate * 100)}%を手取り目安として使います。正確なPAYE、税コード、KiwiSaver、Student Loan、ACC、控除はIRDまたは専門家で確認してください。
                </p>
                {inputs.incomeMode === 'manual' && (
                  <RangeControl
                    testId="manual-monthly-take-home"
                    label="月の手取り収入"
                    value={inputs.manualMonthlyTakeHome}
                    min={0}
                    max={9000}
                    step={50}
                    suffix="/月"
                    helper="給与明細やIRDの情報を見て、自分の手取りに近い数字を入れてください。"
                    onChange={(value) => updateInput(setInputs, { manualMonthlyTakeHome: value })}
                  />
                )}
              </fieldset>

              <fieldset className="calculator-fieldset">
                <legend>毎週かかる生活費</legend>
                <RangeControl
                  testId="weekly-rent"
                  label="家賃"
                  value={inputs.weeklyRent}
                  min={150}
                  max={700}
                  step={10}
                  suffix="/週"
                  onChange={(value) => updateInput(setInputs, { weeklyRent: value })}
                />
                <RangeControl
                  testId="weekly-food"
                  label="食費"
                  value={inputs.weeklyFood}
                  min={50}
                  max={300}
                  step={10}
                  suffix="/週"
                  onChange={(value) => updateInput(setInputs, { weeklyFood: value })}
                />
                <RangeControl
                  testId="weekly-transport"
                  label="交通費"
                  value={inputs.weeklyTransport}
                  min={0}
                  max={250}
                  step={10}
                  suffix="/週"
                  onChange={(value) => updateInput(setInputs, { weeklyTransport: value })}
                />
              </fieldset>

              <fieldset className="calculator-fieldset">
                <legend>車の有無</legend>
                <div className="calculator-toggle-row" role="group" aria-label="車所有の有無">
                  <ToggleButton active={!inputs.ownsCar} onClick={() => updateInput(setInputs, { ownsCar: false })}>
                    車なし
                  </ToggleButton>
                  <ToggleButton active={inputs.ownsCar} onClick={() => updateInput(setInputs, { ownsCar: true })}>
                    車あり
                  </ToggleButton>
                </div>
                {inputs.ownsCar && (
                  <div className="calculator-nested-grid">
                    <RangeControl
                      testId="weekly-fuel"
                      label="燃料"
                      value={inputs.weeklyFuel}
                      min={0}
                      max={250}
                      step={10}
                      suffix="/週"
                      onChange={(value) => updateInput(setInputs, { weeklyFuel: value })}
                    />
                    <RangeControl
                      testId="weekly-parking"
                      label="駐車場"
                      value={inputs.weeklyParking}
                      min={0}
                      max={250}
                      step={10}
                      suffix="/週"
                      onChange={(value) => updateInput(setInputs, { weeklyParking: value })}
                    />
                    <RangeControl
                      testId="monthly-car-insurance"
                      label="車の保険"
                      value={inputs.monthlyCarInsurance}
                      min={0}
                      max={300}
                      step={10}
                      suffix="/月"
                      onChange={(value) => updateInput(setInputs, { monthlyCarInsurance: value })}
                    />
                    <RangeControl
                      testId="monthly-car-maintenance"
                      label="整備・WOF・rego積立"
                      value={inputs.monthlyCarMaintenance}
                      min={0}
                      max={400}
                      step={10}
                      suffix="/月"
                      onChange={(value) => updateInput(setInputs, { monthlyCarMaintenance: value })}
                    />
                  </div>
                )}
              </fieldset>

              <fieldset className="calculator-fieldset">
                <legend>毎月かかる固定費</legend>
                <div className="calculator-nested-grid">
                  <RangeControl
                    testId="monthly-phone-internet"
                    label="電話・インターネット"
                    value={inputs.monthlyPhoneInternet}
                    min={0}
                    max={250}
                    step={10}
                    suffix="/月"
                    onChange={(value) => updateInput(setInputs, { monthlyPhoneInternet: value })}
                  />
                  <RangeControl
                    testId="monthly-insurance"
                    label="保険"
                    value={inputs.monthlyInsurance}
                    min={0}
                    max={300}
                    step={10}
                    suffix="/月"
                    onChange={(value) => updateInput(setInputs, { monthlyInsurance: value })}
                  />
                  <RangeControl
                    testId="monthly-subscriptions"
                    label="サブスク"
                    value={inputs.monthlySubscriptions}
                    min={0}
                    max={250}
                    step={10}
                    suffix="/月"
                    onChange={(value) => updateInput(setInputs, { monthlySubscriptions: value })}
                  />
                  <RangeControl
                    testId="monthly-other-fixed"
                    label="その他固定費"
                    value={inputs.monthlyOtherFixed}
                    min={0}
                    max={600}
                    step={10}
                    suffix="/月"
                    onChange={(value) => updateInput(setInputs, { monthlyOtherFixed: value })}
                  />
                </div>
              </fieldset>

              <fieldset className="calculator-fieldset">
                <legend>貯金と緊急資金</legend>
                <RangeControl
                  testId="monthly-savings-target"
                  label="月の貯金目標"
                  value={inputs.monthlySavingsTarget}
                  min={0}
                  max={3000}
                  step={50}
                  suffix="/月"
                  onChange={(value) => updateInput(setInputs, { monthlySavingsTarget: value })}
                />
                <RangeControl
                  testId="emergency-buffer-months"
                  label="緊急資金の目標"
                  value={inputs.emergencyBufferMonths}
                  min={1}
                  max={12}
                  step={1}
                  suffix="か月分"
                  helper="生活必需費を何か月分持っておきたいか。現在の貯金額は0として積み上げ期間を見ます。"
                  onChange={(value) => updateInput(setInputs, { emergencyBufferMonths: value })}
                />
              </fieldset>
            </form>

            <aside className="calculator-results-panel reveal-on-scroll" aria-live="polite">
              <div className={`calculator-status ${result.status}`}>
                <span>判定</span>
                <strong>{result.statusLabel}</strong>
                <p>
                  月の残りは {formatCurrency(result.monthlyRemaining)}。これは完成された判断ではなく、前提を動かすためのスタート地点です。
                </p>
              </div>

              <div className="calculator-metric-grid">
                <MetricCard label="税引き前 週収" value={formatCurrency(result.weeklyGrossIncome)} />
                <MetricCard label="税引き前 月収" value={formatCurrency(result.monthlyGrossIncome)} />
                <MetricCard
                  label="計算に使う月収"
                  value={formatCurrency(result.monthlyIncomeUsedForCalculation)}
                  helper={inputs.incomeMode === 'manual' ? '手取り入力を使用' : '概算手取りを使用'}
                />
                <MetricCard label="月の生活費" value={formatCurrency(result.monthlyExpenses)} />
              </div>

              <div className="calculator-visual-panel">
                <h2>収入と支出</h2>
                <SimpleBar label="計算用月収" value={result.monthlyIncomeUsedForCalculation} max={monthlyRemainingMax} tone="income" />
                <SimpleBar label="月の生活費" value={result.monthlyExpenses} max={monthlyRemainingMax} tone="expense" />
                <SimpleBar label="月の残り" value={Math.max(0, result.monthlyRemaining)} max={monthlyRemainingMax} tone="remaining" />
              </div>

              <div className="calculator-visual-panel">
                <h2>支出の内訳</h2>
                <div className="calculator-breakdown-bar" aria-label="支出内訳">
                  {result.expenseBreakdown.map((item) => (
                    <span
                      key={item.id}
                      className={`breakdown-segment ${item.id}`}
                      style={{ width: `${(item.monthly / expenseTotal) * 100}%` }}
                      title={`${item.label}: ${formatCurrency(item.monthly)}`}
                    />
                  ))}
                </div>
                <div className="calculator-breakdown-list">
                  {result.expenseBreakdown.map((item) => (
                    <span key={item.id}>
                      <i className={`breakdown-dot ${item.id}`} />
                      {item.label}: {formatCurrency(item.monthly)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="calculator-visual-panel two-column">
                <div>
                  <h2>貯金目標</h2>
                  <div className="calculator-bar-track tall" aria-hidden="true">
                    <span className="calculator-bar-fill savings" style={{ width: `${clamp((savingsProgress / 1) * 100, 0, 100)}%` }} />
                  </div>
                  <p>{formatPercent(result.savingsAchievementRate)} 達成</p>
                </div>
                <div>
                  <h2>緊急資金</h2>
                  <strong className="calculator-big-number">{formatMonths(result.emergencyBufferBuildMonths)}</strong>
                  <p>目標額 {formatCurrency(result.emergencyBufferTargetAmount)}</p>
                </div>
              </div>

              <div className="calculator-notes">
                <h2>この前提で気になる点</h2>
                <ul>
                  {result.notes.map((note) => (
                    <li key={note}>{note}</li>
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
              <h2>前提を変えるとどうなるか</h2>
              <p>
                ここでは「どの数字が効くか」を見るために、同じ生活費のまま時給、勤務時間、車コストだけを動かしています。
                手取り入力モードでも、時給・時間比較は概算手取り率で表示します。
              </p>
            </div>

            <div className="calculator-scenario-grid">
              <ScenarioCard title="時給の比較" items={wageScenarios} />
              <ScenarioCard title="勤務時間の比較" items={hourScenarios} />
              <ScenarioCard title="車コストの比較" items={carScenarios} />
            </div>
          </div>
        </section>

        <section className="calculator-section">
          <div className="section-inner calculator-insight-grid">
            <div className="calculator-insight-card reveal-on-scroll">
              <p className="eyebrow">Levers</p>
              <h2>どこを変えると効くか</h2>
              <ul className="calculator-impact-list">
                <li>
                  <strong>時給 +$1</strong>
                  <span>月の手取り目安が約 {formatCurrency(impacts.hourlyWageImpact)} 増える想定</span>
                </li>
                <li>
                  <strong>週 +5時間</strong>
                  <span>月の手取り目安が約 {formatCurrency(impacts.fiveHoursImpact)} 増える想定</span>
                </li>
                <li>
                  <strong>家賃 -$50/週</strong>
                  <span>月の余力が約 {formatCurrency(impacts.rentFiftyImpact)} 変わる想定</span>
                </li>
                <li>
                  <strong>車コスト</strong>
                  <span>サンプルでは月に約 {formatCurrency(impacts.carImpact)} の差になりやすい</span>
                </li>
              </ul>
            </div>

            <div className="calculator-disclaimer reveal-on-scroll">
              <p className="eyebrow">Important</p>
              <h2>注意事項</h2>
              <p>
                この計算機は概算です。税務、移民、雇用、法律、金融、投資の助言ではありません。正確なPAYE、税コード、KiwiSaver、
                Student Loan、ACC、控除はIRDまたは資格のある専門家で確認してください。
              </p>
              <p>
                ビザ、滞在資格、就労条件、永住権に関する判断は、必ずNew Zealand政府の公式情報またはLicensed Immigration Adviserに確認してください。
                SoraJPNZは移民アドバイスを提供しません。
              </p>
              <p>入力した数字はサーバーに送信・保存されません。ブラウザ上で表示するためだけに使われます。</p>
            </div>
          </div>
        </section>

        <section className="next-section calculator-next">
          <div className="section-inner next-inner">
            <h2>次に準備しているもの</h2>
            <p>次は、NZ生活費テンプレートと仕事探し管理シートを準備中です。</p>
            <div className="button-row left">
              <a className="button primary" href={links.youtube} target="_blank" rel="noopener noreferrer">
                <span>YouTubeを見る</span>
                <i className="ri-youtube-fill" />
              </a>
              <a className="button secondary" href="/ja/contact">
                <span>問い合わせる</span>
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
