import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import Consumer from "../../services/Consumer";
import Provider from "../../services/Provider";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Sbutton from "../Sbutton";

const useStyles = makeStyles((theme) => {
  return {
    userName: {
      display: "flex",
      alignItems: "center",
    },
    userImage: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      objectFit: "cover",
      marginRight: "10px",
    },
    actionBtn: {
      display: "flex",
      margin: "auto",
      textDecoration: "none",
    },
  };
});

<<<<<<< HEAD
const Userlist = ({type, users, setUsers, fetchUsers}) => {
=======
const Userlist = ({ type }) => {
  const [users, setUsers] = useState([]);
>>>>>>> 49633af565f4b1cc75d1c696fce97484df7c04c2
  const classes = useStyles();
  //const [profileId, setProfileId] = useState('');

<<<<<<< HEAD
  /* const changeAble = () => {
    if(type=='Consumers'){
      Consumer.ableConsumer(profileId)
=======
  const fetchUsers = () => {
    if (type === "Consumers") {
      Consumer.fetchConsumers()
        .then((response) => {
          setUsers(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      Provider.fetchProviders()
        .then((response) => {
          setUsers(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  /* const changeAble = (id) => {
    if(type=='Consumers'){
      Consumer.ableConsumer(id)
>>>>>>> 49633af565f4b1cc75d1c696fce97484df7c04c2
        .then(() => {
          fetchUsers();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      Provider.ableProvider(profileId)
        .then(() => {
          fetchUsers();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }; */

  const rows = users.map((user) => {
    return {
<<<<<<< HEAD
        id: user._id,
        propic: user.profilePicture,
        name: user.name.fName+' '+user.name.lName,
        rating: user.totalRating/user.ratingCount,
        mobile: user.contact.mobile,
        email: user.contact.email,
        isDisabled: user.isDisabled,
        jobType: user.jobType
    }
=======
      id: user._id,
      propic: user.profilePicture,
      name: user.name.fName + " " + user.name.lName,
      rating: user.totalRating / user.ratingCount,
      mobile: user.contact.mobile,
      email: user.contact.email,
      isDisabled: user.isDisabled,
    };
>>>>>>> 49633af565f4b1cc75d1c696fce97484df7c04c2
  });

  const columns = [
    {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <div className={classes.userName}>
            <img className={classes.userImage} src={params.row.propic} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "rating", headerName: "Rating", width: 120 },
    { field: "mobile", headerName: "Mobile No", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    {
<<<<<<< HEAD
        field: 'Action',
        headerName: 'Action',
        width: 200,
        renderCell: (params) => {
            const profileId = params.row.id;
            return(
                <div className={classes.actionBtn}>                   
                    <Link to='/users/profile' state={{profileId, type}} className='link' style={{marginRight:'5%'}}>
                        <Sbutton text='View' btnWidth='100%'/>
                    </Link>
                    {params.row.isDisabled==false && <Sbutton text='Disable' btnWidth='100%' /* onClick={(Id) => {setProfileId(Id); changeAble();}} *//>}
                    {params.row.isDisabled==true && <Sbutton text='Enable' btnWidth='100%' /* onClick={(Id) => {setProfileId(Id); changeAble();}} *//>}
                </div>
            )
        }
    }
=======
      field: "Action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const profile = params.row;
        return (
          <div className={classes.actionBtn}>
            <Link
              to="/users/profile"
              state={{ profile }}
              className="link"
              style={{ marginRight: "5%" }}
            >
              <Sbutton text="View" btnWidth="100%" />
            </Link>
            {params.row.isDisabled == false && (
              <Sbutton text="Disable" btnWidth="100%" />
            )}
            {params.row.isDisabled == true && (
              <Sbutton text="Enable" btnWidth="100%" />
            )}
          </div>
        );
      },
    },
>>>>>>> 49633af565f4b1cc75d1c696fce97484df7c04c2
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
