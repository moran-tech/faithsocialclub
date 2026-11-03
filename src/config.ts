export const MEETUP_URL = 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/';

export const INSTAGRAM_URL = 'https://www.instagram.com/socialclub.pros/';

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

export const EVENTS: ClubEvent[] = [
  {
    id: 'coworking',
    day: 'Monday',
    time: '6:30 – 8:00 PM',
    title: 'Monday Coworking',
    tagline: 'Get things done, together',
    description:
      'Free weekly coworking for builders, creators, freelancers, and founders. Say your goal, do an hour of deep work, then network.',
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
      'A relaxed night of party and strategy games like Wavelength, Catch the Vibe, Avalon, Sushi Go, Spyfall, and Codenames. No experience needed. Come solo or bring a friend.',
    points: [
      'No experience needed. We explain the rules first.',
      'Come solo or bring a friend. Most come solo.',
      'Wavelength, Catch the Vibe, Avalon, Sushi Go, Spyfall, and Codenames',
    ],
    image: '/images/board-game-night.webp',
    accent: 'pink',
  },
];
