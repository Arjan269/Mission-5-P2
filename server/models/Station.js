const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
  fuelType: String,      // "91", "95", "Diesel"
  price: Number,
  updatedAt: { type: Date, default: Date.now }
});

const StationSchema = new mongoose.Schema({
  name: String,
  address: String,
  suburb: String,
  city: String,

  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number] // [lng, lat]
  },

  prices: [PriceSchema],

  services: [String],

  openingHours: {
    mon: String,
    tue: String,
    wed: String,
    thu: String,
    fri: String,
    sat: String,
    sun: String
  },

  image: String,
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Station", StationSchema);
