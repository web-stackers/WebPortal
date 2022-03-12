import StextField from "../../components/formComponents/StextField";
import Semail from "../../components/formComponents/Semail";
import Smobile from "../../components/formComponents/Smobile";
import Sbutton from "../../components/Sbutton";
import SecondaryUser from "../../services/SecondaryUser";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddNewThirdParty = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handlePhoto = (e) => {
    setInputs((values) => ({ ...values, photo: e.target.files[0] }));
  };

  //when submitting the form, page will be autoreload, and details will be posted in secondary user collection.
  const onSubmit = (e) => {
    console.log(inputs);
    e.preventDefault();
    SecondaryUser.addNew(inputs);
    window.location.reload(false);
  };

  return (
    <div>
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

        <Semail
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
        />

        <Smobile
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
        <InputLabel id="profilePicture">Profile Picture</InputLabel>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="profilePicture"
          onChange={handlePhoto}
        />
        <br />
        <br />
        <br />
        <Sbutton text="Submit" type="submit" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default AddNewThirdParty;
