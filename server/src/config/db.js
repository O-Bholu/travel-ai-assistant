const mongoose = require("mongoose");

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn("MONGODB_URI is not set. Starting without MongoDB persistence.");
    return null;
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB_NAME || "travel-ai-assistant",
  });

  return mongoose.connection;
}

module.exports = { connectDatabase };