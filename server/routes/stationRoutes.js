// routes/stationRoutes.js

const express = require("express");
const router = express.Router();

const {
  getStationsList,
  getStationById,
  compareStations
} = require("../controllers/stationController");

// Dropdown list
router.get("/list", getStationsList);

// Price comparison
router.get("/compare", compareStations);

// Station detail page
router.get("/:id", getStationById);

module.exports = router;
