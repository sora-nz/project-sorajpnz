export type ReferenceRateResult = {
  rate: number;
  source: string;
  sourceUrl: string;
  date?: string;
};

export const fallbackNzdJpyRate = 90;
export const frankfurterNzdJpyUrl = 'https://api.frankfurter.dev/v2/rate/NZD/JPY';

export function sanitizeNzdJpyRate(value: number) {
  if (!Number.isFinite(value)) return fallbackNzdJpyRate;
  return Math.min(300, Math.max(1, value));
}

export function convertNzdToJpy(nzdValue: number, rate: number) {
  if (!Number.isFinite(nzdValue) || !Number.isFinite(rate) || rate <= 0) {
    return null;
  }

  return nzdValue * rate;
}

export function formatJpy(value: number | null) {
  if (value === null || !Number.isFinite(value)) return '約-';

  const rounded = Math.round(value);
  const sign = rounded < 0 ? '-' : '';
  return `約${sign}¥${Math.abs(rounded).toLocaleString('ja-JP')}`;
}

export function formatNzdJpyRate(rate: number) {
  const safeRate = sanitizeNzdJpyRate(rate);
  return `¥${safeRate.toLocaleString('ja-JP', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

export async function fetchNzdJpyReferenceRate(signal?: AbortSignal, endpoint = frankfurterNzdJpyUrl): Promise<ReferenceRateResult> {
  const response = await fetch(endpoint, { signal });

  if (!response.ok) {
    throw new Error(`Exchange-rate request failed with status ${response.status}`);
  }

  const data = (await response.json()) as {
    date?: string;
    rate?: number;
    rates?: {
      JPY?: number;
    };
  };
  const rawRate = Number(data.rate ?? data.rates?.JPY);

  if (!Number.isFinite(rawRate) || rawRate <= 0) {
    throw new Error('Exchange-rate response did not include a usable JPY rate.');
  }

  const parsedRate = sanitizeNzdJpyRate(rawRate);

  return {
    rate: parsedRate,
    source: 'Frankfurter',
    sourceUrl: 'https://www.frankfurter.app/',
    date: data.date
  };
}
