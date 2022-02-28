import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SecondaryUser from "../../services/SecondaryUser";
import Sbutton from "../Sbutton";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "200px",
    backgroundColor: "transparent !important",
    color: "white !important",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    width: "50%",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "20%",
  },
}));

const ThirdPartyList = () => {
  const [thirdParties, setThirdParties] = useState([]);

  const fetchUsers = () => {
    SecondaryUser.fetchThirdParty()
      .then((response) => {
        setThirdParties(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const classes = useStyles();

  return (
    <div>
      {" "}
      {thirdParties.map((thirdParty) => (
        <div key={thirdParty._id}>
          <br />
          <Card className={classes.root}>
            <CardMedia
              className={classes.cover}
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="Profile Picture"
            />
            <div className={classes.details}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {thirdParty.name.fName} {thirdParty.name.lName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Contact Number :</b> {thirdParty.contact.mobile}
                  <br />
                  <b>Email :</b> {thirdParty.contact.email}
                  <br />
                  <b>Address : </b>
                  {thirdParty.address}
                  <br />
                  <b>Verification Document Type:</b> {thirdParty.verifyDocType}
                </Typography>
              </CardContent>
            </div>

            <CardActions>
              <Sbutton text="Edit" btnWidth="73%"></Sbutton>
              <Sbutton text="Disable" btnWidth="73%"></Sbutton>
            </CardActions>
          </Card>
          <br />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ThirdPartyList;
