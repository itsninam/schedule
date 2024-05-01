const mongoose = require("mongoose");
const { Schema } = mongoose;

const myScheduleSchema = new Schema({
  festivalName: String,
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

const MyScheduleModel = mongoose.model("mySchedule", myScheduleSchema);
module.exports = MyScheduleModel;
