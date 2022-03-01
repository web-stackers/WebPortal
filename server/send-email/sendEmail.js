const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "webstackers19@gmail.com",
    pass: "Stackers19",
  },
});

module.exports = transporter;

// var mailOptions = {
//   from: "webstackers19@gmail.com",
//   to: "theepanagovi01@gmail.com",
//   subject: "Check email",
//   text: `Check email file`,
//   html: "<h1>Hi Gowsigan</h1><p>How is your girl friend? Could you able to introduce your girl friend? What's her name?</p>",
// };

// const sendEmail = transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

// module.exports = sendEmail;
