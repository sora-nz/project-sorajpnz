import { useEffect, useMemo, useState } from 'react';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { LegalPage } from './pages/LegalPage';
import { NotFound } from './pages/NotFound';
import { Projects } from './pages/Projects';
import { RelocationProject } from './pages/RelocationProject';
import { RentRadarProject } from './pages/RentRadarProject';
import { Services } from './pages/Services';
import { trackPageView } from './lib/analytics';
import { getLocale, routeKey } from './lib/routes';

function normalizePath(pathname: string) {
  if (pathname === '/') return '/en';
  if (!pathname.startsWith('/en') && !pathname.startsWith('/ja')) return `/en${pathname}`;
  return pathname.replace(/\/$/, '') || '/en';
}

export function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    if (window.location.pathname !== path) {
      window.history.replaceState({}, '', path);
    }

    const handlePop = () => setPath(normalizePath(window.location.pathname));
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor || anchor.target || anchor.origin !== window.location.origin) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const nextPath = normalizePath(anchor.pathname);
      window.history.pushState({}, '', nextPath);
      setPath(nextPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePop);
    document.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('popstate', handlePop);
      document.removeEventListener('click', handleClick);
    };
  }, [path]);

  const locale = getLocale(path);
  const key = useMemo(() => routeKey(path), [path]);

  useEffect(() => {
    const timer = window.setTimeout(() => trackPageView(path), 0);
    return () => window.clearTimeout(timer);
  }, [path]);

  if (key === '/') return <Home locale={locale} path={path} />;
  if (key === '/services') return <Services locale={locale} path={path} />;
  if (key === '/projects') return <Projects locale={locale} path={path} />;
  if (key === '/projects/nz-japan-relocation') return <RelocationProject locale={locale} path={path} />;
  if (key === '/projects/rent-radar' || key === '/project') return <RentRadarProject locale={locale} path={path} />;
  if (key === '/blog') return <Blog locale={locale} path={path} />;
  if (key === '/contact') return <Contact locale={locale} path={path} />;
  if (key === '/privacy') return <LegalPage locale={locale} path={path} kind="privacy" />;
  if (key === '/terms') return <LegalPage locale={locale} path={path} kind="terms" />;
  if (key === '/disclaimer') return <LegalPage locale={locale} path={path} kind="disclaimer" />;

  return <NotFound locale={locale} path={path} />;
}
