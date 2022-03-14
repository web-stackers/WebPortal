const express = require("express");
const router = express.Router();

const consumerController = require("../controllers/consumerController");

// Fetch all consumers
router.get("/", consumerController.fetch_consumers);

// Fetch consumer by id
router.get("/:id", consumerController.fetch_consumer);

// Search consumer
router.get("/search/:key", consumerController.search_consumer);

// fetch consumer total count
router.get("/get/count", consumerController.fetch_consumer_count);

// Add new consumer to the database
router.post("/", consumerController.post_consumer);

// Disable or Enable consumer
router.patch("/able/:id", consumerController.disable_consumer);

module.exports = router;
