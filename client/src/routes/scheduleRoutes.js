const scheduleRoutes = (selectedFestId) => [
  {
    id: 0,
    routeLink: selectedFestId,
    routeName: "Schedule",
  },
  {
    id: 1,
    routeLink: "my-schedule",
    routeName: "My Schedule",
  },
  {
    id: 2,
    routeLink: "lineup",
    routeName: "Lineup",
  },
];

export default scheduleRoutes;
