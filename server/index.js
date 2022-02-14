const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const jobTypeCategoryRouter = require('./routes/jobTypeCategoryRoute');
const jobRouter = require('./routes/jobRoute');
const consumerRouter = require('./routes/consumerRoute');

app.use(cors());
app.use(morgan("tiny"));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
const connectDB = require("./database/connection");

app.use('/consumer',consumerRouter);
app.use('/jobTypeCategory',jobTypeCategoryRouter);
app.use('/job',jobRouter);

app.listen(5000, () =>
  connectDB()
    .then(() => console.log("Server is running in Port 5000"))
    .catch(() =>
      console.log("Server is running but database connection failed")
    )
);


