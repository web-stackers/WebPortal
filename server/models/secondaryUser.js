const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating collection for secondary user
const SecondaryUserSchema = new Schema({
  role: {
    type: String,
    required: true,
    default: "Third Party",
    maxLength: [12, "Max Length is 12 characters"],
  },
  name: {
    fName: {
      type: String,
      required: true,
      maxLength: [127, "Max Length is 127 characters"],
    },
    lName: {
      type: String,
      required: true,
      maxLength: [127, "Max Length is 127 characters"],
    },
  },

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

  address: {
    type: String,
    required: true,
  },

  profilePicture: {
    data: Buffer,
    contentType: String,
  },

  password: {
    type: String,
    required: true,
    // default: "$2a$12$IrsQHK6uFE5T4jUgux/7buJTxJLTVqCVrh.Hpqexj.o/2/cnO2lha",
    minLength: [8, "Min Length is 8 characters"],
    maxLength: [150, "Max Length is 150 characters"],
  },

  registeredDate: {
    type: Date,
    default: Date.now(),
  },
  verifyDocType: {
    type: String,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("SecondaryUser", SecondaryUserSchema);
