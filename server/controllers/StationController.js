// server/controllers/stationController.js
const Station = require("../models/Station");

// NORMALIZER — converts seed format → model format
function normalize(station) {
  return {
    _id: station._id,
    name: station.name,
    address: station.address,
    suburb: station.suburb,
    city: station.city,

    // Convert {lat, lng} → GeoJSON style
    location: {
      type: "Point",
      coordinates: [
        station.coordinates?.lng || 0,
        station.coordinates?.lat || 0
      ]
    },

    // Convert prices object → array
    prices: Object.entries(station.prices || {}).map(([fuelType, data]) => ({
      fuelType,
      price: data.price
    })),

    services: station.services || [],
    openingHours: station.openingHours || {},
    lastUpdated: station.lastUpdated || new Date()
  };
}

// GET ALL STATIONS (list for dropdowns)
exports.getStationsList = async (req, res, next) => {
  try {
    const stations = await Station.find();
    const normalized = stations.map(s => normalize(s.toObject()));
    res.json(normalized);
  } catch (err) {
    next(err);
  }
};

// GET /api/stations/:id (detail page)
exports.getStationById = async (req, res, next) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });

    res.json(normalize(station.toObject()));
  } catch (err) {
    next(err);
  }
};

// price comparison endpoint
exports.compareStations = async (req, res, next) => {
  try {
    const ids = req.query.ids?.split(",");
    if (!ids || ids.length < 2) {
      return res.status(400).json({ message: "Please provide at least 2 station IDs" });
    }

    const stations = await Station.find({ _id: { $in: ids } });
    const normalized = stations.map(s => normalize(s.toObject()));

    res.json(normalized);
  } catch (err) {
    next(err);
  }
};
