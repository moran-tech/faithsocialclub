import { EVENTS, type ClubEvent } from '../config.ts';

type EventArtwork = 'soccer' | 'mixer';

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
    tagline: '$5 to hold a seat',
    location: 'Browns Socialhouse Surrey Centre',
    url: 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/events/317166913/',
    sticker: 'Only 8 seats',
    artwork: 'soccer',
    accent: 'peach',
  },
  {
    id: 'year-end-mixer',
    day: 'Saturday',
    date: 'Sat, Dec 5',
    time: '6:30 to 9 PM',
    title: 'End of Year Mixer for Surrey Professionals',
    tagline: 'Live DJ · Food and drinks included · Photographer · Giveaways',
    location: 'Studio Nazrana, Surrey',
    url: 'https://www.meetup.com/coworking-surrey-hosted-by-morantech/events/317095315/',
    sticker: 'Early bird $35',
    artwork: 'mixer',
    accent: 'pink',
  },
];
