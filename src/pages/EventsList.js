import React from "react";
import EventItem from "./EventItem";

function EventsList({ day, category }) {
  return (
    <ul className="events-list">
      {day.timeSlot
        .filter((slot) => slot.category === category)
        .map((event) => {
          return <EventItem key={event.title} day={day} event={event} />;
        })}
    </ul>
  );
}

export default EventsList;
