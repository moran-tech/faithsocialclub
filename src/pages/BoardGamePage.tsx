import { Facts, Related, Rsvp, VenueLink } from '../components/ui.tsx';
import { board, coworking, eventsPage, GAMES, meetups } from '../seo.ts';

export function BoardGamePage() {
  return (
    <main>
      <section className="page-intro">
        <p className="eyebrow">Surrey, BC · {board.schedule}</p>
        <h1 className="script">{board.h1}</h1>
        <p className="pill">Free</p>
        <p className="lead">{board.description}</p>
        <div className="hero__actions">
          <Rsvp href={board.rsvp} />
          <a className="btn btn--ghost" href={eventsPage.path}>
            All events
          </a>
        </div>
      </section>

      <section>
        <h2 className="script">Every Thursday</h2>
        <Facts
          items={[
            { term: 'When', detail: board.schedule },
            { term: 'Price', detail: 'Free' },
            {
              term: 'Where',
              detail: <VenueLink query={board.mapQuery}>{board.venueLine}</VenueLink>,
            },
          ]}
        />
        <h2 className="script">Games</h2>
        <ul className="games">
          {GAMES.map((game) => (
            <li key={game}>{game}</li>
          ))}
        </ul>
        <p>No experience needed. We explain the rules first. Come solo or bring a friend. Most people come solo.</p>
        <img
          className="figure-photo"
          src="/images/board-game-night.webp"
          width={735}
          height={941}
          alt="Friends playing board games around a café table at board game night"
        />
        <Related
          links={[
            { href: meetups.path, label: 'Meetups in Surrey' },
            { href: coworking.path, label: 'Monday coworking' },
            { href: eventsPage.path, label: 'Surrey events this month' },
          ]}
        />
      </section>
    </main>
  );
}
