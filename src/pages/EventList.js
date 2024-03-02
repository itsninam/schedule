import React from "react";

function EventList({ slot }) {
  return (
    <ul className="events-list">
      {slot.events.map((event) => {
        return <li key={event.title}>{event.title}</li>;
      })}
    </ul>
  );
}

export default EventList;
