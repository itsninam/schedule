import React from "react";
import { useSchedule } from "../contexts/ScheduleContext";
import { useNavigate } from "react-router";

function MyFestivals() {
  const { myFestivals, handleSelectFestival } = useSchedule();
  return (
    <ul>
      {myFestivals.map((festival) => {
        return (
          <li key={festival._id} onClick={() => handleSelectFestival(festival)}>
            {festival.festivalName}
          </li>
        );
      })}
    </ul>
  );
}

export default MyFestivals;
