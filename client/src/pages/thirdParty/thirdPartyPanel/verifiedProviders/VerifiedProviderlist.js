import { useEffect, useState } from "react";
import VerifiedProvider from "../../../../services/Provider";
import { Link } from "react-router-dom";
import Sbutton from "../../../../components/Sbutton";
import "../../../../index.css";
import { DataGrid } from "@mui/x-data-grid";
import dateFormat from "dateformat";

const VerifiedProviderlist = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("profile"));
  });

  const docType = user.result.verifyDocType;
  const verifyDoctype = docType.replaceAll("/", "");

  const [verifiedProviders, setVerifiedProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = () => {
    VerifiedProvider.fetchVerifiedProviders(verifyDoctype)
      .then((response) => {
        setVerifiedProviders(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const rows = verifiedProviders
    .filter((verifiedProvider) => {
      if (searchTerm === "") {
        return verifiedProvider;
      } else if (
        verifiedProvider.name.fName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return verifiedProvider;
      } else if (
        verifiedProvider.name.lName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return verifiedProvider;
      }
      // else if (
      //   verifiedProvider.qualification
      //     .toLowerCase()
      //     .includes(searchTerm.toLowerCase())
      // )
      // {
      //   return verifiedProvider;
      // }
      else {
        return false;
      }
    })
    .map((verifiedProvider) => {
      return {
        id: verifiedProvider._id,
        fName: verifiedProvider.name.fName,
        lName: verifiedProvider.name.lName,
        // qualification: verifiedProvider.qualification,
        date: dateFormat(verifiedProvider.verification.date, "yyyy-mm-dd"),
      };
    });

  const columns = [
    { field: "fName", headerName: "First Name", width: 150 },
    { field: "lName", headerName: "Last Name", width: 150 },
    // {
    //   field: "qualification",
    //   headerName: "Qualification",
    //   width: 200,
    // },
    {
      field: "date",
      headerName: "Verified Date",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const providerId = params.row.id;
        return (
          <div>
            <Link
              to="/thirdParty/verifiedDocumentlist"
              state={providerId}
              className="link"
            >
              <Sbutton text="Open" btnWidth="120px" />
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="input-icons">
        <i class="fa fa-search icon"></i>
        <input
          className="input-field"
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <br />
        <br />
      </div>
      <div style={{ height: 500, width: 800 }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiedProviderlist;
