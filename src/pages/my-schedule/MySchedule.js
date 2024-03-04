import React from "react";
import { useSchedule } from "../../contexts/ScheduleContext";
import { Outlet } from "react-router";
import formatDate from "../../helpers/formatDate";

import Navigation from "../../components/Navigation";
import EmptySchedule from "./EmptySchedule";

function MySchedule() {
  const { mySchedule } = useSchedule();

  const myScheduleRoutes = mySchedule.map((event, index) => {
    return {
      id: index,
      routeLink: formatDate(event.day, "long"),
      routeName: `${formatDate(event.day, "short")}. ${
        event.day.getMonth() + 1 < 10
          ? `0${event.day.getMonth() + 1}`
          : event.day.getMonth() + 1
      }/${event.day.getDate()} `,
    };
  });

  return mySchedule.length > 0 ? (
    <>
      <Navigation type="days-nav" routes={myScheduleRoutes} />

      <Outlet />
    </>
  ) : (
    <EmptySchedule />
  );
}

export default MySchedule;
