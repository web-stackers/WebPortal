import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useStyles from "./styles";
import Input from "../../components/formComponents/Input";

import SecondaryUser from "../../services/SecondaryUser";

const initialState = {
  email: "",
  password: "",
};

const Auth = ({ role, setUser, user }) => {
  const [form, setForm] = useState(initialState);
  //   const [isSignup, setIsSignup] = useState(false);
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  //   const switchMode = () => {
  //     setForm(initialState);
  //     setIsSignup((prevIsSignup) => !prevIsSignup);
  //     setShowPassword(false);
  //   };

  const handleSubmit = async (e) => {
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
        const errorMsg =err.response.data.message;
        if(errorMsg==="email is required"){
          setEmailErrorMsg(errorMsg);
        }
        if(errorMsg==="password is required"){
          setPasswordErrorMsg(errorMsg);
        }
        if(errorMsg==="User doesn't exist"){
          setEmailErrorMsg(errorMsg);
        }
        if(errorMsg==="Invalid credentials"){
          setEmailErrorMsg(errorMsg);
          setPasswordErrorMsg(errorMsg);
        }
      }
    }
  };

  const handleChange = (e) =>{
    setForm({ ...form, [e.target.name]: e.target.value });
    setEmailErrorMsg("");
    setPasswordErrorMsg("");
    
  }
    

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
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            className={classes.submit}
            style={{ marginTop: "12px", marginBottom: "15px" }}
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
