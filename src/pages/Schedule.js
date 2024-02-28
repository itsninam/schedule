import React from "react";
import { Outlet } from "react-router";
import { Link, NavLink } from "react-router-dom";
import Navigation from "../components/Navigation";

function Schedule() {
  const scheduleRoutes = [
    {
      routeLink: "music",
      routeName: "Schedule",
    },
    {
      routeLink: "my-schedule",
      routeName: "My Schedule",
    },
  ];
  return (
    <section>
      <Navigation routes={scheduleRoutes} />

      <Outlet />
    </section>
  );
}

export default Schedule;
