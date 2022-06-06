import { useLocation } from "react-router-dom";
import { useState } from "react";
import StextField from "../../../components/formComponents/StextField";
import Sbutton from "../../../components/Sbutton";
import Sselect from "../../../components/formComponents/Sselect";
import * as SelectList from "../../../components/formComponents/SelectList";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import JobCategory from "../../../services/JobCategory";

const JobEdit = () => {
  const location = useLocation();
  const jobType = location.state.jobType;
  const category = location.state.category;
  const description = location.state.description;
  console.log(location.state.id);

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
    JobCategory.updateJobByID(location.state.id, inputs);
    console.log(location.state.id);
    console.log(inputs);
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
      <Sselect
        name="category"
        label="Category"
        value={inputs.category || category}
        onChange={handleChange}
        options={SelectList.getJobTypeCollection()}
      />
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
