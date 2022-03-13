import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    textField: {
      display: "block",
      margin: "0 0 20px 0",
    },
  };
});

const Smobile = ({ name, value, onChange }) => {
  const classes = useStyles();
  return (
    <div className={classes.textField}>
      <TextField
        autoComplete="off"
        sx={{ width: "70ch" }}
        variant="outlined"
        name={name}
        label="Mobile Number"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Smobile;
