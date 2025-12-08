// routes/stationRoutes.js
const express = require("express");
const router = express.Router();

const {
  getStationsList,
  getStationById,
  compareStations
} = require("../controllers/stationController");

router.get("/", getStationsList);
router.get("/compare", compareStations);
router.get("/id/:id", getStationById);

module.exports = router;
