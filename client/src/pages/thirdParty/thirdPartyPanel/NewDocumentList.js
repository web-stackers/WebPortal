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

  const updateRejection = (Doctype, reason) => {
    Provider.updateDocumentRejected(providerId, Doctype, reason)
      .then(() => {
        fetchDocs();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [reasonForRejection, setReasonForRejection] = useState([]);

  const handleSubmit = (event) => {
    setReasonForRejection(event.target.value);
  };

  return (
    <Box>
      <Grid container className={classes.gridContainer}>
        {newDocs.map((newDoc) => (
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ minHeight: 250, maxWidth: 350 }}>
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  {newDoc.type}
                </Typography>
                <br />
                {newDoc.isAccepted !== true && newDoc.isAccepted !== false ? (
                  <Stack spacing={5}>
                    <Stack direction="row" justifyContent="space-between">
                      <Sbutton text="Download" btnWidth="205px" />
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          updateAccepted(newDoc.type);
                        }}
                      >
                        Accept
                      </Button>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextField
                        required
                        id="filled-basic"
                        name={newDoc.type}
                        label="Reason For Rejection"
                        variant="filled"
                        marginLeft="5px"
                        value={reasonForRejection[newDoc.type]}
                        onChange={handleSubmit}
                      />
                      <Button
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(reasonForRejection);
                          updateRejection(newDoc.type, reasonForRejection);
                        }}
                      >
                        Reject
                      </Button>
                    </Stack>
                  </Stack>
                ) : newDoc.isAccepted === true ? (
                  <Stack spacing={5}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Sbutton text="Download" btnWidth="150px" />
                      <Button variant="contained" disabled>
                        Accept
                      </Button>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextField
                        disabled
                        id="filled-basic"
                        label="Reason For Rejection"
                        variant="filled"
                        marginLeft="5px"
                      />
                      <Button variant="contained" disabled>
                        Reject
                      </Button>
                    </Stack>
                  </Stack>
                ) : (
                  <Stack spacing={5}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Sbutton text="Download" btnWidth="150px" />
                      <Button variant="contained" disabled>
                        Accept
                      </Button>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextField
                        disabled
                        id="filled-basic"
                        variant="filled"
                        marginLeft="5px"
                      />
                      <Button variant="contained" disabled>
                        Reject
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewDocumentlist;
