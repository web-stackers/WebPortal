import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Card from "@mui/material//Card";
import CardContent from "@mui/material//CardContent";
import CardMedia from "@mui/material//CardMedia";
import Typography from "@mui/material//Typography";
import VerifiedIcon from "@mui/icons-material/Verified";

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
  const location = useLocation();
  const { profileId, type, profileName, verified } = location.state;
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");

  const [profile, setProfile] = useState();
  const profilePic = require("../../../assets/proPic.jpg");

  // Fetch user details using id
  const fetchProfile = () => {
    if (type === "Consumers") {
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

  // Disable or Enable a user
  const changeAble = (id) => {
    if (type === "Consumers") {
      Consumer.ableConsumer(id)
        .then(() => {
          setOpen(true);
          fetchProfile();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      Provider.updateProviderCount(id);
      Provider.ableProvider(id)
        .then(() => {
          setOpen(true);
          fetchProfile();
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
      {profile && (
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image={profilePic || profile.profilePicture}
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
                Rating : {profile.totalRating / profile.ratingCount}
              </Typography>
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
            <Link to="/users" className="link">
              <Sbutton text="Back" btnWidth="200px" />
            </Link>
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
            <Typography variant="h5">Jobs</Typography>
            {type === "Consumers" && (
              <UserJobs type="consumer" id={profileId} />
            )}
            {type === "Providers" && (
              <UserJobs type="provider" id={profileId} />
            )}
          </CardContent>
        </Card>
      )}

      <AlertBox open={open} setOpen={setOpen} alert={alert} />
    </div>
  );
};

export default Profile;
