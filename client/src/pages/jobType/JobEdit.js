import { useLocation } from "react-router-dom";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import StextField from "../../components/formComponents/StextField";
import Sbutton from "../../components/Sbutton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import JobCategory from "../../services/JobCategory";

const JobEdit = () => {
  const location = useLocation();

  const ID = location.state._id;
  const jobType = location.state.jobType;
  const category = location.state.category;
  const description = location.state.description;
  console.log(location);

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //It is given as onClick function in submit button to redirect to the main page
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/jobs";
    navigate(path);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    JobCategory.updateJobByID(ID, inputs);
    routeChange();
  };

  return (
    <div>
      <StextField
        label="Job Type"
        name="jobType"
        value={inputs.jobType || jobType}
        onChange={handleChange}
      />
      <FormControl sx={{ width: "70ch" }}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          value={inputs.category || category}
          label="Category"
          onChange={handleChange}
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
        value={inputs.description || description}
        onChange={handleChange}
      />

      <Sbutton
        text="Update"
        type="submit"
        onClick={onSubmit}
        btnWidth="20%"
        marginRight="3%"
      />
      <Link to="/jobs" className="link">
        <Sbutton text="Cancel" btnWidth="20%" />
      </Link>
    </div>
  );
};

export default JobEdit;
