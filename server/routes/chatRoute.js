const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

// Post chat messages
router.post("/", chatController.post_messages);

// Fetch all chat messages
router.get("/all", chatController.fetch_messages);

module.exports = router;
