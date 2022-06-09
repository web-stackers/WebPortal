import React from "react";
import { useState } from "react";
import Provider from "../../services/Provider";
import Input from "../../components/formComponents/Input";
import Uploads from "./Uploads";
import Button from "@mui/material//Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
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

import { Formik } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  fName: Yup.string()
    .required("is required")
    .min(2, "Should be 2 chars minimum")
    .matches(
      /^[A-Za-z]+$/,
      "Must contain only letters"
    ),
  lName: Yup.string()
    .required("is required")
    .min(2, "Should be 2 chars minimum").matches(
      /^[A-Za-z]+$/,
      "Must contain only letters"
    ),
  mobile: Yup.string()
    .required("is required").matches(
      /^[0][0-9]*$/,
      "Invalid mobile number"
    )
    .min(10, "Should be 10 digits minimum")
    .max(10, "Should be 10 digits maximum"),
    
  NIC: Yup.string()
    .required("is required")
    // .matches(
      //  /^[0-9]{12}$/ || /^[3-9][0-9]{8}v$/,
    //   /^[3-9][0-9]{8}[v{1}[0-9]{3}]$/,
    //   "Invalid NIC number"
    // )
    .min(10, "Should be 9 digits & end with v")
    .max(12, "Should be 12 digits maximum"),
  email: Yup.string().email("Invalid email").required("is required"),
  jobType: Yup.string().required("is required"),

  password: Yup.string()
    .required("is required")
    .min(8, "Password is too short - should be 8 chars minimum"),
});

const Registration_valid = () => {
  const initialValues = {
    fName: "",
    lName: "",
    mobile: "",
    NIC: "",
    email: "",
    jobType: "",
    password: "",
  };
  const classes = useStyles();
  const thisYear = new Date().getFullYear();
  const [isExist, setIsExist] = useState({
    mobile: false,
    NIC: false,
    email: false,
  });
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
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  //when submitting the basic details this will check whether the email,mobile and nic are unique
  const onNext = async (validValues) => {
    console.log(validValues);
    // Object.keys(validValues).forEach(key => {
    //     setInputs((values) => ({ ...values, key: validValues[key] }));
    //   });
    setInputs((values) => ({
      ...values,
      fName: validValues.fName,
      lName: validValues.lName,
      mobile: validValues.mobile,
      NIC: validValues.NIC,
      email: validValues.email,
      jobType: validValues.jobType,
      password: validValues.password,
    }));

    const { mobile, NIC, email } = validValues;
    console.log({ mobile, NIC, email });
    console.log(inputs);
    try {
      const res = await Provider.validate({ mobile, NIC, email });
      console.log(res.data);

      //checking the uniqueness
      if (!res.data.mobile && !res.data.NIC && !res.data.email) {
        setIsValid(!isValid);
      } else {
        setIsExist(res.data);
        console.log(isExist);
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
  // Final sumbision with all the docs
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
      //   window.location.reload(false);
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
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={onNext}
        >
          {(formik) => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
              isValid,
              dirty,
            } = formik;
            return (
              <Container component="main" maxWidth="lg">
                <Paper className={classes.paper} elevation={3}>
                  <Avatar className={classes.avatar}>
                    <AppRegistrationIcon />
                  </Avatar>
                  <Typography variant="h5">
                    Register As Service Provider
                  </Typography>
                  <form className={classes.form}>
                    <Grid container spacing={2}>
                      <Input
                        name="fName"
                        label="First Name"
                        half
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.fName}
                        error={errors.fName && touched.fName}
                        errorText={
                          errors.fName && touched.fName ? errors.fName : ""
                        }
                      />
                      <Input
                        name="lName"
                        label="Last Name"
                        half
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.lName}
                        error={errors.lName && touched.lName}
                        errorText={
                          errors.lName && touched.lName ? errors.lName : ""
                        }
                      />
                      <Input
                        name="mobile"
                        label="Mobile Number"
                        half
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.mobile}
                        error={
                          (errors.mobile && touched.mobile) || isExist.mobile
                        }
                        errorText={
                          errors.mobile && touched.mobile
                            ? errors.mobile
                            : isExist.mobile
                            ? "Already Existing mobile number"
                            : ""
                        }
                      />
                      <Input
                        name="NIC"
                        label="NIC Number"
                        half
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.NIC}
                        error={(errors.NIC && touched.NIC) || isExist.NIC}
                        errorText={
                          errors.NIC && touched.NIC
                            ? errors.NIC
                            : isExist.NIC
                            ? "Already Existing NIC number"
                            : ""
                        }
                      />
                      <Input
                        name="email"
                        label="Email"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.email}
                        error={(errors.email && touched.email) || isExist.email}
                        errorText={
                          errors.email && touched.email
                            ? errors.email
                            : isExist.email
                            ? "Already Existing email address"
                            : ""
                        }
                      />
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          sx={{ width: "100%" }}
                          error={errors.jobType && touched.jobType}
                        >
                          <InputLabel id="TypeOfJob">
                            Service you wish to provide
                          </InputLabel>
                          <Select
                            labelId="TypeOfJob"
                            name="jobType"
                            value={values.jobType || ""}
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
                          <FormHelperText>
                            {errors.jobType && touched.jobType
                              ? errors.jobType
                              : ""}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
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
                              setInputs((values) => ({
                                ...values,
                                DOB: newValue,
                              }));
                            }}
                            renderInput={(params) => (
                              <TextField {...params} name="DOB" fullWidth />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>

                      <Input
                        name="password"
                        label="New Password"
                        type={showPassword ? "text" : "password"}
                        half
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        handleShowPassword={handleShowPassword}
                        value={values.password}
                        error={errors.password && touched.password}
                        errorText={
                          errors.password && touched.password
                            ? errors.password
                            : ""
                        }
                      />

                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ width: "100%" }}
                          onClick={handleSubmit}
                          disabled={!(dirty && isValid)}
                        >
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Container>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default Registration_valid;
