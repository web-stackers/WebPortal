import { useEffect, useState } from "react";
import JobAssignment from "../../services/JobAssignment";
import Sbutton from "../../components/Sbutton";
import Topbar from "../../components/Topbar";
import { Link } from "react-router-dom";
// import RejectReason from "../../components/withdrawal/RejectReason";

const Withdrawal = () => {
  const [showReason, setShowReason] = useState(false);
  const [withdrawals, setWithdrawals] = useState([]);

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

  const accept = (e) => {
    console.log(e);
    JobAssignment.withdrawalAccepted(e);
    window.location.reload(false);
  };

  const reject = (e) => {
    console.log(e);
    JobAssignment.withdrawalRejected(e);
    window.location.reload(false);
  };

  // const addTask = (e, task) => {
  //   console.log(e);
  //   console.log(task);
  //   JobAssignment.withdrawalRejected(e, task);
  // };

  return (
    <div>
      <Topbar
        onClickConsumer={() => alert("Consumers")}
        onClickProvider={() => alert("Providers")}
      />
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
                  // onClick={() => setShowReason(!showReason)}
                  // showAdd={showReason}
                />
                {/* 
                {showReason && (
                  <>
                    <br />
                    <RejectReason onAdd={() => addTask(withdrawal._id)} />
                  </>
                )} */}
                <br />
                <br />
                <hr />
              </>
            )}
        </div>
      ))}
      <br />
      <br />
      <Link to="/Allwithdrawals" className="link">
        <Sbutton text="Load All Withdrawals" btnWidth="23%" />
      </Link>
    </div>
  );
};

export default Withdrawal;
