import { useState } from "react";
import StextArea from "../formComponents/StextArea";
import Sbutton from "../Sbutton";

const RejectReason = ({ onclick }) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <div>
      <StextArea
        label="Reason for rejection"
        name="adminResponse"
        value={inputs.adminResponse || ""}
        onChange={handleChange}
      />
      <Sbutton
        text="Submit"
        btnWidth="10%"
        marginLeft="14%"
        onClick={() => onclick(inputs)}
      />
    </div>
  );
};

export default RejectReason;
