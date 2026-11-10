import { useEffect, type ReactElement } from 'react';
import { Layout } from './components/Layout.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { BoardGamePage } from './pages/BoardGamePage.tsx';
import { CoworkingPage } from './pages/CoworkingPage.tsx';
import { EventsPage } from './pages/EventsPage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { MeetupsPage } from './pages/MeetupsPage.tsx';
import { WhitecapsPage } from './pages/WhitecapsPage.tsx';
import { normalizePath, pageByPath, retiredEventRedirect } from './seo.ts';

const PAGES: Record<string, () => ReactElement> = {
  '/': HomePage,
  '/meetups-in-surrey': MeetupsPage,
  '/coworking-surrey': CoworkingPage,
  '/board-game-night-surrey': BoardGamePage,
  '/events': EventsPage,
  '/events/whitecaps-watch-party-2026-11-07': WhitecapsPage,
  '/about': AboutPage,
};

function setContent(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute('content', value);
}

function usePageMeta(path: string) {
  useEffect(() => {
    const page = pageByPath(path);
    if (!page) return;
    document.title = page.title;
    setContent('meta[name="description"]', page.description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = page.canonical;
    setContent('meta[property="og:url"]', page.canonical);
    setContent('meta[property="og:title"]', page.ogTitle);
    setContent('meta[property="og:description"]', page.description);
    setContent('meta[property="og:image"]', page.image.url);
    setContent('meta[property="og:image:width"]', String(page.image.width));
    setContent('meta[property="og:image:height"]', String(page.image.height));
    setContent('meta[property="og:image:alt"]', page.image.alt);
    setContent('meta[name="twitter:title"]', page.ogTitle);
    setContent('meta[name="twitter:description"]', page.description);
    setContent('meta[name="twitter:image"]', page.image.url);
  }, [path]);
}

export function Site({ path }: { path: string }) {
  const normal = normalizePath(path);
  const retired = retiredEventRedirect(normal);
  useEffect(() => {
    if (retired) window.location.replace(retired);
  }, [retired]);
  usePageMeta(normal);
  if (retired) {
    return (
      <main>
        <p>
          <a href={retired}>Events</a>
        </p>
      </main>
    );
  }
  const Page = PAGES[normal];
  const seo = pageByPath(normal);
  if (!Page || !seo) return null;

  return (
    <Layout path={normal}>
      <Page />
    </Layout>
  );
}
