import { useEffect, useState } from "react";
import JobAssignment from "../../services/JobAssignment";

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
          <h3>{withdrawal.state}</h3>
          {withdrawal.withdrawn && <h3>{withdrawal.withdrawn.reason}</h3>}
        </div>
      ))}
    </div>
  );
};

export default Withdrawal;
