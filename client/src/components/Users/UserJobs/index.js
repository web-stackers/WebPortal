import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import dateFormat from "dateformat";

import Job from "../../../services/Job";
import useStyles from "./styles";
import { LinearProgress } from "@mui/material";

const CustomNoRowsOverlay = () => {
  const classes = useStyles();
  return (
    <div className={classes.noRows}>
      <p>No Jobs Found</p>
    </div>
  )
}

const UserJobs = ({ type, id }) => {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch job history of a user
  const fetchJobs = () => {
    setLoading(true);
    Job.fetchUserJobs(type, id)
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const rows = jobs.map((job) => {
    return {
      id: job?._id,
      jobType: job?.jobType,
      description: job?.description,
      requestedDate: dateFormat(job?.requestedTime, "yyyy-mm-dd"),
      requestedTime: dateFormat(job?.requestedTime, "hh:MM TT"),
      state: job?.userJobs[0].state,
      providerName: job?.provider[0]?.name?.fName,
      consumerName: job?.consumer[0]?.name?.fName,
    };
  });

  const columns = [
    { field: "jobType", headerName: "Provider Type", width: 150, sortable: false, },
    { field: "description", headerName: "Job Description", width: 300, sortable: false, },
    { field: "requestedDate", headerName: "Req. Date", width: 120 },
    { field: "requestedTime", headerName: "Req. Time", width: 100 },
    { field: "state", headerName: "Job Status", width: 150, sortable: false, sortable: false, },
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
      <DataGrid 
        rows={rows} 
        columns={columns} 
        disableSelectionOnClick
        loading={loading}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          LoadingOverlay: LinearProgress
        }}
      />
    </div>
  );
};

export default UserJobs;
