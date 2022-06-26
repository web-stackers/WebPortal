import React, { useState } from "react";
import useStyles from "./styles";
import Card from "@mui/material//Card";
import CardContent from "@mui/material//CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material//Button";
import SendIcon from "@mui/icons-material/Send";
import AlertBox from "../../../../components/AlertBox";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import secondaryUser from "../../../../services/SecondaryUser";
import { Link } from "react-router-dom";

const Email = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("profile"));
  });

  const classes = useStyles();
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value) {
      sendMail();
      setSent(true);
      setOpen(true);
      setAlert("Your queries have been sent to the admin.");
    } else {
      setOpen(true);
      setAlert("You need to enter your queries in the given space !!!");
    }
  };

  const sendMail = () => {
    secondaryUser.sendMail(user.result._id, value);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.card}>
        <div className={classes.div}>
          <Typography textAlign="center" variant="h5">
            Mention your queries below
          </Typography>
        </div>

        {sent ? (
          <div>
            <div className={classes.div}>
              <TextField
                disabled
                label={value}
                variant="outlined"
                color="primary"
                multiline
                rows={8}
                fullWidth
              />
            </div>
            <Stack direction="row" justifyContent="space-between">
              <Link to="/thirdParty/new">
                <Button className={classes.btn} variant="contained">
                  Back
                </Button>
              </Link>
              <Button
                className={classes.btn}
                disabled
                variant="contained"
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </Stack>
          </div>
        ) : (
          <div>
            <div className={classes.div}>
              <TextField
                label="Enter your queries"
                variant="outlined"
                color="primary"
                multiline
                rows={6}
                required
                fullWidth
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <Stack direction="row" justifyContent="space-between">
              <Link to="/thirdParty/new">
                <Button className={classes.btn} variant="contained">
                  Back
                </Button>
              </Link>
              <Button
                className={classes.btn}
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Stack>
          </div>
        )}
      </CardContent>
      <AlertBox open={open} setOpen={setOpen} alert={alert} />
    </Card>
  );
};

export default Email;
