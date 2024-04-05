const mongoose = require("mongoose");
const { Schema } = mongoose;

const myFestivalSchema = new Schema({
  festivalName: String,
  festivalImage: String,
  festivalDates: String,
  festivalLocation: String,
  festivalThumbnail: String,
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

const MyFestivalModel = mongoose.model("myFestival", myFestivalSchema);
module.exports = MyFestivalModel;
