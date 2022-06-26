import { useLocation } from "react-router-dom";
import { useState } from "react";
import dateFormat from "dateformat";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import StextField from "../../components/formComponents/StextField";
import Sbutton from "../../components/Sbutton";
import { confirm } from "react-confirm-box";

import Job from "../../services/Job";

const ResponseToComplaint = () => {
  const location = useLocation();
  const ID = location.state.id;
  const whom = location.state.by;
  const category = location.state.category;
  const date = location.state.date;
  const description = location.state.description;

  const options = {
    labels: {
      confirmable: "Yes",
      cancellable: "No",
    },
  };

  const [reply, setReply] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setReply((values) => ({ ...values, [name]: value }));
    validate({ [name]: value });
  };

  //It is given as onClick function in submit button to redirect to the main page
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/admin/complaints";
    navigate(path);
  };

  //onClick function when submit button is clicked. Details will be update and path will be redirected
  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const result = await confirm(
        "Are you sure to sending response?",
        options
      );
      if (result) {
        Job.complaintHandled(ID, reply)
          .then(() => {
            routeChange();
          })
          .catch((e) => {
            console.log(e);
          });
        return;
      }
    }
  };

  const validate = () => {
    let temp = {};
    temp.adminResponse =
      (reply.adminResponse ? "" : "This field is required.") ||
      (/^[A-Za-z\s]*$/.test(reply.adminResponse)
        ? ""
        : "Response can only contain letters.") ||
      (reply.adminResponse.length > 4 ? "" : "Minimum 5 characters required.");

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === ""); //every() method tests whether all elements in the array pass the test implemented by the provided function. It retruns a boolean value
  };

  return (
    <div>
      <Typography variant="h7">Complaint Date </Typography>
      <Typography variant="h6"> {dateFormat(date, "yyyy-mm-dd")}</Typography>
      <br />
      <Typography variant="h7">By Whom </Typography>
      <Typography variant="h6"> {whom}</Typography>
      <br />
      <Typography variant="h7">Category </Typography>
      <Typography variant="h6"> {category}</Typography>
      <br />
      <Typography variant="h7">Description </Typography>
      <Typography variant="h6"> {description}</Typography>
      <br />
      <form>
        <div>
          <StextField
            label="Admin Response"
            placeholder="Admin Response"
            name="adminResponse"
            value={reply.adminResponse || " "}
            onChange={handleChange}
            error={errors.adminResponse}
          />
        </div>
        <CardActions>
          <Sbutton
            text="Send"
            type="submit"
            onClick={onSubmit}
            btnWidth="150px"
            marginRight="5%"
          />
          <Link
            to="/admin/complaints"
            className="link"
            style={{ marginRight: "50%" }}
          >
            <Sbutton text="Back" btnWidth="150px" marginRight="5%" />
          </Link>
        </CardActions>
      </form>
    </div>
  );
};

export default ResponseToComplaint;
