import { EVENTS, type ClubEvent } from '../config.ts';

type EventArtwork = 'soccer';

export type LinksEvent = Pick<
  ClubEvent,
  'id' | 'day' | 'time' | 'title' | 'tagline' | 'image' | 'photos' | 'accent'
> & {
  date?: string;
  location?: string;
  url?: string;
  sticker?: string;
  artwork?: EventArtwork;
};

const coworking = EVENTS.find((event) => event.id === 'coworking');

// Dated upcoming Meetup events for /links only. Do not spread EVENTS here;
// the homepage keeps its weekly coworking and board game copy separately.
export const LINKS_EVENTS: LinksEvent[] = [
  {
    id: 'bowling-night',
    day: 'Saturday',
    date: 'Sat, Nov 21, 2026',
    time: '4:00 – 6:00 PM',
    title: 'Bowling Night',
    tagline: 'Full - join the waitlist',
    location: 'The Zone Bowling Centre, Coquitlam',
    url: 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/events/317448447/',
    // Photo: Engin Akyurt, https://unsplash.com/photos/a-bowling-ball-on-a-bowling-alley-YxiW_hx3lyA
    photos: [
      {
        src: '/images/links-bowling-night.webp',
        alt: 'A green bowling ball on a wooden lane, with pins standing at the far end of the alley',
        width: 800,
        height: 600,
        orientation: 'landscape',
      },
    ],
    accent: 'peach',
  },
  {
    id: 'coworking-2026-11-23',
    day: 'Monday',
    date: 'Mon, Nov 23, 2026',
    time: '6:30 – 8:00 PM',
    title: 'Surrey Coworking',
    tagline: 'Get things done, together',
    location: 'Chai Coffee Company, Surrey',
    url: 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/events/317120927/',
    photos: coworking?.photos,
    accent: coworking?.accent ?? 'sage',
  },
  {
    id: 'girls-brunch',
    day: 'Saturday',
    date: 'Sat, Nov 28, 2026',
    time: '10:30 AM – 12:30 PM',
    title: "Girls' Brunch (women only)",
    tagline: 'Brunch and good company',
    location: "Maxine's Cafe & Bar, Downtown Vancouver",
    url: 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/events/317464950/',
    // Photo: Say S. (@iamsay), https://unsplash.com/photos/a-table-topped-with-lots-of-plates-of-food-4h9Ffh6aawI
    photos: [
      {
        src: '/images/links-girls-brunch.webp',
        alt: 'An overhead view of a café brunch table with French toast, eggs, salad, a sandwich, pastries, and coffee',
        width: 800,
        height: 571,
        orientation: 'landscape',
      },
    ],
    accent: 'pink',
  },
  {
    id: 'coworking-2026-11-30',
    day: 'Monday',
    date: 'Mon, Nov 30, 2026',
    time: '6:30 – 8:00 PM',
    title: 'Surrey Coworking',
    tagline: 'Get things done, together',
    location: 'Chai Coffee Company, Surrey',
    url: 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/events/317120929/',
    photos: coworking?.photos,
    accent: coworking?.accent ?? 'sage',
  },
  {
    id: 'casual-dinner',
    day: 'Saturday',
    date: 'Sat, Dec 5, 2026',
    time: '6:30 – 8:30 PM',
    title: 'Casual Dinner',
    tagline: 'Dinner and good company',
    location: 'Brewhall, Olympic Village, Vancouver',
    url: 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/events/317465147/',
    // Photo: Klara Kulikova (@kkalerry), https://unsplash.com/photos/WcV2YkM3Dls
    photos: [
      {
        src: '/images/links-casual-dinner.webp',
        alt: 'Friends reaching in to share a pizza at a restaurant table, with empty plates around the board',
        width: 800,
        height: 533,
        orientation: 'landscape',
      },
    ],
    accent: 'peach',
  },
];
