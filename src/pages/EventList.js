import { useSchedule } from "../contexts/ScheduleContext";

function EventList({ slot, day }) {
  const { handleAddEventToSchedule, isEventAddedToSchedule, handleRemoveItem } =
    useSchedule();

  if (!slot.events.length) {
    return <p>All events removed</p>;
  }

  return (
    <ul className="events-list">
      {slot.events.map((event) => {
        return (
          <li
            key={event.title}
            onClick={() => {
              handleAddEventToSchedule(day, slot, event);
              handleRemoveItem(event.title);
            }}
          >
            {event.title}

            <span>{isEventAddedToSchedule[event.title] ? "+" : "-"}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default EventList;
