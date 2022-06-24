const express = require("express");
const router = express.Router();
const providerController = require("../controllers/providerController");

// check whether the emai,mobile and nic are unique while registering
router.post("/register/validate", providerController.validate_provider);

// Register new provider
router.post("/register", providerController.post_providerType);

// Register new provider
router.post("/register/verifyOTP", providerController.verify_OTP);

// To resend the OTP
router.post("/register/resendOTP", providerController.resend_OTP);

// upadate new provider after documents upload
router.post("/register/upload/:id", providerController.update_uploads);

//signin in the mobile
router.post("/signin", providerController.signIn);

//update verification details
router.patch(
  "/updateVerification/:id/:result",
  providerController.update_verification
);

//fetch all providers
router.get("/", providerController.fetch_providers);

//fetch providers location by ID
router.get("/address/:id", providerController.fetch_provider_address);

//fetch providers details under certain job type
router.get(
  "/jobType/:type",
  providerController.fetch_providers_under_certain_jobType
);

//fetch provider profile picture by ID
router.get("/pic/:id", providerController.fetch_provider_profile_picture);

// Search provider
router.get("/search/:key", providerController.search_provider);

//Fetch new providers
router.get("/new/:docType", providerController.fetch_new_providers);

//Fetch verified providers
router.get("/verified", providerController.fetch_verified_providers);

// Fetch provider total count
router.get("/count", providerController.fetch_provider_count);

//Fetch provider using certain id for mobile app
router.get("/mobile/:id", providerController.fetch_provider_by_id);

// Fetch provider count by provider job type
router.get("/count/jobType", providerController.fetch_provider_JobType_count);

//Fetch provider using certain id
router.get("/:id", providerController.fetch_provider);

//Update providers profile by ID
router.patch("/profileUpdate/:id", providerController.update_provider_profile);

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

// Increase provider count in job type category
router.patch("/providerCount/:id", providerController.increase_provider_count);

// Update provider count in job type category when enabling and disabling by admin
router.patch(
  "/providerCountUpdate/:id",
  providerController.update_provider_count
);

// Update qualification
router.patch(
  "/update/qualification/:id/:qualification",
  providerController.update_qualification
);

// Fetch provider name
router.get("/get/provider/name/:id", providerController.fetch_provider_name);

module.exports = router;
