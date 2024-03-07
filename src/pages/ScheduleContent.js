import React, { Fragment } from "react";
import ScheduleTimeHeader from "../components/ScheduleTimeHeader";
import EventsList from "./EventsList";

function ScheduleContent({ timeSlotCategories, day }) {
  return (
    <Fragment key={day.day}>
      {timeSlotCategories.map((category, index) => {
        return (
          <Fragment key={index}>
            <ScheduleTimeHeader timeHeader={category} />
            <EventsList day={day} category={category} />
          </Fragment>
        );
      })}
    </Fragment>
  );
}

export default ScheduleContent;
