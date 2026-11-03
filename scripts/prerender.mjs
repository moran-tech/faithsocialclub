import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ssrUrl = pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href;
const ssr = await import(ssrUrl);

const template = readFileSync(join(root, 'dist/index.html'), 'utf8');
if (!template.includes('<!--seo-head-->') || !template.includes('<!--/seo-head-->')) {
  throw new Error('dist/index.html is missing seo-head markers');
}
if (!template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html is missing an empty #root');
}

const viteConfig = readFileSync(join(root, 'vite.config.ts'), 'utf8');
const sitemap = readFileSync(join(root, 'dist/sitemap.xml'), 'utf8');
const robots = readFileSync(join(root, 'dist/robots.txt'), 'utf8');

function escapeRe(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function htmlAttr(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function hoistPreloads(html) {
  const preloads = [...html.matchAll(/<link rel="preload"[^>]*>/g)].map((match) => match[0]);
  return { html: html.replace(/<link rel="preload"[^>]*>/g, ''), preloads };
}

function h1Text(html, label) {
  const matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (matches.length !== 1) {
    throw new Error(`${label}: expected 1 h1, found ${matches.length}`);
  }
  return matches[0][1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) =>
    JSON.parse(match[1]),
  );
}

function imagePaths(value) {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value.image)) {
    for (const url of value.image) {
      const pathname = new URL(url).pathname.replace(/^\//, '');
      if (!existsSync(join(root, 'dist', pathname))) {
        throw new Error(`JSON-LD image is not in dist: ${url}`);
      }
    }
  }
}

for (const page of ssr.PAGES) {
  if (page.path !== '/' && !viteConfig.includes(`'${page.path}'`)) {
    throw new Error(`Add ${page.path} to SEO_DEV_ROUTES in vite.config.ts`);
  }
  const rendered = ssr.render(page.path);
  const body = hoistPreloads(rendered.html);
  let html = template.replace(
    /<!--seo-head-->[\s\S]*?<!--\/seo-head-->/,
    `<!--seo-head-->\n    ${rendered.head}\n    <!--/seo-head-->`,
  );
  if (body.preloads.length > 0) {
    html = html.replace('</head>', `    ${body.preloads.join('\n    ')}\n  </head>`);
  }
  html = html.replace('<div id="root"></div>', `<div id="root">${body.html}</div>`);

  assert.equal(h1Text(html, page.path), page.h1);
  assert.match(html, new RegExp(`<title>${escapeRe(htmlAttr(page.title))}</title>`));
  assert.match(html, new RegExp(`name="description" content="${escapeRe(htmlAttr(page.description))}"`));
  assert.match(html, new RegExp(`rel="canonical" href="${escapeRe(page.canonical)}"`));
  assert.match(html, new RegExp(`property="og:url" content="${escapeRe(page.canonical)}"`));
  assert.match(html, /property="og:image" content="https:\/\/f8social\.club\/og\.jpg"/);
  assert.equal(html.includes('faithsocialclub.com'), false, page.path);
  assert.equal(html.includes('posthog'), false, page.path);
  assert.equal(sitemap.includes(`<loc>${page.canonical}</loc>`), true, page.canonical);

  const blocks = jsonLd(html);
  if (page.jsonLd) {
    assert.equal(blocks.length, 1, page.path);
    assert.deepEqual(blocks[0], page.jsonLd);
    imagePaths(blocks[0]);
  } else {
    assert.equal(blocks.length, 0, page.path);
  }

  const dest = page.path === '/' ? join(root, 'dist/index.html') : join(root, 'dist', page.path.slice(1), 'index.html');
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html);
  console.log(`prerendered ${page.path}`);
}

const linksPath = join(root, 'dist/links/index.html');
let links = readFileSync(linksPath, 'utf8');
if (!links.includes('posthog.init')) throw new Error('/links lost its PostHog snippet before prerender');
const linksBody = hoistPreloads(ssr.renderLinks());
if (linksBody.preloads.length > 0) {
  links = links.replace('</head>', `    ${linksBody.preloads.join('\n    ')}\n  </head>`);
}
links = links.replace('<div id="root"></div>', `<div id="root">${linksBody.html}</div>`);
if (!links.includes('posthog.init')) throw new Error('/links prerender removed PostHog');
h1Text(links, '/links');
assert.equal(links.includes('faithsocialclub.com'), false);
assert.equal(links.includes('<div id="root"></div>'), false);
writeFileSync(linksPath, links);
console.log('prerendered /links');

assert.match(robots, /^User-agent: \*\nAllow: \/\n\nSitemap: https:\/\/f8social\.club\/sitemap\.xml\n$/);
assert.equal(sitemap.includes('faithsocialclub.com'), false);
for (const file of ['images/board-game-night.webp', 'images/coworking-group.webp', 'images/coworking-laptops.webp', 'og.jpg']) {
  if (!existsSync(join(root, 'dist', file))) throw new Error(`missing dist/${file}`);
}
for (const absent of ['images/whitecaps-watch-party.webp', 'images/end-of-year-mixer.webp']) {
  if (existsSync(join(root, 'dist', absent))) throw new Error(`did not expect dist/${absent}`);
}

console.log('prerender checks passed');
