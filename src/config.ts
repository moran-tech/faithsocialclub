// Replace with the real Meetup group URL before launch.
export const MEETUP_URL = 'https://www.meetup.com/';

export const CITY = 'Surrey, BC';

export type EventAccent = 'pink' | 'sage' | 'peach';

export type EventPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
};

export type ClubEvent = {
  id: string;
  day: string;
  time: string;
  title: string;
  tagline: string;
  description: string;
  points: string[];
  image?: string;
  photos?: EventPhoto[];
  accent: EventAccent;
};

/** Announced events that don't have a time, place, or other details yet. */
export type ComingSoonEvent = {
  id: string;
  day: string;
  title: string;
  accent: EventAccent;
};

export const EVENTS: ClubEvent[] = [
  {
    id: 'coworking',
    day: 'Monday',
    time: '6:30 – 8:00 PM',
    title: 'Monday Coworking',
    tagline: 'Get things done, together',
    description:
      'Bring a laptop, a side project, or that thing you keep putting off. We share what we are working on, focus together, and catch up after.',
    points: [
      'Say your goal for the session out loud',
      'Quiet focus time with good company',
      'Side projects, studying, creative work, all welcome',
    ],
    photos: [
      {
        src: '/images/coworking-group.webp',
        alt: 'Coworking group smiling together along a café counter, with laptops and coffee on the table',
        width: 1600,
        height: 1200,
        orientation: 'landscape',
      },
      {
        src: '/images/coworking-laptops.webp',
        alt: 'People working on laptops around a café table during Monday coworking, with the kitchen and menu boards behind them',
        width: 1200,
        height: 1600,
        orientation: 'portrait',
      },
    ],
    accent: 'sage',
  },
  {
    id: 'boardgames',
    day: 'Thursday',
    time: '6:30 – 8:00 PM',
    title: 'Board Game Night',
    tagline: 'Play games · Meet new people · Have fun',
    description:
      'A relaxed board game night at a café in Surrey. New to board games or already a hobby gamer, everyone is welcome.',
    points: [
      'No experience needed. We explain the rules first.',
      'Come solo or bring a friend. Most come solo!',
      'Harmonies, Spyfall, Codenames, Avalon, Jaipur, Sushi Go',
    ],
    image: '/images/boardgame-night.jpg',
    accent: 'pink',
  },
];

export const COMING_SOON: ComingSoonEvent[] = [
  {
    id: 'sports-watch',
    day: 'Saturday',
    title: 'Sports Watch Parties',
    accent: 'peach',
  },
];
