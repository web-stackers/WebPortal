const consumer = require("../models/consumer");
const consumerEmailVerification = require("../models/consumerEmailVerification");
const transporter = require("../send-email/sendEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "test";

// Fetch all consumers
const fetch_consumers = async (req, res) => {
  try {
    const consumers = await consumer
      .find({isEmailVerified: true})
      .select("name contact profilePicture isDisabled totalRating ratingCount");
    res.status(200).json(consumers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add new consumer to the database
const post_consumer = async (req, res) => {
  // let profilePictureBuffer;
  let isMobileExist = false;
  let isEmailExist = false;
  let email = req.body.email; 
  let mobile = req.body.mobile; 

  try {
    const mobileUser = await consumer.findOne({ "contact.mobile": mobile });
    const emailUser = await consumer.findOne({ "contact.email": email });
    if (mobileUser) {
      isMobileExist = true;
    }
    if (emailUser) {
      isEmailExist = true;
    }
    if (isMobileExist && isEmailExist) {
      return res
        .status(404)
        .json({ message: "Both mobile number and email address are already exist" });
    }
    if (isMobileExist) {
      return res
        .status(404)
        .json({ message: "Mobile number is already existing one" });
    }
    if (isEmailExist) {
      return res
        .status(404)
        .json({ message: "Email address is already existing one" });
    }
    let fName = req.body.fName;
    let lName = req.body.lName;
    fName = fName.charAt(0).toUpperCase() + fName.slice(1).toLowerCase();
    lName = lName.charAt(0).toUpperCase() + lName.slice(1).toLowerCase();
    // profilePictureBuffer = fs.readFileSync(req.body.profilePath.filePath);
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newConsumer = new consumer({
      name: {
        fName: fName,
        lName: lName,
      },
      contact: {
        mobile: mobile,
        email: email,
      },
      // profilePicture: {data: profilePictureBuffer,
      // contentType: req.body.profilePath.type,},
      password: hashedPassword,
    });
    const response = await newConsumer.save();
    // OTP generation and email sending after inserting the new consumer with basic details
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const hashedOtp = await bcrypt.hash(otp, 10);
    const userId = response._id;
    const isEmailVerification = true;
    var mailOptions = {
      from: "webstackers19@gmail.com",
      to: email,
      subject: "Verify Your Email",
      html:
        "Hi " +
        fName +
        ",<br><br> Enter <b>" +
        otp +
        "</b> in the app to verify your email address and to finish the registration.<br>This code will <b>expires in 5 minutes</b>.<br>If you failed to verify, informations given by you will be deleted within one hour and then only you can again fill the form from the start",
    };
    const newOtpVerification = await new consumerEmailVerification({
      consumerId: userId,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000, // will expires after 5 min
    });
    await newOtpVerification.save();
    await transporter.sendMail(mailOptions);

    res.status(200).json({ userId, email, fName, isEmailVerification });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Verification of OTP entered by the user when email verification and forgot password
const verify_OTP = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      return res
        .status(400)
        .json({ message: "Empty OTP details are not allowed" });
    }
    const consumerEmailVerificationRecords =
      await consumerEmailVerification.find({ consumerId: userId });
    if (consumerEmailVerificationRecords.length <= 0) {
      return res.status(400).json({
        message: "Account record does not exist or has been already verified",
      });
    }
    const { expiresAt } = consumerEmailVerificationRecords[0];
    const hashedOtp = consumerEmailVerificationRecords[0].otp;
    if (expiresAt < Date.now()) {
      await consumerEmailVerification.deleteMany({ consumerId: userId });
      return res
        .status(400)
        .json({ message: "Code has been expired. Please request againt" });
    }
    const isOTPvalid = await bcrypt.compare(otp, hashedOtp);
    if (!isOTPvalid) {
      return res
        .status(400)
        .json({ message: "Invalid code entered. Check your email" });
    }
    await consumer.findByIdAndUpdate(
      userId,
      { isEmailVerified: true },
      { new: true }
    );
    await consumer.findByIdAndUpdate(userId, { $unset: { createdAt: "" } });
    await consumerEmailVerification.deleteMany({ consumerId: userId });
    res.status(200).json("OTP verified successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Resend OTP in register and forgot password
const resend_OTP = async (req, res) => {
  try {
    let { userId, email, fName, isEmailVerification } = req.body;
    let subject;
    let msg;

    if (isEmailVerification) {
      subject = "Verify Your Email - OTP resend";
      msg =
        "to verify your email address and to finish the registration.<br>This code will <b>expires in 5 minutes</b>.<br>If you failed to verify, informations given by you will be deleted within one hour and then only you can again fill the form from the start";
    } else {
      subject = "Verify You - OTP resend";
      msg =
        "to confirm the OTP and to change new password.<br>This code will <b>expires in 5 minutes</b>";
    }
    if (!userId || !email) {
      return res
        .status(400)
        .json({ message: "Empty user details are not allowed" });
    }
    await consumerEmailVerification.deleteMany({ consumerId: userId });

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const hashedOtp = await bcrypt.hash(otp, 10);
    var mailOptions = {
      from: "webstackers19@gmail.com",
      to: email,
      subject: subject,
      html:
        "Hi " +
        fName +
        ",<br><br> Enter <b>" +
        otp +
        "</b> in the app " +
        msg +
        ".",
    };
    const newOtpVerification = await new consumerEmailVerification({
      consumerId: userId,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000, // will expires after 5 min
      //3600000 == 1hr
    });
    await newOtpVerification.save();
    await transporter.sendMail(mailOptions);

    res.status(200).json("OTP resent successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Signin
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await consumer.findOne({ "contact.email": email });
    // .select(
    //   "_id name contact NIC address"
    // );

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    if (!oldUser.isEmailVerified == true) {
      return res.status(404).json({ message: "Incomplete registration" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { email: oldUser.contact.email, id: oldUser._id },
      secret
    );
    const { _id, name, contact, address } = oldUser;
    res.status(200).json({ result: { _id, name, contact, address }, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//generating OTP to change new password in the forgot password section, in the mobile
const forgot_password = async (req, res) => {
  try {
    let { email } = req.body;
    const subject = "Verify You to Change New Password";
    const msg =
      "to confirm the OTP and to change new password.<br>This code will <b>expires in 5 minutes</b>";

    const user = await consumer.findOne({ "contact.email": email });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    if (!user.isEmailVerified == true) {
      return res.status(404).json({ message: "Incomplete registration" });
    }
    const userId = user._id;
    const fName = user.name.fName;
    const isEmailVerification = false;

    await consumerEmailVerification.deleteMany({ consumerId: userId });

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const hashedOtp = await bcrypt.hash(otp, 10);
    var mailOptions = {
      from: "webstackers19@gmail.com",
      to: email,
      subject: subject,
      html:
        "Hi " +
        fName +
        ",<br><br> Enter <b>" +
        otp +
        "</b> in the app " +
        msg +
        ".",
    };
    const newOtpVerification = await new consumerEmailVerification({
      consumerId: userId,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000, // will expires after 5 min
      //3600000 == 1hr
    });
    await newOtpVerification.save();
    await transporter.sendMail(mailOptions);

    res.status(200).json({ userId, email, fName, isEmailVerification });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update the new password - forgot password
const change_forgot_password = async (req, res) => {
  const { id } = req.params;
  const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
  try {
    const updatedConsumer = await consumer.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      { new: true }
    );
    res.status(200).json("Password changed successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch consumer by id
const fetch_consumer = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredConsumer = await consumer.findById(id);
    res.status(200).json(requiredConsumer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch consumer address
const fetch_consumer_address = async (req, res) => {
  const { id } = req.params;
  try {
    const consumers = await consumer.findById(id).select("address");
    res.status(200).json(consumers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch consumer by search key
const search_consumer = async (req, res) => {
  const { key } = req.params;
  const searchKey = new RegExp(key, "i");

  try {
    const searchResult = await consumer.find({
      $or: [{ "name.fName": searchKey }, { "name.lName": searchKey }],
    });
    res.status(200).json(searchResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Disable or Enable consumer
const disable_consumer = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredConsumer = await consumer.findById(id);
    const ableUpdatedConsumer = await consumer.findByIdAndUpdate(
      id,
      { isDisabled: !requiredConsumer.isDisabled },
      { new: true }
    );
    res.status(200).json(ableUpdatedConsumer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update consumer location
const update_consumer_location = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedConsumer = await consumer.findByIdAndUpdate(id, {
      address: {
        longitude: req.body.longitude,
        latitude: req.body.latitude,
      },
    });
    res.status(200).json("location updated successfuly");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update consumer profile
const update_consumer_profile = async (req, res) => {
  const { id } = req.params;
  try {
    const updateConsumer = await consumer.findByIdAndUpdate(
      id,
      {
        $set: {
          'name.fName': req.body.fName,
          'name.lName': req.body.lName,
          'contact.mobile': req.body.mobile,
       }
      },
    );
    res.status(200).json(updateConsumer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get count of total consumers
const fetch_consumer_count = async (req, res) => {
  try {
    const consumerCount = await consumer.count();
    res.status(200).json(consumerCount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch consumer name
const fetch_consumer_name = async (req, res) => {
  const { id } = req.params;
  try {
    const requiredConsumer = await consumer.findById(id);
    res.status(200).json(requiredConsumer.name);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Update consumer password
const change_password = async (req, res) => {
  const { id } = req.params;
  try {
    const requiredConsumer = await consumer.findById(id);
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const password = await requiredConsumer.password;
    const isMatch = await bcrypt.compare(oldPassword, password);
    if (!isMatch) {
      res.status(200).send({
        success: false,
        message: "Your old password does not match!",
      });
    } else {
      const hashpassword = bcrypt.hashSync(newPassword, 12);
      const updatePassword = await consumer.findByIdAndUpdate(id, {
        password: hashpassword,
      });
      res.status(200).json(updatePassword);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  fetch_consumers,
  post_consumer,
  verify_OTP,
  resend_OTP,
  signIn,
  forgot_password,
  change_forgot_password,
  fetch_consumer,
  disable_consumer,
  search_consumer,
  fetch_consumer_count,
  fetch_consumer_address,
  fetch_consumer_name,
  update_consumer_location,
  update_consumer_profile,
  change_password,
};
