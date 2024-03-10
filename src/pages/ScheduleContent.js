import React, { Fragment } from "react";
import ScheduleTimeHeader from "../components/ScheduleTimeHeader";
import EventsList from "./EventsList";

function ScheduleContent({ timeSlotCategories, day }) {
  return (
    <Fragment key={day.day}>
      {timeSlotCategories.map((category, index) => {
        return (
          <div className="event-container" key={index}>
            <ScheduleTimeHeader timeHeader={category} />
            <EventsList day={day} category={category} />
          </div>
        );
      })}
    </Fragment>
  );
}

export default ScheduleContent;
