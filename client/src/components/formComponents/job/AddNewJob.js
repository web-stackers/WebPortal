import StextField from "../StextField";
import Sbutton from "../../Sbutton";
import { useState } from "react";
import JobCategory from "../../../services/JobCategory";

const AddNewJob = ({ onAdd }) => {
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ jobType, category });
    // setJobType("");
  };
  return (
    <form>
      <StextField
        label="Job Type"
        name="jobType"
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
      />
      <StextField
        label="category"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Sbutton text="Submit" type="submit" btnWidth="10%" onClick={onSubmit} />
    </form>
  );
};

export default AddNewJob;
