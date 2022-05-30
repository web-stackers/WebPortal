const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

// Fetch all jobs
router.get("/", jobController.fetch_jobs);

// Fetch job by id
router.get("/:id", jobController.fetch_job);

// Fetch user jobs
router.get("/user/userjobs/:type/:id", jobController.user_jobs);

// Add new job to the database
router.post("/", jobController.post_job);

// Update complaint
router.patch("/complaint/:id", jobController.update_complaint);

// Update when complaint handled by admin
router.patch("/complaintHandled/:id", jobController.complaint_handled);

// Update rating and review
router.patch("/ratingAndReview/:id", jobController.update_ratingAndReview);

//Fetch complaints by id
router.get("/complaints/:id", jobController.fetch_complaints);

//Fetch all complaints
router.get("/complaints", jobController.fetch_all_complaints);

// Fetch count of complaints
router.get("/complaint/count", jobController.fetch_complaint_count);

module.exports = router;
