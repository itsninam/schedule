import React from "react";
import { useSchedule } from "../contexts/ScheduleContext";
import { useLocation } from "react-router";

function Header() {
  const { selectedFestival } = useSchedule();

  const location = useLocation();
  const isSchedulePath = location.pathname.includes("schedule");

  if (!isSchedulePath) {
    return <h1>RaveSync</h1>;
  }

  return (
    <>
      {selectedFestival.map((data) => {
        return <h1 key={data.festivalName}>{data.festivalName}</h1>;
      })}
    </>
  );
}

export default Header;
