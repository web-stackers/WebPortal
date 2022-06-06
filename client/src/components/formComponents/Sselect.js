import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const Sselect = ({
  name,
  label,
  value,
  error = null,
  onChange,
  options,
  id,
}) => {
  return (
    <FormControl sx={{ width: "70ch" }} {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        id={id}
      >
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Sselect;
