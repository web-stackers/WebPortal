import React from "react";
import { useState } from "react";

import Job from "../../services/Job";
import Topbar from "../../components/complaints/Topbar";
import AlertBox from '../../components/AlertBox';

import ComplaintList from "../../components/complaints/ComplaintList";

const Complaint = () => {
  const [user, setUser] = useState("Consumers");
  const [listOfComplaints, setListOfComplaints] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alert, setAlert] = useState("");

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
        setAlertTitle={setAlertTitle}
        setAlert={setAlert}
        setAlertOpen={setOpen}
        setLoading={setLoading}
      />
      <ComplaintList
        type={user}
        listOfComplaints={listOfComplaints}
        setListOfComplaints={setListOfComplaints}
        fetchAllComplaints={fetchAllComplaints}
        loading={loading}
      />
      <AlertBox
        open={open}
        alert={alert}
        setOpen={setOpen}
        alertTitle={alertTitle}
      />
    </>
  );
};

export default Complaint;
