import { makeStyles } from "@mui/styles";
import { ThemeContext } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { palette } from "@mui/system";

const useStyles = makeStyles((theme) => {
  return {
    textField: {
      margin: "10px 0 20px 0",
      display: "block",
    },
  };
});

const StextField = ({ label, name, value, onChange, type }) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textField}
      required
      variant="outlined"
      color="primary"
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};

export default StextField;
