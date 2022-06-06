import React from "react";
import { useState } from "react";
import Provider from "../../services/Provider";
import Input from "../../components/formComponents/Input";
import Uploads from "./Uploads";
import Button from "@mui/material//Button";

import {
  Grid,
  Container,
  Paper,
  Avatar,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import useStyles from "./styles";

const Registration = () => {
  const classes = useStyles();
  const [isNext, setIsNext] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const [profile, setProfile] = useState("");
  // const [profileName, setProfileName] = useState("Choose Profile Picture");

  // const [nic, setNic] = useState("");
  // const [nicName, setNicName] = useState("Choose NIC scanned copy");

  // const [doc, setDoc] = useState("");
  // const [docName, setDocName] = useState("Choose Qualification Document");


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleShowPassword = (event) => {
    setShowPassword(!showPassword);
  };
  const onNext = (e) => {
    e.preventDefault();
    setIsNext(!isNext);
  };

  // const onChangeProfile = (e) => {
  //   e.preventDefault();
  //   setProfile(e.target.files[0]);
  //   setProfileName(e.target.files[0].name)
  //   // .then(() =>
  //   //   setInputs((values) => ({ ...values, profilePictureName: profileName }))
  //   // );
  // };
  // const onChangeNic = (e) => {
  //   e.preventDefault();
  //   setNic(e.target.files[0]);
  //   setNicName(e.target.files[0].name)
  //   // .then(() =>
  //   //   setInputs((values) => ({ ...values, nicName: nicName }))
  //   // );
  // };
  // const onChangeDoc = (e) => {
  //   e.preventDefault();
  //   setDoc(e.target.files[0]);
  //   setDocName(e.target.files[0].name)
  //   // .then(() =>
  //   //   setInputs((values) => ({ ...values, qualificationDocName: docName }))
  //   // );
  // };
  const onSubmit = (e) => {
    console.log(inputs);
    e.preventDefault();
    try{
      const res = Provider.addNew(inputs);
      console.log(res.data);
      setIsSubmitted(true);
    }catch(err){
      if (err.response.status === 500) {
        window.alert("Could not updated in Database, There was a problem with the server")
      } else {
        window.alert("Could not updated in Database, "+err.response.data.msg)
      }
      window.location.reload(false);
    }
    
   
  };

  return (
    <>
      {isNext ? (
        <Uploads
          handleChange={handleChange}
          value={inputs.qualificationDocType}
          onSubmit={onSubmit}
          setInputs={setInputs}
          isSubmitted={isSubmitted}
        />
      ) : (
        <Container component="main" maxWidth="lg">
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <AppRegistrationIcon />
            </Avatar>
            <Typography variant="h5">Register As Service Provider</Typography>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Input
                  name="fName"
                  label="First Name"
                  autoFocus
                  handleChange={handleChange}
                  value={inputs.fName || ""}
                  half
                />
                <Input
                  name="lName"
                  label="Last Name"
                  handleChange={handleChange}
                  value={inputs.lName || ""}
                  half
                />
                <Input
                  name="mobile"
                  label="Mobile Number"
                  handleChange={handleChange}
                  value={inputs.mobile || ""}
                  half
                />
                <Input
                  name="NIC"
                  label="NIC Number"
                  handleChange={handleChange}
                  value={inputs.NIC || ""}
                  half
                />
                <Input
                  name="email"
                  label="Email"
                  handleChange={handleChange}
                  value={inputs.email || ""}
                />
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="TypeOfJob">
                      Service you wish to provide
                    </InputLabel>
                    <Select
                      labelId="TypeOfJob"
                      name="jobType"
                      value={inputs.jobType || ""}
                      label="TypeOfJob"
                      onChange={handleChange}
                    >
                      <MenuItem value="6220b8375e554dac97b488bc">
                        Plumber
                      </MenuItem>
                      <MenuItem value="6220e2ca5e554dac97b48938">
                        Decoration
                      </MenuItem>
                      <MenuItem value="6220e2d85e554dac97b4893d">
                        Carpenter
                      </MenuItem>
                      <MenuItem value="622158ec9f5dcef384d8dad6">
                        Catering
                      </MenuItem>
                      <MenuItem value="62258a2a6263376c8b3dfae9">
                        Photographer
                      </MenuItem>
                      <MenuItem value="6230165745f952ef9a1f4d1b">
                        Mason
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Input
                  name="workStartedYear"
                  label="From which year you have been providing this service"
                  type="date"
                  half
                  handleChange={handleChange}
                  value={inputs.workStartedYear || "2017-05-24"}
                />
                <Input
                  name="DOB"
                  label="Date of Birth"
                  type="date"
                  half
                  handleChange={handleChange}
                  value={inputs.DOB || "1990-03-12"}
                />
                <Input
                  name="password"
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  half
                  handleChange={handleChange}
                  handleShowPassword={handleShowPassword}
                  value={inputs.password || ""}
                />
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "100%" }}
                    onClick={onNext}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default Registration;
