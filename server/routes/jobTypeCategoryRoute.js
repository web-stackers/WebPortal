const express = require("express");
const router = express.Router();

const jobTypeCategoryController = require("../controllers/jobTypeCategoryController");

//post to job type
router.post("/", jobTypeCategoryController.post_jobType);
router.get("/", jobTypeCategoryController.fetch_jobTypes);
router.get("/eventJobs", jobTypeCategoryController.fetch_event_jobs);
router.get(
  "/constructionJobs",
  jobTypeCategoryController.fetch_construction_jobs
);
router.get("/:id", jobTypeCategoryController.fetch_jobType);
router.delete("/:id", jobTypeCategoryController.delete_jobType);
router.patch("/update/:id", jobTypeCategoryController.update_jobType);

// Fetch job category count
router.get(
  "/category/count",
  jobTypeCategoryController.fetch_jobCategory_count
);

// Fetch job type count
router.get("/type/count", jobTypeCategoryController.fetch_jobType_count);

// check whether the jobType unique or not
router.get("/search/:jobType", jobTypeCategoryController.validate_jobType);

module.exports = router;
