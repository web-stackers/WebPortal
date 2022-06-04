import StextField from "../formComponents/StextField";
import Sbutton from "../Sbutton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

const AddNewJob = ({ onAdd }) => {
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    temp.jobType = jobType ? "" : "This field is required.";

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === ""); //every() method tests whether all elements in the array pass the test implemented by the provided function. It retruns a boolean value
  };

  // When form is submitted, onSubmit function will be performed, where onAdd function will be called where we post new document in jobTypeCategory collection. And after than page will be autorefreshed
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAdd({ jobType, category, description });
      window.location.reload(false);
    }
  };
  return (
    <form>
      <br />
      <StextField
        label="Job Type"
        name="jobType"
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        error={errors.jobType}
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
      <StextField
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Sbutton text="Submit" type="submit" btnWidth="10%" onClick={onSubmit} />
    </form>
  );
};

export default AddNewJob;
