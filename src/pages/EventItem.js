import { useSchedule } from "../contexts/ScheduleContext";

function EventItem({ day, event }) {
  const {
    handleAddEventToSchedule,
    isEventAddedToSchedule,
    handleRemoveEvent,
  } = useSchedule();

  return (
    <li
      onClick={() => {
        handleAddEventToSchedule(day, event);
        handleRemoveEvent(event);
      }}
    >
      {event.title}
      <span>{isEventAddedToSchedule[event.title] ? "+" : "-"}</span>
    </li>
  );
}

export default EventItem;
