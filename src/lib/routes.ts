import { Locale } from './content';

export function getLocale(pathname: string): Locale {
  return pathname.startsWith('/ja') ? 'ja' : 'en';
}

export function localize(locale: Locale, path = '') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (clean === '/' || clean === '') {
    return `/${locale}`;
  }
  return `/${locale}${clean}`;
}

export function swapLocale(pathname: string, locale: Locale) {
  if (pathname === '/' || pathname === '') {
    return `/${locale}`;
  }
  if (pathname.startsWith('/en')) {
    return pathname.replace('/en', `/${locale}`);
  }
  if (pathname.startsWith('/ja')) {
    return pathname.replace('/ja', `/${locale}`);
  }
  return `/${locale}${pathname}`;
}

export function routeKey(pathname: string) {
  const path = pathname.replace(/^\/(en|ja)/, '') || '/';
  return path.replace(/\/$/, '') || '/';
}
