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
    coordinates: {
      lat: station.coordinates?.lat || 0,
      lng: station.coordinates?.lng || 0,
    },

    // Convert prices object → array
    prices: Object.entries(station.prices || {}).map(([fuelType, data]) => ({
      fuelType,
      price: data.price,
    })),

    services: station.services || [],
    openingHours: station.openingHours || {},
    lastUpdated: station.lastUpdated || new Date(),
  };
}

// GET ALL STATIONS (list for dropdowns)
exports.getStationsList = async (req, res, next) => {
  try {
    const stations = await Station.find();
    const normalized = stations.map((s) => normalize(s.toObject()));
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
      return res
        .status(400)
        .json({ message: "Please provide at least 2 station IDs" });
    }

    const stations = await Station.find({ _id: { $in: ids } });
    const normalized = stations.map((s) => normalize(s.toObject()));

    res.json(normalized);
  } catch (err) {
    next(err);
  }
};

exports.searchStations = async (req, res) => {
  try {
    const { services } = req.query;

    if (!services) {
      return res
        .status(400)
        .json({ error: "Missing services query parameter" });
    }

    const serviceList = services.split(",").map((s) => s.trim().toLowerCase());

    // Find stations where ALL services match
    const stations = await Station.find({
      services: {
        $all: serviceList.map((s) => new RegExp(`^${s}$`, "i")), // case-insensitive
      },
    });

    console.log("Stations:", stations);

    res.json(stations);
  } catch (err) {
    console.error("Error searching stations:", err);
    res.status(500).json({ error: "Server error searching stations" });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    // Fetch all services from all stations
    const stations = await Station.find({}, "services"); // only fetch services field
    const servicesSet = new Set();

    stations.forEach((station) =>
      station.services.forEach((service) =>
        servicesSet.add(service.toLowerCase())
      )
    );

    const sortedServices = Array.from(servicesSet).sort((a, b) =>
      a.localeCompare(b)
    );

    res.json(sortedServices);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ error: "Server error fetching services" });
  }
};
