const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const app = express();

app.use(cors());
app.use(morgan("tiny"));


const connectDB = require("./database/connection");

app.get('/', (req, res) => res.send('Hello world!'));


app.listen(5000, () =>
  connectDB()
    .then(() => console.log("Server is running"))
    .catch(() =>
      console.log("Server is running but database connection failed")
    )
);


