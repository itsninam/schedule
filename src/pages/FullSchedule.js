import React from "react";
import { Outlet } from "react-router-dom";
import dayRoutes from "../data/dayRoutes";

import Navigation from "../components/Navigation";

function FullSchedule() {
  return (
    <>
      <Navigation type="days-nav" routes={dayRoutes} />

      <Outlet />
    </>
  );
}

export default FullSchedule;
