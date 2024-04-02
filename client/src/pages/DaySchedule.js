import React from "react";
import { useParams } from "react-router";
import { useSchedule } from "../contexts/ScheduleContext";

import EmptySchedule from "../components/EmptySchedule";
import ScheduleContent from "./ScheduleContent";
import getSelectedDay from "../helpers/getSelectedDay";

function DaySchedule() {
  const {
    mySchedule,
    handleTimeSlotCategories,
    isMySchedulePath,
    selectedFestival,
  } = useSchedule();
  const { day } = useParams();

  const selectedDay = isMySchedulePath
    ? getSelectedDay(mySchedule, day)
    : getSelectedDay(selectedFestival, day);

  const selectedDayObj = isMySchedulePath ? mySchedule : selectedFestival;

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
            selectedDayObj={selectedDayObj}
            timeSlotCategories={timeSlotCategories}
          />
        );
      })}
    </section>
  );
}

export default DaySchedule;
