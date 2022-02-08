//provider model
const mongoose = require("mongoose");
const provider = mongoose.provider;

const serviceprovider = new provider({
  name: {
    fName: {
      type: String,
      required: true,
      max: [100, "Max Length is 100 characters"],
    },
    lName: {
      type: String,
      required: true,
      max: [100, "Max Length is 100 characters"],
    },
  },
  contact: {
    mobile: {
      type: String,
      unique: true, //Numbers are unique to everyone
      required: true,
      min: [10, "Min Length is 10 characters"],
    },
    email: {
      type: String,
      unique: true, //email must be unique
      required: false,
      min: [10, "Max Length is 10 characters"],
      max: [100, "Max Length is 100 characters"],
    },
  },
  password: {
    type: String,
    required: true,
    min: [8, "Min Length is 8 characters"],
    max: [15, "Max Length is 15 characters"],
  },
  DOB: {
    type: Date,
    required: true,
  },
  NIC: {
    type: String,
    unique: true,
    required: true,
    min: [10, "Min Length is 10 characters"],
    max: [15, "Max Length is 15 characters"],
  },
  appliedDate: {
    type: Date,
    required: true,
    default: Date.now, // default date
  },
  jobType: {
    type: mongoose.Types.ObjectId,
    ref: "JobTypeCategory",
  },
  workStartedYear: {
    type: Date,
    required: true,
  },
  document: {
    profilePicture: {
      data: Buffer,
      contentType: String,
      required: true,
    },
    NIC_Scanned: {
      data: Buffer,
      contentType: String,
      required: true,
    },
    qualificationDoc: {
      type: {
        type: String,
        required: true,
      },
      doc: {
        data: Buffer,
        contentType: String,
        required: true,
      },
    },
  },
  address: {
    longitude: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    latitude: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
  },
  verification: {
    isAccepted: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    thirdParty: {
      type: mongoose.Types.ObjectId,
      ref: "thirdParty",
      required: true,
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
    required: true,
  },
});

module.exports = mongoose.model("provider", serviceprovider);
