import formatDate from "../helpers/formatDate";

const getDayRoutes = (concertData, isMySchedulePath) => {
  return concertData.flatMap((data) => {
    return data.festivalData.map((event, index) => {
      const newDate = new Date(event.day);

      return {
        id: index,
        routeLink: isMySchedulePath
          ? `${formatDate(event.day, "long")}/${data._id}`
          : formatDate(event.day, "long"),
        routeName: `${formatDate(event.day, "short")}. ${
          newDate.getMonth() + 1 < 10
            ? `0${newDate.getMonth() + 1}`
            : newDate.getMonth() + 1
        }/${newDate.getDate()}`,
      };
    });
  });
};

export default getDayRoutes;
