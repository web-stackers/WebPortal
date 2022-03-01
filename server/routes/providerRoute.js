const express = require("express");
const router = express.Router();

const providerController = require("../controllers/providerController");

//save to provider type
router.post("/", providerController.post_providerType);
//update verification details
router.patch("/updateVerification/:id", providerController.update_verification);
//fetch all providers
router.get("/", providerController.fetch_providers);
// fetch provider total count
router.get("/totCount", providerController.fetch_provider_count);

//fetch provider using certain id
router.get("/:id", providerController.fetch_provider);
//disable or enable provider
router.patch("/disable_provider/:id", providerController.disable_provider);
// Update when document is accepted
router.patch("/documentAccepted/:id", providerController.document_accepted);
// Update when document is rejected
router.patch("/documentRejected/:id", providerController.document_rejected);

module.exports = router;
