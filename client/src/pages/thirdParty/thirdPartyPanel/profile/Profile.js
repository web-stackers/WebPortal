import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import Card from "@mui/material//Card";
import CardContent from "@mui/material//CardContent";
import CardMedia from "@mui/material//CardMedia";
import Typography from "@mui/material//Typography";
import { Buffer } from "buffer";
import Button from "@mui/material//Button";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

const Profile = () => {
  const classes = useStyles();
  const profilePic = "../../../../assets/proPic.jpg";

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("profile"));
  });

  let base64String = profilePic;
  let mimetype = "";
  if (user && user.result.profilePicture) {
    let buffer = user.result.profilePicture.data;
    base64String = Buffer.from(buffer).toString("base64");
    mimetype = user.result.profilePicture.contentType;
  }

  return (
    <div className="Outerbox">
      {user && (
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image={`data:${mimetype};base64,${base64String}`}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="h5" marginTop={-1} marginBottom={1}>
                {user.result.name.fName + " " + user.result.name.lName}
              </Typography>
              <div className={classes.div}>
                <Typography variant="subtitle1">
                  Mobile - {user.result.mobile}
                </Typography>
                <Typography variant="subtitle1">
                  Email - {user.result.email}
                </Typography>
                <Typography variant="subtitle1">
                  Address - {user.result.address}
                </Typography>
                <Typography variant="subtitle1">
                  Registered Date - {dateFormat(user.result.registeredDate, "yyyy-mm-dd")}
                </Typography>
                <Typography variant="subtitle1">
                  Document Type - {user.result.verifyDocType}
                </Typography>
                <div className={classes.btn}>
                  <Link to="/thirdParty/sendMail">
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      className={classes.btn}
                    >
                      Request Edit Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Profile;
