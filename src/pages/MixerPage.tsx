import { Facts, Related, Rsvp, VenueLink } from '../components/ui.tsx';
import { board, coworking, eventsPage, mixer } from '../seo.ts';

export function MixerPage() {
  return (
    <main>
      <section className="page-intro">
        <p className="eyebrow">Surrey, BC · feat. DJ AJ</p>
        <h1 className="script">{mixer.h1}</h1>
        <p className="pill">{mixer.price}</p>
        <p className="lead">{mixer.description}</p>
        <div className="hero__actions">
          <Rsvp href={mixer.rsvp} label="Get tickets on Meetup" />
          <a className="btn btn--ghost" href={eventsPage.path}>
            All events
          </a>
        </div>
      </section>
      <section>
        <h2 className="script">The evening</h2>
        <Facts
          items={[
            { term: 'When', detail: `${mixer.when}, ${mixer.time}` },
            { term: 'Music', detail: 'DJ AJ' },
            { term: 'Early bird', detail: '$35' },
            { term: 'Regular', detail: '$45' },
            {
              term: 'Where',
              detail: <VenueLink query={mixer.mapQuery}>{mixer.venueLine}</VenueLink>,
            },
          ]}
        />
        <p>Welcome drink, icebreakers, dinner, then mingling and dancing.</p>
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
