const secondaryUser = require("../models/secondaryUser");
const transporter = require("../send-email/sendEmail");
const multer = require("multer");

//define storage for the images
const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, "../../client/src/assets");
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    //limit to 3MB
    fieldSize: 1024 * 1024 * 3,
  },
});

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
  const newSecondaryUser = new secondaryUser({
    name: {
      fName: req.body.fName,
      lName: req.body.lName,
    },
    mobile: req.body.mobile,
    email: req.body.email,
    address: req.body.address,
    profilePicture: req.body.profilePicture,
    verifyDocType: req.body.verifyDocType,
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
    const updatedSecondaryUser = await secondaryUser.findByIdAndUpdate(
      id,
      {
        mobile: req.body.mobile,
        email: req.body.email,
        address: req.body.address,
        profilePicture: req.body.profilePicture,
        verifyDocType: req.body.verifyDocType,
      },
      { new: true }
    );
    res.status(200).json(updatedSecondaryUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  fetch_secondaryUsers,
  post_secondaryUser,
  fetch_secondaryUser,
  disable_secondaryUser,
  update_thirdParty,
};
