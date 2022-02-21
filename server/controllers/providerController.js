const provider = require("../models/provider");

// create and save new provider type
const post_providerType = async (req, res) => {
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
    appliedDate: req.body.appliedDate,
    jobType: req.body.jobType,
    workStartedYear: req.body.workStartedYear,
    document: {
      profilePicture: req.body.profilePicture,
      NIC_Scanned: req.body.NIC_Scanned,
      qualificationDoc: {
        type: req.body.type,
        doc: req.body.doc,
      },
    },
    address: {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    },
    verification: {
      isAccepted: req.body.isAccepted,
      date: req.body.date,
      thirdParty: req.body.thirdParty,
    },
    availability: req.body.availability,
    isDisabled: req.body.isDisabled,
    qualification: req.body.qualification,
  });

  //save new provider type in the database and error handling
  try {
    await newserviceprovider.save();
    res.status(201).json(newserviceprovider);
  } catch (error) {
    res.status(409).json({ message: error.message });
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

// Update verification details
const update_verification = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedVerification = await provider.findByIdAndUpdate(
      id,
      {
        verification: {
          isAccepted: req.body.isAccepted,
          date: new Date(),
          thirdParty: req.body.thirdParty,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedVerification);
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
};
