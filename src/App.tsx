import { useEffect, useRef, useState } from 'react';
import { CITY, EVENTS, MEETUP_URL, type ClubEvent } from './config.ts';

function JoinButton({
  label = 'Join us on Meetup',
  onClick,
}: {
  label?: string;
  onClick?: () => void;
}) {
  return (
    <a className="btn" href={MEETUP_URL} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {label}
    </a>
  );
}

function EventCard({ event }: { event: ClubEvent }) {
  return (
    <article className={`event event--${event.accent}`} id={event.id}>
      {event.image && (
        <img className="event__image" src={event.image} alt={`${event.title} photo`} loading="lazy" />
      )}
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia('(min-width: 480px)').matches) setMenuOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={menuOpen ? 'nav nav--open' : 'nav'} ref={navRef}>
        <a className="nav__brand script" href="#top" onClick={closeMenu}>
          Social Club
        </a>
        <nav id="site-nav" className={menuOpen ? 'nav__links is-open' : 'nav__links'}>
          <a href="#events" onClick={closeMenu}>
            Events
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
        </nav>
        <JoinButton label="Join" onClick={closeMenu} />
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="nav__burger" aria-hidden="true" />
        </button>
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
