import React, { Fragment } from "react";
import { useParams } from "react-router";
import { useSchedule } from "../contexts/ScheduleContext";
import ScheduleTimeHeading from "../components/ScheduleTimeHeading";
import EventList from "./EventList";

function DaySchedule() {
  const { scheduleData } = useSchedule();
  const { day } = useParams();
  const selectedDay = scheduleData.filter((events) => events.day === day);

  return (
    <div className="events-list-container">
      {selectedDay.map((day, index) => {
        return (
          <Fragment key={index}>
            {day.timeSlot.map((slot, index) => {
              return (
                <Fragment key={index}>
                  <ScheduleTimeHeading>{slot.hour}</ScheduleTimeHeading>
                  <EventList slot={slot} />
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
