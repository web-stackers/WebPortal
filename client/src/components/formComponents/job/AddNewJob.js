import StextField from "../StextField";
import Sbutton from "../../Sbutton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

const AddNewJob = ({ onAdd }) => {
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ jobType, category });
    window.location.reload(false);
  };
  return (
    <form>
      <StextField
        label="Job Type"
        name="jobType"
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
      />
      <FormControl sx={{ width: "70ch" }}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="Event">Event</MenuItem>
          <MenuItem value="Construction">Construction</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <Sbutton text="Submit" type="submit" btnWidth="10%" onClick={onSubmit} />
    </form>
  );
};

export default AddNewJob;
