import React from "react";
import { useState, useEffect } from "react";
import { useReducer } from "react";
import Provider from "../../services/Provider";
import JobCategory from "../../services/JobCategory";
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
import VerifiedIcon from "@mui/icons-material/Verified";
import SendIcon from "@mui/icons-material/Send";
import useStyles from "./styles";

import { Formik } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  fName: Yup.string()
    .required("is required")
    .min(2, "Should be 2 letters minimum")
    .matches(/^[A-Za-z]+$/, "Must contain only letters"),
  lName: Yup.string()
    .required("is required")
    .min(2, "Should be 2 letters minimum")
    .matches(/^[A-Za-z]+$/, "Must contain only letters"),
  mobile: Yup.string()
    .required("is required")
    .matches(/^[0][0-9]{9}$/, "Invalid mobile number"),

  NIC: Yup.string()
    .required("is required")
    .matches(/^[12][09][0-9]{10}$|^[3-9][0-9]{8}[vV]$/, "Invalid NIC number"),
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
  const maxDOB = new Date().setFullYear(thisYear - 16);
  const [isExist, setIsExist] = useState({
    mobile: false,
    NIC: false,
    email: false,
  });
  const [isValid, setIsValid] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const [state, updateState] = useReducer(
  //   (state, updates) => ({
  //     ...state,
  //     ...updates,
  //   }),
  //   initialState
  // );
  // updateState({ ocupation: "postman" })

  const [inputs, setInputs] = useState({
    DOB: maxDOB,
    workStartedYear: new Date(thisYear + "-01-01T01:00:00"),
  });

  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  const [otpErrorMsg, setOtpErrorMsg] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [jobTypes, setJobTypes] = useState([]);

  const fetchAllJobTypes = async () => {
    try {
      const res = await JobCategory.fetchJobCategory();
      console.log(res.data);
      setJobTypes(() => {
        return res.data;
      });
    } catch (err) {
      if (err.response.status === 500) {
        window.alert(
          "There was a problem with the server, could not get the jobTypes"
        );
      } else {
        window.alert(
          "Something went wrong, could not get the jobTypes, " +
            err.response.data.message
        );
      }
    }
  };

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
    setIsExist({
      mobile: false,
      NIC: false,
      email: false,
    });
    console.log(validValues);
    try {
      Object.keys(validValues).forEach((key) => {
        setInputs((values) => ({ ...values, [key]: validValues[key] }));
      });
      // setInputs((values) => ({
      //   ...values,
      //   fName: validValues.fName,
      //   lName: validValues.lName,
      //   mobile: validValues.mobile,
      //   NIC: validValues.NIC,
      //   email: validValues.email,
      //   jobType: validValues.jobType,
      //   password: validValues.password,
      // }));

      const { mobile, NIC, email } = validValues;
      console.log({ mobile, NIC, email });
      console.log(inputs);

      const res = await Provider.validate({ mobile, NIC, email });
      console.log(res.data);

      //checking the uniqueness
      if (!res.data.mobile && !res.data.NIC && !res.data.email) {
        const response = await Provider.addNew(inputs);
        console.log(response.data);
        setUserId(response.data);

        setIsValid(!isValid);
      } else {
        setIsExist(res.data);
        console.log(isExist);
      }
    } catch (err) {
      if (err.response.status === 500) {
        window.alert("There was a problem with the server, could not update");
      } else {
        window.alert(
          "Something went wrong, could not update, " + err.response.data.message
        );
      }
    }
  };
  const onVerify = async (e) => {
    e.preventDefault();
    setOtpErrorMsg("");
    try {
      const res = await Provider.verifyOTP({ userId, otp });
      console.log(res.data);
      setIsVerified(true);
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        window.alert("There was a problem with the server");
      } else {
        setOtpErrorMsg(err.response.data.message);
      }
    }
  };

  const onResendOTP = async (e) => {
    e.preventDefault();
    setOtpErrorMsg("");
    const email = inputs.email;
    const fName = inputs.fName;
    const isEmailVerification = true;
    try {
      const res = await Provider.resendOTP({
        userId,
        email,
        fName,
        isEmailVerification,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        window.alert(
          "There was a problem with the server, Could not resend OTP"
        );
      } else {
        window.alert("Could not resend OTP, " + err.response.data.message);
      }
    }
  };

  // Update the new provider with the documents
  const onSubmit = async (e) => {
    console.log(inputs);
    e.preventDefault();
    try {
      const res = await Provider.docUpload(inputs, userId);
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
  useEffect(() => {
    fetchAllJobTypes();
  }, []);

  return (
    <>
      {isValid ? (
        isVerified ? (
          <Uploads
            handleChange={handleChange}
            value={inputs.qualificationDocType}
            onSubmit={onSubmit}
            setInputs={setInputs}
            isSubmitted={isSubmitted}
          />
        ) : (
          <Container component="main" maxWidth="sm">
            <Paper className={classes.paper} elevation={3}>
              <Avatar className={classes.avatar}>
                <VerifiedIcon />
              </Avatar>
              <Typography variant="h6">Email Verification</Typography>
              <Typography variant="h7" mt={1} mb={2}>
                Verification code has been sent to your email account
              </Typography>
              <Grid container spacing={2}>
                <Input
                  name="otp"
                  label="Verification Code"
                  half
                  handleChange={(event) => {
                    setOtp(event.target.value);
                  }}
                  value={otp}
                  error={otpErrorMsg}
                  errorText={otpErrorMsg}
                />
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ height: "56px" }}
                    endIcon={<SendIcon />}
                    fullWidth
                    onClick={onVerify}
                    // disabled={!(dirty && isValid)}
                  >
                    Verify
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button color="primary" fullWidth onClick={onResendOTP}>
                    Resend Verification Code
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        )
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
                    Register as Service Provider
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
                          (errors.mobile && touched.mobile) ||
                          (isExist.mobile && values.mobile == inputs.mobile)
                        }
                        errorText={
                          errors.mobile && touched.mobile
                            ? errors.mobile
                            : isExist.mobile && values.mobile == inputs.mobile
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
                        error={
                          (errors.NIC && touched.NIC) ||
                          (isExist.NIC && values.NIC == inputs.NIC)
                        }
                        errorText={
                          errors.NIC && touched.NIC
                            ? errors.NIC
                            : isExist.NIC && values.NIC == inputs.NIC
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
                        error={
                          (errors.email && touched.email) ||
                          (isExist.email && values.email == inputs.email)
                        }
                        errorText={
                          errors.email && touched.email
                            ? errors.email
                            : isExist.email && values.email == inputs.email
                            ? "Already Existing email address"
                            : ""
                        }
                      />
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          // sx={{ width: "100%" }}
                          fullWidth
                          required
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
                            {jobTypes.map((jobType) => {
                              return (
                                <MenuItem key={jobType._id} value={jobType._id}>
                                  {jobType.jobType}
                                </MenuItem>
                              );
                            })}
                            {/* <MenuItem value="6220b8375e554dac97b488bc">
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
                            </MenuItem> */}
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
                            disableFuture
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
                            maxDate={maxDOB}
                            onChange={(newValue) => {
                              setInputs((values) => ({
                                ...values,
                                DOB: newValue,
                              }));
                            }}
                            onAccept={(newValue) => {
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
