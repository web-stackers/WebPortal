const secondaryUser = require("../models/secondaryUser");
const transporter = require("../send-email/sendEmail");
const providerEmailVerification = require("../models/providerEmailVerification");
var path = require("path");
const fs = require("fs");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "test";

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const defaultPassword = "@Helper#123";

  try {
    // if (!email) return res.status(400).json({ message: "email is required" });
    // if (!password)
    //   return res.status(400).json({ message: "password is required" });

    const oldUser = await secondaryUser.findOne({ email: email });

    if (!oldUser)
      return res
        .status(404)
        .json({ message: "User doesn't exist"});

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const isFirstTimeSignin = await bcrypt.compare(
      defaultPassword,
      oldUser.password
    );

    if (isFirstTimeSignin)
      return res.status(400).json({ message: "First time signin", userId: oldUser._id  });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//generating OTP to change new password in the forgot password section, in the webportal
const forgot_password = async (req, res) => {
  try {
    let { email } = req.body;
    const subject = "Verify You to Change New Password";
    const msg =
      "to confirm the OTP and to change new password.<br>This code will <b>expires in 5 minutes</b>";

    const user = await secondaryUser.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    const userId = user._id;
    const fName = user.name.fName;

    await providerEmailVerification.deleteMany({ providerId: userId });

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
    const newOtpVerification = await new providerEmailVerification({
      providerId: userId,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000, // will expires after 5 min
      //3600000 == 1hr
    });
    await newOtpVerification.save();
    await transporter.sendMail(mailOptions);

    res.status(200).json({ userId, email, fName });
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
    const providerEmailVerificationRecords =
      await providerEmailVerification.find({ providerId: userId });
    if (providerEmailVerificationRecords.length <= 0) {
      return res.status(400).json({
        message: "Account record does not exist or has been already verified",
      });
    }
    const { expiresAt } = providerEmailVerificationRecords[0];
    const hashedOtp = providerEmailVerificationRecords[0].otp;
    if (expiresAt < Date.now()) {
      await providerEmailVerification.deleteMany({ providerId: userId });
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
    await providerEmailVerification.deleteMany({ providerId: userId });
    res.status(200).json("OTP verified successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Resend OTP in register and forgot password
const resend_OTP = async (req, res) => {
  try {
    let { userId, email, fName } = req.body;

    const subject = "Verify You - OTP resend";
    const msg =
      "to confirm the OTP and to change new password.<br>This code will <b>expires in 5 minutes</b>";
    if (!userId || !email) {
      return res
        .status(400)
        .json({ message: "Empty user details are not allowed" });
    }
    await providerEmailVerification.deleteMany({ providerId: userId });

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
    const newOtpVerification = await new providerEmailVerification({
      providerId: userId,
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

const change_password = async (req, res) => {
  const { id } = req.params;
  try {
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
    const updatedProvider = await secondaryUser.findByIdAndUpdate(
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

// Fetch all secondaryUsers
const fetch_secondaryUsers = async (req, res) => {
  try {
    const secondaryUsers = await secondaryUser.find();
    res.status(200).json(secondaryUsers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add new secondaryUser to the database
const post_secondaryUser = async (req, res) => {
  let profilePictureBuffer;
  profilePictureBuffer = fs.readFileSync(req.body.profilePath.filePath);
  console.log(profilePictureBuffer);
  const newSecondaryUser = new secondaryUser({
    name: {
      fName:
        req.body.fName.charAt(0).toUpperCase() +
        req.body.fName.slice(1).toLowerCase(),
      lName:
        req.body.lName.charAt(0).toUpperCase() +
        req.body.lName.slice(1).toLowerCase(),
    },
    mobile: req.body.mobile,
    email: req.body.email,
    address: req.body.address,
    verifyDocType: req.body.verifyDocType,
    profilePicture: {
      data: profilePictureBuffer,
      contentType: req.body.profilePath.type,
    },
  });

  var mailOptions = {
    from: "webstackers19@gmail.com",
    to: req.body.email,
    subject: "Registering as a Third party user of Helper app",
    html:
      "Hi " +
      req.body.fName +
      ",<br><br> We are warmly welcome you to our Helper App. <br>You have successfully registered as a Third party user. From now onwards you can able to verify the documents of provider on Helper webportal. When you are logging on web portal, please use the credentials. <br> UserName: Your email address <br> password:@Helper#123 Thereafter you can able to change the password for your account. Good Luck ",
  };

  try {
    await newSecondaryUser.save().then(() =>
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      })
    );

    res.status(201).json(newSecondaryUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update profile picture for secondary user
const profile_upload = async (req, res) => {
  console.log("function call check");
  const { id } = req.params;
  let profilePictureBuffer;
  try {
    profilePictureBuffer = fs.readFileSync(req.body.profilePath.filePath);
    console.log(profilePictureBuffer);
    const updateUser = await secondaryUser.findByIdAndUpdate(
      id,
      {
        profilePicture: {
          data: profilePictureBuffer,
          contentType: req.body.profilePath.type,
        },
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch secondaryUser by id
const fetch_secondaryUser = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredSecondaryUser = await secondaryUser.findById(id);
    res.status(200).json(requiredSecondaryUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Disable or Enable secondaryUser
const disable_secondaryUser = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredSecondaryUser = await secondaryUser.findById(id);
    const ableUpdatedSecondaryUser = await secondaryUser.findByIdAndUpdate(
      id,
      { isDisabled: !requiredSecondaryUser.isDisabled },
      { new: true }
    );
    res.status(200).json(ableUpdatedSecondaryUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update Third party values by admin
const update_thirdParty = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSecondaryUser = await secondaryUser.findByIdAndUpdate(id, {
      mobile: req.body.mobile,
      email: req.body.email,
      address: req.body.address,
      verifyDocType: req.body.verifyDocType,
    });
    res.status(200).json(updatedSecondaryUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch third party count
const fetch_thirdparty_count = async (req, res) => {
  try {
    const thirdpartyCount = await secondaryUser.count({
      role: { $regex: /Third Party/i },
    });
    res.status(200).json(thirdpartyCount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Check whether email is unique or not
const validate_email = async (req, res) => {
  const { email } = req.params;
  let isEmailExist = false;

  try {
    const emailUser = await secondaryUser.findOne({ email: email });
    if (emailUser) {
      isEmailExist = true;
    }
    res.status(200).json(isEmailExist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Check whether mobile is unique or not
const validate_mobile = async (req, res) => {
  const { mobile } = req.params;
  let isMobileExist = false;

  try {
    const mobileUser = await secondaryUser.findOne({ mobile: mobile });
    if (mobileUser) {
      isMobileExist = true;
    }
    res.status(200).json(isMobileExist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch thirdparty verify document type
const fetch_verify_doctype = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredThirdParty = await secondaryUser.findById(id);
    res.status(200).json(requiredThirdParty.verifyDocType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  signIn,
  forgot_password,
  verify_OTP,
  resend_OTP,
  change_password,
  fetch_secondaryUsers,
  post_secondaryUser,
  fetch_secondaryUser,
  disable_secondaryUser,
  update_thirdParty,
  fetch_thirdparty_count,
  validate_email,
  validate_mobile,
  profile_upload,
  fetch_verify_doctype,
};
