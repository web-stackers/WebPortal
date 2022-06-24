const consumer = require("../models/consumer");
const transporter = require("../send-email/sendEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "test";

// Fetch all consumers
const fetch_consumers = async (req, res) => {
  try {
    const consumers = await consumer
      .find()
      .select("name contact profilePicture isDisabled totalRating ratingCount");
    res.status(200).json(consumers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add new consumer to the database
const post_consumer = async (req, res) => {
  let profilePictureBuffer;
  try {
  profilePictureBuffer = fs.readFileSync(req.body.profilePath.filePath);
  const newConsumer = new consumer({
    name: {
      fName: req.body.fName,
      lName: req.body.lName,
    },
    contact: {
      mobile: req.body.mobile,
      email: req.body.email,
    },
    // address: {
    //   longitude: req.body.longitude,
    //   latitude: req.body.latitude,
    // },
    profilePicture: {data: profilePictureBuffer,
    contentType: req.body.profilePath.type,},
    password: req.body.password,
  });
    await newConsumer.save();
    res.status(201).json(newConsumer);
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
    if (!oldUser.isEmailVerified==true) {
      return res.status(404).json({ message: "Incomplete registration" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { email: oldUser.contact.email, id: oldUser._id },
      secret
    );
    const {_id, name, contact, address} = oldUser;
    res.status(200).json({ result: {_id, name, contact, address}, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
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
    res.status(200).json(updatedConsumer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update consumer profile
const update_consumer_profile = async (req, res) => {
  const { id } = req.params;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const updateConsumer = await consumer.findByIdAndUpdate(id, {
       name:{
        fName:req.body.fName,
        lName:req.body.lName,
      },
       contact:{
        mobile:req.body.mobile
      },
      //totalRating:req.body.rating,
     password:hashedPassword
    }
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

module.exports = {
  fetch_consumers,
  post_consumer,
  signIn,
  fetch_consumer,
  disable_consumer,
  search_consumer,
  fetch_consumer_count,
  fetch_consumer_address,
  fetch_consumer_name,
  update_consumer_location,
  update_consumer_profile,
};
