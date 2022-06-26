import React from "react";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
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
import AlertBox from "../../../../components/AlertBox";

const NewDocumentlist = () => {
  // get the provider id from react state
  const location = useLocation();
  const providerId = location.state.id;
  const thirdpartyId = location.state.thirdPartyId;

  const [newDocs, setNewDocs] = useState([]);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/thirdParty/new";
    navigate(path);
  };

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

  // const updateQualification = (qualification) => {
  //   Provider.updateQualification(providerId, qualification)
  //     .then(() => {
  //       fetchDocs();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const [value, setValue] = useState([]);

  const handleSubmit = (event) => {
    setValue(event.target.value);
  };

  const checkVerified = () => {
    if (newDocs.some((newDoc) => newDoc.isAccepted === undefined)) {
      return null;
    } else {
      if (newDocs.every((newDoc) => newDoc.isAccepted === true)) {
        setOpen(true);
        setAlert("Email sent successfully");
        Provider.updateDocumentAccepted(providerId);
        Provider.updateVerification(providerId, true, thirdpartyId)
          .then(() => {
            fetchDocs();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        Provider.deleteRejectedProvider(providerId)
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
        {newDocs.map((newDoc, index) => (
          <Grid item xs={4} key={index}>
            <Card variant="outlined" sx={{ minHeight: 250, maxWidth: 350 }}>
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  {newDoc.type === "Qualification"
                    ? newDoc.qualificationDocType
                    : newDoc.type}
                </Typography>
                <br />
                {newDoc.isAccepted === undefined ? (
                  <Stack spacing={5}>
                    <Stack direction="row" justifyContent="space-between">
                      <Link
                        to="/thirdParty/document"
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
                      <Link
                        to="/thirdParty/document"
                        state={{ id: providerId, doc: newDoc.type }}
                      >
                        <Sbutton text="View" btnWidth="205px" />
                      </Link>
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
                      <Link
                        to="/thirdParty/document"
                        state={{ id: providerId, doc: newDoc.type }}
                      >
                        <Sbutton text="View" btnWidth="205px" />
                      </Link>
                      <Button variant="contained" disabled>
                        Accept
                      </Button>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextField disabled id="filled-basic" variant="filled" />
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
        {/* <TextField
          required
          id="filled-basic"
          name="Qualification type"
          label="Qualification Type"
          variant="filled"
          marginLeft="5px"
          value={value["Qualification type"]}
          onChange={handleSubmit}
        /> */}
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            if (checkVerified() === null) {
              setOpen(true);
              setAlert(
                "You need to verify all three documents to send the email !!!"
              );
            } else {
              routeChange();
              window.location.reload();
            }
          }}
        >
          Send Mail
        </Button>
      </Stack>
      <AlertBox open={open} setOpen={setOpen} alert={alert} />
    </Box>
  );
};

export default NewDocumentlist;
