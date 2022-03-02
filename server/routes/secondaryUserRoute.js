const express = require("express");
const router = express.Router();

const secondaryUserController = require("../controllers/secondaryUserController");

router.get("/", secondaryUserController.fetch_secondaryUsers);
router.get("/:id", secondaryUserController.fetch_secondaryUser);
router.post("/", secondaryUserController.post_secondaryUser);
router.patch("/disable/:id", secondaryUserController.disable_secondaryUser);
router.patch("/update/:id", secondaryUserController.update_thirdParty);

module.exports = router;
