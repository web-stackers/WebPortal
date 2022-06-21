import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import StextField from "../../components/formComponents/StextField";
import Sbutton from "../../components/Sbutton";
import SecondaryUser from "../../services/SecondaryUser";
import { useState } from "react";
import Sselect from "../../components/formComponents/Sselect";
import * as SelectList from "../../components/formComponents/SelectList";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AlertBox from "../../components/AlertBox";
import TextField from "@mui/material/TextField";
import { Buffer } from "buffer";
import useStyles from "./styles";
import { confirm } from "react-confirm-box";

const ThirdPartyProfile = () => {
  const classes = useStyles();
  const profilePic = require("../../assets/proPic.jpg");
  // The useLocation hook is a function that returns the location object that contains information about the current URL. Whenever the URL changes, a new location object will be returned
  const location = useLocation();
  const ID = location.state._id;
  const fName = location.state.name.fName;
  const lName = location.state.name.lName;
  const email = location.state.email;
  const mobile = location.state.mobile;
  const address = location.state.address;
  const verifyDocType = location.state.verifyDocType;
  const profilePicture = location.state.profilePicture;

  console.log(profilePicture);

  const [inputs, setInputs] = useState({});
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    validate({ [name]: value });
  };

  //It is given as onClick function in submit button to redirect to the main page
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/admin/thirdParty";
    navigate(path);
  };

  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel",
    },
  };

  const validate = () => {
    let temp = {};
    console.log("email input");
    console.log(inputs.email);
    if (inputs.email !== undefined) {
      temp.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        inputs.email
      )
        ? ""
        : "Email is not valid.";
    }
    if (inputs.mobile !== undefined) {
      temp.mobile =
        (inputs.mobile ? "" : "This field is required.") ||
        (/^\d+$/.test(inputs.mobile)
          ? ""
          : "Phone number is not valid. It can only contains numbers") ||
        (inputs.mobile.length > 9 ? "" : "Minimum 10 numbers required.") ||
        (inputs.mobile.length < 11
          ? ""
          : "Mobile number cannot exceed 10 digits.");
    }

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === ""); //every() method tests whether all elements in the array pass the test implemented by the provided function. It retruns a boolean value
  };

  //onClick function when submit button is clicked. Details will be update and path will be redirected
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    if (validate()) {
      //confirmation dialogue box
      const result = await confirm(
        "Are you sure to update the details ?",
        options
      );

      if (result) {
        SecondaryUser.updateThirdPartyByID(ID, inputs)
          .then(() => {
            routeChange();
          })
          .catch((e) => {
            console.log(e);
            setOpen(true);
            setAlert("Fail to update!");
          });
      }
    }
  };

  let base64String = false;
  let mimetype = "";

  let buffer = profilePicture.data;
  base64String = Buffer.from(buffer).toString("base64");
  mimetype = profilePicture.contentType;

  console.log(mimetype);
  // console.log(base64String);

  return (
    <div>
      <Typography variant="h4" marginLeft="20%">
        {fName} {lName}
      </Typography>
      <br />

      <img
        className={classes.userImage}
        src={`data:${mimetype};base64,${base64String}`}
        alt=""
      />

      <br />
      <br />
      <br />
      <form>
        <StextField
          label="Email"
          name="email"
          value={inputs.email || email}
          onChange={handleChange}
          error={errors.email}
        />

        <StextField
          label="Mobile Number"
          name="mobile"
          value={inputs.mobile || mobile}
          onChange={handleChange}
          error={errors.mobile}
        />

        <StextField
          label="Address"
          name="address"
          value={inputs.address || address}
          onChange={handleChange}
        />
        <Sselect
          name="verifyDocType"
          label="verifyDocType"
          value={inputs.verifyDocType || verifyDocType}
          onChange={handleChange}
          options={SelectList.getDocumentCollection()}
        />
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
      <AlertBox open={open} setOpen={setOpen} alert={alert} />
    </div>
  );
};

export default ThirdPartyProfile;
