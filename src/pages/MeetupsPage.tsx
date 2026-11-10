import { Facts, Related, Rsvp, VenueLink } from '../components/ui.tsx';
import { MEETUP_URL } from '../config.ts';
import { MEETUPS_FAQ, board, coworking, eventsPage, meetups, whitecaps } from '../seo.ts';

export function MeetupsPage() {
  return (
    <main>
      <section className="page-intro">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Meetups in Surrey</span>
        </nav>
        <p className="eyebrow">Surrey, BC · Professionals</p>
        <h1 className="script">{meetups.h1}</h1>
        <p className="pill">Free weekly</p>
        <p className="lead">{meetups.description}</p>
        <div className="hero__actions">
          <Rsvp href={MEETUP_URL} label="RSVP on Meetup" />
          <a className="btn btn--ghost" href={eventsPage.path}>
            All events
          </a>
        </div>
      </section>

      <section className="meetup-copy">
        <h2 className="script">Weekly meetups in Surrey</h2>
        <p>
          If you want the current meetups in Surrey for professionals, start with the two nights we host.
          These Surrey meetups are free, they start at 6:30 PM, and the same people tend to come back.
          Meetup.com is where you RSVP, and it is also where other groups list their events. We are one
          social club, not a directory of every meetup in the city.
        </p>

        <h2 className="script">Monday coworking</h2>
        <Facts
          items={[
            { term: 'When', detail: `Every Monday, ${coworking.time}` },
            { term: 'Price', detail: 'Free' },
            {
              term: 'Where',
              detail: <VenueLink query={coworking.mapQuery}>{coworking.venueLine}</VenueLink>,
            },
          ]}
        />
        <p>
          Bring a laptop, say your goal, and work for an hour. Stay after if you want to meet the other
          builders, creators, freelancers, and founders in the room.
        </p>
        <div className="hero__actions">
          <Rsvp href={coworking.rsvp} label="RSVP for Monday" />
          <a className="btn btn--ghost" href={coworking.path}>
            Coworking details
          </a>
        </div>

        <h2 className="script">Thursday board games</h2>
        <Facts
          items={[
            { term: 'When', detail: `Every Thursday, ${board.time}` },
            { term: 'Price', detail: 'Free' },
            {
              term: 'Where',
              detail: <VenueLink query={board.mapQuery}>{board.venueLine}</VenueLink>,
            },
          ]}
        />
        <p>No experience needed. We explain the rules first. Come solo or bring a friend. Most people come solo.</p>
        <div className="hero__actions">
          <Rsvp href={board.rsvp} label="RSVP for Thursday" />
          <a className="btn btn--ghost" href={board.path}>
            Board game details
          </a>
        </div>

        <h2 className="script">Also on the calendar</h2>
        <p>
          <a href={whitecaps.path}>{whitecaps.h1}</a> is {whitecaps.when} at {whitecaps.time}. {whitecaps.price}.{' '}
          <a href={whitecaps.rsvp} target="_blank" rel="noopener noreferrer">
            RSVP on Meetup
          </a>
          .
        </p>
        <p>
          The rest of the month is on the <a href={eventsPage.path}>events page</a>.
        </p>

        <h2 className="script">Questions</h2>
        <div className="faq" id="faq">
          {MEETUPS_FAQ.map((item) => (
            <div key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>

        <Related
          links={[
            { href: '/', label: 'Home' },
            { href: coworking.path, label: 'Monday coworking' },
            { href: board.path, label: 'Thursday board game night' },
            { href: eventsPage.path, label: 'Surrey events this month' },
          ]}
        />
      </section>
    </main>
  );
}
