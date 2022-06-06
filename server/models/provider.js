//provider model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const providerSchema = Schema({
  name: {
    fName: {
      type: String,
      required: true,
      maxLength: [100, "Max Length is 100 characters"],
    },
    lName: {
      type: String,
      required: true,
      maxLength: [100, "Max Length is 100 characters"],
    },
  },
  contact: {
    mobile: {
      type: String,
      unique: true, //Numbers are unique to everyone
      required: true,
      minLength: [10, "Min Length is 10 characters"],
    },
    email: {
      type: String,
      unique: true, //email must be unique
      required: false,
      minLength: [10, "Max Length is 10 characters"],
      maxLength: [100, "Max Length is 100 characters"],
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Min Length is 8 characters"],
    maxLength: [15, "Max Length is 15 characters"],
  },
  DOB: {
    type: Date,
    required: true,
  },
  NIC: {
    type: String,
    unique: true,
    required: true,
    minLength: [10, "Min Length is 10 characters"],
    maxLength: [15, "Max Length is 15 characters"],
  },
  appliedDate: {
    type: Date,
    required: true,
    default: Date.now(), // default date
  },
  jobType: {
    type: mongoose.Types.ObjectId,
    ref: "JobTypeCategory",
  },
  workStartedYear: {
    type: Date,
    required: true,
  },
  document: [
    {
      type: { type: String },
      isAccepted: { type: Boolean },
      qualificationDocType: { type: String },
      reasonForRejection: { type: String },
      doc: { data: Buffer, contentType: String },
    },
  ],

  address: {
    longitude: {
      type: mongoose.Types.Decimal128,
      //required: true,
    },
    latitude: {
      type: mongoose.Types.Decimal128,
      //required: true,
    },
  },
  verification: {
    isAccepted: {
      type: Boolean,
    },
    date: {
      type: Date,
    },
    thirdParty: {
      type: mongoose.Types.ObjectId,
      ref: "SecondaryUser",
    },
  },
  availability: {
    type: Boolean,
    required: true,
    default: true, // default true
  },
  isDisabled: {
    type: Boolean,
    required: true,
    default: false, // default false
  },
  qualification: {
    type: String,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("provider", providerSchema);
