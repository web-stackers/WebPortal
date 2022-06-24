const express = require("express");
const router = express.Router();

const consumerController = require("../controllers/consumerController");

// Fetch all consumers
router.get("/", consumerController.fetch_consumers);

// Fetch consumer by id
router.get("/:id", consumerController.fetch_consumer);

//signin in the mobile
router.post("/signin", consumerController.signIn);

//fetch consumers location by ID
router.get("/address/:id", consumerController.fetch_consumer_address);

//Update consumers location by ID
router.patch("/addressUpdate/:id", consumerController.update_consumer_location);

//Update consumers profile by ID
router.patch("/profileUpdate/:id", consumerController.update_consumer_profile);

// Search consumer
router.get("/search/:key", consumerController.search_consumer);

// fetch consumer total count
router.get("/get/count", consumerController.fetch_consumer_count);

// Add new consumer to the database
router.post("/", consumerController.post_consumer);

// Disable or Enable consumer
router.patch("/able/:id", consumerController.disable_consumer);

// Fetch consumer name
router.get("/get/consumer/name/:id", consumerController.fetch_consumer_name);

module.exports = router;
