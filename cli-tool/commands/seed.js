const Station = require("../models/Station");
const seedData = require("../data/seedStationData");
const mongoose = require("mongoose");

module.exports = async function seedDatabase() {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

    // Connect to MongoDB & create/use z-energy
    const connection = await mongoose.connect(MONGO_URI, {
      dbName: "z-energy",
      serverSelectionTimeoutMS: 500,
    });
    console.log("Connected to MongoDB");

    await Station.deleteMany({});
    await Station.insertMany(seedData);

    console.log("Seed data inserted successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};
