import React, { Fragment } from "react";
import { useSchedule } from "../../contexts/ScheduleContext";
import { useParams } from "react-router";
import formatDate from "../../helpers/formatDate";
import EventList from "../EventList";

function MyDaySchedule() {
  const { mySchedule, handleTimeSlotCategories } = useSchedule();
  const { day } = useParams();
  const selectedDay = mySchedule.filter(
    (events) => formatDate(events.day, "long") === day
  );

  const timeSlotCategories = handleTimeSlotCategories(selectedDay);

  if (!selectedDay.length || !timeSlotCategories.length) {
    return <p>Add events for {day}</p>;
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
                  {day.timeSlot
                    .filter((slot) => slot.category === category)
                    .map((event) => {
                      return (
                        <EventList key={event.title} day={day} event={event} />
                      );
                    })}
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
}

export default MyDaySchedule;
