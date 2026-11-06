import { Facts, Related, Rsvp, VenueLink } from '../components/ui.tsx';
import { COWORKING_LONG_TABLE } from '../config.ts';
import { board, coworking, eventsPage, whitecaps } from '../seo.ts';

export function WhitecapsPage() {
  return (
    <main>
      <section className="page-intro">
        <p className="eyebrow">Surrey, BC · MLS Decision Day</p>
        <h1 className="script">{whitecaps.h1}</h1>
        <p className="pill">{whitecaps.price}</p>
        <p className="lead">{whitecaps.description}</p>
        <div className="hero__actions">
          <Rsvp href={whitecaps.rsvp} label="RSVP on Meetup" />
          <a className="btn btn--ghost" href={eventsPage.path}>
            All events
          </a>
        </div>
      </section>
      <section>
        <h2 className="script">Whitecaps vs CF Montréal</h2>
        <figure className="event-figure">
          <img
            src={COWORKING_LONG_TABLE.src}
            alt={COWORKING_LONG_TABLE.alt}
            width={COWORKING_LONG_TABLE.width}
            height={COWORKING_LONG_TABLE.height}
          />
          <figcaption className="photo-caption">Members at a recent Monday coworking meetup.</figcaption>
        </figure>
        <Facts
          items={[
            { term: 'When', detail: `${whitecaps.when}, ${whitecaps.time}` },
            {
              term: 'Price',
              detail: `${whitecaps.price}. Food and drinks are ordered from the restaurant.`,
            },
            {
              term: 'Where',
              detail: <VenueLink query={whitecaps.mapQuery}>{whitecaps.venueLine}</VenueLink>,
            },
          ]}
        />
        <Related
          links={[
            { href: eventsPage.path, label: 'Surrey events this month' },
            { href: coworking.path, label: 'Monday coworking' },
            { href: board.path, label: 'Thursday board game night' },
          ]}
        />
      </section>
    </main>
  );
}
