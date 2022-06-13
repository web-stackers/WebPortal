import React, { useState, useEffect } from "react";
import Provider from "../../../services/Provider";
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Buffer } from "buffer";

const Document = () => {
  const location = useLocation();
  const values = location.state;
  const providerId = values.id;
  const docType = values.doc;

  const [newDocs, setNewDocs] = useState();

  // get the document list for the particular provider
  const fetchDocs = () => {
    Provider.fetchDocumentList(providerId)
      .then((response) => {
        setNewDocs(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let buffer = "";
  let base64String = "";
  let mimetype = "";

  if (newDocs) {
    if (docType === "Profile Picture") {
      buffer = newDocs[0].doc.data;
      base64String = Buffer.from(buffer).toString("base64");
      mimetype = newDocs[0].doc.contentType;
    } else if (docType === "NIC Scanned") {
      buffer = newDocs[1].doc.data;
      base64String = Buffer.from(buffer).toString("base64");
      mimetype = newDocs[1].doc.contentType;
    } else {
      buffer = newDocs[2].doc.data;
      base64String = Buffer.from(buffer).toString("base64");
      mimetype = newDocs[2].doc.contentType;
    }
  }

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <Box>
      {docType === "Profile Picture" ? (
        <Stack>
          <img src={`data:${mimetype};base64, ${base64String}`} width="300" />
        </Stack>
      ) : (
        <Stack>
          <iframe
            src={`data:${mimetype};base64, ${base64String}`}
            height="650px"
            width="100%"
          />
        </Stack>
      )}
    </Box>
  );
};

export default Document;
