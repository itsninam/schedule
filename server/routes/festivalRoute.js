const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  getFestival,
  getMyFestival,
  addMyFestival,
  deleteMyFestival,
  addMySchedule,
  getMySchedule,
  deleteMyEvent,
} = require("../controllers/festivalController");

// middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// router.get("/", test);
router.get("/festival", getFestival);
router.get("/myFestival", getMyFestival);
router.post("/addMyFestival", addMyFestival);
router.delete("/deleteMyFestival/:id", deleteMyFestival);
router.post("/addMySchedule", addMySchedule);
router.get("/getMySchedule", getMySchedule);
router.delete("/deleteMyEvent/:festivalName/:timeSlotId", deleteMyEvent);

module.exports = router;
