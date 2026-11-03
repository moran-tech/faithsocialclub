import { NewsletterForm } from '../NewsletterForm.tsx';
import { EVENTS, MEETUP_URL, type ClubEvent } from '../config.ts';
import { MeetupRating, Rsvp, VenueLink } from '../components/ui.tsx';
import { board, coworking, mixer, whitecaps, type DatedEventPage, type EventPage } from '../seo.ts';

const seriesById = {
  coworking,
  boardgames: board,
} as const;

function EventMedia({ event }: { event: ClubEvent }) {
  if (event.photos && event.photos.length > 0) {
    return (
      <div className="event__photos">
        {event.photos.map((photo) => (
          <img
            key={photo.src}
            className={`event__photo event__photo--${photo.orientation}`}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
          />
        ))}
      </div>
    );
  }

  if (!event.image) return null;

  return <img className="event__image" src={event.image} alt={`${event.title} photo`} width={735} height={941} loading="lazy" />;
}

function EventCard({ event, details }: { event: ClubEvent; details: EventPage }) {
  return (
    <article className={`event event--${event.accent}`} id={event.id}>
      <EventMedia event={event} />
      <div className="event__body">
        <p className="event__when">{details.schedule}</p>
        <h3 className="script event__title">{event.title}</h3>
        <p className="pill">Free</p>
        <p className="event__tagline">{event.tagline}</p>
        <p>{event.description}</p>
        <p>
          <VenueLink query={details.mapQuery}>{details.venueLine}</VenueLink>
        </p>
        <ul className="event__points">
          {event.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="hero__actions">
          <Rsvp href={details.rsvp} label={`RSVP for ${event.day}`} />
          <a className="btn btn--ghost" href={details.path}>
            Details
          </a>
        </div>
      </div>
    </article>
  );
}

function SpecialCard({ event }: { event: DatedEventPage }) {
  return (
    <article className={`event event--${event.accent}`}>
      <div className="event__body">
        <p className="event__when">
          {event.when} · {event.time}
        </p>
        <h3 className="script event__title">{event.h1}</h3>
        <p className="pill">{event.price}</p>
        <p>{event.description}</p>
        <p>
          <VenueLink query={event.mapQuery}>{event.venueLine}</VenueLink>
        </p>
        <div className="hero__actions">
          <Rsvp href={event.rsvp} />
          <a className="btn btn--ghost" href={event.path}>
            Details
          </a>
        </div>
      </div>
    </article>
  );
}

export function HomePage() {
  return (
    <main id="top">
      <section className="hero">
        <div className="hero__text">
          <p className="eyebrow">Surrey, BC · Hosted by Faith</p>
          <h1 className="script">
            Make friends <span className="highlight">outside work</span> in Surrey, BC
          </h1>
          <p className="lead">
            A social club for professionals. Free coworking on Mondays, free board games on Thursdays, and
            good people every week.
          </p>
          <MeetupRating />
          <div className="hero__actions">
            <Rsvp href={MEETUP_URL} label="Join us on Meetup" />
            <a className="btn btn--ghost" href="#events">
              See the week
            </a>
          </div>
        </div>
        <img
          className="hero__image"
          src="/images/hero.webp"
          width={1920}
          height={1080}
          alt="Social Club for Professionals in Surrey, BC: board games, coworking, real connections"
        />
      </section>

      <section className="week" id="events">
        <h2 className="script">This week at Social Club</h2>
        <div className="week__strip">
          {EVENTS.map((event) => {
            const details = seriesById[event.id as keyof typeof seriesById];
            return (
              <a key={event.id} className={`day day--${event.accent}`} href={details.path}>
                <span className="day__name">{event.day}</span>
                <span className="day__title">{event.title}</span>
                <span className="day__time">{event.time} · Free</span>
              </a>
            );
          })}
        </div>
        <div className="events">
          {EVENTS.map((event) => (
            <EventCard key={event.id} event={event} details={seriesById[event.id as keyof typeof seriesById]} />
          ))}
        </div>
      </section>

      <section className="soon" id="upcoming">
        <h2 className="script">Upcoming</h2>
        <div className="events">
          <SpecialCard event={whitecaps} />
          <SpecialCard event={mixer} />
        </div>
      </section>

      <section className="about" id="about">
        <h2 className="script">Same people, brighter days</h2>
        <div className="about__grid">
          <div className="about__item">
            <span className="dot dot--spacer" aria-hidden="true" />
            <h3>Come solo</h3>
            <p>Most people do. You will leave knowing a few new names.</p>
          </div>
          <div className="about__item">
            <span className="dot dot--pink" />
            <h3>No experience needed</h3>
            <p>New to coworking or board games? We explain everything first.</p>
          </div>
          <div className="about__item">
            <span className="dot dot--peach" />
            <h3>Real friends</h3>
            <p>Same faces every week means conversations that go somewhere.</p>
          </div>
        </div>
        <p className="section-link">
          <a href="/about">About the club</a>
        </p>
      </section>

      <section className="faq" id="faq">
        <h2 className="script">Questions</h2>
        <h3>Is it free?</h3>
        <p>
          Monday coworking, Thursday board game night, and the Whitecaps watch party are free. RSVP on
          Meetup. Food and drinks at the watch party are ordered from the restaurant. The End of Year Mixer
          is $35 early bird or $45 regular.
        </p>
        <h3>Do I need to know the games?</h3>
        <p>
          No. We explain the rules first. Games include Wavelength, Catch the Vibe, Avalon, Sushi Go, Spyfall,
          and Codenames.
        </p>
        <h3>Can I come alone?</h3>
        <p>Yes. Most people come solo, and bringing a friend is welcome too.</p>
        <h3>Where do I park?</h3>
        <p>
          The club does not reserve parking. Coworking is at Chai Coffee Company, 11088 126a St #100, Surrey.
          Board game night is at the Central City Mall food court, 10153 King George Blvd, Surrey. Use the
          map link on the event page for the address.
        </p>
      </section>

      <section className="cta">
        <h2 className="script">All are welcome!</h2>
        <p>RSVP on Meetup and we will save you a seat.</p>
        <Rsvp href={MEETUP_URL} label="Join us on Meetup" />
        <p className="signoff script">See you there! — Faith M</p>
      </section>

      <NewsletterForm />
    </main>
  );
}
