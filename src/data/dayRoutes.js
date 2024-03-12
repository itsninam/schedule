import concertData from "./scheduleData";
import formatDate from "../helpers/formatDate";

const dayRoutes = concertData
  .flatMap((data) => data.festivalData)
  .map((event, index) => {
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

export default dayRoutes;
