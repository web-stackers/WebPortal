const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

router.get("/", jobController.fetch_jobs);
router.get("/:id", jobController.fetch_job);
router.post("/", jobController.post_job);
router.patch("/providerComplaint/:id", jobController.update_complaint_provider);
router.patch("/consumerComplaint/:id", jobController.update_complaint_consumer);
module.exports = router;
