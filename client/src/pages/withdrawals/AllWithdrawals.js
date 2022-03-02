import { useEffect, useState } from "react";
import JobAssignment from "../../services/JobAssignment";
import Sbutton from "../../components/Sbutton";
import Topbar from "../../components/Topbar";
import { Link } from "react-router-dom";

const AllWithdrawals = () => {
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
            withdrawal.withdrawn.arisedBy === "consumer" && (
              <>
                <h43>Name:</h43>
                <h4>Reason: {withdrawal.withdrawn.reason}</h4>
                <h4>Response: {withdrawal.withdrawn.adminResponse}</h4>
                <br />
                <br />
                <hr />
              </>
            )}
        </div>
      ))}
      <br />
      <br />
      <Link to="/withdrawals" className="link">
        <Sbutton text="Back" btnWidth="23%"></Sbutton>
      </Link>
    </div>
  );
};

export default AllWithdrawals;
