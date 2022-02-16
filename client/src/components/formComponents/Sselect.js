import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Sselect = ({ value, onChange }) => {
  return (
    <Box>
      <FormControl variant="outlined" required sx={{ width: "70ch" }}>
        <InputLabel id="demo-simple-select-label">Doc Type</InputLabel>
        <Select value={value} label="Verification Doc Type" onChange={onChange}>
          <MenuItem value={10}>O/L</MenuItem>
          <MenuItem value={20}>A/L</MenuItem>
          <MenuItem value={30}>Degree</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Sselect;
