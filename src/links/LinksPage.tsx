import { useState, type CSSProperties } from 'react';
import { NewsletterForm } from '../NewsletterForm.tsx';
import {
  CITY,
  COMING_SOON,
  EVENTS,
  MEETUP_URL,
  type ClubEvent,
  type ComingSoonEvent,
} from '../config.ts';

function Spark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="m20 2 4.5 12 12-4.5L30 20l8 8-13-1.5L20 38l-4.5-12L3 30l7-10-8-8 13 1.5L20 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <span className="link-arrow" aria-hidden="true">
      ↗
    </span>
  );
}

function entranceStyle(index: number): CSSProperties {
  return { '--entrance-delay': `${index * 85}ms` } as CSSProperties;
}

function EventLink({ event, index }: { event: ClubEvent; index: number }) {
  const photo = event.photos?.[0];
  const image = photo?.src ?? event.image;

  return (
    <li className="links-reveal" style={entranceStyle(index)}>
      <a className={`event-link event-link--${event.accent}`} href={MEETUP_URL}>
        {image && (
          <div className="event-link__photo">
            <img
              src={image}
              alt={photo?.alt ?? `Friends playing board games around a café table at ${event.title}`}
              width={photo?.width ?? 735}
              height={photo?.height ?? 941}
              loading="lazy"
              decoding="async"
            />
            <span className="event-link__day">Every {event.day}</span>
          </div>
        )}
        <div className="event-link__body">
          {!image && <p className="links-eyebrow">Every {event.day}</p>}
          <h3>{event.title}</h3>
          <p className="event-link__tagline">{event.tagline}</p>
          <div className="event-link__bottom">
            <span>
              <span className="event-link__time">{event.time}</span>
              <span className="event-link__cta">RSVP on Meetup</span>
            </span>
            <Arrow />
          </div>
        </div>
      </a>
    </li>
  );
}

function ComingSoonLink({ event, index }: { event: ComingSoonEvent; index: number }) {
  return (
    <li className="links-reveal" style={entranceStyle(index)}>
      <a className={`event-link event-link--${event.accent} event-link--soon`} href={MEETUP_URL}>
        <div className="event-link__body">
          <div className="event-link__soon-label">
            <p className="links-eyebrow">On a {event.day}</p>
            <span className="soon-sticker">Coming soon</span>
          </div>
          <Spark className="event-link__spark" />
          <h3>{event.title}</h3>
          <div className="event-link__bottom">
            <span className="event-link__cta">Keep an eye on Meetup</span>
            <Arrow />
          </div>
        </div>
      </a>
    </li>
  );
}

export default function LinksPage() {
  const [motionPaused, setMotionPaused] = useState(false);
  const marqueeItems = [...EVENTS, ...COMING_SOON];

  return (
    <div className={`links-page${motionPaused ? ' links-page--paused' : ''}`}>
      <a className="links-skip" href="#plans">
        Skip to the plans
      </a>
      <div className="links-backdrop" aria-hidden="true">
        <Spark className="floating-shape floating-shape--one" />
        <span className="floating-shape floating-shape--two" />
        <Spark className="floating-shape floating-shape--three" />
      </div>

      <div className="links-shell">
        <header className="links-header">
          <div className="links-topline">
            <a className="links-brand" href="https://f8social.club" aria-label="F8 Social Club home">
              <span className="links-brand__stamp" aria-hidden="true">
                F8
              </span>
              <span>
                Social Club<span className="links-brand__host">Hosted by Faith</span>
              </span>
            </a>
            <button
              className="motion-toggle"
              type="button"
              onClick={() => setMotionPaused((paused) => !paused)}
            >
              <span aria-hidden="true">{motionPaused ? '▷' : 'Ⅱ'}</span>
              {motionPaused ? 'Play motion' : 'Pause motion'}
            </button>
          </div>

          <div className="links-banner">
            <img
              src="/images/hero.webp"
              width={1920}
              height={1080}
              fetchPriority="high"
              alt="Social Club for Professionals in Surrey, BC: board games, coworking, real connections"
            />
            <span className="solo-sticker">
              Come solo.<br />Leave with friends.
            </span>
          </div>

          <div className="links-intro">
            <p className="links-eyebrow">{CITY} · Good people, every week</p>
            <h1>
              Make friends<br /><span>outside work.</span>
            </h1>
            <p>
              Your next good plan starts here.<br />Come solo, everyone is welcome.
            </p>
          </div>
        </header>

        <div className="links-marquee" aria-hidden="true">
          <div className="links-marquee__track">
            {[0, 1].map((copy) => (
              <span className="links-marquee__group" key={copy}>
                {marqueeItems.map((event) => (
                  <span className="links-marquee__item" key={event.id}>
                    <Spark />
                    {event.day} / {event.title}
                    {COMING_SOON.some((upcoming) => upcoming.id === event.id) && ' (coming soon)'}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <main className="links-main">
          <section className="links-plans" id="plans" aria-labelledby="plans-heading" tabIndex={-1}>
            <div className="links-section-heading">
              <h2 id="plans-heading">Pick your plan.</h2>
              <span aria-hidden="true">See you there ↓</span>
            </div>
            <ul className="links-stack">
              {EVENTS.map((event, index) => (
                <EventLink event={event} index={index} key={event.id} />
              ))}
              {COMING_SOON.map((event, index) => (
                <ComingSoonLink event={event} index={EVENTS.length + index} key={event.id} />
              ))}
            </ul>
          </section>

          <nav className="links-more" aria-label="More Social Club links">
            <a
              className="extra-link extra-link--website links-reveal"
              href="https://f8social.club"
              style={entranceStyle(marqueeItems.length)}
            >
              <span className="extra-link__icon" aria-hidden="true">
                www.
              </span>
              <span className="extra-link__text">
                <span className="extra-link__title">The whole Social Club</span>
                <span className="extra-link__detail">Explore f8social.club</span>
              </span>
              <Arrow />
            </a>
            <a
              className="extra-link extra-link--instagram links-reveal"
              href="https://www.instagram.com/socialclub.pros/"
              style={entranceStyle(marqueeItems.length + 1)}
            >
              <span className="extra-link__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span className="extra-link__text">
                <span className="extra-link__title">@socialclub.pros</span>
                <span className="extra-link__detail">Find us on Instagram</span>
              </span>
              <Arrow />
            </a>
          </nav>

          <div className="links-newsletter">
            <div className="newsletter-sticker" aria-hidden="true">
              A little hello.<br />Every week.
            </div>
            <NewsletterForm />
          </div>
        </main>

        <footer className="links-footer">
          <Spark />
          <p>Same people, brighter days.</p>
          <span>Social Club, hosted by Faith · {CITY}</span>
        </footer>
      </div>
    </div>
  );
}
