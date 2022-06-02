import React from "react";
import { useState } from "react";

import Job from "../../services/Job";
import Topbar from "../../components/Users/Topbar";
import ComplaintList from "../../components/complaints/ComplaintList";

const Complaint = () => {
  const [user, setUser] = useState("Consumers");
  const [listOfComplaints, setListOfComplaints] = useState([]);

  const fetchAllComplaints = () => {
    if (user == "Consumers") {
      Job.fetchComplaintsByConsumer()
        .then((response) => {
          setListOfComplaints(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      Job.fetchComplaintsByProvider()
        .then((response) => {
          setListOfComplaints(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <Topbar
        type={user}
        setType={setUser}
        setListOfComplaints={setListOfComplaints}
        fetchAllComplaints={fetchAllComplaints}
      />
      <ComplaintList
        type={user}
        listOfComplaints={listOfComplaints}
        setListOfComplaints={setListOfComplaints}
        fetchAllComplaints={fetchAllComplaints}
      />
    </>
  );
};

export default Complaint;
