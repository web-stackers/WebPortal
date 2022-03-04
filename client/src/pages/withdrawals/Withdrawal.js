import Sbutton from "../../components/Sbutton";
import Topbar from "../../components/Topbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import NotHandledWithdrawals from "../../components/withdrawal/NotHandledWithdrawals";

const Withdrawal = () => {
  const [user, setUser] = useState("Consumers");
  return (
    <div>
      <Topbar type={user} setType={setUser} />
      {/* Withdrawals which have been not responded by admin will be retrieved  */}
      <NotHandledWithdrawals type={user} />

      <br />
      <br />
      {/* Load all withdrawals button click will redirect to another page which can retrieve all withdrawals: Handled and not handled */}
      <Link to="/Allwithdrawals" className="link">
        <Sbutton text="Load All Withdrawals" btnWidth="23%" />
      </Link>
    </div>
  );
};

export default Withdrawal;
