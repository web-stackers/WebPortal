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
  address: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minLength: [8, "Min Length is 8 characters"],
    maxLength: [15, "Max Length is 15 characters"],
  },
  //I have temporarily make required field as comment
  profilePicture: {
    type: Buffer,
    contentType: String,
    //required: true,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
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
