const express = require('express');
const router = express.Router();

const providerController = require("../controllers/providerController");

//post to provider type
router.post('/',providerController.post_providerType);

module.exports = router;
