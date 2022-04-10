const express = require("express");
const router = express.Router();

const providerController = require("../controllers/providerController");

//save to provider type
router.post("/", providerController.post_providerType);

//update verification details
router.patch("/updateVerification/:id", providerController.update_verification);

//fetch all providers
router.get("/", providerController.fetch_providers);

// Search provider
router.get("/search/:key", providerController.search_provider);

//Fetch new providers
router.get("/new", providerController.fetch_new_providers);

//Fetch verified providers
router.get("/verified", providerController.fetch_verified_providers);

// Fetch provider total count
router.get("/count", providerController.fetch_provider_count);

//Fetch provider using certain id
router.get("/:id", providerController.fetch_provider);

//Fetch documentlist of a provider
router.get("/document/:id", providerController.fetch_documentlist);

//disable or enable provider
router.patch("/able/:id", providerController.disable_provider);

// Update when document is accepted
router.patch(
  "/documentAccepted/:id/:docType",
  providerController.document_accepted
);

// Update when document is rejected
router.patch(
  "/documentRejected/:id/:docType/:reason",
  providerController.document_rejected
);

module.exports = router;
