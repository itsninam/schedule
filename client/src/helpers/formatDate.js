const formatDate = (date, length) => {
  return date
    .toLocaleDateString("en-US", {
      weekday: length,
    })
    .toLocaleLowerCase();
};

export default formatDate;
