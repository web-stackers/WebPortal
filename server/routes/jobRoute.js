const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

// Fetch all jobs
router.get("/", jobController.fetch_jobs);

// Fetch job by id
router.get("/:id", jobController.fetch_job);

// Fetch job history of a user
router.get("/user/userjobs/:type/:id", jobController.user_jobs);

// Fetch job withdrawals of a user
router.get("/user/userwithdrawals", jobController.user_withdrawals);

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

//Fetch all complaints by consumer
router.get(
  "/complaint/consumer",
  jobController.fetch_all_complaints_by_consumer
);

//Fetch job by consumer complaints
router.get(
  "/complaint/consumer/:id",
  jobController.fetch_all_job_by_consumer_complaints
);

//Fetch all complaints by provider
router.get(
  "/complaint/provider",
  jobController.fetch_all_complaints_by_provider
);

// Fetch count of complaints
router.get("/complaint/count", jobController.fetch_complaint_count);

module.exports = router;
