import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import LinksPage from './links/LinksPage.tsx';
import { PAGES, renderHead, normalizePath, pageByPath } from './seo.ts';
import { Site } from './Site.tsx';

export function render(url: string): { html: string; head: string } {
  const path = normalizePath(url);
  const page = pageByPath(path);
  if (!page) throw new Error(`No SEO page for ${url}`);
  const html = renderToString(
    <StrictMode>
      <Site path={path} />
    </StrictMode>,
  );
  return { html, head: renderHead(page) };
}

export function renderLinks(): string {
  return renderToString(
    <StrictMode>
      <LinksPage />
    </StrictMode>,
  );
}

export { PAGES, normalizePath };
