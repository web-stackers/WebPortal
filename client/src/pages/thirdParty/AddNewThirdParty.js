import StextField from "../../components/formComponents/StextField";
import Sbutton from "../../components/Sbutton";
import SecondaryUser from "../../services/SecondaryUser";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

const AddNewThirdParty = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    validate({ [name]: value });
  };

  const validate = () => {
    let temp = {};
    temp.fName = inputs.fName ? "" : "This field is required.";
    temp.lName = inputs.lName ? "" : "This field is required.";
    temp.email =
      (inputs.email ? "" : "This field is required.") ||
      (/$^|.+@.+..+/.test(inputs.email) ? "" : "Email is not valid.");
    temp.mobile =
      (inputs.mobile ? "" : "This field is required.") ||
      (inputs.mobile.length > 9 ? "" : "Minimum 10 numbers required.") ||
      (inputs.mobile.length < 11
        ? ""
        : "Mobile number cannot exceed 10 digits.");
    temp.address = inputs.address ? "" : "This field is required.";
    // temp.verifyDocType =
    //   inputs.verifyDocType.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === ""); //every() method tests whether all elements in the array pass the test implemented by the provided function. It retruns a boolean value
  };

  //when submitting the form, page will be autoreload, and details will be posted in secondary user collection.
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (validate()) {
      SecondaryUser.addNew(inputs);
      window.location.reload(false);
    }
  };

  return (
    <div>
      <Typography variant="h5" textAlign={"center"}>
        Register New Third Party User!
      </Typography>
      <br />
      <form encType="multipart/form-data">
        <StextField
          label="First Name"
          name="fName"
          value={inputs.fName || ""}
          onChange={handleChange}
          error={errors.fName}
        />

        <StextField
          label="Last Name"
          name="lName"
          value={inputs.lName || ""}
          onChange={handleChange}
          error={errors.lName}
        />

        <StextField
          label="Email"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
          error={errors.email}
        />

        <StextField
          label="Mobile Number"
          name="mobile"
          value={inputs.mobile || ""}
          onChange={handleChange}
          error={errors.mobile}
        />

        <StextField
          label="Address"
          name="address"
          value={inputs.address || ""}
          onChange={handleChange}
          error={errors.address}
        />

        <FormControl sx={{ width: "70ch" }}>
          <InputLabel id="verificationDocumentType">
            Verification Document Type
          </InputLabel>
          <Select
            labelId="verificationDocumentType"
            name="verifyDocType"
            value={inputs.verifyDocType || ""}
            label="Verification document type"
            onChange={handleChange}
            // error={errors.verifyDocType}
          >
            <MenuItem value="Degree Certificate">Degree Certificate</MenuItem>
            <MenuItem value="O/L and A/L Certificates">
              O/L and A/L Certificates
            </MenuItem>
            <MenuItem value="NVQ Certificate">NVQ Certificate</MenuItem>
            <MenuItem value="Affidavit">Affidavit</MenuItem>
          </Select>
        </FormControl>

        <br />
        <br />
        <Sbutton text="Submit" type="submit" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default AddNewThirdParty;
