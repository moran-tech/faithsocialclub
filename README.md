# Social Club, hosted by Faith

Landing page for Faith's Social Club in Surrey, BC. Future domain: **faithsocialclub.com**.

Weekly events:

- **Monday Coworking**, 6:30 – 8:00 PM
- **Thursday Board Game Night**, 6:30 – 8:00 PM

Coming soon:

- **Sports Watch Parties**, On a Saturday

RSVPs go through Meetup. Live events are listed in `EVENTS`. Announced events that don't have a time or place yet go in `COMING_SOON` — add another object there and it shows up in the Coming soon section.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5176
npm run build      # type-check + production build into dist/
```

## Newsletter

The form posts JSON to `VITE_SUBSCRIBE_API_URL`, the full subscribe endpoint on fireplace-waitlist. Set that variable on the static site before the production build, then redeploy. If it is missing, the form shows an error and does not post to a relative path.

## Editing content

Event details, times, and the Meetup link live in `src/config.ts`.

Images live in `public/images/` (resized from the originals in `../social club/`). Coworking photos are the `photos` list on the Monday event.

## Deploy on Render

Static site: build `npm install; npm run build`, publish path `dist`. Once faithsocialclub.com is purchased, add it as a custom domain on the static site.

Set `VITE_SUBSCRIBE_API_URL` to the full fireplace-waitlist subscribe URL before that build.
