import { useEffect, useState } from "react";
import JobAssignment from "../../services/JobAssignment";
import Sbutton from "../../components/Sbutton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import useStyles from "../../styles/withdrawalStyle";

const NotHandledWithdrawals = ({ type }) => {
  const [withdrawals, setWithdrawals] = useState([]);

  //Retrieve all job assignments which have or haven't withdrawals
  const fetchWithdrawals = () => {
    JobAssignment.fetchJobAssignment()
      .then((response) => {
        setWithdrawals(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const line = {
    backgroundColor: "#ffffff",
  };

  //Function which will be called when accept button is clicked, where job state will be changed to Job Withdrawn and email will be send to the opposite party.
  const accept = (e) => {
    console.log(e);
    JobAssignment.withdrawalAccepted(e);
    window.location.reload(false);
  };

  //Function which will be called when reject button is clicked, where job state will be job pending and email will be send to the requested party regarding rejection
  const reject = (e) => {
    console.log(e);
    JobAssignment.withdrawalRejected(e);
    window.location.reload(false);
  };
  const classes = useStyles();
  if (type === "Consumers") {
    return (
      <div>
        {withdrawals.map((withdrawal) => (
          <div key={withdrawal._id}>
            {withdrawal.withdrawn &&
              withdrawal.withdrawn.adminResponse === "Pending" &&
              withdrawal.withdrawn.arisedBy === "consumer" && (
                <>
                  <Card className={classes.root}>
                    <div className={classes.details}>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Name:
                          <br />
                          <br />
                          Job Type:
                          <br />
                          <br />
                          Reason:{withdrawal.withdrawn.reason}
                        </Typography>
                      </CardContent>
                    </div>
                    <CardActions>
                      <Sbutton
                        text="Accept"
                        btnWidth="50%"
                        marginRight="1%"
                        onClick={() => accept(withdrawal._id)}
                      ></Sbutton>
                      <Sbutton
                        text="Reject"
                        btnWidth="50%"
                        onClick={() => reject(withdrawal._id)}
                      />
                    </CardActions>
                  </Card>

                  <br />
                  <hr style={line} />
                </>
              )}
          </div>
        ))}
      </div>
    );
  }
  if (type === "Providers") {
    return (
      <div>
        {withdrawals.map((withdrawal) => (
          <div key={withdrawal._id}>
            {withdrawal.withdrawn &&
              withdrawal.withdrawn.adminResponse === "Pending" &&
              withdrawal.withdrawn.arisedBy === "provider" && (
                <>
                  <Card className={classes.root}>
                    <div className={classes.details}>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Name:
                          <br />
                          <br />
                          Job Type:
                          <br />
                          <br />
                          Reason:{withdrawal.withdrawn.reason}
                        </Typography>
                      </CardContent>
                    </div>
                    <CardActions>
                      <Sbutton
                        text="Accept"
                        btnWidth="50%"
                        marginRight="1%"
                        onClick={() => accept(withdrawal._id)}
                      ></Sbutton>
                      <Sbutton
                        text="Reject"
                        btnWidth="50%"
                        onClick={() => reject(withdrawal._id)}
                      />
                    </CardActions>
                  </Card>

                  <br />
                  <hr style={line} />
                </>
              )}
          </div>
        ))}
      </div>
    );
  }
};

export default NotHandledWithdrawals;
