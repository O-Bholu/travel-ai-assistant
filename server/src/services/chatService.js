const { randomUUID } = require("crypto");
const mongoose = require("mongoose");

const Chat = require("../models/Chat");
const Lead = require("../models/Lead");
const { conversationStore, leadStore } = require("./store");
const { generateTravelAssistantResponse } = require("./ai.service");

function isMongoReady() {
  return Boolean(process.env.MONGODB_URI) && mongoose.connection.readyState === 1;
}

function mapMessages(messages) {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
    createdAt: message.createdAt,
  }));
}

async function saveMongoConversation({ conversationId, userMessage, assistantMessage }) {
  return Chat.findOneAndUpdate(
    { conversationId },
    {
      $setOnInsert: { conversationId },
      $push: { messages: { $each: [userMessage, assistantMessage] } },
      $set: { lastMessageAt: new Date() },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

async function saveMongoLead({ conversationId, aiResponse }) {
  return Lead.findOneAndUpdate(
    { conversationId },
    {
      conversationId,
      ...aiResponse.extracted,
      buyingIntent: aiResponse.buyingIntent,
      confidenceLevel: aiResponse.confidence,
      leadScore: aiResponse.score,
      summary: aiResponse.summary,
      qualified: aiResponse.qualified,
      lastMessageAt: new Date(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

function saveFallbackLead({ conversationId, aiResponse }) {
  const snapshot = {
    id: conversationId,
    conversationId,
    ...aiResponse.extracted,
    buyingIntent: aiResponse.buyingIntent,
    confidenceLevel: aiResponse.confidence,
    leadScore: aiResponse.score,
    summary: aiResponse.summary,
    qualified: aiResponse.qualified,
    updatedAt: new Date().toISOString(),
  };

  const index = leadStore.findIndex((lead) => lead.conversationId === conversationId);

  if (index >= 0) {
    leadStore[index] = snapshot;
  } else {
    leadStore.unshift(snapshot);
  }

  return snapshot;
}

async function handleChatMessage({ message, conversationId, leadContext = {} }) {
  if (!message || !message.trim()) {
    const error = new Error("Message is required.");
    error.statusCode = 400;
    throw error;
  }

  const activeConversationId = conversationId || randomUUID();
  const userMessage = {
    role: "user",
    content: message.trim(),
    createdAt: new Date(),
  };

  const aiResponse = await generateTravelAssistantResponse({
    message,
    leadContext,
  });

  const assistantMessage = {
    role: "assistant",
    content: aiResponse.reply,
    createdAt: new Date(),
  };

  let messages = [userMessage, assistantMessage];

  if (isMongoReady()) {
    const chat = await saveMongoConversation({
      conversationId: activeConversationId,
      userMessage,
      assistantMessage,
    });

    await saveMongoLead({ conversationId: activeConversationId, aiResponse });

    messages = mapMessages(chat.messages);
  } else {
    const existingConversation = conversationStore.get(activeConversationId) || {
      conversationId: activeConversationId,
      messages: [],
    };

    existingConversation.messages.push(userMessage, assistantMessage);
    conversationStore.set(activeConversationId, existingConversation);
    saveFallbackLead({ conversationId: activeConversationId, aiResponse });
    messages = mapMessages(existingConversation.messages);
  }

  return {
    conversationId: activeConversationId,
    assistantMessage: aiResponse.reply,
    extracted: aiResponse.extracted,
    score: aiResponse.score,
    confidence: aiResponse.confidence,
    buyingIntent: aiResponse.buyingIntent,
    qualified: aiResponse.qualified,
    requestContact: aiResponse.requestContact,
    summary: aiResponse.summary,
    messages,
  };
}

async function getConversationById(conversationId) {
  if (isMongoReady()) {
    const chat = await Chat.findOne({ conversationId });

    if (!chat) {
      return null;
    }

    return {
      conversationId: chat.conversationId,
      messages: mapMessages(chat.messages),
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    };
  }

  const conversation = conversationStore.get(conversationId);

  if (!conversation) {
    return null;
  }

  return {
    conversationId: conversation.conversationId,
    messages: mapMessages(conversation.messages),
  };
}

module.exports = {
  handleChatMessage,
  getConversationById,
};
