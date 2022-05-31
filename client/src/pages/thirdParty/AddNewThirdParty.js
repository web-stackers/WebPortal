import StextField from "../../components/formComponents/StextField";
import Sbutton from "../../components/Sbutton";
import SecondaryUser from "../../services/SecondaryUser";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";

const schema = Yup.object().shape({
  fName: Yup.string().required("First Name should be required please"),
  lName: Yup.string().required(),
  email: Yup.string().email().required(),
  // mobile: Yup.required(),
  // address: Yup.required(),
  // verifyDocType: Yup.required(),
});

const AddNewThirdParty = () => {
  const [inputs, setInputs] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //when submitting the form, page will be autoreload, and details will be posted in secondary user collection.
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    SecondaryUser.addNew(inputs);
    window.location.reload(false);
  };

  return (
    <div>
      <Typography variant="h5" textAlign={"center"}>
        Register New Third Party User!
      </Typography>
      <br />
      <form encType="multipart/form-data">
        <TextField
          required
          sx={{ width: "70ch" }}
          label="First Name"
          name="fName"
          value={inputs.fName || ""}
          onChange={handleChange}
          // {...register("fName")}
          error={errors.fName ? true : false}
        />

        <Typography variant="inherit" color="textSecondary">
          {errors.fName?.message}
        </Typography>

        <TextField
          required
          sx={{ width: "70ch" }}
          label="Last Name"
          name="lName"
          value={inputs.lName || ""}
          onChange={handleChange}
          // ref={thirdParty}
        />

        {/* <p> {errors.lName?.message} </p> */}

        <TextField
          required
          sx={{ width: "70ch" }}
          label="Email"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
          // ref={thirdParty}
        />

        {/* <p> {errors.email?.message} </p> */}

        <TextField
          required
          sx={{ width: "70ch" }}
          label="Mobile Number"
          name="mobile"
          value={inputs.mobile || ""}
          onChange={handleChange}
          // ref={thirdParty}
        />

        {/* <p> {errors.mobile?.message} </p> */}

        <TextField
          required
          sx={{ width: "70ch" }}
          label="Address"
          name="address"
          value={inputs.address || ""}
          onChange={handleChange}
          // ref={thirdParty}
        />

        {/* <p> {errors.address?.message} </p> */}

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

        {/* <p> {errors.verifyDocType?.message} </p> */}

        <br />
        <br />
        <Sbutton text="Submit" type="submit" onClick={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
};

export default AddNewThirdParty;
