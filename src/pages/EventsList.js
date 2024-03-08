import React from "react";
import EventItem from "./EventItem";

function EventsList({ day, category }) {
  return (
    <ul className="events-list">
      {day.timeSlot
        .filter((slot) => slot.category === category)
        .map((eventItem) => {
          return (
            <EventItem key={eventItem.title} day={day} eventItem={eventItem} />
          );
        })}
    </ul>
  );
}

export default EventsList;
