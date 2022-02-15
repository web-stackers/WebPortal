const express = require("express");
const router = express.Router();

const jobAssignmentController = require("../controllers/jobAssignmentController");

// Get job Assignment
router.get("/", jobAssignmentController.fetch_jobAssignments);
router.get("/:id", jobAssignmentController.fetch_jobAssignment);
<<<<<<< HEAD
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
=======

// Post to job assignment
router.post("/", jobAssignmentController.post_jobAssignment);

// Update quotation
router.patch("/quotation/:id", jobAssignmentController.update_quotation);

>>>>>>> b1709e63058af95d85a8e7e2006b4e0061469615
module.exports = router;
