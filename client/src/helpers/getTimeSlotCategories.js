const getTimeSlotCategories = (selectedDay) => {
  return [
    ...new Set(
      selectedDay
        .flatMap((day) => day.timeSlot)
        .map((day) => day.category)
        .sort((a, b) => a - b)
    ),
  ];
};

export default getTimeSlotCategories;
