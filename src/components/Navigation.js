import React from "react";
import { NavLink } from "react-router-dom";

function Navigation({ routes, type }) {
  return (
    <nav className={type}>
      <ul>
        {routes.map((route) => {
          return (
            <li key={route.id}>
              <NavLink to={route.routeLink}>{route.routeName}</NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navigation;
