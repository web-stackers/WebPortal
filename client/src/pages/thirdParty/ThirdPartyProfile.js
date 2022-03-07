import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import StextField from "../../components/formComponents/StextField";
import Sbutton from "../../components/Sbutton";
import SecondaryUser from "../../services/SecondaryUser";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ThirdPartyProfile = () => {
  const location = useLocation();
  console.log(location.state);
  const ID = location.state._id;
  const fName = location.state.name.fName;
  const lName = location.state.name.lName;
  const email = location.state.contact.email;
  const mobile = location.state.contact.mobile;
  const address = location.state.address;
  const verifyDocType = location.state.verifyDocType;

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    // SecondaryUser.addNew(inputs);
  };

  return (
    <div>
      <Typography variant="h4">
        {fName} {lName}
      </Typography>
      <br />
      <form>
        <StextField
          label="Email"
          name="email"
          value={inputs.email || email}
          onChange={handleChange}
        />
        <StextField
          label="Mobile Number"
          name="mobile"
          value={inputs.mobile || mobile}
          onChange={handleChange}
        />

        <StextField
          label="Address"
          name="address"
          value={inputs.address || address}
          onChange={handleChange}
        />
        <FormControl sx={{ width: "70ch" }}>
          <InputLabel id="verificationDocumentType">
            Verification Document Type
          </InputLabel>
          <Select
            labelId="verificationDocumentType"
            name="verifyDocType"
            value={inputs.verifyDocType || verifyDocType}
            label="Verification document type"
            onChange={handleChange}
          >
            <MenuItem value="Degree Certificate">Degree Certificate</MenuItem>
            <MenuItem value="O/L, A/L Certificate">
              O/L, A/L Certificate
            </MenuItem>
            <MenuItem value="NVQ Level Certificate">
              NVQ Level Certificate
            </MenuItem>
            <MenuItem value="Affidavit">Affidavit</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <Sbutton text="Update" type="submit" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default ThirdPartyProfile;
