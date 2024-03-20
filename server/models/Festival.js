const mongoose = require("mongoose");
const { Schema } = mongoose;

const festivalSchema = new Schema({
  festivalName: String,
  festivalImage: String,
  festivalData: [
    {
      day: String,
      timeSlot: [
        {
          startTime: String,
          title: String,
          location: String,
          category: Number,
        },
      ],
    },
  ],
});

const FestivalModel = mongoose.model("festival", festivalSchema);
module.exports = FestivalModel;
