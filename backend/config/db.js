const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error("MONGODB_URI is missing in environment variables.");
  }

  // Keep database setup in one place so later modules can reuse it cleanly.
  await mongoose.connect(mongoURI);
  console.log("MongoDB connected successfully");
};

module.exports = connectDB;
