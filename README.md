# Social Club, hosted by Faith

Landing page for Faith's Social Club in Surrey, BC. Future domain: **faithsocialclub.com**.

Weekly events:

- **Monday Coworking**, 6:30 – 8:00 PM
- **Thursday Board Game Night**, 6:30 – 8:00 PM

RSVPs go through Meetup.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5176
npm run build      # type-check + production build into dist/
```

## Editing content

Event details, times, and the Meetup link live in `src/config.ts`. Set `MEETUP_URL` to the real Meetup group URL before launch.

Images live in `public/images/` (resized from the originals in `../social club/`).

## Deploy on Render

Static site: build `npm install; npm run build`, publish path `dist`. Once faithsocialclub.com is purchased, add it as a custom domain on the static site.
