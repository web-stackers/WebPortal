import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Sbutton from "../Sbutton";

import Job from "../../services/Job";

const UserJobs = ({type, id}) => {
    const [jobs, setJobs] = useState([]);

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
          state: job.userJobs[0].state,
          providerName: job.provider[0].name.fName,
          consumerName: job.consumer[0].name.fName
        };
    });

    const columns = [
        { field: "jobType", headerName: "Provider Type", width: 150 },
        { field: "description", headerName: "Job Description", width: 300 },
        { field: "state", headerName: "Job Status", width: 150, sortable: false },
        { field: "providerName", headerName: "Provider", width: 150, sortable: false },
        { field: "consumerName", headerName: "Consumer", width: 150, sortable: false },
    ];

    useEffect(() => {
        fetchJobs();
    }, []);

    return (  
        <div style={{ height: 400, width: "100%", marginTop: 25 }}>
            <div style={{ display: "flex", height: "100%" }}>
                 <div style={{ flexGrow: 1 }}>
                    <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
                </div>
            </div>
        </div>
    );
}
 
export default UserJobs;
