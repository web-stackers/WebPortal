import React from "react";
import { useState } from "react";
import StextField from "../../components/formComponents/StextField";
import Sbutton from "../../components/Sbutton";
import Provider from "../../services/Provider";
import Spassword from "../../components/formComponents/Spassword";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    textField: {
      display: "block",
      margin: "0 0 20px 0",
    },
  };
});

const Registration = () => {
  const classes = useStyles();
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
          type="email"
        />
        <Spassword
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
        />
        <StextField
          label="NIC Number"
          name="NIC"
          value={inputs.NIC || ""}
          onChange={handleChange}
        />
        <div className={classes.textField}>
          <TextField
            name="DOB"
            label="Date of Birth"
            type="date"
            value={inputs.DOB || ""}
            onChange={handleChange}
            sx={{ width: "70ch" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className={classes.textField}>
          <TextField
            name="workStartedYear"
            label="Year you started the job"
            type="date"
            value={inputs.workStartedYear || ""}
            onChange={handleChange}
            sx={{ width: "70ch" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <Sbutton text="Submit" type="submit" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default Registration;
