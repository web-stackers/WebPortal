const secondaryUser = require('../models/secondaryUser');

// Fetch all secondaryUsers
const fetch_secondaryUsers = async (req,res) => {
    try{
        const secondaryUsers = await secondaryUser.find();
        res.status(200).json(secondaryUsers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Add new secondaryUser to the database
const post_secondaryUser = async (req,res) => {
    const newSecondaryUser = new secondaryUser ({
       // role: req.body.role,
        name:{
            fName: req.body.fName,
            lName: req.body.lName
        },
        contact:{
            mobile: req.body.mobile,
            email: req.body.email           
        },
        address:req.body.address,
        profilePicture: req.body.profilePicture,
        password: req.body.password,
        verifyDocType: req.body.verifyDocType,
    });

    try{
        await newSecondaryUser.save();
        res.status(201).json(newSecondaryUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Fetch secondaryUser by id
const fetch_secondaryUser = async (req,res) => {
    const { id } = req.params;

    try{
        const requiredSecondaryUser = await secondaryUser.findById(id);
        res.status(200).json(requiredSecondaryUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Disable or Enable secondaryUser
const disable_secondaryUser = async (req,res) => {
    const { id } = req.params;

    try{
        const requiredSecondaryUser = await secondaryUser.findById(id);
        const ableUpdatedSecondaryUser = await secondaryUser.findByIdAndUpdate(id, { isDisabled : !requiredSecondaryUser.isDisabled }, {new:true});
        res.status(200).json(ableUpdatedSecondaryUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    fetch_secondaryUsers,
    post_secondaryUser,
    fetch_secondaryUser,
    disable_secondaryUser
}