import { useEffect, useState } from "react";
import JobAssignment from "../../services/JobAssignment";
import Job from "../../services/Job";
import Sbutton from "../../components/Sbutton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { confirm } from "react-confirm-box";

import useStyles from "./withdrawalStyle";

const options = {
  labels: {
    confirmable: "Confirm",
    cancellable: "Cancel",
  },
};

const Withdrawal = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  //Retrieve all job assignments which have or haven't withdrawals. It is the retrieval of aggregate function of four tables- provider, consumer, job and job assignment
  const fetchWithdrawals = () => {
    Job.fetchUserWithdrawals()
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
  const accept = async (e) => {
    console.log(e);
    const result = await confirm(
      "Are you sure in accepting the withdrawal request? ",
      options
    );
    if (result) {
      JobAssignment.withdrawalAccepted(e)
        .then(() => {
          fetchWithdrawals();
        })
        .catch((e) => {
          console.log(e);
        });
      return;
    }
    console.log("You click No!");
  };

  //Function which will be called when reject button is clicked, where job state will be job pending and email will be send to the requested party regarding rejection
  const reject = async (e) => {
    console.log(e);
    const result = await confirm(
      "Are you sure in rejecting the withdrawal request? ",
      options
    );
    if (result) {
      JobAssignment.withdrawalRejected(e)
        .then(() => {
          fetchWithdrawals();
        })
        .catch((e) => {
          console.log(e);
        });
      return;
    }
    console.log("You click No!");
  };
  const classes = useStyles();

  return (
    <div>
      {withdrawals.map((withdrawal) => (
        <div key={withdrawal._id}>
          {withdrawal.userJobs[0].withdrawn &&
            withdrawal.userJobs[0].withdrawn.adminResponse === "Pending" && (
              <>
                <Card className={classes.root}>
                  <div className={classes.details}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        <b>Provider fname: </b>
                        {withdrawal.provider[0].name.fName}
                        <br /> <br />
                        <b>Consumer fname: </b>
                        {withdrawal.consumer[0].name.fName}
                        <br /> <br />
                        <b>Job type: </b>
                        {withdrawal.jobType}
                        <br /> <br />
                        <b>Withdrawal request arised by: </b>
                        {withdrawal.userJobs[0].withdrawn.arisedBy}
                        <br /> <br />
                        <b>Reason for withdrawal: </b>
                        {withdrawal.userJobs[0].withdrawn.reason}
                      </Typography>
                    </CardContent>
                  </div>
                  <CardActions>
                    <Sbutton
                      text="Accept"
                      btnWidth="50%"
                      marginRight="1%"
                      onClick={() => accept(withdrawal.userJobs[0]._id)}
                    ></Sbutton>
                    <Sbutton
                      text="Reject"
                      btnWidth="50%"
                      onClick={() => reject(withdrawal.userJobs[0]._id)}
                    />
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

export default Withdrawal;
