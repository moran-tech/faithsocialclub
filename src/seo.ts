import { INSTAGRAM_URL, MEETUP_URL } from './config.ts';

const ORIGIN = 'https://f8social.club';
const ORG_ID = `${ORIGIN}/#org`;

const OG_IMAGE = `${ORIGIN}/og.jpg`;
const OG_IMAGE_ALT =
  'Social Club for Professionals in Surrey, BC: board games, coworking, real connections';

export const MEETUP_EVENTS = {
  coworking: 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/events/zqvrbvyjcpbmb/',
  board: 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/events/317209890/',
  whitecaps: 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/events/317166913/',
  mixer: 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/events/317095315/',
} as const;

const organizer = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'f8 Social Club for Professionals',
  url: `${ORIGIN}/`,
};

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'f8 Social Club for Professionals',
  alternateName: ['Social Club for Professionals', 'f8social.club'],
  url: `${ORIGIN}/`,
  logo: `${ORIGIN}/favicon.png`,
  image: OG_IMAGE,
  description:
    'A social club for professionals in Surrey, BC: free coworking every Monday and board game night every Thursday at 6:30 PM.',
  founder: { '@type': 'Person', name: 'Faith Morante' },
  areaServed: { '@type': 'City', name: 'Surrey, British Columbia' },
  sameAs: [MEETUP_URL, INSTAGRAM_URL],
};

const chai = {
  name: 'Chai Coffee Company',
  street: '11088 126a St #100',
  locality: 'Surrey',
  region: 'BC',
  postal: 'V3V 0G3',
};

const centralCity = {
  name: 'Central City Mall food court',
  street: '10153 King George Blvd',
  locality: 'Surrey',
  region: 'BC',
  postal: 'V3T 2W1',
};

const browns = {
  name: 'Browns Socialhouse Surrey Centre',
  street: '9666 King George Blvd A1',
  locality: 'Surrey',
  region: 'BC',
};

const nazrana = {
  name: 'Studio Nazrana',
  street: '13140 80 Ave',
  locality: 'Surrey',
  region: 'BC',
  postal: 'V3W 3B2',
};

const coworkingLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Surrey Coworking with Deep Work Focus',
  description:
    'Free weekly coworking for builders, creators, freelancers and founders. Say your goal, do an hour of deep work, then network.',
  startDate: '2026-11-09T18:30:00-07:00',
  endDate: '2026-11-09T20:00:00-07:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  isAccessibleForFree: true,
  location: {
    '@type': 'Place',
    name: chai.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: chai.street,
      addressLocality: chai.locality,
      addressRegion: chai.region,
      postalCode: chai.postal,
      addressCountry: 'CA',
    },
  },
  image: [`${ORIGIN}/images/coworking-group.webp`, `${ORIGIN}/images/coworking-laptops.webp`],
  offers: {
    '@type': 'Offer',
    price: 0,
    priceCurrency: 'CAD',
    availability: 'https://schema.org/InStock',
    url: MEETUP_EVENTS.coworking,
  },
  organizer,
};

const boardLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Board Game Night in Surrey',
  description:
    'A relaxed night of party and strategy games like Wavelength, Catch the Vibe, Avalon, Sushi Go, Spyfall and Codenames. No experience needed; come solo or bring a friend.',
  startDate: '2026-11-05T18:30:00-07:00',
  endDate: '2026-11-05T20:00:00-07:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  isAccessibleForFree: true,
  location: {
    '@type': 'Place',
    name: centralCity.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: centralCity.street,
      addressLocality: centralCity.locality,
      addressRegion: centralCity.region,
      postalCode: centralCity.postal,
      addressCountry: 'CA',
    },
  },
  image: [`${ORIGIN}/images/board-game-night.webp`],
  offers: {
    '@type': 'Offer',
    price: 0,
    priceCurrency: 'CAD',
    availability: 'https://schema.org/InStock',
    url: MEETUP_EVENTS.board,
  },
  organizer,
};

// No Whitecaps photo exists. The extra café photos are coworking, so this event has no image.
const whitecapsLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Whitecaps Watch Party: Whitecaps vs CF Montréal (MLS Decision Day)',
  description:
    'Watch the Vancouver Whitecaps with other Surrey professionals. $5 holds your seat; food and drinks are ordered from the restaurant.',
  startDate: '2026-11-07T14:00:00-07:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: browns.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: browns.street,
      addressLocality: browns.locality,
      addressRegion: browns.region,
      addressCountry: 'CA',
    },
  },
  offers: {
    '@type': 'Offer',
    price: 5,
    priceCurrency: 'CAD',
    availability: 'https://schema.org/InStock',
    url: MEETUP_EVENTS.whitecaps,
  },
  organizer,
};

// No mixer photo exists. Left out rather than reuse a coworking or board-game photo.
const partyLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'End of Year Mixer for Surrey Professionals feat. DJ AJ',
  description:
    'Close out 2026 with good people, good music and good food: welcome drink, icebreakers, dinner, then mingling and dancing.',
  startDate: '2026-12-05T18:30:00-07:00',
  endDate: '2026-12-05T21:00:00-07:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: nazrana.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: nazrana.street,
      addressLocality: nazrana.locality,
      addressRegion: nazrana.region,
      postalCode: nazrana.postal,
      addressCountry: 'CA',
    },
  },
  performer: { '@type': 'Person', name: 'DJ AJ' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Early bird',
      price: 35,
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
      url: MEETUP_EVENTS.mixer,
    },
    {
      '@type': 'Offer',
      name: 'Regular',
      price: 45,
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
      url: MEETUP_EVENTS.mixer,
    },
  ],
  organizer,
};

export type PageSeo = {
  path: string;
  h1: string;
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  jsonLd?: object;
};

export type EventPage = PageSeo & {
  schedule: string;
  when: string;
  startDate: string;
  time: string;
  price: string;
  venueLine: string;
  mapQuery: string;
  rsvp: string;
  accent: 'pink' | 'sage' | 'peach';
};

function canonicalFor(path: string): string {
  return path === '/' ? `${ORIGIN}/` : `${ORIGIN}${path}`;
}

function page(
  entry: Omit<PageSeo, 'canonical' | 'ogTitle'> & { ogTitle?: string },
): PageSeo {
  return {
    ...entry,
    canonical: canonicalFor(entry.path),
    ogTitle: entry.ogTitle ?? entry.title,
  };
}

function addressLine(place: { name: string; street: string; locality: string; region: string; postal?: string }): string {
  const tail = place.postal ? `${place.region} ${place.postal}` : place.region;
  return `${place.name}, ${place.street}, ${place.locality}, ${tail}`;
}

export function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

const homeDescription =
  'Free weekly coworking on Mondays and board game nights on Thursdays in Surrey, BC. Meet professionals, make friends, come solo. RSVP on Meetup.';

export const home = page({
  path: '/',
  h1: 'Make friends outside work in Surrey, BC',
  title: 'Surrey BC Social Events & Meetups | f8 Social Club',
  description: homeDescription,
  ogTitle: 'f8 Social Club: Surrey BC social events for professionals',
  jsonLd: orgLd,
});

export const coworking: EventPage = {
  ...page({
    path: '/coworking-surrey',
    h1: 'Free Coworking in Surrey, Every Monday',
    title: 'Free Coworking in Surrey BC, Mondays 6:30 PM | f8 Social Club',
    description:
      'Bring your laptop to Chai Coffee Company every Monday at 6:30 PM. Set a goal, do an hour of deep work, then meet other builders and creators. Free.',
    jsonLd: coworkingLd,
  }),
  schedule: 'Every Monday',
  when: 'Monday, November 9, 2026',
  startDate: '2026-11-09T18:30:00-07:00',
  time: '6:30 – 8:00 PM',
  price: 'Free',
  venueLine: addressLine(chai),
  mapQuery: addressLine(chai),
  rsvp: MEETUP_EVENTS.coworking,
  accent: 'sage',
};

export const board: EventPage = {
  ...page({
    path: '/board-game-night-surrey',
    h1: 'Board Game Night in Surrey, Every Thursday',
    title: 'Board Game Night in Surrey BC, Thursdays 6:30 PM | f8 Social Club',
    description:
      'Weekly board game night in Surrey: Codenames, Avalon, Wavelength and more. No experience needed, come solo or bring a friend. Free to join.',
    jsonLd: boardLd,
  }),
  schedule: 'Every Thursday',
  when: 'Thursday, November 5, 2026',
  startDate: '2026-11-05T18:30:00-07:00',
  time: '6:30 – 8:00 PM',
  price: 'Free',
  venueLine: `This week: ${addressLine(centralCity)}`,
  mapQuery: addressLine(centralCity),
  rsvp: MEETUP_EVENTS.board,
  accent: 'pink',
};

export const eventsPage = page({
  path: '/events',
  h1: 'Surrey Events This Month',
  title: 'Surrey BC Events This Month | f8 Social Club',
  description:
    'Upcoming coworking, board game nights, watch parties and mixers for professionals in Surrey, BC.',
});

export const whitecaps: EventPage = {
  ...page({
    path: '/events/whitecaps-watch-party-2026-11-07',
    h1: 'Whitecaps Watch Party in Surrey',
    title: 'Whitecaps Watch Party in Surrey, Nov 7 | f8 Social Club',
    description:
      'Watch Whitecaps vs CF Montréal on MLS Decision Day at Browns Socialhouse Surrey Centre, Sat Nov 7 at 2 PM. $5 holds your seat.',
    jsonLd: whitecapsLd,
  }),
  schedule: 'Saturday, November 7, 2026',
  when: 'Saturday, November 7, 2026',
  startDate: '2026-11-07T14:00:00-07:00',
  time: '2:00 PM',
  price: '$5 holds your seat',
  venueLine: addressLine(browns),
  mapQuery: addressLine(browns),
  rsvp: MEETUP_EVENTS.whitecaps,
  accent: 'peach',
};

export const mixer: EventPage = {
  ...page({
    path: '/events/end-of-year-mixer-2026-12-05',
    h1: 'End of Year Mixer for Surrey Professionals',
    title: 'End of Year Mixer in Surrey, Dec 5 feat. DJ AJ | f8 Social Club',
    description:
      'Close out 2026 at Studio Nazrana, Surrey: welcome drink, dinner, icebreakers and dancing with DJ AJ. Sat Dec 5, 6:30 PM. Early bird $35.',
    jsonLd: partyLd,
  }),
  schedule: 'Saturday, December 5, 2026',
  when: 'Saturday, December 5, 2026',
  startDate: '2026-12-05T18:30:00-07:00',
  time: '6:30 – 9:00 PM',
  price: 'Early bird $35 · Regular $45',
  venueLine: addressLine(nazrana),
  mapQuery: addressLine(nazrana),
  rsvp: MEETUP_EVENTS.mixer,
  accent: 'pink',
};

// The spec lists this H1 and route, and not a title or meta description.
export const about = page({
  path: '/about',
  h1: 'About f8 Social Club',
  title: 'About f8 Social Club | Surrey BC',
  description:
    'Faith Morante hosts f8 Social Club for professionals in Surrey, BC. Free coworking every Monday and board game night every Thursday. Come solo.',
  jsonLd: orgLd,
});

export const PAGES: PageSeo[] = [home, coworking, board, eventsPage, whitecaps, mixer, about];

export const upcoming: EventPage[] = [board, whitecaps, coworking, mixer];

export const GAMES = ['Wavelength', 'Catch the Vibe', 'Avalon', 'Sushi Go', 'Spyfall', 'Codenames'];

export function normalizePath(url: string): string {
  const path = url.split('?')[0]?.split('#')[0] ?? '/';
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path || '/';
}

export function pageByPath(url: string): PageSeo | undefined {
  const path = normalizePath(url);
  return PAGES.find((entry) => entry.path === path);
}

function esc(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

export function renderHead(entry: PageSeo): string {
  return [
    `<title>${esc(entry.title)}</title>`,
    `<meta name="description" content="${esc(entry.description)}" />`,
    `<link rel="canonical" href="${esc(entry.canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${esc(entry.canonical)}" />`,
    `<meta property="og:title" content="${esc(entry.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(entry.description)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="675" />`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
    `<meta property="og:site_name" content="f8 Social Club" />`,
    `<meta property="og:locale" content="en_CA" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n');
}
