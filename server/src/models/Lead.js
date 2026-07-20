const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    conversationId: { type: String, index: true },
    fullName: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    destination: { type: String, trim: true },
    departureCity: { type: String, trim: true },
    travelDate: { type: String, trim: true },
    travelMonth: { type: String, trim: true },
    travelers: { type: String, trim: true },
    budget: { type: String, trim: true },
    duration: { type: String, trim: true },
    tripType: { type: String, trim: true },
    specialRequirements: { type: String, trim: true },
    buyingIntent: { type: String, default: "Low" },
    confidenceLevel: { type: String, default: "Low" },
    leadScore: { type: Number, default: 0 },
    summary: { type: String, trim: true },
    qualified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);