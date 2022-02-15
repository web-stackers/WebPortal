const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

router.get("/", jobController.fetch_jobs);
router.get("/:id", jobController.fetch_job);
router.post("/", jobController.post_job);
router.patch("/complaint/:id", jobController.update_complaint);
router.patch("/complaintHandled/:id", jobController.complaint_handled);
router.patch("/ratingAndReview/:id", jobController.update_ratingAndReview);

module.exports = router;
