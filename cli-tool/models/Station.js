// server/models/Station.js
const mongoose = require("mongoose");


const PriceSchema = new mongoose.Schema({
  fuelType: String,
  price: Number,
  updatedAt: { type: Date, default: Date.now },
});

const StationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  suburb: String,
  city: String,


  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [lng, lat]
  },

  prices: {
    type: mongoose.Schema.Types.Mixed, 
    default: {},
  },

  services: [String],

  openingHours: {
    mon: String,
    tue: String,
    wed: String,
    thu: String,
    fri: String,
    sat: String,
    sun: String,
  },

  image: String,
  isOpen24Hours: Boolean,
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Station", StationSchema);
