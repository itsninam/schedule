const FestivalModel = require("../models/Festival");

const test = (req, res) => {
  res.json("test is working");
};

const getFestival = async (req, res) => {
  try {
    const festival = await FestivalModel.find({});
    res.send(festival);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

module.exports = {
  test,
  getFestival,
};
