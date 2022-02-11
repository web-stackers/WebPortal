const express = require('express');
const router = express.Router();

const jobTypeCategoryController = require("../controllers/jobTypeCategoryController");

//post to job type
router.post('/',jobTypeCategoryController.jobType_post);

module.exports = router;