import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import dateFormat from "dateformat";
import Card from "@mui/material//Card";
import CardContent from "@mui/material//CardContent";
import CardMedia from "@mui/material//CardMedia";
import Typography from "@mui/material//Typography";
import VerifiedIcon from "@mui/icons-material/Verified";
import LinearProgress  from '@mui/material/LinearProgress';

import Sbutton from "../../../components/Sbutton";
import AlertBox from "../../../components/AlertBox";
import ConsumerDetails from "../../../components/Users/ConsumerDetails";
import ProviderDetails from "../../../components/Users/ProviderDetails";
import UserJobs from "../../../components/Users/UserJobs";

import Consumer from "../../../services/Consumer";
import Provider from "../../../services/Provider";
import useStyles from "./styles";

// Profile page of user
const Profile = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const { profileId, type, profileName, verified } = location.state;
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alert, setAlert] = useState("");

  const [profile, setProfile] = useState();
  const profilePic = require("../../../assets/proPic.jpg");

  // Fetch user details using id
  // Need to be merged
  const fetchProfile = () => {
    setLoading(true);
    if (type === "Consumers") {
      Consumer.fetchConsumer(profileId)
        .then((response) => {
          setProfile(response.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      Provider.fetchProvider(profileId)
        .then((response) => {
          setProfile(response.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // Disable or Enable a user
  // Need to be merged
  const changeAble = (id) => {
    setLoading(true);
    if (type === "Consumers") {
      Consumer.ableConsumer(id)
        .then(() => {
          fetchProfile();
          setOpen(true);
          setAlertTitle("Done");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      Provider.updateProviderCount(id);
      Provider.ableProvider(id)
        .then(() => {
          fetchProfile();
          setOpen(true);
          setAlertTitle("Done");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  let base64String=profilePic;
  let mimetype="";
  if(type==='Consumers'){
    base64String = profilePic;
  } else {
    if(profile && profile.document && verified){
      let buffer = profile.document[0].doc.data;
      base64String = Buffer.from(buffer).toString('base64');
      mimetype = profile.document[0].doc.contentType;
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="Outerbox">
      {loading && <LinearProgress />}

      {profile && (
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image={type==='Providers' && verified? `data:${mimetype};base64,${base64String}`:profilePic}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="h4">
                {profile.name.fName + " " + profile.name.lName}
                {type === "Providers" && verified && (
                  <VerifiedIcon className={classes.verifiedIcon} />
                )}
              </Typography>
              <Typography variant="subtitle1">
                Rating : {parseFloat((profile.totalRating / profile.ratingCount).toFixed(2)) || 0}
              </Typography>
              {type==='Providers' && <Typography variant="subtitle1">
                Date of Birth : {dateFormat(profile.DOB, "yyyy-mm-dd")}
              </Typography>}
            </CardContent>
          </div>
          <div className={classes.btngrp}>
            {type === "Consumers" && profile.isDisabled === false && (
              <Sbutton
                text="Disable User"
                btnWidth="100%"
                onClick={() => {
                  changeAble(profileId);
                  setAlert(`${profileName} is disabled !`);
                }}
              />
            )}
            {type === "Consumers" && profile.isDisabled === true && (
              <Sbutton
                text="Enable User"
                btnWidth="100%"
                onClick={() => {
                  changeAble(profileId);
                  setAlert(`${profileName} is enabled !`);
                }}
              />
            )}
            {type === "Providers" && verified && profile.isDisabled === false && (
              <Sbutton
                text="Disable User"
                btnWidth="100%"
                onClick={() => {
                  changeAble(profileId);
                  setAlert(`${profileName} is disabled !`);
                }}
              />
            )}
            {type === "Providers" && verified && profile.isDisabled === true && (
              <Sbutton
                text="Enable User"
                btnWidth="100%"
                onClick={() => {
                  changeAble(profileId);
                  setAlert(`${profileName} is enabled !`);
                }}
              />
            )}

            <Sbutton text="Back" btnWidth="200px" onClick={() => navigate("/admin/users")}/>
          </div>
        </Card>
      )}

      {profile && type === "Consumers" && (
        <ConsumerDetails user={profile} id={profileId} />
      )}
      {profile && type === "Providers" && (
        <ProviderDetails user={profile} verified={verified} id={profileId} />
      )}

      {profile && (
        <Card className="root">
          <CardContent>
            <Typography variant="h5">Job History</Typography>
            {type === "Consumers" && (
              <UserJobs type="consumer" id={profileId} />
            )}
            {type === "Providers" && verified && (
              <UserJobs type="provider" id={profileId} />
            )}
          </CardContent>
        </Card>
      )}

      <AlertBox open={open} setOpen={setOpen} alert={alert} alertTitle={alertTitle} />
    </div>
  );
};

export default Profile;
