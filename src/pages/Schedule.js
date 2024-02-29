import React from "react";
import { Outlet } from "react-router";
import scheduleRoutes from "../data/scheduleRoutes";

import Navigation from "../components/Navigation";

function Schedule() {
  return (
    <section>
      <Navigation routes={scheduleRoutes} />

      <Outlet />
    </section>
  );
}

export default Schedule;
