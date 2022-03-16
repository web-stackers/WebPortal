import StextField from "../../components/formComponents/StextField";
import Sbutton from "../../components/Sbutton";
import SecondaryUser from "../../services/SecondaryUser";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

import useStyles from "../../styles/thirdPartyStyle";

const AddNewThirdParty = () => {
  const [inputs, setInputs] = useState({});
  // const [file, setFile] = useState("");
  // const [fileName, setFileName] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // const handlePhoto = (e) => {
  //   setFile(e.target.files[0]);
  //   console.log(file);
  // };

  //when submitting the form, page will be autoreload, and details will be posted in secondary user collection.
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    SecondaryUser.addNew(inputs);
    window.location.reload(false);
    // const formData = new FormData();
    // formData.append("file", file);
    // SecondaryUser.uploadFile(formData);
    // setTimeout(() => SecondaryUser.addNew(inputs), 10000);

    // setFileName(file.name);
    // setInputs((values) => ({ ...values, fileName: file.name }));
  };

  const classes = useStyles();
  return (
    <div className={classes.form}>
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
        {/* <InputLabel id="profilePicture">Profile Picture</InputLabel>
        <input
          type="file"
          // accept=".png, .jpg, .jpeg"
          name="profilePicture"
          onChange={handlePhoto}
        />
        <br />
        <br /> */}
        <br />
        <Sbutton text="Submit" type="submit" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default AddNewThirdParty;
