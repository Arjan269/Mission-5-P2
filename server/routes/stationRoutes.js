// routes/stationRoutes.js
const express = require("express");
const router = express.Router();

const {
  getStationsList,
  getStationById,
  compareStations,
  searchStations,
  getAllServices,
  getStationsNearby,
} = require("../controllers/stationController");

router.get("/", getStationsList);

router.get("/compare", compareStations);

// Returns filtered station based on selected services - locations page
router.get("/search", searchStations);

// Returns sorted list of services - Location page LocationMenuFilter
router.get("/services", getAllServices);

router.get("/nearby", getStationsNearby);

// Station detail page
router.get("/id/:id", getStationById);

module.exports = router;
