import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewDocument from "../../../services/Provider";

const NewDocumentlist = () => {
  // get the provider id from react state
  const location = useLocation();
  const providerId = location.state;

  const [newDocs, setNewDocs] = useState([]);

  // get the document list for the particular provider
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
    <div>
      {/* display the document type */}
      {newDocs.map((newDoc) => (
        <Typography>{newDoc.type}</Typography>
      ))}
    </div>
  );
};

export default NewDocumentlist;
