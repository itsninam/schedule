import React, { Fragment } from "react";
import { useSchedule } from "../../contexts/ScheduleContext";
import { useParams } from "react-router";
import formatDate from "../../helpers/formatDate";
import ScheduleTimeHeading from "../../components/ScheduleTimeHeading";
import EventList from "../EventList";

function MyDaySchedule() {
  const { mySchedule } = useSchedule();
  const { day } = useParams();
  const selectedDay = mySchedule.filter(
    (events) => formatDate(events.day, "long") === day
  );

  return (
    <div className="events-list-container">
      {selectedDay.map((day, index) => {
        return (
          <Fragment key={index}>
            {day.timeSlot.map((slot, index) => {
              return (
                <Fragment key={index}>
                  {slot.events.length > 0 && (
                    <ScheduleTimeHeading>{slot.hour}</ScheduleTimeHeading>
                  )}
                  <EventList slot={slot} day={day} />
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
