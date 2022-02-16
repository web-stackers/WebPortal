import StextField from "../../components/formComponents/StextField";
import Spassword from "../../components/formComponents/Spassword";
import Sselect from "../../components/formComponents/Sselect";
import Sbutton from "../../components/Sbutton";
import axios from "axios";
import { useState } from "react";

const AddNewThirdParty = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      <form>
        <StextField
          label="First Name"
          name="firstName"
          value={inputs.firstName || ""}
          onChange={handleChange}
        />

        <StextField
          label="Last Name"
          name="lastName"
          value={inputs.lastName || ""}
          onChange={handleChange}
        />

        <StextField
          label="Email"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
        />

        <StextField
          label="Mobile Number"
          name="mobileNumber"
          value={inputs.mobileNumber || ""}
          onChange={handleChange}
        />

        <StextField
          label="Address"
          name="address"
          value={inputs.address || ""}
          onChange={handleChange}
        />
        <Spassword />
        <Sselect value={inputs.docType || ""} onChange={handleChange} />

        <Sbutton text="Submit" type="submit" />
      </form>
    </div>
  );
};

export default AddNewThirdParty;
