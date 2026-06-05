type AnalyticsParams = Record<string, string | number | boolean | undefined>;

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isAnalyticsEnabled() {
  return Boolean(measurementId) && typeof window !== 'undefined';
}

export function initAnalytics() {
  if (!isAnalyticsEnabled() || window.gtag) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false
  });
}

export function trackPageView(path: string, title = document.title) {
  if (!isAnalyticsEnabled() || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_location: `${window.location.origin}${path}`,
    page_path: path,
    page_title: title
  });
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (!isAnalyticsEnabled() || !window.gtag) return;

  window.gtag('event', name, params);
}
