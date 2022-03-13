const express = require("express");
const router = express.Router();
// const upload = require("../upload");
const secondaryUserController = require("../controllers/secondaryUserController");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.fieldname);
  },
});

const upload = multer({ storage: storage });

router.get("/", secondaryUserController.fetch_secondaryUsers);
router.get("/:id", secondaryUserController.fetch_secondaryUser);
router.post(
  "/",
  upload.single("profilePicture"),
  secondaryUserController.post_secondaryUser
);
router.patch("/disable/:id", secondaryUserController.disable_secondaryUser);
router.patch("/update/:id", secondaryUserController.update_thirdParty);

module.exports = router;
