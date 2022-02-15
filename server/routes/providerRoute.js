const express = require("express");
const router = express.Router();

const providerController = require("../controllers/providerController");

//post to provider type
router.post("/", providerController.post_providerType);
router.patch("/updateVerification/:id", providerController.update_verification);

module.exports = router;
