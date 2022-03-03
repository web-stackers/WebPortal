import StextField from "../../components/formComponents/StextField";
import Spassword from "../../components/formComponents/Spassword";
import Sselect from "../../components/formComponents/Sselect";
import Sbutton from "../../components/Sbutton";
import SecondaryUser from "../../services/SecondaryUser";
import { useState } from "react";

const AddNewThirdParty = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    console.log(inputs);
    e.preventDefault();
    SecondaryUser.addNew(inputs);
  };

  return (
    <div>
      <form>
        <StextField
          label="First Name"
          name="fName"
          value={inputs.fName || ""}
          onChange={handleChange}
        />

        <StextField
          label="Last Name"
          name="lName"
          value={inputs.lName || ""}
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
          name="mobile"
          value={inputs.mobile || ""}
          onChange={handleChange}
        />

        <StextField
          label="Address"
          name="address"
          value={inputs.address || ""}
          onChange={handleChange}
        />
        {/* <Spassword /> */}
        {/* <Sselect value={inputs.docType || ""} onChange={handleChange} /> */}

        <Sbutton text="Submit" type="submit" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default AddNewThirdParty;
