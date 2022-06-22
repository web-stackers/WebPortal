import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import Sbutton from "../../Sbutton";

import useStyles from "./styles";
import { LinearProgress } from "@mui/material";

// Component to show when no users available on search
const CustomNoRowsOverlay = () => {
  const classes = useStyles();
  return (
    <div className={classes.noRows}>
      <p>No Users Found</p>
    </div>
  );
};

// Component to show users in datagrid
const Userlist = ({ type, users, fetchUsers, loading }) => {
  const classes = useStyles();

  let hide = type==="Consumers"? true:false;

  const rows = users.map((user) => {
    let verifiedText = "";
    let job = "";
    if (type === "Providers") {
      verifiedText = user.verification?.isAccepted? "Yes":"No";
      job = user.job? user.job[0].jobType:"";
    } 

    return {
      id: user._id,
      name: user.name.fName + " " + user.name.lName,
      rating: parseFloat((user.totalRating / user.ratingCount).toFixed(2)) || 0,
      isDisabled: user.isDisabled? "Yes":"No",
      mobile: user.contact.mobile,
      email: user.contact.email,
      ratingCount: user.ratingCount,
      verified: user.verification ? user.verification.isAccepted : false,
      verifiedText: verifiedText,
      job: job
    };
  });

  const columns = [
    {
      field: "user",
      headerName: "User",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className={classes.userName}>
            {params.row.name}
            {params.row.verified && (
              <VerifiedIcon className={classes.verifiedIcon} />
            )}
          </div>
        );
      },
    },
    { field: "job", headerName: "Job", width: 150, hide: hide },
    { field: "rating", headerName: "Average Rating", width: 120 },
    { field: "ratingCount", headerName: "No of Ratings", width: 120 },
    { field: "mobile", headerName: "Mobile No", width: 120, sortable: false },
    { field: "email", headerName: "Email", width: 250, sortable: false, hide: !hide },
    { field: "isDisabled", headerName: "Disabled", width: 100, sortable: false },
    { field: "verifiedText", headerName: "Verified", width: 100, sortable: false, hide: hide },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const profileId = params.row.id;
        const profileName = params.row.name;
        const verified = params.row.verified;
        return (
          <div className={classes.actionBtn}>
            <Link
              to="/admin/users/profile"
              state={{ profileId, type, profileName, verified }}
              className="link"
              style={{ marginRight: "5%" }}
            >
              <Sbutton text="View" btnWidth="100px" />
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, [type]);

  return (
    <div className={classes.outerBox}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        loading={loading}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          LoadingOverlay: LinearProgress,
        }}
      />
    </div>
  );
};

export default Userlist;
