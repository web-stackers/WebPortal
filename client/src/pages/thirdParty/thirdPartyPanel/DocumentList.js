import NewProviderlist from "../../../components/Users/NewProviderlist";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewDocument from "../../../services/Provider";

const NewDocumentlist = () => {
  const location = useLocation();
  const providerId = location.state;

  const [newDocs, setNewDocs] = useState([]);

  const fetchDocs = () => {
    NewDocument.fetchDocumentList(providerId)
      .then((response) => {
        setNewDocs(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <>
      {/* <Typography variant="h5" textAlign="center">
        {newDocs.map((newDoc) => ({ newDoc }))}
      </Typography> */}

      {newDocs.map((newDoc) => (
        <Typography>{newDoc.type}</Typography>
      ))}
      {/* <Typography>{provider}</Typography> */}
    </>
  );
};

export default NewDocumentlist;
