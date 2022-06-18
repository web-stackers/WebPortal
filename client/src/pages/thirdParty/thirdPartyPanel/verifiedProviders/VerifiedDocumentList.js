import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Sbutton from "../../../../components/Sbutton";
import VerifiedDocument from "../../../../services/Provider";

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
              <Stack alignItems="center">
                <Link
                  to="/thirdParty/document"
                  state={{ id: providerId, doc: verifiedDoc.type }}
                >
                  <Sbutton text="View" btnWidth="205px" />
                </Link>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VerifiedDocumentlist;
