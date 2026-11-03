import { useState, type CSSProperties } from 'react';
import { NewsletterForm } from '../NewsletterForm.tsx';
import { CITY, INSTAGRAM_URL, MEETUP_URL } from '../config.ts';
import { EventArtwork } from './EventArtwork.tsx';
import { trackLinkClick } from './analytics.ts';
import { FEATURED_MIXER, LINKS_EVENTS, type LinksEvent } from './events.ts';

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

function FeaturedMixer() {
  return (
    <a
      className="mixer-feature"
      href={FEATURED_MIXER.url}
      aria-labelledby="mixer-heading mixer-cta"
      data-analytics-section={FEATURED_MIXER.title}
    >
      <span className="mixer-feature__sparkles" aria-hidden="true">
        <Spark className="mixer-feature__spark mixer-feature__spark--one" />
        <Spark className="mixer-feature__spark mixer-feature__spark--two" />
        <Spark className="mixer-feature__spark mixer-feature__spark--three" />
      </span>
      <p className="links-eyebrow">{FEATURED_MIXER.audience}</p>
      <h1 id="mixer-heading">{FEATURED_MIXER.title}</h1>
      <p className="mixer-feature__details">
        {FEATURED_MIXER.date} · {FEATURED_MIXER.time} · {FEATURED_MIXER.location}
      </p>
      <ul className="mixer-feature__perks">
        {FEATURED_MIXER.perks.map((perk) => <li key={perk}>{perk}</li>)}
      </ul>
      <div className="mixer-feature__pricing">
        <span className="mixer-feature__sticker">
          Early bird <strong>${FEATURED_MIXER.earlyBirdPrice}</strong>
        </span>
        <span className="mixer-feature__regular">
          Regular <s>${FEATURED_MIXER.regularPrice}</s>
        </span>
      </div>
      <span className="mixer-feature__cta" id="mixer-cta">
        Grab your early bird ticket →
      </span>
    </a>
  );
}

function EventLink({ event, index }: { event: LinksEvent; index: number }) {
  const photo = event.photos?.[0];
  const image = photo?.src ?? event.image;
  const dayLabel = event.date ?? `Every ${event.day}`;

  return (
    <li className="links-reveal" style={entranceStyle(index)}>
      <a className={`event-link event-link--${event.accent}`} href={event.url ?? MEETUP_URL}>
        {(image || event.artwork) && (
          <div className="event-link__photo">
            {event.artwork ? (
              <EventArtwork theme={event.artwork} />
            ) : (
              <img
                src={image}
                alt={photo?.alt ?? `Friends playing board games around a café table at ${event.title}`}
                width={photo?.width ?? 735}
                height={photo?.height ?? 941}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
            )}
            <span className="event-link__day">{dayLabel}</span>
            {event.sticker && <span className="event-link__sticker">{event.sticker}</span>}
          </div>
        )}
        <div className="event-link__body">
          {!image && !event.artwork && <p className="links-eyebrow">{dayLabel}</p>}
          <h3>{event.title}</h3>
          <p className="event-link__tagline">{event.tagline}</p>
          {event.location && <p className="event-link__location">{event.location}</p>}
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

export default function LinksPage() {
  const [motionPaused, setMotionPaused] = useState(false);
  const marqueeItems = LINKS_EVENTS;

  return (
    <div
      className={`links-page${motionPaused ? ' links-page--paused' : ''}`}
      data-analytics-section="Links"
      onClickCapture={trackLinkClick}
    >
      <a className="links-skip" href="#plans">
        Skip to the plans
      </a>
      <div className="links-backdrop" aria-hidden="true">
        <Spark className="floating-shape floating-shape--one" />
        <span className="floating-shape floating-shape--two" />
        <Spark className="floating-shape floating-shape--three" />
      </div>

      <div className="links-shell">
        <header className="links-header" data-analytics-section="Header">
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
              aria-pressed={motionPaused}
              onClick={() => setMotionPaused((paused) => !paused)}
            >
              <span aria-hidden="true">{motionPaused ? '▷' : 'Ⅱ'}</span>
              {motionPaused ? 'Play motion' : 'Pause motion'}
            </button>
          </div>

          <FeaturedMixer />

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
            <h2>
              Make friends<br /><span>outside work.</span>
            </h2>
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
                    {event.date ?? event.day} / {event.title}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <main className="links-main">
          <section
            className="links-plans"
            id="plans"
            aria-labelledby="plans-heading"
            tabIndex={-1}
            data-analytics-section="Pick your plan."
          >
            <div className="links-section-heading">
              <h2 id="plans-heading">Pick your plan.</h2>
              <span aria-hidden="true">See you there ↓</span>
            </div>
            <ul className="links-stack">
              {LINKS_EVENTS.map((event, index) => (
                <EventLink event={event} index={index} key={event.id} />
              ))}
            </ul>
          </section>

          <nav
            className="links-more"
            aria-label="More Social Club links"
            data-analytics-section="More Social Club links"
          >
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
              href={INSTAGRAM_URL}
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

          <div className="links-newsletter" data-analytics-section="Newsletter">
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
