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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useStyles from "../../styles/thirdPartyStyle";

const ThirdPartyProfile = () => {
  // The useLocation hook is a function that returns the location object that contains information about the current URL. Whenever the URL changes, a new location object will be returned
  const location = useLocation();
  const ID = location.state._id;
  const fName = location.state.name.fName;
  const lName = location.state.name.lName;
  const email = location.state.email;
  const mobile = location.state.mobile;
  const address = location.state.address;
  const verifyDocType = location.state.verifyDocType;

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //It is given as onClick function in submit button to redirect to the main page
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/thirdParty";
    navigate(path);
  };

  //onClick function when submit button is clicked. Details will be update and path will be redirected
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    SecondaryUser.updateThirdPartyByID(ID, inputs);
    routeChange();
  };

  const classes = useStyles();

  return (
    <div className={classes.form}>
      <Typography variant="h4" textAlign={"center"}>
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
            <MenuItem value="O/L and A/L Certificates">
              O/L and A/L Certificates
            </MenuItem>
            <MenuItem value="NVQ Certificate">NVQ Certificate</MenuItem>
            <MenuItem value="Affidavit">Affidavit</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <Sbutton
          text="Update"
          type="submit"
          onClick={onSubmit}
          btnWidth="20%"
          marginRight="3%"
        />
        <Link to="/thirdParty" className="link">
          <Sbutton text="Cancel" btnWidth="20%" />
        </Link>
      </form>
    </div>
  );
};

export default ThirdPartyProfile;
