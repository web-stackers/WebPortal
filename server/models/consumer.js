const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// consumer
const ConsumerSchema = Schema({
  name: {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
  },
  contact: {
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  address: {
    longitude: {
      type: mongoose.Types.Decimal128,
      required: true, //longitude must required
    },
    latitude: {
      type: mongoose.Types.Decimal128,
      required: true, //latitude must required
    },
  },
  profilePicture: {
    type: String,
    required: true,
  },
  registeredDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  isDisabled: Boolean,
  password: {
    type: String,
    required: true,
    min: [8, "Min Length is 8 characters"],
    max: [15, "Max Length is 15 characters"],
  },
});

module.exports = mongoose.model("Consumer", ConsumerSchema);
