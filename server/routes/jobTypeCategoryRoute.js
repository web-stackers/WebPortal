const express = require("express");
const router = express.Router();

const jobTypeCategoryController = require("../controllers/jobTypeCategoryController");

//post to job type
router.post("/", jobTypeCategoryController.post_jobType);
router.get("/", jobTypeCategoryController.fetch_jobTypes);
router.get("/:id", jobTypeCategoryController.fetch_jobType);
router.delete("/:id", jobTypeCategoryController.delete_jobType);

module.exports = router;
