const { asyncHandler } = require("../middleware/asyncHandler");
const { handleChatMessage } = require("../services/chatService");

const chat = asyncHandler(async (req, res) => {
  const result = await handleChatMessage(req.body);
  res.json(result);
});

module.exports = { chat };