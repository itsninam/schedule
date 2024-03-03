import React from "react";
import { useSchedule } from "../contexts/ScheduleContext";

function EventList({ slot, day }) {
  const { handleAddEventToSchedule } = useSchedule();

  return (
    <ul className="events-list">
      {slot.events.map((event) => {
        return (
          <li
            key={event.title}
            onClick={() => handleAddEventToSchedule(day, slot, event)}
          >
            {event.title}
          </li>
        );
      })}
    </ul>
  );
}

export default EventList;
