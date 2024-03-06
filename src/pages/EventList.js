import { useSchedule } from "../contexts/ScheduleContext";

function EventList({ day, event }) {
  const { handleAddEventToSchedule, isEventAddedToSchedule } = useSchedule();

  return (
    <li
      onClick={() => {
        handleAddEventToSchedule(day, event);
      }}
    >
      {event.title}
      <span>{isEventAddedToSchedule[event.title] ? "+" : "-"}</span>
    </li>
  );
}

export default EventList;
