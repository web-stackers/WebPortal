import React, { useState, useEffect } from "react";
import Provider from "../../../../services/Provider";
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";

const Document = () => {
  const location = useLocation();
  const values = location.state;
  const providerId = values.id;
  const docType = values.doc;

  const [newDoc, setNewDoc] = useState([]);

  const fetchDoc = () => {
    Provider.fetchDocument(providerId, docType)
      .then((response) => {
        setNewDoc(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchDoc();
  }, []);

  const stringData = btoa(String.fromCharCode(...new Uint8Array(newDoc)));

  return (
    <Box>
      {docType === "Profile Picture" ? (
        <Stack>
          <img src={`data:image/png;base64, ${stringData}`} width="300" />
        </Stack>
      ) : (
        <Stack>
          <iframe />
        </Stack>
      )}
    </Box>
  );
};

export default Document;
