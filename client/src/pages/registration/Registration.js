import React from "react";
import { useState } from "react";
import StextField from "../../components/formComponents/StextField";
import Sbutton from "../../components/Sbutton";
import Provider from "../../services/Provider";
import Spassword from "../../components/formComponents/Spassword";
// import SdatePicker from "../../components/formComponents/SdatePicker";

const Registration = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //when submitting the form, page will be autoreload, and details will be posted in secondary user collection.
  const onSubmit = (e) => {
    console.log(inputs);
    e.preventDefault();
    Provider.addNew(inputs);
    //window.location.reload(false);
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
          label="Mobile Number"
          name="mobile"
          value={inputs.mobile || ""}
          onChange={handleChange}
        />
        <StextField
          label="Email"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
        />
        <Spassword/>
        {/* <SdatePicker/> */}
        <Sbutton text="Submit" type="submit" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default Registration;
