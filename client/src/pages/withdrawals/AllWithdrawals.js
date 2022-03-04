import { useEffect, useState } from "react";
import JobAssignment from "../../services/JobAssignment";
import Sbutton from "../../components/Sbutton";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const AllWithdrawals = () => {
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

  const rows = withdrawals.map((withdrawal) => {
    return {
      id: withdrawal._id,
      // id: withdrawal._id && withdrawal.withdrawn,
      type: withdrawal.withdrawn && withdrawal.withdrawn.arisedBy,
      reason: withdrawal.withdrawn && withdrawal.withdrawn.reason,
      response: withdrawal.withdrawn && withdrawal.withdrawn.adminResponse,
    };
  });

  const columns = [
    { field: "name", headerName: "Name", width: 300 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "reason", headerName: "Reason", width: 500 },
    { field: "response", headerName: "Response", width: 200 },
  ];

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <div>
      <div style={{ height: 500, width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
          </div>
        </div>
      </div>

      <br />
      <br />
      <Link to="/withdrawals" className="link">
        <Sbutton text="Back" btnWidth="23%"></Sbutton>
      </Link>
    </div>
  );
};

export default AllWithdrawals;
