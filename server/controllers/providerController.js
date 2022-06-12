const provider = require("../models/provider");
const secondaryUser = require("../models/secondaryUser");
const jobTypeCategory = require("../models/jobTypeCategory");
const fs = require("fs");
var path = require("path");
const { getMaxListeners } = require("process");
const transporter = require("../send-email/sendEmail");
const bcrypt = require("bcryptjs");

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

// Register new provider
const post_providerType = async (req, res) => {
  let profilePictureBuffer;
  let nicBuffer;
  let qualificationDocBuffer;

  profilePictureBuffer = fs.readFileSync(req.body.profilePath.filePath);
  console.log(profilePictureBuffer);
  nicBuffer = fs.readFileSync(
    // path.join(__dirname + "../../../client/public/uploads/" + "NIC scanned.pdf")
    req.body.nicPath.filePath
  );
  console.log(nicBuffer);
  qualificationDocBuffer = fs.readFileSync(req.body.docPath.filePath);

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
    });
    let docType = req.body.qualificationDocType;
    if (docType == "O/L Certificate" || docType == "A/L Certificate") {
      docType = "O/L and A/L Certificates";
    }
    const responsilbleSecondaryUser = await secondaryUser.findOne({
      verifyDocType: docType,
    });
    console.log(responsilbleSecondaryUser);

    var mailOptions = {
      from: "webstackers19@gmail.com",
      to: responsilbleSecondaryUser.email,
      subject: "Notification about the registration of new provider",
      html:
        "Hi " +
        responsilbleSecondaryUser.name.fName +
        ",<br><br> New provider is registered under your verification docment type with the name of " +
        req.body.fName +
        " " +
        req.body.lName +
        " .<br>Please verify that documents within a day",
    };

    //save new provider type in the database and error handling
    const response = await newserviceprovider.save().then(() =>
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      })
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all providers
const fetch_providers = async (req, res) => {
  try {
    const providers = await provider.find().select('name contact document totalRating ratingCount verification');
    res.status(200).json(providers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch new providers
const fetch_new_providers = async (req, res) => {
  try {
    const newProviders = await provider.find({ verification: null });
    res.status(200).json(newProviders);
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

// Fetch verified providers
const fetch_verified_providers = async (req, res) => {
  try {
    const verifiedProviders = await provider.find({
      "verification.isAccepted": true,
    });
    res.status(200).json(verifiedProviders);
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
    const requiredprovider = await provider.findById(id);
    res.status(200).json(requiredprovider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
    if (result === "true") {
      var mailOptions = {
        from: "webstackers19@gmail.com",
        // to: requiredprovider.contact.email,
        to: "kathurshanasivalingham@gmail.com",
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
    } else {
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
                                  <div>
                                    <p>From,<br>Helper Community</p>
                                    </div>
                                  </body>`);

      var mailOptions = {
        from: "webstackers19@gmail.com",
        // to: requiredprovider.contact.email,
        to: "kathurshanasivalingham@gmail.com",
        subject: "Verification of the uploaded documents of Helper App",
        html: htmlBody,
      };
    }
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

// Fetch a particular document
const fetch_document = async (req, res) => {
  const { id, docType } = req.params;

  try {
    const requiredProvider = await provider.findById(id);
    const requiredDocumentLists = requiredProvider.document;

    requiredDocumentLists.map((doc) => {
      if (doc.type === docType) {
        res.status(200).json(doc.doc.data);
      }
    });
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

module.exports = {
  validate_provider,
  post_providerType,
  fetch_providers,
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
  fetch_document,
  update_qualification,
};
