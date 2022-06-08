import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SecondaryUser from "../../services/SecondaryUser";
import Sbutton from "../Sbutton";
import { Link } from "react-router-dom";
import useStyles from "./style";
import { confirm } from "react-confirm-box";

const line = {
  backgroundColor: "#ffffff",
};

const options = {
  labels: {
    confirmable: "Confirm",
    cancellable: "Cancel",
  },
};

// React useState Hook allows us to track state in a function component
// The first value, thirdParty, is our current state.

// The second value, setThirdParty, is the function that is used to update our state.

const ThirdPartyList = () => {
  const [thirdParties, setThirdParties] = useState([]);

  //on click function to enable or disable third party account and auto refresh after button click to see the change
  const disable = async (e, fn, ln) => {
    console.log(e);
    console.log(fn);
    console.log(ln);
    const result = await confirm(
      "Are you sure to disable " + fn + " " + ln + " ?",
      options
    );
    if (result) {
      SecondaryUser.disableEnableThirdPartyByID(e)
        .then(() => {
          fetchUsers();
        })
        .catch((e) => {
          console.log(e);
        });
      return;
    }
    console.log("You click No!");
  };

  //on click function to enable or disable third party account and auto refresh after button click to see the change
  const Enable = async (e, fn, ln) => {
    console.log(e);
    console.log(fn);
    console.log(ln);

    const result = await confirm(
      "Are you sure to enable " + fn + " " + ln + " ?",
      options
    );
    if (result) {
      SecondaryUser.disableEnableThirdPartyByID(e)
        .then(() => {
          fetchUsers();
        })
        .catch((e) => {
          console.log(e);
        });
      return;
    }
    console.log("You click No!");
  };

  //By using this Hook, you tell React that your component needs to do something after render. Call it later after performing the DOM updates.
  useEffect(() => {
    fetchUsers();
  }, []);

  //Get all secondary users
  const fetchUsers = () => {
    SecondaryUser.fetchThirdParty()
      .then((response) => {
        setThirdParties(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const classes = useStyles();

  return (
    <div>
      {/* mapping every third party inside card structure */}
      {thirdParties.map((thirdParty) => (
        <div key={thirdParty._id}>
          {thirdParty.role === "Third Party" && (
            <>
              <Card className={classes.root}>
                <div className={classes.details}>
                  <CardContent>
                    {/* gutterBottom - the text will have a bottom margin */}
                    <Typography gutterBottom variant="h5" component="div">
                      {thirdParty.name.fName} {thirdParty.name.lName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Contact Number :</b> {thirdParty.mobile}
                      <br />
                      <b>Email :</b> {thirdParty.email}
                      <br />
                      <b>Address : </b>
                      {thirdParty.address}
                      <br />
                      <b>Verification Document Type:</b>
                      {thirdParty.verifyDocType}
                      <br />
                    </Typography>
                  </CardContent>
                </div>

                <CardActions>
                  <Link
                    to="/thirdPartyProfile"
                    state={thirdParty}
                    className="link"
                    style={{ marginRight: "5%" }}
                  >
                    <Sbutton text="Edit" btnWidth="83%" />
                  </Link>

                  {/* If third party is disabled, enabling button will be present.
                  if third party is in active stage, disabling button will be present. */}
                  {thirdParty.isDisabled === false && (
                    <Sbutton
                      text="Disable"
                      btnWidth="73%"
                      onClick={() =>
                        disable(
                          thirdParty._id,
                          thirdParty.name.fName,
                          thirdParty.name.lName
                        )
                      }
                    />
                  )}
                  {thirdParty.isDisabled === true && (
                    <Sbutton
                      text="Enable"
                      btnWidth="73%"
                      onClick={() =>
                        Enable(
                          thirdParty._id,
                          thirdParty.name.fName,
                          thirdParty.name.lName
                        )
                      }
                    />
                  )}
                </CardActions>
              </Card>
              <hr style={line} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ThirdPartyList;
