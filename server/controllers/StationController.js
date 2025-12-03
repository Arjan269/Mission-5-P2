// controllers/stationController.js

const Station = require("../models/Station");

// GET /api/stations/list
// Returns: _id, name, suburb, city (for dropdown list)
exports.getStationsList = async (req, res) => {
  try {
    const stations = await Station.find({}, "name suburb city");

    res.json(stations);
  } catch (err) {
    console.error("Error fetching station list:", err);
    res.status(500).json({ error: "Server error fetching stations list" });
  }
};

// GET /api/stations/:id
// Returns full station details
exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }

    res.json(station);
  } catch (err) {
    console.error("Error fetching station details:", err);
    res.status(500).json({ error: "Server error fetching station details" });
  }
};

// GET /api/stations/compare?id1=xxx&id2=yyy
// Returns both stations for your comparison page
exports.compareStations = async (req, res) => {
  try {
    const { id1, id2 } = req.query;

    if (!id1 || !id2) {
      return res.status(400).json({ error: "Both id1 and id2 are required" });
    }

    const station1 = await Station.findById(id1);
    const station2 = await Station.findById(id2);

    res.json({
      left: station1 || null,
      right: station2 || null
    });
  } catch (err) {
    console.error("Error comparing stations:", err);
    res.status(500).json({ error: "Server error comparing stations" });
  }
};
