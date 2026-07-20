const mongoose = require("mongoose");

const Chat = require("../models/Chat");
const Lead = require("../models/Lead");
const { conversationStore, leadStore } = require("./store");

function isMongoReady() {
  return Boolean(process.env.MONGODB_URI) && mongoose.connection.readyState === 1;
}

function parseBudgetValue(budget) {
  if (typeof budget === "number") {
    return budget;
  }

  if (!budget) {
    return 0;
  }

  const value = String(budget).toLowerCase().replace(/₹|,|\s/g, "");
  const match = value.match(/([\d.]+)(lakh|lac|k|crore)?/);

  if (!match) {
    const digitsOnly = value.replace(/[^\d.]/g, "");
    return Number(digitsOnly) || 0;
  }

  const amount = Number(match[1]);
  const unit = match[2] || "";

  if (unit === "crore") return amount * 10000000;
  if (unit === "lakh" || unit === "lac") return amount * 100000;
  if (unit === "k") return amount * 1000;

  return amount;
}

function formatOverview(totalConversations, leads) {
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter((lead) => lead.qualified).length;
  const highIntentLeads = leads.filter((lead) =>
    ["High", "Very High", "Qualified"].includes(lead.buyingIntent)
  ).length;
  const averageLeadScore =
    totalLeads > 0
      ? leads.reduce((sum, lead) => sum + Number(lead.leadScore || 0), 0) / totalLeads
      : 0;
  const revenuePotential = leads.reduce(
    (sum, lead) => sum + parseBudgetValue(lead.budget),
    0
  );

  return {
    totalConversations,
    totalLeads,
    qualifiedLeads,
    averageLeadScore,
    highIntentLeads,
    revenuePotential,
    summary: `${qualifiedLeads} qualified leads from ${totalConversations} conversations. ${highIntentLeads} high-intent conversations currently active.`,
  };
}

function buildRecentConversationsFromStore() {
  return Array.from(conversationStore.values())
    .sort((left, right) => {
      const leftTime = new Date(left.updatedAt || left.createdAt || 0).getTime();
      const rightTime = new Date(right.updatedAt || right.createdAt || 0).getTime();
      return rightTime - leftTime;
    })
    .slice(0, 4)
    .map((conversation) => {
      const lastMessage = conversation.messages[conversation.messages.length - 1];

      return {
        conversationId: conversation.conversationId,
        title:
          lastMessage?.role === "user"
            ? String(lastMessage.content).slice(0, 40)
            : `Conversation ${conversation.conversationId.slice(0, 8)}`,
        detail: lastMessage?.content || "Conversation in progress",
        updatedAt: conversation.updatedAt || conversation.createdAt || new Date(),
        messagesCount: conversation.messages.length,
      };
    });
}

function buildRecentConversationsFromMongo(chats = []) {
  return chats.map((chat) => {
    const lastMessage = chat.messages[chat.messages.length - 1];

    return {
      conversationId: chat.conversationId,
      title:
        lastMessage?.role === "user"
          ? String(lastMessage.content).slice(0, 40)
          : `Conversation ${chat.conversationId.slice(0, 8)}`,
      detail: lastMessage?.content || "Conversation in progress",
      updatedAt: chat.updatedAt,
      messagesCount: chat.messages.length,
    };
  });
}

async function getDashboardOverview() {
  if (isMongoReady()) {
    const [totalConversations, leads, averageScoreAgg, recentChats] = await Promise.all([
      Chat.countDocuments(),
      Lead.find().sort({ updatedAt: -1 }).lean(),
      Lead.aggregate([
        { $group: { _id: null, averageLeadScore: { $avg: "$leadScore" } } },
      ]),
      Chat.find().sort({ updatedAt: -1 }).limit(4).lean(),
    ]);

    const overview = formatOverview(totalConversations, leads);
    overview.averageLeadScore = averageScoreAgg[0]?.averageLeadScore || 0;
    overview.latestLead = leads[0] || null;
    overview.recentConversations = buildRecentConversationsFromMongo(recentChats);

    return overview;
  }

  const totalConversations = conversationStore.size;
  const leads = [...leadStore]
    .sort((left, right) => {
      const leftTime = new Date(left.updatedAt || left.lastMessageAt || left.createdAt || 0).getTime();
      const rightTime = new Date(right.updatedAt || right.lastMessageAt || right.createdAt || 0).getTime();
      return rightTime - leftTime;
    })
    .map((lead) => ({
    ...lead,
    leadScore: Number(lead.leadScore || 0),
    qualified: Boolean(lead.qualified),
  }));
  const overview = formatOverview(totalConversations, leads);
  overview.latestLead = leads[0] || null;
  overview.recentConversations = buildRecentConversationsFromStore();

  return overview;
}

module.exports = {
  getDashboardOverview,
  parseBudgetValue,
};
