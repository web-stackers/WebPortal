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

const StextField = ({
  label,
  id,
  name,
  value,
  onChange,
  type,
  ref,
  error = null,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.textField}>
      <TextField
        autoComplete="off"
        sx={{ width: "70ch" }}
        variant="outlined"
        name={name}
        label={label}
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        ref={ref}
        {...(error && { error: true, helperText: error })}
      />
    </div>
  );
};

export default StextField;
