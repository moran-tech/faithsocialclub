import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, sep } from 'node:path';
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

function imagePaths(value, seen = new Set()) {
  if (!value || typeof value !== 'object') return;
  if (seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    for (const item of value) imagePaths(item, seen);
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (key === 'image') {
      const urls = Array.isArray(child) ? child : [child];
      for (const url of urls) {
        if (typeof url !== 'string') continue;
        const pathname = new URL(url).pathname.replace(/^\//, '');
        if (!existsSync(join(root, 'dist', pathname))) {
          throw new Error(`JSON-LD image is not in dist: ${url}`);
        }
      }
    } else {
      imagePaths(child, seen);
    }
  }
}

function visibleText(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

assert.equal(ssr.normalizePath('/index.html'), '/');
assert.equal(ssr.normalizePath('/about/index.html'), '/about');
assert.equal(ssr.normalizePath('/about/'), '/about');
assert.equal(
  ssr.normalizePath('/events/whitecaps-watch-party-2026-11-07/index.html'),
  '/events/whitecaps-watch-party-2026-11-07',
);
assert.match(ssr.render('/about/index.html').head, /About f8 Social Club/);

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
  assert.match(html, new RegExp(`property="og:image" content="${escapeRe(page.image.url)}"`));
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, new RegExp(`name="twitter:title" content="${escapeRe(htmlAttr(page.ogTitle))}"`));
  assert.match(html, new RegExp(`name="twitter:description" content="${escapeRe(htmlAttr(page.description))}"`));
  assert.match(html, new RegExp(`name="twitter:image" content="${escapeRe(page.image.url)}"`));
  assert.equal(html.includes('faithsocialclub.com'), false, page.path);
  assert.equal(html.includes('posthog'), false, page.path);
  assert.equal(html.includes('AggregateRating'), false, page.path);
  assert.equal(html.includes('-08:00'), false, page.path);
  assert.equal(sitemap.includes(`<loc>${page.canonical}</loc>`), true, page.canonical);

  const expected = page.jsonLd ? (Array.isArray(page.jsonLd) ? page.jsonLd : [page.jsonLd]) : [];
  const blocks = jsonLd(html);
  assert.equal(blocks.length, expected.length, page.path);
  expected.forEach((block, index) => {
    assert.deepEqual(blocks[index], block, page.path);
    imagePaths(block);
  });

  const dest =
    page.path === '/' ? join(root, 'dist/index.html') : join(root, 'dist/_pages', `${page.path.slice(1)}.html`);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html);
  console.log(`prerendered ${page.path}`);
}

const linksBuilt = join(root, 'dist/links/index.html');
let links = readFileSync(linksBuilt, 'utf8');
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
assert.match(links, /name="twitter:title" content="F8 Social Club \| Links"/);
assert.match(links, /name="twitter:image" content="https:\/\/f8social\.club\/images\/hero\.webp"/);
assert.match(links, /name="twitter:card" content="summary_large_image"/);
const linksPath = join(root, 'dist/_pages/links.html');
mkdirSync(dirname(linksPath), { recursive: true });
writeFileSync(linksPath, links);
rmSync(join(root, 'dist/links'), { recursive: true, force: true });
console.log('prerendered /links');

assert.match(robots, /^User-agent: \*\nAllow: \/\n\nSitemap: https:\/\/f8social\.club\/sitemap\.xml\n$/);

assert.equal(
  ssr.nextWeeklyWindow('Monday', new Date('2026-11-06T12:00:00-07:00')).startDate,
  '2026-11-09T18:30:00-07:00',
);
assert.equal(
  ssr.nextWeeklyWindow('Monday', new Date('2026-11-06T12:00:00-07:00')).endDate,
  '2026-11-09T20:00:00-07:00',
);
assert.equal(
  ssr.nextWeeklyWindow('Thursday', new Date('2026-11-06T12:00:00-07:00')).startDate,
  '2026-11-12T18:30:00-07:00',
);
assert.equal(
  ssr.nextWeeklyWindow('Monday', new Date('2026-11-09T18:00:00-07:00')).startDate,
  '2026-11-09T18:30:00-07:00',
);
assert.equal(
  ssr.nextWeeklyWindow('Monday', new Date('2026-11-09T20:00:00-07:00')).startDate,
  '2026-11-16T18:30:00-07:00',
);

const whitecapsHtml = readFileSync(join(root, 'dist/_pages/events/whitecaps-watch-party-2026-11-07.html'), 'utf8');
const whitecapsLd = jsonLd(whitecapsHtml)[0];
assert.equal(whitecapsLd.isAccessibleForFree, true);
assert.equal(whitecapsLd.offers.price, 0);
assert.equal(whitecapsLd.offers.priceCurrency, 'CAD');
assert.equal(whitecapsLd.offers.availability, 'https://schema.org/InStock');
assert.match(whitecapsHtml, /name="twitter:description" content="[^"]*Free entry\./);
assert.equal(Array.isArray(jsonLd(whitecapsHtml)[0].image), true);
assert.match(whitecapsHtml, /property="og:image" content="https:\/\/f8social\.club\/images\/coworking-long-table-og\.webp"/);
assert.equal(jsonLd(whitecapsHtml)[0].location.address.postalCode, undefined);

for (const series of [
  { path: '/coworking-surrey', day: 'Monday' },
  { path: '/board-game-night-surrey', day: 'Thursday' },
]) {
  const seriesHtml = readFileSync(join(root, 'dist/_pages', `${series.path.slice(1)}.html`), 'utf8');
  const seriesLd = jsonLd(seriesHtml)[0];
  const window = ssr.nextWeeklyWindow(series.day);
  assert.equal(seriesLd.startDate, window.startDate, series.path);
  assert.equal(seriesLd.endDate, window.endDate, series.path);
  assert.match(seriesLd.startDate, /T18:30:00-07:00$/);
  assert.match(seriesLd.endDate, /T20:00:00-07:00$/);
  assert.equal(seriesLd.eventSchedule['@type'], 'Schedule');
  assert.equal(seriesLd.eventSchedule.repeatFrequency, 'P1W');
  assert.equal(seriesLd.eventSchedule.scheduleTimezone, 'America/Vancouver');
  assert.match(seriesLd.eventSchedule.byDay, /^https:\/\/schema\.org\/(Monday|Thursday)$/);
  assert.equal(seriesLd.eventSchedule.startTime, '18:30:00');
  assert.equal(seriesLd.eventSchedule.endTime, '20:00:00');
  assert.equal(visibleText(seriesHtml).includes('Next session'), false, series.path);
}
assert.equal(jsonLd(whitecapsHtml)[0].startDate, '2026-11-07T14:00:00-07:00');
assert.equal(jsonLd(whitecapsHtml)[0].endDate, undefined);
const mixerHtml = readFileSync(join(root, 'dist/_pages/events/end-of-year-mixer-2026-12-05.html'), 'utf8');
assert.equal(jsonLd(mixerHtml)[0].startDate, '2026-12-05T18:30:00-07:00');
assert.match(mixerHtml, /property="og:image" content="https:\/\/f8social\.club\/images\/coworking-conversation-og\.webp"/);

function walkHtml(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, files);
    else if (
      (entry.name.endsWith('.html') || entry.name.endsWith('.js')) &&
      !full.includes(`${sep}end-of-year-mixer-sponsors${sep}`)
    ) {
      files.push(full);
    }
  }
  return files;
}
for (const file of walkHtml(join(root, 'dist'))) {
  const raw = readFileSync(file, 'utf8');
  const text = file.endsWith('.html') ? visibleText(raw) : raw;
  if (/\$5(?!\d)/.test(text) || /holds your seat|hold a seat|Only 8 seats|\b8 seats\b/i.test(text)) {
    throw new Error(`Whitecaps price or seat limit still in ${file}`);
  }
  if (/Next session|November 5, 2026|November 9, 2026/.test(text)) {
    throw new Error(`Weekly next-session date still in ${file}`);
  }
  if (file.endsWith('.js') && /2026-11-0[59]/.test(raw)) {
    throw new Error(`Hardcoded weekly ISO date in ${file}`);
  }
}
assert.equal(sitemap.includes('faithsocialclub.com'), false);
assert.equal(sitemap.includes('<loc>https://f8social.club/links</loc>'), true);
assert.equal(sitemap.includes('<loc>https://f8social.club/end-of-year-mixer-sponsors</loc>'), true);
assert.equal(sitemap.includes('2026-11-02'), false);
assert.match(sitemap, /<lastmod>2026-11-06<\/lastmod>/);
const llms = readFileSync(join(root, 'dist/llms.txt'), 'utf8');
for (const url of [
  'https://f8social.club/',
  'https://f8social.club/meetups-in-surrey',
  'https://f8social.club/coworking-surrey',
  'https://f8social.club/board-game-night-surrey',
  'https://f8social.club/events',
  'https://f8social.club/events/whitecaps-watch-party-2026-11-07',
  'https://f8social.club/events/end-of-year-mixer-2026-12-05',
  'https://f8social.club/about',
  'https://f8social.club/links',
]) {
  assert.equal(llms.includes(url), true, url);
}
assert.match(llms, /UTC-7/);
assert.equal(llms.includes('AggregateRating'), false);
const homeHtml = readFileSync(join(root, 'dist/index.html'), 'utf8');
assert.match(homeHtml, /from 30 ratings/);
assert.equal(homeHtml.includes('24 reviews'), false);
assert.equal(jsonLd(homeHtml).some((block) => block['@type'] === 'FAQPage'), true);
assert.equal(visibleText(homeHtml).includes('Meetups in Surrey'), true);
assert.match(homeHtml, /<title>Surrey BC Social Events &amp; Meetups \| f8 Social Club<\/title>/);
assert.equal(homeHtml.includes('content="Meetups in Surrey'), false);
assert.equal(visibleText(homeHtml).includes('What meetups are in Surrey?'), false);
assert.equal(visibleText(homeHtml).includes('best meetups in Surrey'), false);
for (const item of ssr.FAQ) {
  assert.equal(visibleText(homeHtml).includes(item.question), true, item.question);
  assert.equal(visibleText(homeHtml).includes(item.answer), true, item.question);
}
for (const page of ssr.PAGES) {
  if (page.path === '/') continue;
  assert.equal(existsSync(join(root, 'dist', page.path.slice(1), 'index.html')), false, page.path);
}
assert.equal(existsSync(join(root, 'dist/links/index.html')), false);
assert.equal(existsSync(join(root, 'dist/_pages/links.html')), true);
const meetupsHtml = readFileSync(join(root, 'dist/_pages/meetups-in-surrey.html'), 'utf8');
assert.equal(h1Text(meetupsHtml, '/meetups-in-surrey'), 'Meetups in Surrey');
assert.match(
  meetupsHtml,
  /<title>Meetups in Surrey BC \| Free Weekly Social Events \| f8 Social Club<\/title>/,
);
assert.equal(meetupsHtml.includes('posthog'), false);
assert.equal(meetupsHtml.includes('best meetups in Surrey'), false);
assert.equal(meetupsHtml.includes('Meetup groups in Surrey'), false);
assert.equal(meetupsHtml.includes('Looking for Meetup groups'), false);
assert.match(meetupsHtml, /href="\/coworking-surrey"/);
assert.match(meetupsHtml, /href="\/board-game-night-surrey"/);
assert.match(meetupsHtml, /href="\/events"/);
assert.match(meetupsHtml, /href="\/"/);
assert.match(meetupsHtml, /href="https:\/\/www\.meetup\.com\/coworking-surrey-hosted-by-morantech\//);
const meetupsBlocks = jsonLd(meetupsHtml);
const meetupsFaq = meetupsBlocks.find((block) => block['@type'] === 'FAQPage');
const meetupsCrumb = meetupsBlocks.find((block) => block['@type'] === 'BreadcrumbList');
assert.ok(meetupsFaq, 'meetups FAQPage');
assert.ok(meetupsCrumb, 'meetups BreadcrumbList');
assert.equal(meetupsCrumb.itemListElement[1].name, 'Meetups in Surrey');
for (const entity of meetupsFaq.mainEntity) {
  assert.equal(visibleText(meetupsHtml).includes(entity.name), true, entity.name);
  assert.equal(visibleText(meetupsHtml).includes(entity.acceptedAnswer.text), true, entity.name);
}
const renderYaml = readFileSync(join(root, 'render.yaml'), 'utf8');
assert.match(renderYaml, /source: \/meetups-in-surrey\/\n\s+destination: \/meetups-in-surrey\n/);
assert.match(renderYaml, /source: \/meetups-in-surrey\n\s+destination: \/_pages\/meetups-in-surrey\.html\n/);
assert.equal(renderYaml.includes('source: /*'), false);
assert.equal(renderYaml.includes('/_pages/*.html'), false);
for (const file of [
  'images/board-game-night.webp',
  'images/coworking-group.webp',
  'images/coworking-laptops.webp',
  'images/coworking-long-table.webp',
  'images/coworking-conversation.webp',
  'images/coworking-side-table.webp',
  'images/coworking-long-table-og.webp',
  'images/coworking-conversation-og.webp',
  'images/coworking-side-table-og.webp',
  'og.jpg',
  'llms.txt',
]) {
  if (!existsSync(join(root, 'dist', file))) throw new Error(`missing dist/${file}`);
}
for (const absent of ['images/whitecaps-watch-party.webp', 'images/end-of-year-mixer.webp']) {
  if (existsSync(join(root, 'dist', absent))) throw new Error(`did not expect dist/${absent}`);
}

console.log('prerender checks passed');
