import { useSchedule } from "../contexts/ScheduleContext";
import { useRef } from "react";

function EventItem({ day, eventItem }) {
  const {
    handleAddEventToSchedule,
    isEventAddedToSchedule,
    handleRemoveEvent,
    isMySchedulePath,
  } = useSchedule();

  const eventItemRef = useRef(null);

  return (
    <li
      ref={eventItemRef}
      id={eventItem.title}
      className="event-item"
      onClick={() =>
        !isMySchedulePath && handleAddEventToSchedule(day, eventItem)
      }
    >
      <div>
        <h3>{eventItem.title}</h3>
        <div className="event-item-content">
          <span className="material-symbols-outlined">location_on</span>
          <span>
            {eventItem.location} &#183; {eventItem.startTime}
          </span>
        </div>
      </div>

      {isMySchedulePath ? (
        <span
          className="material-symbols-outlined"
          onClick={() => handleRemoveEvent(eventItem, eventItemRef)}
        >
          delete
        </span>
      ) : isEventAddedToSchedule[eventItem.title] ? (
        <span className="material-symbols-outlined checked">check_box</span>
      ) : (
        <span className="material-symbols-outlined">
          check_box_outline_blank
        </span>
      )}
    </li>
  );
}

export default EventItem;
