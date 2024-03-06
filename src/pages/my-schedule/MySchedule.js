import React from "react";
// import { useSchedule } from "../../contexts/ScheduleContext";
import { Outlet } from "react-router";
// import formatDate from "../../helpers/formatDate";

import Navigation from "../../components/Navigation";
// import EmptySchedule from "./EmptySchedule";
import dayRoutes from "../../data/dayRoutes";

function MySchedule() {
  return (
    <>
      <Navigation type="days-nav" routes={dayRoutes} />

      <Outlet />
    </>
  );
}

export default MySchedule;
