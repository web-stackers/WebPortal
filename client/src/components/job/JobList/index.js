import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import JobCategory from "../../../services/JobCategory";
import { confirm } from "react-confirm-box";

const options = {
  labels: {
    confirmable: "Confirm",
    cancellable: "Cancel",
  },
};

const JobList = () => {
  const [jobTypes, setJobTypes] = useState([]);

  //Retrieving all job types in jobTypeCategory collection. It is done through the connection present in JobCategory in service folder.
  const fetchJobTypes = () => {
    JobCategory.fetchJobCategory()
      .then((response) => {
        setJobTypes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchJobTypes();
  }, []);

  const btnStyle = {
    width: 1,
    marginLeft: 15,
    marginBottom: 10,
  };

  //delete particular job category when delete button is pressed
  //e-job type id, t- job type
  const deleteJobTYpe = async (e, t) => {
    const result = await confirm(
      "Are you sure in deleting " + t + " ?",
      options
    );
    if (result) {
      JobCategory.deleteOne(e)
        .then(() => {
          fetchJobTypes();
        })
        .catch((e) => {
          console.log(e);
        });
      return;
    }
    console.log("You click No!");
  };

  const rows = jobTypes.map((jobType) => {
    return {
      id: jobType._id,
      category: jobType.category,
      jobType: jobType.jobType,
      description: jobType.description,
      providerCount: jobType.poviderCount,
    };
  });

  const columns = [
    { field: "jobType", headerName: "Job Type", width: 200 },
    { field: "category", headerName: "Job Category", width: 200 },
    { field: "description", headerName: "Description", width: 350 },
    { field: "providerCount", headerName: "No of providers", width: 200 },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <Link to="/admin/jobs/jobEdit" state={params.row} className="link">
              <Button variant="contained" style={btnStyle}>
                <EditIcon fontSize="small" />
              </Button>
            </Link>

            <Button
              variant="contained"
              style={btnStyle}
              onClick={() => deleteJobTYpe(params.row.id, params.row.jobType)}
            >
              <DeleteIcon fontSize="small" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div
      style={{
        height: 500,
        width: "100%",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
        </div>
      </div>
    </div>
  );
};

export default JobList;
