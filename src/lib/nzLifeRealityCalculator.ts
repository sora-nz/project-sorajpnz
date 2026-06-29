export type IncomeMode = 'rough' | 'manual';

export type CalculatorStatus = 'hard' | 'fragile' | 'realistic' | 'comfortable';

export type CalculatorInputs = {
  hourlyWage: number;
  workHoursPerWeek: number;
  weeklyRent: number;
  weeklyFood: number;
  weeklyTransport: number;
  ownsCar: boolean;
  weeklyFuel: number;
  monthlyCarInsurance: number;
  monthlyCarMaintenance: number;
  weeklyParking: number;
  monthlyPhoneInternet: number;
  monthlyInsurance: number;
  monthlySubscriptions: number;
  monthlyOtherFixed: number;
  monthlySavingsTarget: number;
  emergencyBufferMonths: number;
  incomeMode: IncomeMode;
  manualMonthlyTakeHome: number;
};

export type ExpenseBreakdownItem = {
  id: string;
  label: string;
  monthly: number;
  essential: boolean;
};

export type CalculatorResult = {
  monthlyFactor: number;
  weeklyGrossIncome: number;
  monthlyGrossIncome: number;
  roughMonthlyTakeHome: number;
  monthlyIncomeUsedForCalculation: number;
  weeklyExpenses: number;
  monthlyExpenses: number;
  monthlyRemaining: number;
  savingsAchievementRate: number;
  essentialMonthlyExpenses: number;
  emergencyBufferTargetAmount: number;
  emergencyBufferBuildMonths: number;
  monthlyRemainingAfterSavingsTarget: number;
  status: CalculatorStatus;
  statusLabel: string;
  expenseBreakdown: ExpenseBreakdownItem[];
  rentShareOfIncome: number;
  carMonthlyCost: number;
  notes: string[];
};

export const monthlyFactor = 52 / 12;
export const roughTakeHomeRate = 0.82;

export const defaultNzLifeInputs: CalculatorInputs = {
  hourlyWage: 29.9,
  workHoursPerWeek: 40,
  weeklyRent: 300,
  weeklyFood: 120,
  weeklyTransport: 50,
  ownsCar: false,
  weeklyFuel: 60,
  monthlyCarInsurance: 80,
  monthlyCarMaintenance: 120,
  weeklyParking: 0,
  monthlyPhoneInternet: 70,
  monthlyInsurance: 50,
  monthlySubscriptions: 30,
  monthlyOtherFixed: 100,
  monthlySavingsTarget: 500,
  emergencyBufferMonths: 3,
  incomeMode: 'rough',
  manualMonthlyTakeHome: 3600
};

const smallPositiveNumber = 1;

function statusFor(monthlyRemaining: number, monthlySavingsTarget: number): CalculatorStatus {
  if (monthlyRemaining <= 0) return 'hard';
  if (monthlyRemaining < monthlySavingsTarget) return 'fragile';
  if (monthlyRemaining < monthlySavingsTarget * 1.8) return 'realistic';
  return 'comfortable';
}

export function statusLabel(status: CalculatorStatus) {
  switch (status) {
    case 'hard':
      return 'かなり厳しい';
    case 'fragile':
      return '生活は可能だが脆い';
    case 'realistic':
      return '現実的';
    case 'comfortable':
      return '余裕あり';
  }
}

export function calculateNzLifeReality(inputs: CalculatorInputs): CalculatorResult {
  const weeklyGrossIncome = inputs.hourlyWage * inputs.workHoursPerWeek;
  const monthlyGrossIncome = weeklyGrossIncome * monthlyFactor;
  const roughMonthlyTakeHome = monthlyGrossIncome * roughTakeHomeRate;
  const manualIncome = Math.max(0, inputs.manualMonthlyTakeHome);
  const monthlyIncomeUsedForCalculation =
    inputs.incomeMode === 'manual' && manualIncome > 0 ? manualIncome : roughMonthlyTakeHome;

  const carWeeklyCosts = inputs.ownsCar ? inputs.weeklyFuel + inputs.weeklyParking : 0;
  const carMonthlyOnlyCosts = inputs.ownsCar ? inputs.monthlyCarInsurance + inputs.monthlyCarMaintenance : 0;
  const weeklyExpenses = inputs.weeklyRent + inputs.weeklyFood + inputs.weeklyTransport + carWeeklyCosts;
  const monthlyOnlyCosts =
    inputs.monthlyPhoneInternet +
    inputs.monthlyInsurance +
    inputs.monthlySubscriptions +
    inputs.monthlyOtherFixed +
    carMonthlyOnlyCosts;
  const monthlyExpenses = weeklyExpenses * monthlyFactor + monthlyOnlyCosts;
  const monthlyRemaining = monthlyIncomeUsedForCalculation - monthlyExpenses;
  const savingsAchievementRate =
    inputs.monthlySavingsTarget <= 0 ? (monthlyRemaining > 0 ? Infinity : 0) : monthlyRemaining / inputs.monthlySavingsTarget;

  const essentialWeeklyExpenses =
    inputs.weeklyRent + inputs.weeklyFood + inputs.weeklyTransport + (inputs.ownsCar ? inputs.weeklyFuel + inputs.weeklyParking : 0);
  const essentialMonthlyOnlyCosts =
    inputs.monthlyPhoneInternet + inputs.monthlyInsurance + inputs.monthlyOtherFixed + carMonthlyOnlyCosts;
  const essentialMonthlyExpenses = essentialWeeklyExpenses * monthlyFactor + essentialMonthlyOnlyCosts;
  const emergencyBufferTargetAmount = essentialMonthlyExpenses * Math.max(0, inputs.emergencyBufferMonths);
  const monthlyRemainingAfterSavingsTarget = monthlyRemaining - Math.max(0, inputs.monthlySavingsTarget);
  const emergencyBufferBuildMonths =
    emergencyBufferTargetAmount <= 0
      ? 0
      : monthlyRemainingAfterSavingsTarget > 0
        ? emergencyBufferTargetAmount / Math.max(monthlyRemainingAfterSavingsTarget, smallPositiveNumber)
        : Infinity;

  const carMonthlyCost = carWeeklyCosts * monthlyFactor + carMonthlyOnlyCosts;
  const expenseBreakdown = [
    { id: 'rent', label: '家賃', monthly: inputs.weeklyRent * monthlyFactor, essential: true },
    { id: 'food', label: '食費', monthly: inputs.weeklyFood * monthlyFactor, essential: true },
    { id: 'transport', label: '移動', monthly: inputs.weeklyTransport * monthlyFactor, essential: true },
    { id: 'car', label: '車', monthly: carMonthlyCost, essential: true },
    { id: 'phone', label: '通信', monthly: inputs.monthlyPhoneInternet, essential: true },
    { id: 'insurance', label: '保険', monthly: inputs.monthlyInsurance, essential: true },
    { id: 'subscriptions', label: 'サブスク', monthly: inputs.monthlySubscriptions, essential: false },
    { id: 'other', label: 'その他固定費', monthly: inputs.monthlyOtherFixed, essential: true }
  ].filter((item) => item.monthly > 0);
  const rentShareOfIncome = monthlyIncomeUsedForCalculation > 0 ? (inputs.weeklyRent * monthlyFactor) / monthlyIncomeUsedForCalculation : 0;
  const status = statusFor(monthlyRemaining, inputs.monthlySavingsTarget);

  const notes: string[] = [];
  if (monthlyRemaining <= 0) {
    notes.push('この前提では毎月の収支が赤字です。家賃、勤務時間、車コスト、固定費のどこかを見直す必要があります。');
  }
  if (Number.isFinite(emergencyBufferBuildMonths) && emergencyBufferBuildMonths > 24) {
    notes.push('緊急資金を作るまでにかなり時間がかかるため、仕事時間や家賃が少し変わるだけでも生活が崩れやすい前提です。');
  }
  if (!Number.isFinite(emergencyBufferBuildMonths)) {
    notes.push('毎月の貯金目標を達成した後の余力が残らないため、緊急資金を積み上げる見通しが立ちにくい状態です。');
  }
  if (inputs.ownsCar && carMonthlyCost >= Math.max(350, monthlyExpenses * 0.16)) {
    notes.push('車関連コストが大きめです。車なし生活、相乗り、公共交通、駐車場代を含めて比較すると差が見えやすくなります。');
  }
  if (rentShareOfIncome >= 0.4) {
    notes.push('家賃が収入に対してかなり重い前提です。フラット、地域、通勤コストとのバランス確認が重要です。');
  } else if (rentShareOfIncome >= 0.32) {
    notes.push('家賃比率は低くありません。家賃を少し下げるだけでも毎月の余力に効きやすいです。');
  }
  if (notes.length === 0) {
    notes.push('この前提では収支に一定の余力があります。ただし税、勤務時間、家賃、車、ビザ条件などは必ず別途確認してください。');
  }

  return {
    monthlyFactor,
    weeklyGrossIncome,
    monthlyGrossIncome,
    roughMonthlyTakeHome,
    monthlyIncomeUsedForCalculation,
    weeklyExpenses,
    monthlyExpenses,
    monthlyRemaining,
    savingsAchievementRate,
    essentialMonthlyExpenses,
    emergencyBufferTargetAmount,
    emergencyBufferBuildMonths,
    monthlyRemainingAfterSavingsTarget,
    status,
    statusLabel: statusLabel(status),
    expenseBreakdown,
    rentShareOfIncome,
    carMonthlyCost,
    notes
  };
}

export function calculateWithOverrides(inputs: CalculatorInputs, overrides: Partial<CalculatorInputs>, forceRoughIncome = false) {
  return calculateNzLifeReality({
    ...inputs,
    ...overrides,
    incomeMode: forceRoughIncome ? 'rough' : overrides.incomeMode ?? inputs.incomeMode
  });
}

export function impactEstimates(inputs: CalculatorInputs) {
  const hourlyWageImpact = roughTakeHomeRate * inputs.workHoursPerWeek * monthlyFactor;
  const fiveHoursImpact = roughTakeHomeRate * inputs.hourlyWage * 5 * monthlyFactor;
  const rentFiftyImpact = 50 * monthlyFactor;
  const carImpact =
    (inputs.weeklyFuel + inputs.weeklyParking) * monthlyFactor + inputs.monthlyCarInsurance + inputs.monthlyCarMaintenance;

  return {
    hourlyWageImpact,
    fiveHoursImpact,
    rentFiftyImpact,
    carImpact
  };
}
