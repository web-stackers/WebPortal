const express = require("express");
const router = express.Router();
const secondaryUserController = require("../controllers/secondaryUserController");

router.post("/signin", secondaryUserController.signIn);

router.post("/forgotPassword", secondaryUserController.forgot_password);

// verify OTP in forgot password
router.post("/forgotPassword/verifyOTP", secondaryUserController.verify_OTP);

// To resend the OTP in forgot password
router.post("/forgotPassword/resendOTP", secondaryUserController.resend_OTP);

// change password if singin for the first time or due to forgot password 
router.post("/changePassword/:id", secondaryUserController.change_password);

//Fetch all third party records
router.get("/", secondaryUserController.fetch_secondaryUsers);

//Fetch third party by id
router.get("/:id", secondaryUserController.fetch_secondaryUser);

//Post record of third party
router.post("/", secondaryUserController.post_secondaryUser);

//Disable or enable third party
router.patch("/disable/:id", secondaryUserController.disable_secondaryUser);

//update third party record
router.patch("/update/:id", secondaryUserController.update_thirdParty);

//update third party record
router.patch("/profileUpdate/:id", secondaryUserController.profile_upload);

// Fetch third party count
router.get("/thirdparty/count", secondaryUserController.fetch_thirdparty_count);

// check whether the email unique or not
router.get("/search/:email", secondaryUserController.validate_email);

// check whether the mobile unique or not
router.get("/search/mobile/:mobile", secondaryUserController.validate_mobile);

// Fetch thirdparty verify document type
router.get("/verify/docType/:id", secondaryUserController.fetch_verify_doctype);

module.exports = router;
