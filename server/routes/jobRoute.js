const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

router.get("/", jobController.fetch_jobs);
router.get("/:id", jobController.fetch_job);
router.post("/", jobController.post_job);

module.exports = router;
