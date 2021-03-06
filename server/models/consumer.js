const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// consumer
const ConsumerSchema = Schema({
  name: {
    fName: {
      type: String,
      required: true,
      max: [127, "Max Length is 127 characters"],
    },
    lName: {
      type: String,
      required: true,
      max: [127, "Max Length is 127 characters"],
    },
  },
  contact: {
    mobile: {
      type: String,
      required: true,
      unique: true,
      maxLength: [10, "Max Length is 10 characters"],
      minLength: [10, "Min Length is 10 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: [127, "Max Length is 127 characters"],
    },
  },
  address: {
    longitude: {
      type: Number,
      // type: mongoose.Types.Decimal128,
      // required: true, //longitude must required
    },
    latitude: {
      type: Number,
      // type: mongoose.Types.Decimal128,
      // required: true, //latitude must required
    },
  },
  profilePicture: {
    data: Buffer,
    contentType: String,
  },
  registeredDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Min Length is 8 characters"],
    maxLength: [100, "Max Length is 100 characters"],
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now(), expires: 3600 },
  isEmailVerified: {
    type: Boolean,
    required: true,
    default: false, // default false
  },
});

module.exports = mongoose.model("Consumer", ConsumerSchema);
