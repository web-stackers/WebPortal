import StextField from "../../components/StextField";
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
          type="text"
        />

        <StextField
          label="Last Name"
          name="lastName"
          value={inputs.lastName || ""}
          onChange={handleChange}
          type="text"
        />

        <Sbutton text="Submit" type="submit" />
      </form>
    </div>
  );
};

export default AddNewThirdParty;
