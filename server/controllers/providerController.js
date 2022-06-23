const provider = require("../models/provider");
const providerEmailVerification = require("../models/providerEmailVerification");
const secondaryUser = require("../models/secondaryUser");
const jobTypeCategory = require("../models/jobTypeCategory");
const fs = require("fs");
var path = require("path");
const { getMaxListeners } = require("process");
const transporter = require("../send-email/sendEmail");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secret = "test";

// check whether the emai,mobile and nic are unique while registering
const validate_provider = async (req, res) => {
  const { mobile, NIC, email } = req.body;
  console.log({ mobile, NIC, email });
  let isMobileExist = false;
  let isNicExist = false;
  let isEmailExist = false;

  try {
    const mobileUser = await provider.findOne({ "contact.mobile": mobile });
    const nicUser = await provider.findOne({ NIC: NIC });
    const emailUser = await provider.findOne({ "contact.email": email });
    console.log(mobileUser);
    console.log(nicUser);
    console.log(emailUser);

    if (mobileUser) {
      isMobileExist = true;
    }
    if (nicUser) {
      isNicExist = true;
    }
    if (emailUser) {
      isEmailExist = true;
    }

    res
      .status(200)
      .json({ mobile: isMobileExist, NIC: isNicExist, email: isEmailExist });
  } catch (error) {
    res.status(400).json({ message: error.message });

    console.log(error);
  }
};

// Register new provider with basic details and send OTP to email
const post_providerType = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newserviceprovider = new provider({
      name: {
        fName: req.body.fName,
        lName: req.body.lName,
      },
      contact: {
        mobile: req.body.mobile,
        email: req.body.email,
      },
      password: hashedPassword,
      DOB: req.body.DOB,
      NIC: req.body.NIC,
      jobType: req.body.jobType,
      workStartedYear: req.body.workStartedYear,
    });

    const response = await newserviceprovider.save();
    // OTP generation and email sending after inserting the new provider with basic details
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const hashedOtp = await bcrypt.hash(otp, 10);
    var mailOptions = {
      from: "webstackers19@gmail.com",
      to: req.body.email,
      subject: "Verify Your Email",
      html:
        "Hi " +
        req.body.fName +
        ",<br><br> Enter <b>" +
        otp +
        "</b> in the app to verify your email address and to continue to the uploading section of required documents.<br>This code will <b>expires in 5 minutes</b>.<br>If you failed to verify informations given by you will be deleted within one hour and then only you can again fill the form from the start",
    };
    const newOtpVerification = await new providerEmailVerification({
      providerId: response._id,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000, // will expires after 5 min
    });
    await newOtpVerification.save();
    await transporter.sendMail(mailOptions);

    res.status(200).json(response._id);
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
    await provider.findByIdAndUpdate(
      userId,
      { isEmailVerified: true },
      { new: true }
    );
    await providerEmailVerification.deleteMany({ providerId: userId });
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
        "to verify your email address and to continue to the uploading section of required documents.<br>This code will <b>expires in 5 minutes</b>.<br>If you failed to verify informations given by you will be deleted within one hour and then only you can again fill the form from the start";
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

// upadate new provider after documents upload
const update_uploads = async (req, res) => {
  const { id } = req.params;
  let profilePictureBuffer;
  let nicBuffer;
  let qualificationDocBuffer;
  try {
    profilePictureBuffer = fs.readFileSync(req.body.profilePath.filePath);
    nicBuffer = fs.readFileSync(req.body.nicPath.filePath);
    qualificationDocBuffer = fs.readFileSync(req.body.docPath.filePath);

    // fs.unlinkSync(req.body.profilePath.filePath);
    // fs.unlinkSync(pareq.body.nicPath.filePathth);
    // fs.unlinkSync(req.body.docPath.filePath);

    let docType = req.body.qualificationDocType;
    if (docType == "O/L Certificate" || docType == "A/L Certificate") {
      docType = "O/L and A/L Certificates";
    }
    let notificationMsg =
      "under your verification docment type with the name of";
    let msg = "Please verify that documents within a day";
    let responsilbleSecondaryUser = await secondaryUser.findOne({
      verifyDocType: docType,
    });
    if (responsilbleSecondaryUser === null) {
      responsilbleSecondaryUser = await secondaryUser.findOne({
        role: "Admin",
      });
      notificationMsg =
        "and there is no responsible third party available right now uder the verification docment type which is given by the new provider. The name of the new provider is";
      msg =
        "Admin, please add a new third party under the category of " +
        docType +
        " to verify that documennts as soon as possible.";
    }
    var mailOptions = {
      from: "webstackers19@gmail.com",
      to: responsilbleSecondaryUser.email,
      subject: "Notification about the registration of new provider",
      html:
        "Hi " +
        responsilbleSecondaryUser.name.fName +
        ",<br><br> New provider is registered " +
        notificationMsg +
        " " +
        req.body.fName +
        " " +
        req.body.lName +
        " .<br>" +
        msg +
        ".",
    };
    const Updatedprovider = await provider
      .findByIdAndUpdate(
        id,
        {
          document: [
            {
              type: "Profile Picture",
              doc: {
                data: profilePictureBuffer,
                contentType: req.body.profilePath.type,
              },
            },
            {
              type: "NIC Scanned",
              doc: {
                data: nicBuffer,
                contentType: req.body.nicPath.type,
              },
            },
            {
              type: "Qualification",
              qualificationDocType: req.body.qualificationDocType,
              doc: {
                data: qualificationDocBuffer,
                contentType: req.body.docPath.type,
              },
            },
          ],
        },
        { new: true }
      )
      .then(() =>
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        })
      );
    await provider.findByIdAndUpdate(id, { $unset: { createdAt: "" } });
    res.status(200).json(Updatedprovider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// signin
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await provider.findOne({ "contact.email": email });
    // .select(
    //   "_id name contact NIC address"
    // );

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    if (!oldUser?.verification.isAccepted) {
      if (oldUser.document[0].type) {
        return res.status(400).json({ message: "Cannot login now" });
      }
      return res.status(404).json({ message: "Incomplete registration" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { email: oldUser.contact.email, id: oldUser._id },
      secret
    );
    const { _id, name, contact, NIC, address } = oldUser;
    res
      .status(200)
      .json({ result: { _id, name, contact, NIC, address }, token });
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

    const user = await provider.findOne({ "contact.email": email });
    if (!user)
      return res.status(404).json({ message: "User doesn't exist" });
    if (!user?.verification.isAccepted) {
      if (user.document[0].type) {
        return res.status(400).json({ message: "Cannot login now" });
      }
      return res.status(404).json({ message: "Incomplete registration" });
    }
    const userId = user._id;
    const fName = user.name.fName;
    const isEmailVerification = false;

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

    res.status(200).json({userId, email, fName, isEmailVerification});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update the new password - forgot password
const change_forgot_password = async (req, res) => {
  const { id } = req.params;
  const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
  try {
    const updatedProvider = await provider.findByIdAndUpdate(id, {
      password:hashedPassword,
    },{ new: true });
    res.status(200).json("Password changed successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// insert residential location after the 1st login
const update_provider_location = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProvider = await provider.findByIdAndUpdate(id, {
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

// Fetch all providers
const fetch_providers = async (req, res) => {
  var query = [
    {
      $lookup: {
        from: "jobtypecategories",
        localField: "jobType",
        foreignField: "_id",
        as: "job",
      },
    },
    {
      $match: { isEmailVerified: { $eq: true } },
    },
    {
      $project: {
        name: 1,
        contact: 1,
        isDisabled: 1,
        totalRating: 1,
        ratingCount: 1,
        verification: 1,
        "job.jobType": 1,
      },
    },
  ];

  try {
    const providers = await provider.aggregate(query);
    res.status(200).json(providers);
  } catch {
    res.status(400).json({ message: error.message });
  }
};

// Fetch provider address
const fetch_provider_address = async (req, res) => {
  const { id } = req.params;
  try {
    const providers = await provider.findById(id).select("address");
    res.status(200).json(providers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch provider of certain job types
const fetch_providers_under_certain_jobType = async (req, res) => {
  const { type } = req.params;
  try {
    const providers = await provider
      .find({
        jobType: type,
        isDisabled: { $eq: false },
        verification: { $ne: null },
        address: { $ne: null },
      })
      .select(
        "name contact totalRating ratingCount verification address jobType qualification workStartedYear DOB"
      );
    res.status(200).json(providers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch provider of certain job types
const fetch_provider_profile_picture = async (req, res) => {
  const { id } = req.params;
  try {
    const providers = await provider.find({ id: id }).select("document");
    // const profile = await providers.find({}, { document: { $slice: 1 } });
    res.status(200).json(providers[0].document[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch new providers
const fetch_new_providers = async (req, res) => {
  const { docType } = req.params;

  try {
    if (docType === "OL and AL Certificates") {
      const newProviders = await provider
        .find({
          $and: [
            {
              isEmailVerified: true,
            },
            { verification: null },
            {
              $or: [
                { "document.qualificationDocType": "O/L Certificate" },
                { "document.qualificationDocType": "A/L Certificate" },
              ],
            },
          ],
        })
        .select("name");
      res.status(200).json(newProviders);
    } else {
      const newProviders = await provider
        .find({
          $and: [
            {
              isEmailVerified: true,
            },
            { verification: null },
            {
              "document.qualificationDocType": docType,
            },
          ],
        })
        .select("name");
      res.status(200).json(newProviders);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch verified providers
const fetch_verified_providers = async (req, res) => {
  const { docType } = req.params;

  try {
    if (docType === "OL and AL Certificates") {
      const verifiedProviders = await provider
        .find({
          $and: [
            {
              "verification.isAccepted": true,
            },
            {
              $or: [
                { "document.qualificationDocType": "O/L Certificate" },
                { "document.qualificationDocType": "A/L Certificate" },
              ],
            },
          ],
        })
        .select("name verification");
      res.status(200).json(verifiedProviders);
    } else {
      const verifiedProviders = await provider
        .find({
          $and: [
            {
              "verification.isAccepted": true,
            },
            {
              "document.qualificationDocType": docType,
            },
          ],
        })
        .select("name verification");
      res.status(200).json(verifiedProviders);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch provider by search key
const search_provider = async (req, res) => {
  const { key } = req.params;
  const searchKey = new RegExp(key, "i");

  try {
    const searchResult = await provider.find({
      $or: [{ "name.fName": searchKey }, { "name.lName": searchKey }],
    });
    res.status(200).json(searchResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get count of total providers
const fetch_provider_count = async (req, res) => {
  try {
    const providerCount = await provider.count({ verification: { $ne: null } });
    res.status(200).json(providerCount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch provider by id for mobile edit profile
const fetch_provider_by_id = async (req, res) => {
  const { id } = req.params;

  try {
    //document:{type:"profilepicture",doc:1}
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    // user.password = await bcrypt.hash(password, salt);
    const requiredprovider = await provider
      .findById(id)
      .select("name contact password totalRating ratingCount address");
    res.status(200).json(requiredprovider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get count by provider job type
const fetch_provider_JobType_count = async (req, res) => {
  try {
    const providerJobTypeCount = await provider.aggregate([
      { $group: { _id: "$jobType", count: { $sum: 1 } } },
    ]);
    res.status(200).json(providerJobTypeCount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch provider by id
const fetch_provider = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredprovider = await provider
      .findById(id)
      .select(
        "name contact totalRating ratingCount isDisabled appliedDate document verification jobType"
      );
    res.status(200).json(requiredprovider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* const fetch_provider = async (req, res) => {
  const { id } = req.params;

  var query = [
    {
      $match: {_id:mongoose.Types.ObjectId(id)}
    },
    {
      $project: {
        name: 1,
        contact: 1,
        isDisabled: 1,
        totalRating: 1,
        ratingCount: 1,
        appliedDate: 1,
        verification: 1,
        jobType: 1,
        document: 1
      }
    }
  ];

  try {
    const requiredprovider = await provider.aggregate(query);
    res.status(200).json(requiredprovider[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
} */

// Fetch documentlist of a provider
const fetch_documentlist = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredProvider = await provider.findById(id);
    const requiredDocuments = requiredProvider.document;
    res.status(200).json(requiredDocuments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Disable or Enable provider
const disable_provider = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredprovider = await provider.findById(id);
    const Updatedprovider = await provider.findByIdAndUpdate(
      id,
      { isDisabled: !requiredprovider.isDisabled },
      { new: true }
    );
    res.status(200).json(Updatedprovider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update when document is accepted
const document_accepted = async (req, res) => {
  const { id, docType } = req.params;

  try {
    const updatedDocumentAccepted = await provider.updateOne(
      { _id: id, "document.type": docType },
      {
        $set: { "document.$.isAccepted": "true" },
      },
      { new: true }
    );
    res.status(200).json(updatedDocumentAccepted);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

// Update when document is rejected
const document_rejected = async (req, res) => {
  const { id, docType, reason } = req.params;

  try {
    const updatedDocumentRejected = await provider.updateOne(
      { _id: id, "document.type": docType },
      {
        $set: {
          "document.$.isAccepted": "false",
          "document.$.reasonForRejection": reason,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedDocumentRejected);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

// Update verification details
const update_verification = async (req, res) => {
  const { id, result } = req.params;

  try {
    const requiredprovider = await provider.findById(id);
    const requiredDocumentLists = await requiredprovider.document;

    const updatedVerification = await provider.findByIdAndUpdate(
      id,
      {
        verification: {
          isAccepted: result,
          date: new Date(),
          // thirdParty: req.body.thirdParty,
        },
      },
      { new: true }
    );

    // send email
    var mailOptions = {
      from: "webstackers19@gmail.com",
      to: requiredprovider.contact.email,
      subject: "Verification of the uploaded documents of Helper App",
      html: `
        <body>
          <div>
            <p>Hi ${requiredprovider.name.fName} ${requiredprovider.name.lName},</p>
          </div>
          <div>
            <p>Congratulations !!!</p>
            <p>You have successfully registered as a Service Provider to the Helper App. From now onwards you will receive job opportunities from our consumers.</p>
            <p>We warmly welcome you to our Helper Community. Good Luck to you.</p>
          </div>
          <div>
            <p>From,<br>Helper Community</p>
          </div>
        </body>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json(updatedVerification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Increase provider count in jobTypeCategory by one when service provider is accepted by third party
const increase_provider_count = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredProvider = await provider.findById(id);
    const requiredJobType = await jobTypeCategory.findById(
      requiredProvider.jobType
    );
    const updatedProviderCount = await jobTypeCategory.findByIdAndUpdate(
      requiredProvider.jobType,
      {
        poviderCount: requiredJobType.poviderCount + 1,
      }
    );
    res.status(200).json(updatedProviderCount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Update provider count in jobTypeCategory by one when service provider is enabled or disabled by admin
const update_provider_count = async (req, res) => {
  const { id } = req.params;

  try {
    const requiredProvider = await provider.findById(id);
    const requiredJobType = await jobTypeCategory.findById(
      requiredProvider.jobType
    );
    if (requiredProvider.isDisabled) {
      const updatedProviderCount = await jobTypeCategory.findByIdAndUpdate(
        requiredProvider.jobType,
        {
          poviderCount: requiredJobType.poviderCount + 1,
        }
      );
      res.status(200).json(updatedProviderCount);
    } else {
      const updatedProviderCount = await jobTypeCategory.findByIdAndUpdate(
        requiredProvider.jobType,
        {
          poviderCount: requiredJobType.poviderCount - 1,
        }
      );
      res.status(200).json(updatedProviderCount);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update qualification
const update_qualification = async (req, res) => {
  const { id, qualification } = req.params;

  try {
    const updateQualification = await provider.updateOne(
      { _id: id },
      {
        $set: {
          qualification: qualification,
        },
      },
      { new: true }
    );
    res.status(200).json(updateQualification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch provider name
const fetch_provider_name = async (req, res) => {
  const { id } = req.params;
  try {
    const requiredProvider = await provider.findById(id);
    res.status(200).json(requiredProvider.name);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete rejected providers
const delete_rejected_provider = async (req, res) => {
  const { id } = req.params;
  try {
    const requiredprovider = await provider.findById(id);
    const requiredDocumentLists = await requiredprovider.document;

    var htmlBody = `<body>
          <div>
            <p>Hi ${requiredprovider.name.fName} ${requiredprovider.name.lName},</p>
          </div>
          <div>
            <p>We are sorry to inform you that your registration is not accepted by our Helper App because of the following rejected documents.</p>
          </div>
          <div>`;

    requiredDocumentLists.map((doc) => {
      if (doc.isAccepted === false) {
        var data = `<p><b>Document -</b> ${doc.type}<br>
                      <b>Reason For Rejection -</b> ${doc.reasonForRejection}</p>`;
        htmlBody = htmlBody.concat(data);
      }
    });

    htmlBody = htmlBody.concat(`</div>
                                  <p>Please sign up again to the system by providing the proper documents to provide services through Helper.</p>

                                  <div>
                                    <p>From,<br>Helper Community</p>
                                    </div>
                                  </body>`);

    var mailOptions = {
      from: "webstackers19@gmail.com",
      to: requiredprovider.contact.email,
      subject: "Verification of the uploaded documents of Helper App",
      html: htmlBody,
    };

    await provider.deleteOne({ _id: id });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json("Provider deleted");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  validate_provider,
  post_providerType,
  verify_OTP,
  resend_OTP,
  update_uploads,
  signIn,
  forgot_password,
  change_forgot_password,
  update_provider_location,
  fetch_providers,
  fetch_provider_by_id,
  fetch_provider,
  disable_provider,
  update_verification,
  document_accepted,
  document_rejected,
  fetch_provider_count,
  fetch_provider_JobType_count,
  fetch_new_providers,
  fetch_verified_providers,
  fetch_documentlist,
  search_provider,
  increase_provider_count,
  update_provider_count,
  update_qualification,
  fetch_provider_address,
  fetch_providers_under_certain_jobType,
  fetch_provider_profile_picture,
  fetch_provider_name,
  delete_rejected_provider,
};
