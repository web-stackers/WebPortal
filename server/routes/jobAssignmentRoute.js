const express = require("express");
const router = express.Router();

const jobAssignmentController = require("../controllers/jobAssignmentController");

//Get job Assignment
router.get("/", jobAssignmentController.fetch_jobAssignments);
router.get("/:id", jobAssignmentController.fetch_jobAssignment);
//post to job assignment
router.post("/", jobAssignmentController.post_jobAssignment);

module.exports = router;
