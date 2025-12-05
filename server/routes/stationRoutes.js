// routes/stationRoutes.js

const express = require("express");
const router = express.Router();

const {
  getStationsList,
  getStationById,
  compareStations,
  searchStations,
  getAllServices,
} = require("../controllers/stationController");

// Dropdown list
router.get("/list", getStationsList);

// Price comparison
router.get("/compare", compareStations);

// Returns filtered station based on selected services - locations page
router.get("/search", searchStations);

// Returns sorted list of services - Location page LocationMenuFilter
router.get("/services", getAllServices);

// Station detail page
router.get("/:id", getStationById);

module.exports = router;
