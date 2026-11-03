# f8 Social Club

Landing pages for f8 Social Club in Surrey, BC. Canonical host: **https://f8social.club**.

Weekly events:

- **Monday Coworking**, free, 6:30 – 8:00 PM at Chai Coffee Company
- **Thursday Board Game Night**, free, 6:30 – 8:00 PM

Monday coworking and Thursday board game night are recurring. Their pages describe the weekly time, not a next session. Dated one-offs (the Whitecaps watch party and the end-of-year mixer) live in `src/seo.ts`. Weekly titles, photos, and the links page still read `EVENTS` in `src/config.ts`.

RSVPs go through Meetup.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5176
npm run build      # type-check + production build into dist/
```

## Link-in-bio page

`https://f8social.club/links` is a separate, mobile-first page for the Instagram bio.
Its HTML entry is `links/index.html`, with React and isolated styles in `src/links/`.
It reads weekly `EVENTS` from `src/config.ts` and adds one-off events in
`src/links/events.ts`, without changing the homepage's event copy. It reuses
`NewsletterForm`, including the same `VITE_SUBSCRIBE_API_URL` build setting as the
homepage.

Vite's multi-page inputs build `dist/index.html` and `dist/links/index.html`.
`npm run build` then pre-renders each public route to its own `index.html`, so the
first response already contains the title, copy, and JSON-LD. With Render's publish
directory set to `dist`, `/coworking-surrey` and `/links` resolve to that directory's
`index.html` (also as a trailing slash or `index.html`). Do not add a catch-all
rewrite to `/index.html`; unknown paths should stay 404s.

Routes: `/`, `/coworking-surrey`, `/board-game-night-surrey`, `/events`,
`/events/whitecaps-watch-party-2026-11-07`, `/events/end-of-year-mixer-2026-12-05`,
`/about`, and `/links`. `public/robots.txt` and `public/sitemap.xml` are copied into `dist`.

Use Node 20.19+ or 22.12+ for the current Vite version.

## Newsletter

The form posts to the f8social route on fireplace-waitlist. On the static site, set this before the production build and redeploy:

```
VITE_SUBSCRIBE_API_URL=https://fireplace-waitlist.onrender.com/f8social/subscribe
```

The request body is JSON: `email`, optional `firstName` (omitted when blank), `consent: true`, and `company` (an empty honeypot). `200` with `status` `subscribed` or `already_subscribed` is success. `400` and `429` show the server's `error` string when it is present. Anything else shows a generic error. If `VITE_SUBSCRIBE_API_URL` is missing, the form shows that error and does not post to a relative path.

## Editing content

Weekly event blurbs and the Meetup link live in `src/config.ts`. Page titles and JSON-LD live in `src/seo.ts`.

Images live in `public/images/` (resized from the originals in `../social club/`). Coworking photos are the `photos` list on the Monday event.

## Deploy on Render

Static site: build `npm install; npm run build`, publish path `dist`. The custom domain is f8social.club.

Set `VITE_SUBSCRIBE_API_URL` to `https://fireplace-waitlist.onrender.com/f8social/subscribe` before that build.
