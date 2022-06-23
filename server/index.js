const express = require("express");
const morgan = require("morgan"); //morgan is a Node. js and Express middleware to log HTTP requests and errors, and simplifies the process.
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
var path = require("path");
const Pusher = require("pusher");
const mongoose = require("mongoose");

const jobTypeCategoryRouter = require("./routes/jobTypeCategoryRoute");
const jobRouter = require("./routes/jobRoute");
const consumerRouter = require("./routes/consumerRoute");
const jobAssignmentRouter = require("./routes/jobAssignmentRoute");
const secondaryUserRoute = require("./routes/secondaryUserRoute");
const providerRouter = require("./routes/providerRoute");
const chatRouter = require("./routes/chatRoute");

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
app.use("/chat", chatRouter);

const pusher = new Pusher({
  appId: "1427195",
  key: "830065486460bbe58d2f",
  secret: "b1f2c2d5adfe1c85fc37",
  cluster: "eu",
  useTLS: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("chats");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    // console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        jobAssignmentId: messageDetails.jobAssignmentId,
        message: messageDetails.message,
        arisedBy: messageDetails.arisedBy,
        timestamp: messageDetails.timestamp,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  console.log(file);
  const destination = path.join(
    __dirname,
    "../client/public/uploads/",
    Date.now() + file.name
  );
  console.log(destination);

  file.mv(destination, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ filePath: destination, type: file.mimetype });
    console.log({ filePath: destination, type: file.mimetype });
  });
});

app.listen(5000, () =>
  connectDB()
    .then(() => console.log("Server is running in Port 5000"))
    .catch(() =>
      console.log("Server is running but database connection failed")
    )
);
