const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  name: String,
  address: String,

  // Dynamic object of fuel types -> price objects
  prices: {
    type: Map,
    of: new mongoose.Schema(
      {
        price: Number,
      },
      { _id: false }
    ),
  },

  // List of services
  services: [String],

  isOpen24Hours: Boolean,
  openingHours: {
    mon: String,
    tue: String,
    wed: String,
    thu: String,
    fri: String,
    sat: String,
    sun: String,
  },

  coordinates: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model("Station", StationSchema);
