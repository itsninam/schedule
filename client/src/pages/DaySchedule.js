import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSchedule } from "../contexts/ScheduleContext";

import EmptyView from "../components/EmptyView";
import ScheduleContent from "./ScheduleContent";
import getSelectedDay from "../helpers/getSelectedDay";
import svg from "../assets/error-in-calendar.svg";

function DaySchedule() {
  const {
    mySchedule,
    handleTimeSlotCategories,
    isMySchedulePath,
    selectedFestival,
    handleSelectFestival,
    fetchMySchedule,
  } = useSchedule();
  const { day, selectedFestId, id } = useParams();

  useEffect(() => {
    if (!isMySchedulePath) {
      handleSelectFestival(selectedFestId);
    } else {
      handleSelectFestival(id);
      fetchMySchedule();
    }
  }, [
    isMySchedulePath,
    selectedFestId,
    handleSelectFestival,
    id,
    fetchMySchedule,
  ]);

  const selectedDay = isMySchedulePath
    ? getSelectedDay(mySchedule, day)
    : getSelectedDay(selectedFestival, day);

  const selectedDayObj = isMySchedulePath ? mySchedule : selectedFestival;

  const timeSlotCategories = handleTimeSlotCategories(selectedDay);

  if (isMySchedulePath) {
    if (!selectedDay.length || !timeSlotCategories.length) {
      return (
        <EmptyView
          type=""
          image={svg}
          header="Empty Schedule!"
          message={`Add events to your ${day} schedule`}
        />
      );
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
