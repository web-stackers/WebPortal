const express = require("express");
const router = express.Router();
const secondaryUserController = require("../controllers/secondaryUserController");

// router.post("/upload", (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: "No file uploaded" });
//   }
//   const file = req.files.file;
//   console.log(file);
//   file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });

router.get("/", secondaryUserController.fetch_secondaryUsers);
router.get("/:id", secondaryUserController.fetch_secondaryUser);
router.post("/", secondaryUserController.post_secondaryUser);
router.patch("/disable/:id", secondaryUserController.disable_secondaryUser);
router.patch("/update/:id", secondaryUserController.update_thirdParty);

// Fetch third party count
router.get("/thirdparty/count", secondaryUserController.fetch_thirdparty_count);

module.exports = router;
