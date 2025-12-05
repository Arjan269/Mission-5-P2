// routes/stationRoutes.js

const express = require("express");
const router = express.Router();

const {
  getStationsList,
  getStationById,
  compareStations,
  searchStations,
} = require("../controllers/stationController");

// Dropdown list
router.get("/list", getStationsList);

// Price comparison
router.get("/compare", compareStations);

// Returns filtered station based on selected services - locations page
router.get("/search", searchStations);

// Station detail page
router.get("/:id", getStationById);

module.exports = router;
