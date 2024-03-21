const FestivalModel = require("../models/Festival");

const test = (req, res) => {
  res.json("test is working");
};

const getFestival = async (req, res) => {
  try {
    const { festivalName } = req.query;

    let query = { festivalName: { $regex: festivalName, $options: "i" } };
    const festivals = await FestivalModel.find(query);

    if (!festivals || festivals.length === 0) {
      return res.status(404).json({ message: "No festivals found." });
    }

    if (!festivalName) {
      return res.status(400).json({ message: "Please enter a festival name." });
    }

    res.status(200).json(festivals);
  } catch (err) {
    res.status(400).json({ message: "Error fetching festivals" });
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  test,
  getFestival,
};
