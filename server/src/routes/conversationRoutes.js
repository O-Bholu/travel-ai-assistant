const express = require("express");

const { getConversation } = require("../controllers/conversationController");

const router = express.Router();

router.get("/:id", getConversation);

module.exports = router;