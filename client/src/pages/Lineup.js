import React from "react";
import { useSchedule } from "../contexts/ScheduleContext";
import Loading from "../components/Loading";

function Lineup() {
  const { scheduleData, isLoading } = useSchedule();

  if (isLoading) {
    return <Loading />;
  }
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
