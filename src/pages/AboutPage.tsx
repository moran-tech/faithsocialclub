import { MeetupRating, Related } from '../components/ui.tsx';
import { about, board, coworking, eventsPage } from '../seo.ts';

export function AboutPage() {
  return (
    <main>
      <section className="page-intro">
        <p className="eyebrow">Surrey, BC · Hosted by Faith</p>
        <h1 className="script">{about.h1}</h1>
        <p className="lead">{about.description}</p>
        <MeetupRating />
      </section>

      <section>
        <h2 className="script">Who it's for</h2>
        <p>
          Professionals in Surrey who want friends outside work. Builders, creators, freelancers, and founders
          are all in the room. Come solo. Most people do.
        </p>
        <h2 className="script">The week</h2>
        <p>
          Coworking is free every Monday at 6:30 PM at Chai Coffee Company. Board game night is free every
          Thursday at 6:30 PM. Watch parties and mixers land on the events page when a date is set.
        </p>
        <h2 className="script">Faith Morante</h2>
        <p>Faith Morante hosts f8 Social Club for Professionals. She is the founder of the club.</p>
        <h2 className="script">From the meetups</h2>
        <div className="event__photos">
          <img
            className="event__photo event__photo--landscape"
            src="/images/coworking-group.webp"
            width={1600}
            height={1200}
            alt="Coworking group smiling together along a café counter, with laptops and coffee on the table"
          />
          <img
            className="event__photo event__photo--portrait"
            src="/images/coworking-laptops.webp"
            width={1200}
            height={1600}
            alt="People working on laptops around a café table during Monday coworking"
          />
        </div>
        <img
          className="figure-photo"
          src="/images/board-game-night.webp"
          width={735}
          height={941}
          alt="Friends playing board games around a café table at board game night"
        />
        <Related
          links={[
            { href: coworking.path, label: 'Monday coworking' },
            { href: board.path, label: 'Thursday board game night' },
            { href: eventsPage.path, label: 'Surrey events this month' },
          ]}
        />
      </section>
    </main>
  );
}
