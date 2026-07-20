const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const chatSchema = new mongoose.Schema(
  {
    conversationId: { type: String, unique: true, index: true },
    messages: { type: [chatMessageSchema], default: [] },
    lastMessageAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
