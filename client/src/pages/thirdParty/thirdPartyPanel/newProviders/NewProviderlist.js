import { useEffect, useState } from "react";
import NewProvider from "../../../../services/Provider";
import { Link } from "react-router-dom";
import Sbutton from "../../../../components/Sbutton";
import { DataGrid } from "@mui/x-data-grid";
import "../../../../index.css";

const NewProviderlist = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("profile"));
  });

  const docType = user.result.verifyDocType;
  const verifyDoctype = docType.replaceAll("/", "");

  const [newProviders, setNewProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = () => {
    NewProvider.fetchNewProviders(verifyDoctype)
      .then((response) => {
        setNewProviders(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const rows = newProviders
    .filter((newProvider) => {
      if (searchTerm === "") {
        return newProvider;
      } else if (
        newProvider.name.fName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return newProvider;
      } else if (
        newProvider.name.lName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return newProvider;
      } else {
        return false;
      }
    })
    .map((newProvider) => {
      return {
        id: newProvider._id,
        fName: newProvider.name.fName,
        lName: newProvider.name.lName,
      };
    });

  const columns = [
    { field: "fName", headerName: "First Name", width: 150 },
    { field: "lName", headerName: "Last name", width: 150 },
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
              to="/thirdParty/newDocumentlist"
              state={{ id: providerId, thirdPartyId: user.result._id }}
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
        <i className="fa fa-search icon"></i>
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

export default NewProviderlist;
