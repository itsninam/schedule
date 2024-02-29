import concertData from "./scheduleData";

const dayRoutes = concertData.map((event, index) => ({
  id: index,
  routeLink: `day-${index + 1}`,
  routeName: event.day,
}));

export default dayRoutes;
