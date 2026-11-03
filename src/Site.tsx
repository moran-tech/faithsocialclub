import { useEffect, type ReactElement } from 'react';
import { Layout } from './components/Layout.tsx';
import { JsonLd } from './components/ui.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { BoardGamePage } from './pages/BoardGamePage.tsx';
import { CoworkingPage } from './pages/CoworkingPage.tsx';
import { EventsPage } from './pages/EventsPage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { MixerPage } from './pages/MixerPage.tsx';
import { WhitecapsPage } from './pages/WhitecapsPage.tsx';
import { normalizePath, pageByPath } from './seo.ts';

const PAGES: Record<string, () => ReactElement> = {
  '/': HomePage,
  '/coworking-surrey': CoworkingPage,
  '/board-game-night-surrey': BoardGamePage,
  '/events': EventsPage,
  '/events/whitecaps-watch-party-2026-11-07': WhitecapsPage,
  '/events/end-of-year-mixer-2026-12-05': MixerPage,
  '/about': AboutPage,
};

function usePageMeta(path: string) {
  useEffect(() => {
    const page = pageByPath(path);
    if (!page) return;
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = page.canonical;
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', page.canonical);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', page.ogTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', page.description);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', page.description);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', 'https://f8social.club/og.jpg');
  }, [path]);
}

export function Site({ path }: { path: string }) {
  const normal = normalizePath(path);
  usePageMeta(normal);
  const Page = PAGES[normal];
  const seo = pageByPath(normal);
  if (!Page || !seo) return null;

  return (
    <Layout path={normal}>
      <Page />
      {seo.jsonLd ? <JsonLd data={seo.jsonLd} /> : null}
    </Layout>
  );
}
