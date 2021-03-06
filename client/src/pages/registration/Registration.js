import React from "react";
import { useState } from "react";
import Provider from "../../services/Provider";
import Input from "../../components/formComponents/Input";
import Uploads from "./Uploads";
import Button from "@mui/material//Button";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
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

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const RegisterSchema = Yup.object().shape({
  fName: Yup.string()
    .required("First name is required")
    .min(2, "Should be 2 chars minimum"),
  lName: Yup.string()
    .required("Last name is required")
    .min(2, "Should be 2 chars minimum"),
  mobile: Yup.string()
    .required("Mbile num is required")
    .min(10, "Should be 10 chars minimum")
    .max(10, "Should be 10 chars maximum"),
    NIC: Yup.string()
    .required("Mbile num is required")
    .min(10, "Should be 10 chars minimum")
    .max(12, "Should be 10 chars maximum"),
  email: Yup.string().email().required("Email is required"),
  jobType: Yup.string()
    .required("Job type is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum"),
});

const Registration = () => {
  const classes = useStyles();
  const thisYear = new Date().getFullYear();
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    DOB: new Date("2014-08-18T21:11:54"),
    workStartedYear: new Date(thisYear + "-01-01T00:00:00"),
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "jobType") {
      console.log(event.target);
      console.log(inputs);
    }
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
  };

  const handleDateChange = (newValue) => {
    setInputs((values) => ({ ...values, DOB: newValue }));
  };
  const handleShowPassword = (event) => {
    setShowPassword(!showPassword);
  };
  const onNext = async (e) => {
    e.preventDefault();
    const { mobile, NIC, email } = inputs;
    console.log({ mobile, NIC, email });
    try {
      const res = await Provider.validate({ mobile, NIC, email });
      console.log(res.data);
      if (!res.data.mobile && !res.data.NIC && !res.data.email) {
        setIsValid(!isValid);
      }
    } catch (err) {
      if (err.response.status === 500) {
        window.alert("There was a problem with the server, could not validate");
      } else {
        window.alert(
          "Something went wrong, could not validate, " +
            err.response.data.message
        );
      }
    }
  };
  const onSubmit = async (e) => {
    console.log(inputs);
    e.preventDefault();
    try {
      const res = await Provider.addNew(inputs);
      console.log(res.data);
      setIsSubmitted(true);
    } catch (err) {
      if (err.response.status === 500) {
        window.alert(
          "Could not updated in Database, There was a problem with the server"
        );
      } else {
        window.alert(
          "Could not updated in Database, " + err.response.data.message
        );
      }
      window.location.reload(false);
    }
  };

  return (
    <>
      {isValid ? (
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
                {/* <Input
                  name="workStartedYear"
                  label="From which year you have been providing this service"
                  type="date"
                  max="1990-03-12"
                  half
                  handleChange={handleChange}
                  value={inputs.workStartedYear || ""}
                /> */}
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      views={["year"]}
                      label="From which year you have been providing this service"
                      inputFormat="dd/MM/yyyy"
                      value={inputs.workStartedYear}
                      onChange={(newValue) => {
                        setInputs((values) => ({
                          ...values,
                          workStartedYear: newValue,
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="workStartedYear"
                          fullWidth
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date of Birth"
                      inputFormat="dd/MM/yyyy"
                      value={inputs.DOB}
                      onChange={(newValue) => {
                        setInputs((values) => ({ ...values, DOB: newValue }));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} name="DOB" fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                {/* <Input
                  name="DOB"
                  label="Date of Birth"
                  type="date"
                  half
                  handleChange={handleChange}
                  value={inputs.DOB || "1990-03-12"}
                /> */}
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
