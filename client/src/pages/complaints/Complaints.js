import { useState, useEffect } from "react";
import Axios from "axios";
import Sbutton from "../../components/Sbutton";
import { useNavigate } from "react-router-dom";

const Complaints = () => {
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/ResponseToComplaint";
    navigate(path);
  };
  const [listOfComplaints, setListOfComplaints] = useState([]);

  useEffect(() => {
    Axios.get("/job").then((response) => {
      setListOfComplaints(response.data);
    });
  }, []);
  return (
    <div>
      {listOfComplaints.map((jobs) => {
        return (
          <div>
            <h2>{jobs.jobType}</h2>
            <h2>{jobs.description}</h2>
            <Sbutton text="Response" onClick={routeChange}></Sbutton>
            <hr />
          </div>
        );
      })}
    </div>
  );
};
export default Complaints;
