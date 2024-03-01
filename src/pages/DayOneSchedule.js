import React from "react";
import { useParams } from "react-router";
import { useSchedule } from "../contexts/ScheduleContext";

function DayOneSchedule() {
  const { scheduleData } = useSchedule();
  const { day } = useParams();
  const selectedDay = scheduleData.filter((events) => events.day === day);

  return (
    <div>
      {selectedDay.map((day) => {
        return (
          <>
            <p>{day.day}</p>
            {day.timeSlot.map((slot) => {
              return <p>{slot.hour}</p>;
            })}
          </>
        );
      })}
    </div>
  );
}

export default DayOneSchedule;
