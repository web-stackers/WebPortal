const express = require("express");
const router = express.Router();

const jobAssignmentController = require("../controllers/jobAssignmentController");

// Get job Assignment
router.get("/", jobAssignmentController.fetch_jobAssignments);
router.get("/:id", jobAssignmentController.fetch_jobAssignment);

// Post to job assignment
router.post("/", jobAssignmentController.post_jobAssignment);

// Update quotation
router.patch("/quotation/:id", jobAssignmentController.update_quotation);

module.exports = router;
