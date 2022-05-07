import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import JobCategory from "../../services/JobCategory";

const JobList = () => {
  const [jobTypes, setJobTypes] = useState([]);
  //Retrieving all job types in jobTypeCategory collection. It is done through the connection present in JobCategory in service folder.
  const fetchJobTypes = () => {
    JobCategory.fetchJobCategory()
      .then((response) => {
        setJobTypes(response.data);
        console.log(response.data);
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
    marginLeft: 25,
    marginBottom: 10,
  };

  const deleteJobTYpe = (e, t) => {
    console.log(e);
    console.log(t);
    alert(t + " will be deleted !");
    JobCategory.deleteOne(e);
    window.location.reload(false);
  };

  const rows = jobTypes.map((jobType) => {
    return {
      id: jobType._id,
      category: jobType.category,
      jobType: jobType.jobType,
      description: jobType.description,
    };
  });

  const columns = [
    { field: "jobType", headerName: "Job Type", width: 200 },
    { field: "category", headerName: "Job Category", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "Count",
      headerName: "No of providers registered",
      width: 200,
      renderCell: (params) => {
        return <div></div>;
      },
    },
    {
      field: "Action",
      headerName: "Action",
      width: 180,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            style={btnStyle}
            onClick={() => deleteJobTYpe(params.row.id, params.row.jobType)}
          >
            <DeleteIcon fontSize="small" />
          </Button>
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
