const secondaryUser = require("../models/secondaryUser");
const transporter = require("../send-email/sendEmail");
var path = require("path");
const fs = require("fs");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "test";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) return res.status(400).json({ message: "email is required" });
    if (!password)
      return res.status(400).json({ message: "password is required" });
    const oldUser = await secondaryUser.findOne({ email: email });
    // .select(
    //   "_id role name verifyDocType"
    // );

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
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
