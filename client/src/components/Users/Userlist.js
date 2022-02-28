import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import Consumer from "../../services/Consumer";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import Sbutton from "../Sbutton";

const useStyles = makeStyles((theme) => {
  return {
    userName : {
      display: 'flex',
      alignItems: 'center'
    },
    userImage : {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: '10px'
    },
    actionBtn : {
        display: 'flex',
        margin: 'auto',
        textDecoration:'none'
    }
  };
});

const Userlist = () => {
  const [consumers, setConsumers] = useState([]);
  const classes = useStyles();

  const fetchUsers = () => {
    Consumer.fetchConsumers()
      .then((response) => {
        setConsumers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const rows = consumers.map((consumer) => {
    return {
        id: consumer._id,
        propic: consumer.profilePicture,
        name: consumer.name.fName+' '+consumer.name.lName,
        rating: consumer.totalRating/consumer.ratingCount,
        mobile: consumer.contact.mobile,
        email: consumer.contact.email,
        regDate: consumer.registeredDate
    }
  })

  const columns = [
    { 
        field: 'user', 
        headerName: 'User', 
        width: 200,
        renderCell: (params) => {
            return(
                <div className={classes.userName}>
                    <img className={classes.userImage} src={params.row.propic} alt="" />
                    {params.row.name}
                </div>
            )
        },
    },
    { field: 'rating', headerName: 'Rating', width: 100},
    { field: 'mobile', headerName: 'Mobile No', width: 120},
    { field: 'email', headerName: 'Email', width: 180},
    { field: 'regDate', headerName: 'Reg.Date', width: 180},
    {
        field: 'Action',
        headerName: 'Action',
        width: 200,
        renderCell: (params) => {
            const profile = params.row;
            return(
                <div className={classes.actionBtn}>                   
                    <Link to='/users/profile' state={{profile}} className='link' style={{marginRight:'5%'}}>
                        <Sbutton text='View' btnWidth='100%'/>
                    </Link>
                    <Link to='/users/profile' state={{profile}} className='link'>
                        <Sbutton text='Disable' btnWidth='100%'/>
                    </Link>
                </div>
            )
        }
    }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid 
            rows={rows} 
            columns={columns} 
            style={{color:'white'}}
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default Userlist;
