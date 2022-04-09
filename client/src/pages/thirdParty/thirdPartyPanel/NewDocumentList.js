import React from "react";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewDocument from "../../../services/Provider";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { Button, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Sbutton from "../../../components/Sbutton";
import TextField from "@mui/material/TextField";
import Provider from "../../../services/Provider";

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

  const useStyles = makeStyles({
    gridContainer: {
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "15px",
    },
  });

  const classes = useStyles();

  const updateAccepted = (Doctype) => {
    Provider.updateDocumentAccepted(providerId, Doctype)
      .then(() => {
        fetchDocs();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateRejection = (Doctype) => {
    Provider.updateDocumentRejected(providerId, Doctype)
      .then(() => {
        fetchDocs();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [reasonForRejection, setReasonForRejection] = useState([]);

  const handleSubmit = (event) => {
    const value = event.target.value;
    setReasonForRejection(value);
  };

  const updateRejectionReason = (Doctype, reason) => {
    Provider.updateDocumentRejectedReason(providerId, Doctype, reason)
      .then(() => {
        fetchDocs();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box>
      <Grid container className={classes.gridContainer}>
        {newDocs.map((newDoc) => (
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ minHeight: 280, maxWidth: 350 }}>
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  {newDoc.type}
                </Typography>
                <br />
                <div align="center">
                  <Sbutton text="Download" btnWidth="150px" />
                </div>
              </CardContent>
              {newDoc.isAccepted !== true && newDoc.isAccepted !== false ? (
                <Stack
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      updateAccepted(newDoc.type);
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      updateRejection(newDoc.type);
                    }}
                  >
                    Reject
                  </Button>
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Button variant="contained" disabled>
                    Accept
                  </Button>
                  <Button variant="contained" disabled>
                    Reject
                  </Button>
                </Stack>
              )}
              <br />
              <div align="center">
                {newDoc.isAccepted === false &&
                newDoc.reasonForRejection !== null ? (
                  <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <TextField
                      required
                      id="filled-basic"
                      label="Reason For Rejection"
                      variant="filled"
                      marginLeft="5px"
                      value={reasonForRejection || ""}
                      onChange={handleSubmit}
                    />
                    <Sbutton
                      text="Submit"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(reasonForRejection);
                        updateRejectionReason(newDoc.type, reasonForRejection);
                      }}
                      width="50px"
                    />
                  </Stack>
                ) : (
                  <TextField
                    disabled
                    id="filled-disabled"
                    label="Disabled"
                    defaultValue="Reason For Rejection"
                    variant="filled"
                  />
                )}
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewDocumentlist;
