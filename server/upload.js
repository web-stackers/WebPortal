const multer = require("multer");

//define storage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: "uploads",
  // destination: (request, file, cb)=> {
  //   cb(null, "../../client/src/assets");
  // },

  //add back the extension
  filename: (request, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    //limit to 3MB
    fieldSize: 1024 * 1024 * 3,
  },
});
