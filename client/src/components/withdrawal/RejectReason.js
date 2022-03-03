import StextField from "../formComponents/StextField";
import Sbutton from "../Sbutton";
import { useState } from "react";

const AddNewJob = ({ onAdd, id }) => {
  const [adminResponse, setAdminResponse] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ adminResponse });
    onAdd({ id, adminResponse });
    // window.location.reload(false);
  };
  return (
    <form>
      <br />
      <br />
      <StextField
        label="Reason for rejection"
        name="adminResponse"
        value={adminResponse}
        onChange={(e) => setAdminResponse(e.target.value)}
      />
      <Sbutton text="Submit" type="submit" btnWidth="10%" onClick={onSubmit} />
    </form>
  );
};

export default AddNewJob;
