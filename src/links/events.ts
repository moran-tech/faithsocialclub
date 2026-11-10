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

// One-off event details stay on /links, separate from the homepage's weekly plans.
export const LINKS_EVENTS: LinksEvent[] = [
  ...EVENTS,
  {
    id: 'sports-watch',
    day: 'Saturday',
    date: 'Sat, Nov 7',
    time: 'Kickoff 2 PM',
    title: 'Whitecaps Watch Party (Decision Day vs CF Montréal)',
    tagline: 'Free entry',
    location: 'Browns Socialhouse Surrey Centre',
    url: 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/events/317166913/',
    artwork: 'soccer',
    accent: 'peach',
  },
];
