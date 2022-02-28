import { useEffect, useState } from "react";
import JobAssignment from "../../services/JobAssignment";
import Sbutton from "../../components/Sbutton";
import Topbar from "../../components/Topbar";

const Withdrawal = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  const fetchWithdrawals = () => {
    JobAssignment.fetchJobAssignment()
      .then((response) => {
        setWithdrawals(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);
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
                <h3>{withdrawal.withdrawn.reason}</h3>
                <Sbutton
                  text="Accept"
                  btnWidth="10%"
                  marginRight="1%"
                ></Sbutton>
                <Sbutton text="Reject" btnWidth="10%"></Sbutton>
                <br />
                <br />
                <hr />
              </>
            )}
        </div>
      ))}
      <br />
      <br />
      <Sbutton text="Load All Withdrawals" btnWidth="23%"></Sbutton>
    </div>
  );
};

export default Withdrawal;