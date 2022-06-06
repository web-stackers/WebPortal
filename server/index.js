const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const app = express();
var path = require("path");

const jobTypeCategoryRouter = require("./routes/jobTypeCategoryRoute");
const jobRouter = require("./routes/jobRoute");
const consumerRouter = require("./routes/consumerRoute");
const jobAssignmentRouter = require("./routes/jobAssignmentRoute");
const secondaryUserRoute = require("./routes/secondaryUserRoute");
const providerRouter = require("./routes/providerRoute");

app.use(cors());
app.use(morgan("tiny"));

app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const connectDB = require("./database/connection");

app.use("/consumer", consumerRouter);
app.use("/jobTypeCategory", jobTypeCategoryRouter);
app.use("/job", jobRouter);
app.use("/jobAssignment", jobAssignmentRouter);
app.use("/secondaryUser", secondaryUserRoute);
app.use("/provider", providerRouter);

app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  console.log(file);
  const destination = path.join(
    __dirname,
    "../client/public/uploads/",
    Date.now()+file.name
  );
  console.log(destination);
  // file.mv(`${__dirname}../client/public/uploads/${file.name}`, (err) => {
  file.mv(destination, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    // path.join(__dirname, "../client/public/uploads/",file.name)
    // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    res.json({ filePath: destination });
    console.log({ filePath: destination });
  });
});

app.listen(5000, () =>
  connectDB()
    .then(() => console.log("Server is running in Port 5000"))
    .catch(() =>
      console.log("Server is running but database connection failed")
    )
);
