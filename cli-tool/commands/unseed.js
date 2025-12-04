const mongoose = require("mongoose");
const Station = require("../models/Station");

module.exports = async function unseedDatabase() {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

    // Connect to MongoDB & use z-energy
    await mongoose.connect(MONGO_URI, {
      dbName: "z-energy",
      serverSelectionTimeoutMS: 500,
    });
    console.log("Connected to MongoDB");

    // Remove all documents from the Station collection
    await Station.deleteMany({});
    console.log("Seed data removed");
  } catch (error) {
    console.error("Error removing seed data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};
