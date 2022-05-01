import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Sbutton from "../Sbutton";

import Consumer from "../../services/Consumer";
import Provider from "../../services/Provider";
import useStyles from '../../styles/usersStyles';

const Userlist = ({ type, users, fetchUsers }) => {
  const classes = useStyles();

  const profilePic = require('../../assets/proPic.jpg')

  const changeAble = (id) => {
    if(type=='Consumers'){
      Consumer.ableConsumer(id)
        .then(() => {
          fetchUsers();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      Provider.ableProvider(id)
        .then(() => {
          fetchUsers();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const rows = users.map((user) => {
    return {
      id: user._id,
      propic: profilePic || user.profilePicture,
      name: user.name.fName + " " + user.name.lName,
      rating: user.totalRating / user.ratingCount,
      mobile: user.contact.mobile,
      email: user.contact.email,
      isDisabled: user.isDisabled,
      ratingCount: user.ratingCount
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
        return (
          <div className={classes.actionBtn}>
            <Link to='/users/profile' state={{profileId, type}} className='link' style={{marginRight:'5%'}}>
              <Sbutton text="View" btnWidth="100%" />
            </Link>
            {params.row.isDisabled==false && <Sbutton text='Disable' btnWidth='100%' onClick={() => {changeAble(profileId); alert(`${profileName} is disabled !`);}}/>}
            {params.row.isDisabled==true && <Sbutton text='Enable' btnWidth='100%' onClick={() => {changeAble(profileId); alert(`${profileName} is enabled !`);}}/>}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, [type]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
        </div>
      </div>
    </div>
  );
};

export default Userlist;
