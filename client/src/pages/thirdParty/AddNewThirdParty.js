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

  const validate = (fieldValues = inputs) => {
    let temp = { ...errors };
    if ("fName" in fieldValues)
      temp.fName = fieldValues.fName ? "" : "This field is required.";
    if ("lName" in fieldValues)
      temp.lName = fieldValues.lName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email =
        (fieldValues.email ? "" : "This field is required.") ||
        (/$^|.+@.+..+/.test(fieldValues.email) ? "" : "Email is not valid.");
    if ("mobile" in fieldValues)
      temp.mobile =
        (fieldValues.mobile ? "" : "This field is required.") ||
        (fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.") ||
        (fieldValues.mobile.length < 11
          ? ""
          : "Mobile number cannot exceed 10 digits.");
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required.";
    // if ("verifyDocType" in fieldValues)
    //   temp.verifyDocType =
    //     fieldValues.verifyDocType.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === inputs)
      return Object.values(temp).every((x) => x === "");
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
