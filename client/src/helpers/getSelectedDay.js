import formatDate from "./formatDate";

const getSelectedDay = (selectedDay, day) => {
  return selectedDay
    .flatMap((day) => day.festivalData)
    .filter((events) => formatDate(events.day, "long") === day);
};

export default getSelectedDay;
