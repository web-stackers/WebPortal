const express = require("express");
const router = express.Router();

const providerController = require("../controllers/providerController");

//save to provider type
router.post("/", providerController.post_providerType);
//update verification details
router.patch("/updateverification/:id", providerController.update_verification);
//fetch all providers
router.get("/fetch_providers/", providerController.fetch_providers);
//fetch provider using certain id
router.get("/fetch_provider/:id", providerController.fetch_provider);
//disable or enable provider
router.patch("/disable_provider/:id", providerController.disable_provider);

module.exports = router;
