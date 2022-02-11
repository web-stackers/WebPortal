const jobTypeCategory = require("../models/jobTypeCategory");

// create and save new job type
const jobType_post = async (req,res)=>{
    const newType = new jobTypeCategory ({
        jobType: req.body.jobType,
        category: req.body.category,        
    })

  //save new job type in the database and error handling
   try {
        await newType.save();
        res.status(201).json(newType);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}


module.exports = {
  jobType_post
}







    // if(!newType.jobType || !newType.category) {
    //     return res.status(400).json({ msg: 'Please include a job type and category'});
    // } 
    

    // newType
    //   .save()
    //   .then( res.send({message:"Posted to database"}))
    //   .catch(err =>{
    //          res.status(500).send({
    //             message : err.message 
    //          });
    //     });


   // res.json(newType);