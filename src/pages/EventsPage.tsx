import { datedEvents, eventsPage, meetups, eventSeries } from '../seo.ts';

export function EventsPage() {
  return (
    <main>
      <section className="page-intro">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Events</span>
        </nav>
        <p className="eyebrow">Surrey, BC</p>
        <h1 className="script">{eventsPage.h1}</h1>
        <p className="lead">{eventsPage.description}</p>
        <p>
          <a href={meetups.path}>Meetups in Surrey</a> include weekly coworking on Monday and board game
          night. One-off events are listed with their dates.
        </p>
      </section>
      <section>
        <h2 className="script">Our meetups</h2>
        <ul className="event-index">
          {eventSeries.map((event) => (
            <li key={event.path}>
              <a href={event.path}>
                {event.schedule && <span className="event-index__meta">{event.schedule}</span>}
                <span className="event-index__title">{event.h1}</span>
                <span className="event-index__meta">{event.price}</span>
                <span className="event-index__venue">{event.venueLine}</span>
              </a>
            </li>
          ))}
        </ul>
        <h2 className="script">Upcoming dates</h2>
        <ul className="event-index">
          {datedEvents.map((event) => (
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
