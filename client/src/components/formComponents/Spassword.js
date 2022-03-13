import React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles((theme) => {
  return {
    password: {
      display: "block",
      margin: "0 0 20px 0",
    },
  };
});

const Spassword = ({ name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();
  return (
    <div className={classes.textField}>
    <FormControl variant="outlined" required sx={{ width: "70ch" }}>
      <InputLabel htmlFor="password">Password</InputLabel>
      <OutlinedInput
        className={classes.password}
        name={name}
        helperText="Some important text"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
    </div>
  );
};

export default Spassword;
