const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "webstackers19@gmail.com",
    pass: "deymxfjjhehhprgt",
  },
});

module.exports = transporter;
