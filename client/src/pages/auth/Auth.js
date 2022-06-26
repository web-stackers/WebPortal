import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useStyles from "./styles";
import Input from "../../components/formComponents/Input";
import SendIcon from "@mui/icons-material/Send";

import SecondaryUser from "../../services/SecondaryUser";

const initialState = {
  email: "",
  password: "",
};

const Auth = ({ role, setUser, user }) => {
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  const [otpErrorMsg, setOtpErrorMsg] = useState("");

  const [form, setForm] = useState(initialState);
  const [toResendOTP, setToResendOTP] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [newPassword, setNewPassword] = useState("");
  const [isNewPassValid, setIsNewPassValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setEmailErrorMsg("");
    setPasswordErrorMsg("");
    if (e.target.name == "email") {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
        setIsEmailValid(true);
      } else {
        setIsEmailValid(false);
      }
    }
  };

  const onSignIn = async (e) => {
    e.preventDefault();
    setEmailErrorMsg("");
    setPasswordErrorMsg("");
    try {
      const res = await SecondaryUser.signIn(form);

      localStorage.setItem("profile", JSON.stringify(res.data));
      setUser(() => {
        return JSON.parse(localStorage.getItem("profile"));
      });
      navigate("/signin");
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        window.alert("There was a problem with the server, Colud not sign in");
      } else {
        const errorMsg = err.response.data.message;
        const _id = err.response.data.userId;
      
        if (errorMsg === "First time signin") {
          setUserId(_id);
          console.log(userId);
          setIsChangePassword(true);
        } else if (errorMsg === "Invalid credentials") {
          setEmailErrorMsg(errorMsg);
          setPasswordErrorMsg(errorMsg);
        }else if (errorMsg === "You are disabled") {
          setEmailErrorMsg(errorMsg);
          setPasswordErrorMsg(errorMsg);
        } else if (errorMsg === "User doesn't exist") {
          setEmailErrorMsg(errorMsg);
        }else{
          window.alert("Something went wrong, Colud not sign in");
        }
      }
    }
  };

  const onForgotPass = async (e) => {
    e.preventDefault();
    setEmailErrorMsg("");
    try {
      const res = await SecondaryUser.forgotPassword({ email: form.email });
      setToResendOTP(() => {
        return res.data;
      });
      setIsForgotPassword(true);
      setUserId(res.data.userId);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        window.alert(
          "There was a problem with the server, Colud not proceed to forgot password"
        );
      } else {
        const errorMsg = err.response.data.message;
        if (errorMsg === "You are disabled") {
          setEmailErrorMsg(errorMsg);
        } else if (errorMsg === "User doesn't exist") {
          setEmailErrorMsg(errorMsg);
        }else {
          window.alert("Something went wrong, " + errorMsg);
        }
      }
    }
  };
  const onResendOTP = async (e) => {
    e.preventDefault();
    setOtpErrorMsg("");
    try {
      const res = await SecondaryUser.resendOTP(toResendOTP);
      window.alert("Verification code has been resent, check you mail");
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

  const onVerify = async (e) => {
    e.preventDefault();
    setOtpErrorMsg("");
    try {
      const res = await SecondaryUser.verifyOTP({ userId, otp });
      console.log(res.data);
      setIsChangePassword(true);
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        window.alert("There was a problem with the server");
      } else {
        setOtpErrorMsg(err.response.data.message);
      }
    }
  };

  const onChangePass = async (e) => {
    e.preventDefault();
    setConfirmPasswordErrorMsg("");
    if (newPassword == confirmPassword) {
      try {
        await SecondaryUser.changePassword({ newPassword }, userId);
        window.alert(
          "New password has been changed successfully, you can sign in now"
        );
        window.location.reload(false);
      } catch (err) {
        console.log(err);
        if (err.response.status === 500) {
          window.alert(
            "There was a problem with the server, Colud not sign in"
          );
        } else {
          const errorMsg = err.response.data.message;
          window.alert("Something went wrong, " + errorMsg);
        }
      }
    } else {
      setConfirmPasswordErrorMsg(
        "New password and confirm password are mismathched"
      );
    }
  };

  useEffect(() => {
    setUser(() => {
      return JSON.parse(localStorage.getItem("profile"));
    });
    if (role === "Admin") {
      navigate("/admin");
    }
    if (role === "Third Party") {
      console.log(user);
      navigate("/thirdParty");
    }
  }, [location]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {!isChangePassword ? (
          !isForgotPassword ? (
            <>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={onSignIn}>
                <Grid container spacing={2}>
                  <Input
                    name="email"
                    label="Email Address"
                    handleChange={handleChange}
                    type="email"
                    error={emailErrorMsg}
                    errorText={emailErrorMsg}
                  />
                  <Input
                    name="password"
                    label="Password"
                    handleChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    handleShowPassword={handleShowPassword}
                    error={passwordErrorMsg}
                    errorText={passwordErrorMsg}
                  />
                </Grid>

                {isEmailValid ? (
                  <Button
                    color="primary"
                    style={{ paddingLeft: "200px" }}
                    fullWidth
                    onClick={onForgotPass}
                  >
                    Forgot password ?
                  </Button>
                ) : null}

                <Button
                  type="submit"
                  className={classes.submit}
                  style={{ marginBottom: "15px", marginTop: "12px" }}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign in
                </Button>
              </form>
            </>
          ) : (
            <>
              {" "}
              <Typography variant="h6">Confirm OTP</Typography>
              <Typography variant="h7" mt={1} >
                Verification code has been sent to
              </Typography>
              <Typography variant="h9"  mb={3}>
                {form.email}
              </Typography>
              <Grid container spacing={2}>
                <Input
                  name="otp"
                  label="Verification Code"
                  half
                  handleChange={(event) => {
                    setOtpErrorMsg("");
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
                    disabled={!otp}
                  >
                    Verify
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button color="primary" fullWidth onClick={onResendOTP} style={{ marginTop: "-8px" }}>
                    Resend Verification Code
                  </Button>
                </Grid>
              </Grid>
            </>
          )
        ) : (
          <>
            <Typography component="h1" variant="h6">
              Change new password
            </Typography>
            <form className={classes.form} onSubmit={onChangePass}>
              <Grid container spacing={2}>
                <Input
                  name="password"
                  label="New Password"
                  handleChange={(e) => {
                    setNewPassword(e.target.value);
                    if (/^(?=.*\d)(?=.*[A-Z]).{8,}$/.test(newPassword)) {
                      setIsNewPassValid(true);
                    } else {
                      setIsNewPassValid(false);
                    }
                  }}
                  value={newPassword}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                  error={!isNewPassValid}
                  errorText={
                    !isNewPassValid &&
                    "Must contain atleast 8 characters including a number and a capital letter"
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="confirmPassword"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordErrorMsg("");
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  label="Confirm Password"
                  value={confirmPassword}
                  style={{ marginTop: "15px" }}
                  error={confirmPasswordErrorMsg}
                  helperText={confirmPasswordErrorMsg}
                  type="password"
                />
              </Grid>

              <Button
                type="submit"
                className={classes.submit}
                style={{ marginBottom: "15px", marginTop: "15px" }}
                fullWidth
                variant="contained"
                color="primary"
                disabled={!newPassword || !confirmPassword || !isNewPassValid}
              >
                Change password
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Auth;
