import { useEffect, useState } from "react";
import JobAssignment from "../../services/JobAssignment";
import Sbutton from "../../components/Sbutton";

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
      {withdrawals.map((withdrawal) => (
        <div key={withdrawal._id}>
          {withdrawal.withdrawn &&
            withdrawal.withdrawn.adminResponse === "Pending" && (
              <>
                <h3>{withdrawal.withdrawn.arisedBy}</h3>
                <h3>{withdrawal.withdrawn.reason}</h3>
                <Sbutton text="Accept"></Sbutton>
                <Sbutton text="Reject"></Sbutton>
              </>
            )}
        </div>
      ))}
    </div>
  );
};

export default Withdrawal;
