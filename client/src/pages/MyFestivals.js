import React from "react";
import { useSchedule } from "../contexts/ScheduleContext";
import { useNavigate } from "react-router";
import Festival from "../components/Festival";

function MyFestivals() {
  const { myFestivals } = useSchedule();
  return (
    <ul className="festival-list">
      {myFestivals.map((festival) => {
        return <Festival festival={festival} key={festival._id} />;
      })}
    </ul>
  );
}

export default MyFestivals;
