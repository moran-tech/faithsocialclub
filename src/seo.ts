import {
  COWORKING_CONVERSATION,
  COWORKING_LONG_TABLE,
  COWORKING_SIDE_TABLE,
  EXTRA_COWORKING_PHOTOS,
  INSTAGRAM_URL,
  MEETUP_URL,
} from './config.ts';

const ORIGIN = 'https://f8social.club';
const ORG_ID = `${ORIGIN}/#org`;

const OG_IMAGE = `${ORIGIN}/og.jpg`;
const OG_IMAGE_ALT =
  'Social Club for Professionals in Surrey, BC: board games, coworking, real connections';

// BC is on Pacific Time year-round at UTC-7. America/Vancouver in IANA data can
// still report UTC-8 in winter, so the civil clock here uses a fixed -07:00 offset.
const PACIFIC_OFFSET_MS = 7 * 60 * 60 * 1000;

export type ShareImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

const DEFAULT_IMAGE: ShareImage = {
  url: OG_IMAGE,
  width: 1200,
  height: 675,
  alt: OG_IMAGE_ALT,
};

function absolute(src: string): string {
  return `${ORIGIN}${src}`;
}

function shareImage(src: string, alt: string): ShareImage {
  return { url: absolute(src), width: 1200, height: 675, alt };
}

const coworkingShare = shareImage(
  '/images/coworking-side-table-og.webp',
  COWORKING_SIDE_TABLE.alt,
);
const whitecapsShare = shareImage('/images/coworking-long-table-og.webp', COWORKING_LONG_TABLE.alt);
const mixerShare = shareImage('/images/coworking-conversation-og.webp', COWORKING_CONVERSATION.alt);

export function nextWeeklyWindow(day: 'Monday' | 'Thursday', now = new Date()): {
  startDate: string;
  endDate: string;
} {
  const target = day === 'Monday' ? 1 : 4;
  const shifted = new Date(now.getTime() - PACIFIC_OFFSET_MS);
  const weekday = shifted.getUTCDay();
  const minutes = shifted.getUTCHours() * 60 + shifted.getUTCMinutes();
  let delta = (target - weekday + 7) % 7;
  if (delta === 0 && minutes >= 20 * 60) delta = 7;
  const next = new Date(Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate() + delta));
  const date = next.toISOString().slice(0, 10);
  return {
    startDate: `${date}T18:30:00-07:00`,
    endDate: `${date}T20:00:00-07:00`,
  };
}

export type FaqItem = {
  question: string;
  answer: string;
  href?: string;
  linkLabel?: string;
};

export const FAQ: readonly FaqItem[] = [
  {
    question: 'What meetups are in Surrey?',
    answer:
      'We host two free meetups in Surrey every week: Monday coworking, 6:30 – 8:00 PM at Chai Coffee Company, and Thursday board game night, 6:30 – 8:00 PM at Central City Mall. RSVP on Meetup.',
    href: '/meetups-in-surrey',
    linkLabel: 'Meetups in Surrey',
  },
  {
    question: 'Is it free?',
    answer:
      'Monday coworking, Thursday board game night, and the Whitecaps watch party are free. RSVP on Meetup. Food and drinks at the watch party are ordered from the restaurant. The End of Year Mixer is $35 early bird or $45 regular.',
  },
  {
    question: 'Do I need to know the games?',
    answer:
      'No. We explain the rules first. Games include Wavelength, Catch the Vibe, Avalon, Sushi Go, Spyfall, and Codenames.',
  },
  {
    question: 'Can I come alone?',
    answer: 'Yes. Most people come solo, and bringing a friend is welcome too.',
  },
  {
    question: 'Where do I park?',
    answer:
      'The club does not reserve parking. Coworking is at Chai Coffee Company, 11088 126a St #100, Surrey. Board game night is at the Central City Mall food court, 10153 King George Blvd, Surrey. Use the map link on the event page for the address.',
  },
];

export const MEETUPS_FAQ: readonly FaqItem[] = [
  {
    question: 'What meetups are in Surrey?',
    answer:
      'f8 Social Club hosts two free meetups in Surrey every week for professionals. Monday coworking is 6:30 – 8:00 PM at Chai Coffee Company, 11088 126a St #100. Thursday board game night is 6:30 – 8:00 PM at the Central City Mall food court. RSVP on Meetup. Other groups also post on Meetup.com. This page is our club, not a directory of every meetup in the city.',
  },
  {
    question: 'Where to meet people in Surrey?',
    answer:
      'Come back to the same weekly meetup. Monday coworking at Chai Coffee Company and Thursday board games at Central City Mall are both free and start at 6:30 PM. Most people arrive alone. RSVP on Meetup so we know to expect you.',
  },
  {
    question: 'How to meet people in Surrey?',
    answer:
      'RSVP for one night, show up, and come again the next week. Monday coworking is an hour of quiet work, then conversation. Thursday board game night starts with the rules, so you can sit down without knowing anyone. The same room each week is how names become friends.',
  },
  {
    question: 'Where to go in Surrey today for adults?',
    answer:
      'On Mondays, coworking at Chai Coffee Company, 6:30 – 8:00 PM. On Thursdays, board games at the Central City Mall food court, 6:30 – 8:00 PM. Both are free and meant for adults who want company after work. Other dates, including the Whitecaps watch party and the End of Year Mixer, are on the events page.',
  },
  {
    question: 'Are the meetups free?',
    answer:
      'Yes. Monday coworking and Thursday board game night are free. RSVP on Meetup. The Whitecaps watch party is free entry, and food and drinks are ordered from the restaurant. The End of Year Mixer is $35 early bird or $45 regular.',
  },
  {
    question: 'Can I come alone?',
    answer: 'Yes. Most people come solo. Bringing a friend is welcome too.',
  },
  {
    question: 'Where are the meetups?',
    answer:
      'Coworking is at Chai Coffee Company, 11088 126a St #100, Surrey. Board game night is at the Central City Mall food court, 10153 King George Blvd, Surrey. Both run 6:30 – 8:00 PM.',
  },
  {
    question: 'What has replaced Meetup?',
    answer:
      'Nothing has replaced Meetup for this club. Meetup is still active, and it is where we RSVP for Monday coworking, Thursday board games, and the other Surrey events.',
  },
];

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

function weeklySchedule(day: 'Monday' | 'Thursday') {
  return {
    '@type': 'Schedule',
    repeatFrequency: 'P1W',
    byDay: `https://schema.org/${day}`,
    startTime: '18:30:00',
    endTime: '20:00:00',
    scheduleTimezone: 'America/Vancouver',
  };
}

const mondayWindow = nextWeeklyWindow('Monday');
const thursdayWindow = nextWeeklyWindow('Thursday');

const coworkingLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Surrey Coworking with Deep Work Focus',
  description:
    'Free weekly coworking for builders, creators, freelancers and founders. Say your goal, do an hour of deep work, then network.',
  eventSchedule: weeklySchedule('Monday'),
  startDate: mondayWindow.startDate,
  endDate: mondayWindow.endDate,
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
  image: [
    `${ORIGIN}/images/coworking-group.webp`,
    `${ORIGIN}/images/coworking-laptops.webp`,
    ...EXTRA_COWORKING_PHOTOS.map((photo) => absolute(photo.src)),
  ],
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
  eventSchedule: weeklySchedule('Thursday'),
  startDate: thursdayWindow.startDate,
  endDate: thursdayWindow.endDate,
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

const whitecapsLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Whitecaps Watch Party: Whitecaps vs CF Montréal (MLS Decision Day)',
  description:
    'Watch the Vancouver Whitecaps with other Surrey professionals. Free entry; food and drinks are ordered from the restaurant.',
  startDate: '2026-11-07T14:00:00-07:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  isAccessibleForFree: true,
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
  image: [whitecapsShare.url, absolute(COWORKING_LONG_TABLE.src)],
  offers: {
    '@type': 'Offer',
    price: 0,
    priceCurrency: 'CAD',
    availability: 'https://schema.org/InStock',
    url: MEETUP_EVENTS.whitecaps,
  },
  organizer,
};

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
  image: [mixerShare.url, absolute(COWORKING_CONVERSATION.src)],
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

export type JsonLd = Record<string, unknown>;

export type PageSeo = {
  path: string;
  h1: string;
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  image: ShareImage;
  jsonLd?: JsonLd | JsonLd[];
};

export type EventPage = PageSeo & {
  schedule: string;
  time: string;
  price: string;
  venueLine: string;
  mapQuery: string;
  rsvp: string;
  accent: 'pink' | 'sage' | 'peach';
};

export type DatedEventPage = EventPage & {
  when: string;
  startDate: string;
};

function canonicalFor(path: string): string {
  return path === '/' ? `${ORIGIN}/` : `${ORIGIN}${path}`;
}

function page(
  entry: Omit<PageSeo, 'canonical' | 'ogTitle' | 'image'> & { ogTitle?: string; image?: ShareImage },
): PageSeo {
  return {
    ...entry,
    canonical: canonicalFor(entry.path),
    ogTitle: entry.ogTitle ?? entry.title,
    image: entry.image ?? DEFAULT_IMAGE,
  };
}

function eventNode(ld: { '@context': string; name: string }): JsonLd {
  const { '@context': _context, ...rest } = ld;
  return rest;
}

function faqPageLd(items: readonly FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

const faqLd: JsonLd = faqPageLd(FAQ);

const eventsListLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Surrey Events This Month',
  itemListElement: [
    { url: canonicalFor('/coworking-surrey'), event: coworkingLd },
    { url: canonicalFor('/board-game-night-surrey'), event: boardLd },
    { url: canonicalFor('/events/whitecaps-watch-party-2026-11-07'), event: whitecapsLd },
    { url: canonicalFor('/events/end-of-year-mixer-2026-12-05'), event: partyLd },
  ].map((entry, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: entry.url,
    name: entry.event.name,
    item: eventNode(entry.event),
  })),
};

const eventsCrumbLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'Events', item: canonicalFor('/events') },
  ],
};

const meetupsCrumbLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: 'Meetups in Surrey', item: canonicalFor('/meetups-in-surrey') },
  ],
};

const faithLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Faith Morante',
  url: canonicalFor('/about'),
  description: 'Faith Morante hosts f8 Social Club for Professionals. She is the founder of the club.',
  sameAs: [MEETUP_URL, INSTAGRAM_URL],
  worksFor: { '@id': ORG_ID },
};

function addressLine(place: { name: string; street: string; locality: string; region: string; postal?: string }): string {
  const tail = place.postal ? `${place.region} ${place.postal}` : place.region;
  return `${place.name}, ${place.street}, ${place.locality}, ${tail}`;
}

export function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

const homeDescription =
  'Meetups in Surrey for professionals who want friends outside work. Free Monday coworking and Thursday board games. Come solo. RSVP on Meetup.';

export const home = page({
  path: '/',
  h1: 'Make friends outside work in Surrey, BC',
  title: 'Meetups in Surrey BC for Professionals | f8 Social Club',
  description: homeDescription,
  ogTitle: 'Meetups in Surrey BC | f8 Social Club',
  jsonLd: [orgLd, faqLd],
});

export const coworking: EventPage = {
  ...page({
    path: '/coworking-surrey',
    h1: 'Free Coworking in Surrey, Every Monday',
    title: 'Free Coworking in Surrey BC, Mondays 6:30 PM | f8 Social Club',
    description:
      'Bring your laptop to Chai Coffee Company every Monday at 6:30 PM. Set a goal, do an hour of deep work, then meet other builders and creators. Free.',
    image: coworkingShare,
    jsonLd: coworkingLd,
  }),
  schedule: 'Every Monday, 6:30 PM',
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
  schedule: 'Every Thursday, 6:30 PM',
  time: '6:30 – 8:00 PM',
  price: 'Free',
  venueLine: addressLine(centralCity),
  mapQuery: addressLine(centralCity),
  rsvp: MEETUP_EVENTS.board,
  accent: 'pink',
};

export const meetups = page({
  path: '/meetups-in-surrey',
  h1: 'Meetups in Surrey',
  title: 'Meetups in Surrey BC | Free Weekly Social Events | f8 Social Club',
  description:
    'Free weekly meetups in Surrey, BC for professionals: Monday coworking and Thursday board games at 6:30 PM. Come solo and RSVP on Meetup.',
  jsonLd: [faqPageLd(MEETUPS_FAQ), meetupsCrumbLd],
});

export const eventsPage = page({
  path: '/events',
  h1: 'Surrey Events This Month',
  title: 'Surrey BC Events This Month | f8 Social Club',
  description:
    'Upcoming coworking, board game nights, watch parties and mixers for professionals in Surrey, BC.',
  jsonLd: [eventsListLd, eventsCrumbLd],
});

export const whitecaps: DatedEventPage = {
  ...page({
    path: '/events/whitecaps-watch-party-2026-11-07',
    h1: 'Whitecaps Watch Party in Surrey',
    title: 'Whitecaps Watch Party in Surrey, Nov 7 | f8 Social Club',
    description:
      'Watch Whitecaps vs CF Montréal on MLS Decision Day at Browns Socialhouse Surrey Centre, Sat Nov 7 at 2 PM. Free entry.',
    image: whitecapsShare,
    jsonLd: whitecapsLd,
  }),
  schedule: 'Saturday, November 7, 2026',
  when: 'Saturday, November 7, 2026',
  startDate: '2026-11-07T14:00:00-07:00',
  time: '2:00 PM',
  price: 'Free',
  venueLine: addressLine(browns),
  mapQuery: addressLine(browns),
  rsvp: MEETUP_EVENTS.whitecaps,
  accent: 'peach',
};

export const mixer: DatedEventPage = {
  ...page({
    path: '/events/end-of-year-mixer-2026-12-05',
    h1: 'End of Year Mixer for Surrey Professionals',
    title: 'End of Year Mixer in Surrey, Dec 5 feat. DJ AJ | f8 Social Club',
    description:
      'Close out 2026 at Studio Nazrana, Surrey: welcome drink, dinner, icebreakers and dancing with DJ AJ. Sat Dec 5, 6:30 PM. Early bird $35.',
    image: mixerShare,
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
  jsonLd: [orgLd, faithLd],
});

export const PAGES: PageSeo[] = [home, meetups, coworking, board, eventsPage, whitecaps, mixer, about];

export const weeklySeries: EventPage[] = [coworking, board];

export const datedEvents: DatedEventPage[] = [whitecaps, mixer];

export const GAMES = ['Wavelength', 'Catch the Vibe', 'Avalon', 'Sushi Go', 'Spyfall', 'Codenames'];

export function normalizePath(url: string): string {
  let path = url.split('?')[0]?.split('#')[0] ?? '/';
  // The static host serves /about/index.html as the same file as /about.
  // Leaving the suffix on makes the client render nothing over that HTML.
  if (path.endsWith('/index.html')) path = path.slice(0, -'index.html'.length);
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path || '/';
}

export function pageByPath(url: string): PageSeo | undefined {
  const path = normalizePath(url);
  return PAGES.find((entry) => entry.path === path);
}

function esc(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

export function jsonLdBlocks(entry: { jsonLd?: JsonLd | JsonLd[] }): JsonLd[] {
  if (!entry.jsonLd) return [];
  return Array.isArray(entry.jsonLd) ? entry.jsonLd : [entry.jsonLd];
}

export function renderHead(entry: PageSeo): string {
  const scripts = jsonLdBlocks(entry).map(
    (block) =>
      `<script type="application/ld+json">${JSON.stringify(block).replaceAll('<', '\\u003c')}</script>`,
  );
  return [
    `<title>${esc(entry.title)}</title>`,
    `<meta name="description" content="${esc(entry.description)}" />`,
    `<link rel="canonical" href="${esc(entry.canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${esc(entry.canonical)}" />`,
    `<meta property="og:title" content="${esc(entry.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(entry.description)}" />`,
    `<meta property="og:image" content="${esc(entry.image.url)}" />`,
    `<meta property="og:image:width" content="${entry.image.width}" />`,
    `<meta property="og:image:height" content="${entry.image.height}" />`,
    `<meta property="og:image:alt" content="${esc(entry.image.alt)}" />`,
    `<meta property="og:site_name" content="f8 Social Club" />`,
    `<meta property="og:locale" content="en_CA" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(entry.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(entry.description)}" />`,
    `<meta name="twitter:image" content="${esc(entry.image.url)}" />`,
    ...scripts,
  ].join('\n');
}
