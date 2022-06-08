import StextField from "../../formComponents/StextField";
import Sbutton from "../../Sbutton";
import Sselect from "../../formComponents/Sselect";
import * as SelectList from "../../formComponents/SelectList";
import { useState } from "react";
import AlertBox from "../../../components/AlertBox";
import JobCategory from "../../../services/JobCategory";

const AddNewJob = ({ onAdd }) => {
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");

  const validate = () => {
    let temp = {};
    temp.jobType = jobType ? "" : "This field is required.";
    temp.category = category.length !== 0 ? "" : "This field is required.";

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === ""); //every() method tests whether all elements in the array pass the test implemented by the provided function. It retruns a boolean value
  };

  // When form is submitted, onSubmit function will be performed, where onAdd function will be called where we post new document in jobTypeCategory collection. And after than page will be autorefreshed
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(jobType);
      const notUnique = () => {
        JobCategory.jobTypeUniqueCheck(jobType)
          .then((response) => {
            console.log(response.data);
            if (!response.data) {
              onAdd({ jobType, category, description });
              window.location.reload(false);
            } else {
              setOpen(true);
              setAlert("Job Type is not unique!");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      };
      //check whether jobType is unique or not
      notUnique();
    }
  };
  return (
    <form>
      <br />
      <StextField
        id="jobType"
        label="Job Type"
        name="jobType"
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        error={errors.jobType}
      />
      <Sselect
        id="category"
        name="category"
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={SelectList.getJobTypeCollection()}
        error={errors.category}
      />
      <br />
      <br />
      <StextField
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Sbutton text="Submit" type="submit" btnWidth="10%" onClick={onSubmit} />
      <AlertBox open={open} setOpen={setOpen} alert={alert} />
    </form>
  );
};

export default AddNewJob;
