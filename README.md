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
`npm run build` then pre-renders each public route. `/` stays `dist/index.html`.
Every other route is written to `dist/_pages/<path>.html` (including `/links`),
and the old `path/index.html` copies are not published. That lets Render 301
`/path/` to `/path`. The rewrite and redirect rules live in `render.yaml`. Copy
them onto the existing static site before deploying this layout. Do not add a
catch-all rewrite to `/index.html`; unknown paths should stay 404s.

`/end-of-year-mixer-sponsors/` keeps its directory `index.html` because GitHub
Pages publishes that folder. Render will not 301 a path that is a real file.

Weekly coworking and board game JSON-LD include `eventSchedule` plus the next
Monday or Thursday `startDate` and `endDate` in `America/Vancouver` at `-07:00`.
Those two timestamps are calculated when the site is built. Rebuild after they
pass so the next occurrence stays current. Visible copy still says "every Monday"
and "every Thursday".

Routes: `/`, `/coworking-surrey`, `/board-game-night-surrey`, `/events`,
`/events/whitecaps-watch-party-2026-11-07`, `/events/end-of-year-mixer-2026-12-05`,
`/about`, `/links`, and `/end-of-year-mixer-sponsors`. `public/robots.txt`,
`public/sitemap.xml`, and `public/llms.txt` are copied into `dist`.

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

Redirects and rewrites (also in `render.yaml`): 301 each trailing-slash URL to the slashless path, then rewrite slashless paths to `/_pages/*.html`. Add `X-Robots-Tag: noindex` on `/_pages/*`. Apply those rules on the existing service in the same deploy as this build. Without the rewrite, clean URLs 404.

Set `VITE_SUBSCRIBE_API_URL` to `https://fireplace-waitlist.onrender.com/f8social/subscribe` before that build.
