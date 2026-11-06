import { Facts, Related, Rsvp, VenueLink } from '../components/ui.tsx';
import { EXTRA_COWORKING_PHOTOS } from '../config.ts';
import { board, coworking, eventsPage } from '../seo.ts';

export function CoworkingPage() {
  return (
    <main>
      <section className="page-intro">
        <p className="eyebrow">Surrey, BC · {coworking.schedule}</p>
        <h1 className="script">{coworking.h1}</h1>
        <p className="pill">Free</p>
        <p className="lead">{coworking.description}</p>
        <div className="hero__actions">
          <Rsvp href={coworking.rsvp} />
          <a className="btn btn--ghost" href={eventsPage.path}>
            All events
          </a>
        </div>
      </section>

      <section>
        <h2 className="script">How Monday works</h2>
        <Facts
          items={[
            { term: 'When', detail: coworking.schedule },
            { term: 'Price', detail: 'Free' },
            {
              term: 'Where',
              detail: <VenueLink query={coworking.mapQuery}>{coworking.venueLine}</VenueLink>,
            },
          ]}
        />
        <ol className="games">
          <li>Say your goal for the session out loud.</li>
          <li>Do an hour of deep work. Laptops, side projects, studying, and creative work are welcome.</li>
          <li>Stay after and meet other builders, creators, freelancers, and founders.</li>
        </ol>
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
            alt="People working on laptops around a café table during Monday coworking, with the kitchen and menu boards behind them"
          />
        </div>
        <div className="event__gallery">
          {EXTRA_COWORKING_PHOTOS.map((photo) => (
            <img key={photo.src} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />
          ))}
        </div>
        <Related
          links={[
            { href: board.path, label: 'Thursday board game night' },
            { href: eventsPage.path, label: 'Surrey events this month' },
          ]}
        />
      </section>
    </main>
  );
}
