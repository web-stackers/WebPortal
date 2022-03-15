import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VerifiedDocument from "../../../services/Provider";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { Chip, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Sbutton from "../../../components/Sbutton";

const VerifiedDocumentlist = () => {
  // get the provider id from react state
  const location = useLocation();
  const providerId = location.state;

  const [verifiedDocs, setVerifiedDocs] = useState([]);

  // get the document list for the particular provider
  const fetchDocs = () => {
    VerifiedDocument.fetchDocumentList(providerId)
      .then((response) => {
        setVerifiedDocs(response.data);
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

  return (
    <Box>
      <Grid container className={classes.gridContainer}>
        {verifiedDocs.map((verifiedDoc) => (
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ minHeight: 150, maxWidth: 300 }}>
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  {verifiedDoc.type}
                </Typography>
                <br />
              </CardContent>
              <Stack spacing={1} alignItems="center">
                <Stack direction="row" spacing={4}>
                  {verifiedDoc.isAccepted === true ? (
                    <Chip label="Accepted" color="success" />
                  ) : (
                    <Chip label="Rejected" color="error" />
                  )}
                  <Sbutton text="Download" btnWidth="150px" />
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VerifiedDocumentlist;
