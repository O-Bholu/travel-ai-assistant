const { asyncHandler } = require("../middleware/asyncHandler");
const { getConversationById } = require("../services/chatService");

const getConversation = asyncHandler(async (req, res) => {
  const conversation = await getConversationById(req.params.id);

  if (!conversation) {
    return res.status(404).json({ message: "Conversation not found" });
  }

  res.json({ conversation });
});

module.exports = { getConversation };