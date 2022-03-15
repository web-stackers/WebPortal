import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles"
import Card from '@mui/material//Card';
import CardContent from '@mui/material//CardContent';
import CardMedia from '@mui/material//CardMedia';
import Typography from '@mui/material//Typography';
import Sbutton from "../../components/Sbutton";

import ConsumerDetails from "../../components/Users/ConsumerDetails";
import ProviderDetails from "../../components/Users/ProviderDetails";

import Consumer from "../../services/Consumer";
import Provider from "../../services/Provider";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      height: '200px',
      backgroundColor: 'transparent !important',
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
    const profilePic = require('../../assets/proPic.jpg')

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

    useEffect(() => {
        fetchProfile();
    }, []);

    return ( 
        <div className="Outerbox">

        {profile && <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={profilePic || profile.profilePicture}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="h4">
                        {profile.name.fName+' '+profile.name.lName}
                    </Typography>
                    <Typography variant="subtitle1">
                        Rating : {profile.totalRating/profile.ratingCount}
                    </Typography>
                </CardContent>           
            </div>
            <div className={classes.btngrp}>
                <Link to='/users' className='link'><Sbutton text='Delete User' btnWidth='200px'/></Link>
                <Link to='/users' className='link'><Sbutton text='Back' btnWidth='200px'/></Link>
            </div>
        </Card>}

        {profile && type=='Consumers' && <ConsumerDetails user={profile}/>}
        {profile && type=='Providers' && <ProviderDetails user={profile}/>}
            
        </div>
    );
}
 
export default Profile;