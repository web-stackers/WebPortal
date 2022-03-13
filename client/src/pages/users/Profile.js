import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles"
import Card from '@mui/material//Card';
import CardContent from '@mui/material//CardContent';
import CardMedia from '@mui/material//CardMedia';
import Typography from '@mui/material//Typography';
import Sbutton from "../../components/Sbutton";

import Consumer from "../../services/Consumer";
import Provider from "../../services/Provider";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      height: '200px',
      backgroundColor: 'transparent !important',
      color: 'white !important',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      padding: 10,
      width:'50%'
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: '20%',
    },
    btngrp:{
        display:'flex',
        flexDirection:'column',
        justifyContent: 'space-around',
        height: '50%',
        alignSelf: 'center'
    },
    btn:{
        width:'200px'
    }
  }));

const Profile = () => {
    const location = useLocation();
    const { profileId, type } = location.state;
    const classes = useStyles();

    const [profile, setProfile] = useState();

    const fetchProfile = () => {
        if(type=='Consumers'){
            Consumer.fetchConsumer(profileId)
            .then((response) => {
                setProfile(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
        } else {
            Provider.fetchProvider(profileId)
            .then((response) => {
                setProfile(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
        }
    };

    console.log(profile);

    useEffect(() => {
        fetchProfile();
    }, []);

    return ( 
        <div className="Outerbox">

        {profile && <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={profile.profilePicture}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {profile.name.fName+' '+profile.name.lName}
                    </Typography>
                    {/* <Typography variant="subtitle1">
                        {profile.job}
                    </Typography>
                    <Typography variant="subtitle1">
                        {profile.city}
                    </Typography><br /> */}
                </CardContent>           
            </div>
            <div className={classes.btngrp}>
                <Link to='/users' className='link'><Sbutton text='Delete User' btnWidth='200px'/></Link>
            </div>
        </Card>}
            
        </div>
    );
}
 
export default Profile;