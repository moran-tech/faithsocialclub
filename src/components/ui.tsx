import type { ReactNode } from 'react';
import { MEETUP_URL } from '../config.ts';
import { mapsUrl } from '../seo.ts';

export function Rsvp({ href, label = 'RSVP on Meetup' }: { href: string; label?: string }) {
  return (
    <a className="btn" href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}

export function MeetupRating() {
  return (
    <p className="rating">
      Rated{' '}
      <a href={MEETUP_URL} target="_blank" rel="noopener noreferrer">
        5.0 on Meetup
      </a>{' '}
      from 24 reviews.
    </p>
  );
}

export function Facts({ items }: { items: { term: string; detail: ReactNode }[] }) {
  return (
    <dl className="facts">
      {items.map((item) => (
        <div key={item.term}>
          <dt>{item.term}</dt>
          <dd>{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export function VenueLink({ query, children }: { query: string; children: ReactNode }) {
  return (
    <a className="venue" href={mapsUrl(query)} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function Related({ links }: { links: { href: string; label: string }[] }) {
  return (
    <nav className="related" aria-label="Related pages">
      {links.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2).replaceAll('<', '\\u003c') }}
    />
  );
}
