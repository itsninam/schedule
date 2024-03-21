import formatDate from "../helpers/formatDate";

const getDayRoutes = (concertData) => {
  return concertData
    .flatMap((data) => data.festivalData)
    .map((event, index) => {
      const newDate = new Date(event.day);

      return {
        id: index,
        routeLink: formatDate(event.day, "long"),
        routeName: `${formatDate(event.day, "short")}. ${
          newDate.getMonth() + 1 < 10
            ? `0${newDate.getMonth() + 1}`
            : newDate.getMonth() + 1
        }/${newDate.getDate()} `,
      };
    });
};

export default getDayRoutes;
