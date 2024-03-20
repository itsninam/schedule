const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test, getFestival } = require("../controllers/festivalController");

// middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// router.get("/", test);
router.get("/festival", getFestival);

module.exports = router;
