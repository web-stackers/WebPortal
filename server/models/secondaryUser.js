const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating collection for secondary user
const SecondaryUserSchema = new Schema({
  role: {
    type: Number,
    required: true,
    max: [12, "Max Length is 12 characters"],
  },
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
      max: [10, "Max Length is 10 characters"],
      min: [10, "Min Length is 10 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: [127, "Max Length is 127 characters"],
    },
  },
  address: { type: String, required: true },
  password: {
    type: String,
    required: true,
    min: [8, "Min Length is 8 characters"],
    max: [15, "Max Length is 15 characters"],
  },
  profilePicture: {
    data: Buffer,
    contentType: String,
  },
  registeredDate: { 
    type: Date, 
    default: Date.now 
  },
  verifyDocType: { 
    type: String, 
    required: true
  },
  isDisabled: { 
    type: Boolean, 
    default: false 
  },
});

module.exports = mongoose.model("SecondaryUser", SecondaryUserSchema);
