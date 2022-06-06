const provider = require("../models/provider");
const jobTypeCategory = require("../models/jobTypeCategory");
const fs = require("fs");
var path = require("path");
const { getMaxListeners } = require("process");
const transporter = require("../send-email/sendEmail");

// create and save new provider type
const post_providerType = async (req, res) => {
  const profilePictureBuffer = fs.readFileSync(
    // path.join(__dirname + "../../../client/public/uploads/" + "profile.png")
    req.body.profilePath
  );
  console.log(profilePictureBuffer);
  const nicBuffer = fs.readFileSync(
    // path.join(__dirname + "../../../client/public/uploads/" + "NIC scanned.pdf")
    req.body.nicPath
  );
  console.log(nicBuffer);
  const qualificationDocBuffer = fs.readFileSync(
    // path.join(
    //   __dirname + "../../../client/public/uploads/" + "Degree certificate.pdf"
    // )
    req.body.docPath
  );
  const newserviceprovider = new provider({
    name: {
      fName: req.body.fName,
      lName: req.body.lName,
    },
    contact: {
      mobile: req.body.mobile,
      email: req.body.email,
    },
    password: req.body.password,
    DOB: req.body.DOB,
    NIC: req.body.NIC,
    jobType: req.body.jobType,
    workStartedYear: req.body.workStartedYear,
    document: [
      {
        type: "Profile Picture",
        doc: {
          data: profilePictureBuffer,
          contentType: "image/png",
        },
      },
      {
        type: "NIC Scanned",
        doc: {
          data: nicBuffer,
          contentType: "application/pdf",
        }
      },
      {
        type: "Qualification",
        qualificationDocType: req.body.qualificationDocType,
        doc: {
          data: qualificationDocBuffer,
          contentType: "application/pdf",
        }
      },
    ],
  });

  //save new provider type in the database and error handling
  try {
    await newserviceprovider.save();
    res.status(200).json(newserviceprovider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all providers
const fetch_providers = async (req, res) => {
  try {
    const providers = await provider.find();
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

module.exports = {
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
};
