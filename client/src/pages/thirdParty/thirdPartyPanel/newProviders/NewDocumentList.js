import React from "react";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import NewDocument from "../../../../services/Provider";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { Button, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Sbutton from "../../../../components/Sbutton";
import TextField from "@mui/material/TextField";
import Provider from "../../../../services/Provider";
import SendIcon from "@mui/icons-material/Send";
import "../../../../index.css";

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

    button: {
      paddingRight: "40px",
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

  const updateQualification = (qualification) => {
    Provider.updateQualification(providerId, qualification)
      .then(() => {
        fetchDocs();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [value, setValue] = useState([]);

  const handleSubmit = (event) => {
    setValue(event.target.value);
  };

  const checkVerified = () => {
    if (newDocs.some((newDoc) => newDoc.isAccepted === undefined)) {
      return null;
    } else {
      if (newDocs.every((newDoc) => newDoc.isAccepted === true)) {
        Provider.updateVerification(providerId, true)
          .then(() => {
            fetchDocs();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        Provider.updateVerification(providerId, false)
          .then(() => {
            fetchDocs();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
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
                {newDoc.isAccepted === undefined ? (
                  <Stack spacing={5}>
                    <Stack direction="row" justifyContent="space-between">
                      <Link
                        to="/document"
                        state={{ id: providerId, doc: newDoc.type }}
                      >
                        <Sbutton text="View" btnWidth="205px" />
                      </Link>
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
                        value={value[newDoc.type]}
                        onChange={handleSubmit}
                      />
                      <Button
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                          updateRejection(newDoc.type, value);
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
                      <Sbutton text="View" btnWidth="205px" />
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
                      <Sbutton text="View" btnWidth="205px" />
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

      <br />
      <Stack
        className={classes.button}
        direction="row"
        alignItems="center"
        spacing={4}
        justifyContent="flex-end"
      >
        <TextField
          required
          id="filled-basic"
          name="Qualification type"
          label="Qualification Type"
          variant="filled"
          marginLeft="5px"
          value={value["Qualification type"]}
          onChange={handleSubmit}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            if (checkVerified() === null) {
              alert("Documents are not verified");
            } else {
              updateQualification(value);
              alert("Email sent successfully");
            }
          }}
        >
          Send Mail
        </Button>
      </Stack>
    </Box>
  );
};

export default NewDocumentlist;
