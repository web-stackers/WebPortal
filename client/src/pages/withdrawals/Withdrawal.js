import Sbutton from "../../components/Sbutton";
import Topbar from "../../components/Topbar";
import { Link } from "react-router-dom";
import NotHandledWithdrawals from "../../components/withdrawal/NotHandledWithdrawals";

const Withdrawal = () => {
  return (
    <div>
      <Topbar
        onClickConsumer={() => alert("Consumers")}
        onClickProvider={() => alert("Providers")}
      />
      {/* Withdrawals which have been not responded by admin will be retrieved  */}
      <NotHandledWithdrawals />

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
