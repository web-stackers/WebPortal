import StextField from "../../components/formComponents/StextField";
import StextArea from "../../components/formComponents/StextArea";
import Sbutton from "../../components/Sbutton";
import { useState, useEffect } from "react";
import Axios from "axios";

const ResponseToComplaint = () => {
  const [reply, setReply] = useState({});

  const [listOfComplaints, setListOfComplaints] = useState([]);

  useEffect(() => {
    Axios.get("/job").then((response) => {
      setListOfComplaints(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setReply((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      {listOfComplaints.map((jobs) => {
        return (
          <div>
            <form>
              <div>
                <StextField
                  label="FirstName"
                  name="firstName"
                  value={jobs.jobType || ""}
                  onChange={handleChange}
                />

                <StextField
                  label="LastName"
                  name="lastName"
                  value={jobs.description || ""}
                  onChange={handleChange}
                />
                <StextArea
                  label="Description"
                  name="description"
                  value={reply.description || ""}
                  onChange={handleChange}
                />
              </div>
              <Sbutton text="Send " type="submit" />
              <hr />
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default ResponseToComplaint;
