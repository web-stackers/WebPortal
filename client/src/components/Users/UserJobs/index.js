import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import dateFormat from "dateformat";

import Job from "../../../services/Job";
import useStyles from "./styles";

const UserJobs = ({ type, id }) => {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);

  // // Fetch job history of a user
  const fetchJobs = () => {
    Job.fetchUserJobs(type, id)
      .then((response) => {
        setJobs(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const rows = jobs.map((job) => {
    return {
      id: job._id,
      jobType: job.jobType,
      description: job.description,
      requestedDate: dateFormat(job.requestedTime, "yyyy-mm-dd"),
      requestedTime: dateFormat(job.requestedTime, "hh:MM TT"),
      state: job.userJobs[0].state,
      providerName: job.provider[0].name.fName,
      consumerName: job.consumer[0].name.fName,
    };
  });

  const columns = [
    { field: "jobType", headerName: "Provider Type", width: 150 },
    { field: "description", headerName: "Job Description", width: 300 },
    { field: "requestedDate", headerName: "Date", width: 120 },
    { field: "requestedTime", headerName: "Time", width: 100 },
    { field: "state", headerName: "Job Status", width: 150, sortable: false },
    {
      field: "providerName",
      headerName: "Provider",
      width: 150,
      sortable: false,
    },
    {
      field: "consumerName",
      headerName: "Consumer",
      width: 150,
      sortable: false,
    },
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className={classes.outerBox}>
      <div className={classes.innerBox}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
        </div>
      </div>
    </div>
  );
};

export default UserJobs;
