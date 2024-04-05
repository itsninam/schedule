const FestivalModel = require("../models/Festival");
const MyFestivalModel = require("../models/MyFestival");

const test = (req, res) => {
  res.json("test is working");
};

const getFestival = async (req, res) => {
  try {
    const { festivalName } = req.query;

    let query = { festivalName: { $regex: festivalName, $options: "i" } };
    const festivals = await FestivalModel.find(query);

    if (!festivals || festivals.length === 0) {
      return res.status(400).json({ message: "No festivals found." });
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

const getMyFestival = async (req, res) => {
  try {
    const myFestival = await MyFestivalModel.find({});

    if (!myFestival || myFestival.length === 0) {
      return res.status(400).json({ message: "No festivals found." });
    }

    res.status(200).json(myFestival);
  } catch (err) {
    res.send(err);
    res.status(400).json({ message: "Error fetching festivals" });
    res.status(500).json({ message: "Internal server error." });
  }
};

const addMyFestival = async (req, res) => {
  const myFestival = req.body;
  const newFestival = new MyFestivalModel(myFestival);
  await newFestival.save();

  res.json(myFestival);
};

module.exports = {
  test,
  getFestival,
  getMyFestival,
  addMyFestival,
};
