import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import Sbutton from "../../Sbutton";

import useStyles from "./styles";
import { LinearProgress } from "@mui/material";

const CustomNoRowsOverlay = () => {
  const classes = useStyles();
  return (
    <div className={classes.noRows}>
      <p>No Users Found</p>
    </div>
  )
}

const Userlist = ({ type, users, fetchUsers, loading }) => {
  const classes = useStyles();

  const profilePic = require("../../../assets/proPic.jpg");

  const rows = users.map((user) => {
    return {
      id: user._id,
      propic: profilePic || user.profilePicture,
      name: user.name.fName + " " + user.name.lName,
      rating: user.totalRating / user.ratingCount || 0,
      mobile: user.contact.mobile,
      email: user.contact.email,
      isDisabled: user.isDisabled,
      ratingCount: user.ratingCount,
      verified: user.verification ? user.verification.isAccepted : false,
    };
  });

  const columns = [
    {
      field: "user",
      headerName: "User",
      width: 250,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className={classes.userName}>
            <img className={classes.userImage} src={params.row.propic} alt="" />
            {params.row.name}
            {params.row.verified && (
              <VerifiedIcon className={classes.verifiedIcon} />
            )}
          </div>
        );
      },
    },
    { field: "rating", headerName: "Average Rating", width: 140 },
    { field: "ratingCount", headerName: "No of Ratings", width: 140 },
    { field: "mobile", headerName: "Mobile No", width: 150, sortable: false },
    { field: "email", headerName: "Email", width: 250, sortable: false },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const profileId = params.row.id;
        const profileName = params.row.name;
        const verified = params.row.verified;
        return (
          <div className={classes.actionBtn}>
            <Link
              to="/users/profile"
              state={{ profileId, type, profileName, verified }}
              className="link"
              style={{ marginRight: "5%" }}
            >
              <Sbutton text="View" btnWidth="150px" />
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
              LoadingOverlay: LinearProgress
            }}
          />
    </div>
  );
};

export default Userlist;
