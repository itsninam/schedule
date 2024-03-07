import React, { Fragment } from "react";
import { useLocation, useParams } from "react-router";
import { useSchedule } from "../contexts/ScheduleContext";
import formatDate from "../helpers/formatDate";

import EventsList from "./EventsList";

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
      return <p>Add events for {day}</p>;
    }
  }

  return (
    <div className="events-list-container">
      {selectedDay.map((day) => {
        return (
          <Fragment key={day.day}>
            {timeSlotCategories.map((category, index) => {
              return (
                <Fragment key={index}>
                  <h2>{category}</h2>
                  <EventsList day={day} category={category} />
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
}

export default DaySchedule;
