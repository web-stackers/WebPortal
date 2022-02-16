import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) => {
  return {
    textField: {
      display: "block",
      margin: "0 0 20px 0",
    },
  };
});

const StextField = ({ label, name, value, onChange }) => {
  const classes = useStyles();
  return (
    <div className={classes.textField}>
      <TextField
        autoComplete="off"
        required
        sx={{ width: "70ch" }}
        variant="outlined"
        color="primary"
        name={name}
        label={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default StextField;
