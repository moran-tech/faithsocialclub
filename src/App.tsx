import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CITY,
  COMING_SOON,
  EVENTS,
  MEETUP_URL,
  type ClubEvent,
  type ComingSoonEvent,
} from './config.ts';

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

const PHONE_NAV_QUERY = '(max-width: 479px)';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPhoneNav, setIsPhoneNav] = useState(() => window.matchMedia(PHONE_NAV_QUERY).matches);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((restore: 'now' | 'after' = 'now') => {
    const restoreFocus = menuRef.current?.contains(document.activeElement) ?? false;
    setMenuOpen(false);
    if (!restoreFocus) return;

    const focusToggle = () => toggleRef.current?.focus({ preventScroll: true });
    if (restore === 'now') {
      focusToggle();
      return;
    }

    // Wait until link activation or the outside click has moved focus, then
    // send it back to the button if it would otherwise fall on the page.
    setTimeout(() => {
      const active = document.activeElement;
      if (active === document.body || active === null || menuRef.current?.contains(active)) {
        focusToggle();
      }
    }, 0);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(PHONE_NAV_QUERY);
    const onChange = () => {
      setIsPhoneNav(media.matches);
      if (!media.matches) setMenuOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu('now');
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) closeMenu('after');
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [menuOpen, closeMenu]);

  const menu = (
    <nav id="site-nav" ref={menuRef} className={menuOpen ? 'nav__links is-open' : 'nav__links'}>
      <a href="#events" onClick={() => closeMenu('after')}>
        Events
      </a>
      {COMING_SOON.length > 0 && (
        <a href="#coming-soon" onClick={() => closeMenu('after')}>
          Coming soon
        </a>
      )}
      <a href="#about" onClick={() => closeMenu('after')}>
        About
      </a>
    </nav>
  );

  return (
    <>
      <header className={menuOpen ? 'nav nav--open' : 'nav'} ref={navRef}>
        <a className="nav__brand script" href="#top" onClick={() => closeMenu()}>
          Social Club
        </a>
        {/* Phone tab order is Join, menu button, then these links. Wider screens keep the links in the bar, before Join. */}
        {isPhoneNav ? null : menu}
        <JoinButton label="Join" onClick={() => closeMenu()} />
        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="nav__burger" aria-hidden="true" />
        </button>
        {isPhoneNav ? menu : null}
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
