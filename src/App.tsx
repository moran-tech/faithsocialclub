import {
  CITY,
  COMING_SOON,
  EVENTS,
  MEETUP_URL,
  type ClubEvent,
  type ComingSoonEvent,
} from './config.ts';

function JoinButton({ label = 'Join us on Meetup' }: { label?: string }) {
  return (
    <a className="btn" href={MEETUP_URL} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}

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

  return <img className="event__image" src={event.image} alt={`${event.title} photo`} loading="lazy" />;
}

function EventCard({ event }: { event: ClubEvent }) {
  return (
    <article className={`event event--${event.accent}`} id={event.id}>
      <EventMedia event={event} />
      <div className="event__body">
        <p className="event__when">
          Every {event.day} · {event.time}
        </p>
        <h3 className="script event__title">{event.title}</h3>
        <p className="pill">{event.tagline}</p>
        <p>{event.description}</p>
        <ul className="event__points">
          {event.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <JoinButton label={`RSVP for ${event.day}`} />
      </div>
    </article>
  );
}

function ComingSoonCard({ event }: { event: ComingSoonEvent }) {
  return (
    <article className={`event event--${event.accent} event--soon`} id={event.id}>
      <div className="event__body">
        <p className="event__when">Every {event.day}</p>
        <h3 className="script event__title">{event.title}</h3>
        <p className="pill">Coming soon</p>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <>
      <header className="nav">
        <a className="nav__brand script" href="#top">
          Social Club
        </a>
        <nav className="nav__links">
          <a href="#events">Events</a>
          {COMING_SOON.length > 0 && <a href="#coming-soon">Coming soon</a>}
          <a href="#about">About</a>
          <JoinButton label="Join" />
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__text">
            <p className="eyebrow">{CITY} · Hosted by Faith</p>
            <h1 className="script">
              Make friends <span className="highlight">outside work</span>
            </h1>
            <p className="lead">
              A social club for professionals. Coworking on Mondays, board games on Thursdays, and good
              people every week.
            </p>
            <div className="hero__actions">
              <JoinButton />
              <a className="btn btn--ghost" href="#events">
                See the week
              </a>
            </div>
          </div>
          <img
            className="hero__image"
            src="/images/hero.jpg"
            alt="Illustration of friends coworking, painting, and sharing food at a café table"
          />
        </section>

        <section className="week" id="events">
          <h2 className="script">This week at Social Club</h2>
          <div className="week__strip">
            {EVENTS.map((event) => (
              <a key={event.id} className={`day day--${event.accent}`} href={`#${event.id}`}>
                <span className="day__name">{event.day}</span>
                <span className="day__title">{event.title}</span>
                <span className="day__time">{event.time}</span>
              </a>
            ))}
          </div>
          <div className="events">
            {EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {COMING_SOON.length > 0 && (
          <section className="soon" id="coming-soon">
            <h2 className="script">Coming soon</h2>
            <div className="events">
              {COMING_SOON.map((event) => (
                <ComingSoonCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        <section className="about" id="about">
          <h2 className="script">Same people, brighter days</h2>
          <div className="about__grid">
            <div className="about__item">
              <span className="dot dot--green" />
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
        </section>

        <section className="cta">
          <h2 className="script">All are welcome!</h2>
          <p>RSVP on Meetup and we will save you a seat.</p>
          <JoinButton />
          <p className="signoff script">See you there! — Faith M</p>
        </section>
      </main>

      <footer className="footer">
        <p>
          Social Club, hosted by Faith · {CITY} · © {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
