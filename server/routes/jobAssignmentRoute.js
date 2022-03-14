const express = require("express");
const router = express.Router();

const jobAssignmentController = require("../controllers/jobAssignmentController");

// Get job Assignment
router.get("/", jobAssignmentController.fetch_jobAssignments);
router.get(
  "/jobJobAssignment",
  jobAssignmentController.fetch_job_and_jobAssignments
);
router.get("/:id", jobAssignmentController.fetch_jobAssignment);

// Fetch completed job count
router.get(
  "/completed/count",
  jobAssignmentController.fetch_completed_jobcount
);

// Fetch pending job count
router.get(
  "/get/pending/count",
  jobAssignmentController.fetch_pending_jobcount
);

//post job assignment
router.post("/", jobAssignmentController.post_jobAssignment);

//update job assignment when quotation is accepted
router.patch(
  "/quotationAccepted/:id",
  jobAssignmentController.quotation_accepted
);

//update job assignment when quotation is rejected
router.patch(
  "/quotationRejected/:id",
  jobAssignmentController.quotation_rejected
);

//update job assignment when withdrawl is pending
router.patch(
  "/withdrawlPending/:id",
  jobAssignmentController.withdrawl_pending
);

//update job assignment when withdrawl is accepted by admin
router.patch(
  "/withdrawlAccepted/:id",
  jobAssignmentController.withdrawl_accepted
);

//update job assignment when withdrawl is rejected by admin
router.patch(
  "/withdrawlRejected/:id",
  jobAssignmentController.withdrawl_rejected
);

// Insert provider's quotation
router.patch("/quotation/:id", jobAssignmentController.insert_quotation);

module.exports = router;
