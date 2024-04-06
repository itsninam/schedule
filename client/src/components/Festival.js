import React from "react";
import { useSchedule } from "../contexts/ScheduleContext";
import { useNavigate } from "react-router-dom";

function Festival({ festival }) {
  const { handleSelectFestival, handleRemoveFestival } = useSchedule();

  const navigate = useNavigate();

  const onHandleSelectFestival = (id) => {
    handleSelectFestival(id);
    navigate("/schedule");
  };

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
        <span
          className="material-symbols-outlined"
          onClick={() => handleRemoveFestival(festival)}
        >
          delete
        </span>
        <span
          className="material-symbols-outlined schedule-icon"
          onClick={() => onHandleSelectFestival(festival._id)}
        >
          event_upcoming
        </span>
      </div>
    </li>
  );
}

export default Festival;
