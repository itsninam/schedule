import concertData from "./scheduleData";

const dayRoutes = concertData.map((event, index) => ({
  id: index,
  routeLink: event.day,
  routeName: event.day,
}));

export default dayRoutes;
