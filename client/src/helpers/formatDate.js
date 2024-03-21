const formatDate = (date, length) => {
  const newDate = new Date(date);
  return newDate
    .toLocaleDateString("en-US", {
      weekday: length,
    })
    .toLocaleLowerCase();
};

export default formatDate;
