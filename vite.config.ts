import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Keep in sync with PAGES in src/seo.ts. scripts/prerender.mjs checks this list.
const SEO_DEV_ROUTES = [
  '/meetups-in-surrey',
  '/coworking-surrey',
  '/board-game-night-surrey',
  '/events',
  '/events/whitecaps-watch-party-2026-11-07',
  '/events/end-of-year-mixer-2026-12-05',
  '/about',
];

function requestPath(url: string | undefined): { bare: string; query: string } | undefined {
  if (!url || url.startsWith('/@') || url.startsWith('/src/') || url.startsWith('/node_modules/')) return;
  const q = url.indexOf('?');
  const path = q === -1 ? url : url.slice(0, q);
  if (!path || path === '/' || path.includes('.')) return;
  const query = q === -1 ? '' : url.slice(q);
  const bare = path.endsWith('/') ? path.slice(0, -1) : path;
  return { bare, query };
}

function seoRoutes(): Plugin {
  return {
    name: 'seo-routes',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? '';
        const q = url.indexOf('?');
        const path = q === -1 ? url : url.slice(0, q);
        const query = q === -1 ? '' : url.slice(q);
        if (path.length > 1 && path.endsWith('/')) {
          const bare = path.slice(0, -1);
          if (SEO_DEV_ROUTES.includes(bare) || bare === '/links') {
            res.statusCode = 301;
            res.setHeader('Location', `${bare}${query}`);
            res.end();
            return;
          }
        }
        const route = requestPath(url);
        if (!route) return next();
        if (SEO_DEV_ROUTES.includes(route.bare)) {
          req.url = `/index.html${route.query}`;
          return next();
        }
        const indexFile = join(server.config.root, route.bare.slice(1), 'index.html');
        if (existsSync(indexFile)) req.url = `${route.bare}/index.html${route.query}`;
        next();
      });
    },
    configurePreviewServer(server) {
      const dist = join(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? '';
        const q = url.indexOf('?');
        const path = q === -1 ? url : url.slice(0, q);
        const query = q === -1 ? '' : url.slice(q);
        if (path.length > 1 && path.endsWith('/')) {
          const bare = path.slice(0, -1);
          const page = join(dist, '_pages', `${bare.slice(1)}.html`);
          if (existsSync(page)) {
            res.statusCode = 301;
            res.setHeader('Location', `${bare}${query}`);
            res.end();
            return;
          }
        }
        const route = requestPath(url);
        if (!route) return next();
        const page = join(dist, '_pages', `${route.bare.slice(1)}.html`);
        if (existsSync(page)) {
          req.url = `/_pages${route.bare}.html${route.query}`;
          return next();
        }
        const indexFile = join(dist, route.bare.slice(1), 'index.html');
        if (existsSync(indexFile)) req.url = `${route.bare}/index.html${route.query}`;
        next();
      });
    },
  };
}

// 5173-5175 are taken by fireplace-waitlist, art club, and monday-cowork.
export default defineConfig(({ isSsrBuild }) => ({
  appType: 'mpa',
  plugins: [react(), seoRoutes()],
  server: { port: 5176, strictPort: true },
  build: {
    rollupOptions: isSsrBuild
      ? undefined
      : {
          input: {
            main: fileURLToPath(new URL('./index.html', import.meta.url)),
            links: fileURLToPath(new URL('./links/index.html', import.meta.url)),
          },
        },
  },
}));
