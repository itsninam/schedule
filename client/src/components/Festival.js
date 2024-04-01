import React from "react";
import { useSchedule } from "../contexts/ScheduleContext";

function Festival({ festival }) {
  const { handleSelectFestival } = useSchedule();
  return (
    <li>
      <img src={festival.festivalThumbnail} alt={festival.festivalName} />
      <div className="festival-info">
        <h2>{festival.festivalName}</h2>
        <p>
          {festival.festivalLocation} &#183; {festival.festivalDates}
        </p>
      </div>
      <div className="icons-container">
        <span className="material-symbols-outlined">delete</span>
        <span
          className="material-symbols-outlined schedule-icon"
          onClick={() => handleSelectFestival(festival)}
        >
          event_upcoming
        </span>
      </div>
    </li>
  );
}

export default Festival;
