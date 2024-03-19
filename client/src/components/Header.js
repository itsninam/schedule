import React from "react";
import { useSchedule } from "../contexts/ScheduleContext";

function Header() {
  const { scheduleData } = useSchedule();

  return (
    <>
      {scheduleData.map((data) => {
        return <h1 key={data.festivalName}>{data.festivalName}</h1>;
      })}
    </>
  );
}

export default Header;
