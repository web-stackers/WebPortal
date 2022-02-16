import { makeStyles } from "@mui/styles";
import { ThemeContext } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { palette } from "@mui/system";

const useStyles = makeStyles((theme) => {
  return {
    textField: {
      display: "block",
      margin: "0 0 20px 0",
    },
  };
});

const StextField = ({ label, name, value, onChange, type }) => {
  const classes = useStyles();
  return (
    <div className={classes.textField}>
      <TextField
        required
        variant="outlined"
        color="primary"
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};

export default StextField;
