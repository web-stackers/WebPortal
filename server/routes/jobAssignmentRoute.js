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

// Fetch completed job count by provider id
router.get(
  "/completed/provider/count/:id",
  jobAssignmentController.fetch_completed_provider_jobcount
);

// Fetch completed job count by provider id
router.get(
  "/completed/consumer/count/:id",
  jobAssignmentController.fetch_completed_consumer_jobcount
);

// Delete the request cancelled
router.delete(
  "/cancelled/consumer/:id",
  jobAssignmentController.cancel_request_sent
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

// update job assignment when job request is rejected by the provider
router.patch('/requestRejected/:id', jobAssignmentController.job_rejected);

//update job assignment when withdrawl is pending
router.patch(
  "/withdrawlPending/:id",
  jobAssignmentController.withdrawal_pending
);

//update job assignment when withdrawl is accepted by admin
router.patch(
  "/withdrawlAccepted/:id",
  jobAssignmentController.withdrawal_accepted
);

//update job assignment when withdrawl is rejected by admin
router.patch(
  "/withdrawlRejected/:id",
  jobAssignmentController.withdrawal_rejected
);

// Insert provider's quotation
router.patch("/quotation/:id", jobAssignmentController.insert_quotation);

router.get("/state/completeJobs/:type/:id", jobAssignmentController.complete_jobAssignments);

module.exports = router;
