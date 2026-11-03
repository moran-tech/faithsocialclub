import { eventsPage, upcoming } from '../seo.ts';

export function EventsPage() {
  return (
    <main>
      <section className="page-intro">
        <p className="eyebrow">Surrey, BC</p>
        <h1 className="script">{eventsPage.h1}</h1>
        <p className="lead">{eventsPage.description}</p>
        <p>
          November dates are below, plus the December mixer. Weekly coworking and board game night continue
          after the next session listed here.
        </p>
      </section>
      <section>
        <h2 className="script">Upcoming dates</h2>
        <ul className="event-index">
          {upcoming.map((event) => (
            <li key={event.path}>
              <a href={event.path}>
                <time dateTime={event.startDate}>{event.when}</time>
                <span className="event-index__title">{event.h1}</span>
                <span className="event-index__meta">
                  {event.time} · {event.price}
                </span>
                <span className="event-index__venue">{event.venueLine}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
