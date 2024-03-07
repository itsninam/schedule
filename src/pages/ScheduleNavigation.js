import React from "react";
import { Outlet } from "react-router-dom";

import Navigation from "../components/Navigation";

function ScheduleNavigation({ routes, type }) {
  return (
    <>
      <Navigation type={type} routes={routes} />

      <Outlet />
    </>
  );
}

export default ScheduleNavigation;
