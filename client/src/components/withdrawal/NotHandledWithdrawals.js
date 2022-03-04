import { useEffect, useState } from "react";
import JobAssignment from "../../services/JobAssignment";
import Sbutton from "../../components/Sbutton";

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
  if (type === "Consumers") {
    return (
      <div>
        {withdrawals.map((withdrawal) => (
          <div key={withdrawal._id}>
            {withdrawal.withdrawn &&
              withdrawal.withdrawn.adminResponse === "Pending" &&
              withdrawal.withdrawn.arisedBy === "consumer" && (
                <>
                  <h4>Name:</h4>
                  <h4>Job Type:</h4>
                  <h4>Reason: {withdrawal.withdrawn.reason}</h4>
                  <Sbutton
                    text="Accept"
                    btnWidth="10%"
                    marginRight="1%"
                    onClick={() => accept(withdrawal._id)}
                  ></Sbutton>
                  <Sbutton
                    text="Reject"
                    btnWidth="10%"
                    onClick={() => reject(withdrawal._id)}
                  />

                  <br />
                  <br />
                  <hr />
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
                  <h4>Name:</h4>
                  <h4>Job Type:</h4>
                  <h4>Reason: {withdrawal.withdrawn.reason}</h4>
                  <Sbutton
                    text="Accept"
                    btnWidth="10%"
                    marginRight="1%"
                    onClick={() => accept(withdrawal._id)}
                  ></Sbutton>
                  <Sbutton
                    text="Reject"
                    btnWidth="10%"
                    onClick={() => reject(withdrawal._id)}
                  />

                  <br />
                  <br />
                  <hr />
                </>
              )}
          </div>
        ))}
      </div>
    );
  }
};

export default NotHandledWithdrawals;
