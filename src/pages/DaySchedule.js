import React from "react";
import { useLocation, useParams } from "react-router";
import { useSchedule } from "../contexts/ScheduleContext";
import formatDate from "../helpers/formatDate";

import EmptySchedule from "../components/EmptySchedule";
import ScheduleContent from "./ScheduleContent";

function DaySchedule() {
  const { scheduleData, mySchedule, handleTimeSlotCategories } = useSchedule();
  const { day } = useParams();
  const location = useLocation();

  const mySchedulePath = location.pathname.includes("my-schedule");

  const getSelectedDay = (selectedDay) => {
    return selectedDay.filter(
      (events) => formatDate(events.day, "long") === day
    );
  };

  const selectedDay = mySchedulePath
    ? getSelectedDay(mySchedule)
    : getSelectedDay(scheduleData);

  const timeSlotCategories = handleTimeSlotCategories(selectedDay);

  if (mySchedulePath) {
    if (!selectedDay.length || !timeSlotCategories.length) {
      return <EmptySchedule day={day} />;
    }
  }

  return (
    <section className="events-list-container">
      {selectedDay.map((day) => {
        return (
          <ScheduleContent
            key={day.day}
            day={day}
            timeSlotCategories={timeSlotCategories}
          />
        );
      })}
    </section>
  );
}

export default DaySchedule;
