import React from "react";
import { useParams } from "react-router";
import { useSchedule } from "../contexts/ScheduleContext";
import formatDate from "../helpers/formatDate";

import EmptySchedule from "../components/EmptySchedule";
import ScheduleContent from "./ScheduleContent";

function DaySchedule() {
  const {
    scheduleData,
    mySchedule,
    handleTimeSlotCategories,
    isMySchedulePath,
  } = useSchedule();
  const { day } = useParams();

  const getSelectedDay = (selectedDay) => {
    return selectedDay
      .flatMap((day) => day.festivalData)
      .filter((events) => formatDate(events.day, "long") === day);
  };

  const selectedDay = isMySchedulePath
    ? getSelectedDay(mySchedule)
    : getSelectedDay(scheduleData);

  const timeSlotCategories = handleTimeSlotCategories(selectedDay);

  if (isMySchedulePath) {
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
