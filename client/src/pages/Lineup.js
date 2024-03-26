import React from "react";
import { useSchedule } from "../contexts/ScheduleContext";

function Lineup() {
  const { scheduleData } = useSchedule();
  return (
    <section className="image-container">
      {scheduleData.map((data) => {
        return (
          <img
            key={data.festivalImage}
            src={data.festivalImage}
            alt={data.festivalName}
          />
        );
      })}
    </section>
  );
}

export default Lineup;
