import StextField from "../../../components/formComponents/StextField";
import Sselect from "../../../components/formComponents/Sselect";
import * as SelectList from "../../../components/formComponents/SelectList";
import Sbutton from "../../../components/Sbutton";
import SecondaryUser from "../../../services/SecondaryUser";
import ProfileUpload from "../../../components/formComponents/fileUpload/ProfileUpload";
import { useState } from "react";
import { Typography } from "@mui/material";
import AlertBox from "../../../components/AlertBox";
import { Link } from "react-router-dom";

const AddNewThirdParty = () => {
  const [open, setOpen] = useState(false);
  const [uploadedProfilePath, setUploadedProfilePath] = useState("");
  const [alert, setAlert] = useState("");
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
    temp.fName =
      (inputs.fName ? "" : "This field is required.") ||
      (/^[A-Za-z]*$/.test(inputs.fName)
        ? ""
        : "First name can only contain letters.") ||
      (inputs.fName.length > 2 ? "" : "Minimum 3 characters required.");
    temp.lName =
      (inputs.lName ? "" : "This field is required.") ||
      (/^[A-Za-z]*$/.test(inputs.lName)
        ? ""
        : "Last name can only contain letters.") ||
      (inputs.lName.length > 2 ? "" : "Minimum 3 characters required.");
    temp.email =
      (inputs.email ? "" : "This field is required.") ||
      (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email)
        ? ""
        : "Email is not valid.");
    //\w+ matches 1 or more word characters (a-z, A-Z, 0-9 and underscore).

    // [.-] matches character . or -. We need to use . to represent . as . has special meaning in regexe. The \ is known as the escape code, which restore the original literal meaning of the following character.

    // [.-]? matches 0 or 1 occurrence of [.-].

    // Again, \w+ matches 1 or more word characters.

    // ([.-]?\w+)* matches 0 or more occurrences of [.-]?\w+.

    // The sub-expression \w+([.-]?\w+)* is used to match the username in the email, before the @ sign. It begins with at least one word character (a-z, A-Z, 0-9 and underscore), followed by more word characters or . or -. However, a . or - must follow by a word character (a-z, A-Z, 0-9 and underscore). That is, the string cannot contain "..", "--", ".-" or "-.". Example of valid string are "a.1-2-3".

    // The @ matches itself.

    // Again, the sub-expression \w+([.-]?\w+)* is used to match the email domain name, with the same pattern as the username described above.

    // The sub-expression .\w{2,3} matches a . followed by two or three word characters, e.g., ".com", ".edu", ".us", ".uk", ".co".

    // (.\w{2,3})+ specifies that the above sub-expression shall occur one or more times, e.g., ".com", ".co.uk", ".edu.sg" etc.
    temp.mobile =
      (inputs.mobile ? "" : "This field is required.") ||
      (/^\d+$/.test(inputs.mobile)
        ? ""
        : "Phone number is not valid. It can only contains numbers") ||
      (inputs.mobile.length > 9 ? "" : "Minimum 10 numbers required.") ||
      (inputs.mobile.length < 11
        ? ""
        : "Mobile number cannot exceed 10 digits.");
    temp.address = inputs.address ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === ""); //every() method tests whether all elements in the array pass the test implemented by the provided function. It retruns a boolean value
  };

  //when submitting the form, page will be autoreload, and details will be posted in secondary user collection.
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const notUnique = () => {
        SecondaryUser.emailUniqueCheck(inputs.email)
          .then((response) => {
            console.log(response.data);
            if (!response.data) {
              const notUniqueMobile = () => {
                SecondaryUser.mobileUniqueCheck(inputs.mobile).then(
                  (response) => {
                    if (!response.data) {
                      console.log(inputs);
                      SecondaryUser.addNew(inputs)
                        .then(function (response) {
                          console.log(response.data);
                          console.log(response.data._id);
                          console.log(inputs.profilePath);
                          window.location.reload(false);
                          // SecondaryUser.updateProfile(response.data._id, inputs)
                          //   .then(function (response) {
                          //     console.log(response.data);
                          //     console.log(response.data._id);
                          //     window.location.reload(false);
                          //   })
                          //   .catch(function (error) {
                          //     console.log(error);
                          //     // window.location.reload(false);
                          //   });
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    } else {
                      setOpen(true);
                      setAlert("Mobile is not unique!");
                    }
                  }
                );
              };
              notUniqueMobile();
            } else {
              setOpen(true);
              setAlert("Email is not unique!");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      };
      //validating email is unique or not
      notUnique();
    }
  };

  return (
    <div>
      <Typography variant="h5" textAlign={"center"}>
        Register New Third Party User!
      </Typography>
      <br />
      <ProfileUpload
        setUploadedProfilePath={setUploadedProfilePath}
        setInputs={setInputs}
      />
      <br />
      <form>
        <StextField
          id="fName"
          label="First Name"
          name="fName"
          value={inputs.fName || ""}
          onChange={handleChange}
          error={errors.fName}
        />

        <StextField
          id="lName"
          label="Last Name"
          name="lName"
          value={inputs.lName || ""}
          onChange={handleChange}
          error={errors.lName}
        />

        <StextField
          id="email"
          label="Email"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
          error={errors.email}
        />

        <StextField
          id="mobile"
          label="Mobile Number"
          name="mobile"
          value={inputs.mobile || ""}
          onChange={handleChange}
          error={errors.mobile}
        />

        <StextField
          id="address"
          label="Address"
          name="address"
          value={inputs.address || ""}
          onChange={handleChange}
          error={errors.address}
        />

        <Sselect
          name="verifyDocType"
          label="Verify Document Type"
          value={inputs.verifyDocType || ""}
          onChange={handleChange}
          options={SelectList.getDocumentCollection()}
        />

        <br />
        <br />
        <Sbutton
          text="Submit"
          type="submit"
          onClick={onSubmit}
          btnWidth="20%"
          marginRight="6%"
        />
        <Link to="/admin/thirdParty" className="link">
          <Sbutton text="Cancel" btnWidth="20%" />
        </Link>
      </form>

      <AlertBox open={open} setOpen={setOpen} alert={alert} />
    </div>
  );
};

export default AddNewThirdParty;
