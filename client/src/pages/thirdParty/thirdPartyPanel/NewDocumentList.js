import React from "react";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NewDocument from "../../../services/Provider";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { Button, CardActions, CardHeader, Grid, Stack } from "@mui/material";
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
  // const [disable, setDisable] = useState(false);

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

  return (
    <Box>
      <Grid container className={classes.gridContainer}>
        {newDocs.map((newDoc) => (
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ minHeight: 300, maxWidth: 300 }}>
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  {newDoc.type}
                </Typography>
                <br />
                <div align="center">
                  <Sbutton text="Download" btnWidth="150px" />
                </div>
              </CardContent>
              <CardActions>
                <Stack direction="row" spacing={14}>
                  <Button
                    variant="contained"
                    color="success"
                    // id="accepted"
                    // disabled={disable}
                    onClick={() => {
                      updateAccepted(newDoc.type);
                      alert(`${newDoc.type} is accepted !`);
                      // setDisable(true);
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      updateRejection(newDoc.type);
                      alert(`${newDoc.type} is rejected !`);
                      // setDisable(true);
                    }}
                  >
                    Reject
                  </Button>
                </Stack>
              </CardActions>
              {/* <CardActions>
                {newDoc.isAccepted != "true" || newDoc.isAccepted != "flase" ? (
                  <Stack direction="row" spacing={14}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        updateVerification(newDoc.type);
                        alert(`${newDoc.isAccepted} is accepted !`);
                      }}
                    >
                      Accept
                    </Button>
                    <Button variant="contained" color="error">
                      Reject
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={9}>
                    <Button variant="contained" disabled>
                      Accepted
                    </Button>
                    <Button variant="contained" disabled>
                      Rejected
                    </Button>
                  </Stack>
                )}
              </CardActions> */}
              {/* <Typography variant="h5" textAlign="center">
                {newDoc.isAccepted}
              </Typography> */}

              {/* <br/>
              <div align="center">
                <TextField
                  disabled
                  id="filled-disabled"
                  label="Disabled"
                  defaultValue="Reason For Rejection"
                  variant="filled"
                />
              </div> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewDocumentlist;
