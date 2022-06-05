import { useEffect } from "react";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Sbutton from "../Sbutton";
import CardActions from "@mui/material/CardActions";

const ComplaintList = ({ type, listOfComplaints, fetchAllComplaints }) => {

  //By using this Hook, you tell React that your component needs to do something after render. Call it later after performing the DOM updates.
  useEffect(() => {
    fetchAllComplaints();
  }, [type]);

  const rows = listOfComplaints.map((item) => {
    return {
      id: item.complaint[0]._id,
      by: item.complaint[0].by,
      date: dateFormat(item.complaint[0].date, "yyyy-mm-dd"),
      category: item.complaint[0].category,
      description: item.complaint[0].description,
      adminResponse: item.complaint[0].adminResponse,
    };
  });

  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "category", headerName: "Category", width: 250 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "adminResponse", headerName: "Admin Response", width: 200 },
    {
      field: "Action",
      headerName: "Action",
      width: 220,
      sortable: false,
      renderCell: (params) => {
        return (
          <CardActions>
            <Link
              to="/responseToComplaint"
              state={params.row}
              className="link"
              style={{ marginRight: "50%" }}
            >
              <Sbutton text="Response" btnWidth="90%" />
            </Link>
          </CardActions>
        );
      },
    },
  ];

  return (
    <div style={{ height: 350, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
        </div>
      </div>
    </div>
  );
};

export default ComplaintList;
