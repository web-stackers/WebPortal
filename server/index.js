const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const jobTypeCategoryRouter = require('./routes/jobTypeCategoryRoute');

app.use(cors());
app.use(morgan("tiny"));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
const connectDB = require("./database/connection");

app.use('/jobTypeCategory',jobTypeCategoryRouter);

app.listen(5000, () =>
  connectDB()
    .then(() => console.log("Server is running"))
    .catch(() =>
      console.log("Server is running but database connection failed")
    )
);


